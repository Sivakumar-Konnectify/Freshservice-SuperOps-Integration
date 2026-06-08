const axios = require("axios");
const rootDomain = ".konnectifyapp.co";
const cf_domain = "domain"; // custom field created for tenants
const { OnAppInstallHandler } = require("./createKonnectorJson");
const { ConvertDraftToDynamicConnector } = require("./additionalConnectors");

const draftKonnector = {
  appId: "freshservice-1.0.0",
  status: "ACTIVE",
  description: "sample konnector",
  settings: {},
  nodeData: [
    {
      id: "1",
      position: {
        x: 40,
        y: 40,
      },
      data: {
        appId: "freshservice-1.0.0",
        connectionId: "2208",
        eventId: "new_ticket_created",
        hasWarning: false,
        hasConfigured: true,
        fieldsConfigured: true,
        type: "trigger",
        hasMandatoryFields: false,
        showExtension: false,
        positionId: "1",
        AppName: "Freshservice",
        event: {
          id: "new_ticket_created",
          name: "New Ticket Created",
          description: "Polls for new tickets created in Freshservice.",
          has_config_fields: false,
          batch: false,
        },
        connection: {
          id: "2208",
          name: "Freshservice Connection - 2026-03-05T11:56:48.838Z",
          status: "SUCCESS",
        },
      },
      type: "trigger",
    },
    {
      id: "2",
      position: {
        x: 40,
        y: 215,
      },
      data: {
        appId: "freshservice-1.0.0",
        connectionId: "2208",
        eventId: "find_department",
        config_fields: {
          find: {
            schema: "id",
            type: "string",
          },
        },
        FieldMapping: {
          id: {
            schema: "{{1:department_id}}",
            type: "string",
          },
        },
        hasWarning: false,
        hasConfigured: true,
        fieldsConfigured: true,
        type: "app",
        hasMandatoryFields: false,
        parentId: "1",
        depth: 1,
        pathId: "main",
        branchIndex: 0,
        showExtension: false,
        positionId: "2",
        AppName: "Freshservice",
        event: {
          id: "find_department",
          name: "Find Department",
          description:
            "Retrieves the details of a single department using either their unique ID or Name address.",
          has_config_fields: true,
          batch: false,
        },
        connection: {
          id: "2208",
          name: "Freshservice Connection - 2026-03-05T11:56:48.838Z",
          status: "SUCCESS",
        },
      },
      type: "app",
    },
  ],
  edgeData: [
    {},
    {
      id: "e1-2",
      type: "buttonedge",
      source: "1",
      target: "2",
    },
  ],
};

function createDraftNode(draftName) {
  return { ...draftKonnector, name: draftName };
}

exports = {
  onAppInstallCallback: async function (options) {
    return await createNewConnectors(options);
  },

  onTicketUpdateCallback: async function (options) {
    try {
      const status = options.data.ticket?.changes?.status;
      const tags = options.data.ticket.tags;
      if (tags.includes("SUPEROP_ALERT_RESOLVED")) {
        // if the ticket has superops_alert_resolved tag then skip
        console.log(
          "Supeop alert is resolved for this ticket : ",
          options.data.ticket.id,
        );
        return;
      }
      let alertID = "";
      if (status) {
        // check if the status is either resolved or closed
        if (tags) {
          // check the tickets has superops alert id in tag
          const superopsAlertTag = tags.filter((tag) =>
            tag.startsWith("SUPEROPS_ALERT_ID_"),
          );
          if (superopsAlertTag.length) {
            alertID = superopsAlertTag[0].split("SUPEROPS_ALERT_ID_")[1];
            console.log("Alert ID : ", alertID);
          }
        }
      } else {
        console.log("Ticket status not changed for - ", options.data.ticket.id);
        return;
      }
      if (!alertID) {
        // if there is no alert id then stop execution
        console.log("Alert ID is not present so this is not an alert");
        return;
      }
      // send alert id fetched from freshservice ticket to webhook
      const connectorsId = await $db.get("alertConnector");
      const webhookURL = connectorsId.webhookUrl;
      console.log("webhook ID and alert ID", webhookURL, alertID);
      const payload = { alert_id: alertID };
      const sendingAlertToWebhook = await axios.post(webhookURL, payload);
      console.log(
        "This ticket id is triggers webhook for alert resolution - ",
        options.data?.ticket?.id,
        sendingAlertToWebhook.data,
      );
    } catch (error) {
      console.log("Error in sending payload to webhook", error);
      console.log("Error response", error.response);
    }
  },

  onAppUninstallCallback: async function (options) {
    try {
      const connectorData = await getConnectorDetails(options, options.iparams?.accessToken); // new
      const hasConnectors = connectorData.hasConnectors;
      if (hasConnectors) {
        const connectorStatuses = connectorData.connectors;
        const adminToken = connectorData.adminToken;
        const connectorIdsFromDB = connectorData.connectorIdsFromDB;
        await deactivateConnectors(
          connectorStatuses,
          adminToken,
          options.iparams.domain,
          connectorIdsFromDB,
          "INACTIVE",
        );
      }
      renderData(null, {});
    } catch (error) {
      console.log("Error in uninstall", error.response || error);
      renderData({ error: 400, message: "On app uninstall failed" });
    }
  },

  updateKonnector: async function (options) {
    try {
      const isSuperopsDomainChanged = options?.isSuperopsDomainChanged;
      if (isSuperopsDomainChanged) {
        let opt = options;
        delete opt.iparams;
        opt.domain = options.adminDomain;
        opt = {
          iparams: opt,
        };
        // disable connectors for old supreops domain
        const adminToken = options?.accessToken;
        const connectorData = await getConnectorDetails(opt, adminToken);
        const hasConnectors = connectorData.hasConnectors;
        if (hasConnectors) {
          const connectorStatuses = connectorData.connectors;
          const adminToken = connectorData.adminToken;
          const connectorIdsFromDB = connectorData.connectorIdsFromDB;
          await deactivateConnectors(
            connectorStatuses,
            adminToken,
            opt.iparams.domain,
            connectorIdsFromDB,
            "INACTIVE",
          );
        }
        // create new connectors for new superops domain
        return createNewConnectors(opt);
      } else {
        const tenantToken = await getTenantToken(
          options.tenantId,
          options.accessToken,
          options.soDomain,
        );
        const data = {
          iparams: {
            tenantToken: tenantToken,
            isInEditConfig: options.isInstallationPhase,
            domain: options.soDomain,
            assetMapping: options.assetMapping,
            since: options.since,
            freshserviceAppId: options.freshserviceAppId,
            freshserviceAppName: options.freshserviceAppName,
            freshserviceConnectionId: options.freshserviceConnectionId,
            superopsAppId: options.superopsAppId,
            superopsAppName: options.superopsAppName,
            superopsConnectionId: options.superopsConnectionId,
            freshserviceConnectionName: options.freshserviceConnectionName,
            superopsConnectionName: options.superopsConnectionName,
            siteSeverityMapping: options.siteSeverityMapping,
            adminToken: options.accessToken,
            ticketForm: options.ticketForm,
            formattedTicketForm: options.formattedTicketForm,
          },
        };
        const onAppInstallHandler = new OnAppInstallHandler();
        await onAppInstallHandler.handleCallback(data); // options.iparams
        // update connector for alert created
        const converter = new ConvertDraftToDynamicConnector();
        const alertCreatedconnectorId = (await $db.get("alertConnector"))
          .alertCreatedConnectorId;
        const alertConnector =
          converter.buildSuperopsAlertCreatedDraft(options);
        await converter.saveAndActivate(
          data,
          alertCreatedconnectorId,
          alertConnector,
        );
        console.log("connector updated");
        renderData(null, {});
      }
    } catch (error) {
      console.log("Error in update connector", error);
      console.log("Error response", error.response);
      renderData({ status: 400, message: "Updating konnector failed" });
    }
  },

  registerUser: async function (options) {
    // create tenant
    try {
      const tenantId = await checkUserExistance(options);
      if (tenantId) {
        // tennat already exists so returning the tennat id
        console.log("Pre existing tenant ID", tenantId);
        renderData(null, { id: tenantId });
        return;
      }
      // creating a new tennat
      const url = `https://${options.adminDomain}${rootDomain}/admin/api/tenants`;
      const payload = {
        externalTenantId: options.superopsDomain,
        name: options.superopsDomain,
        status: "ACTIVE",
        customFields: {
          [cf_domain]: options.superopsDomain,
        },
      };
      const headers = setHeader(options.token);
      const response = await axios.post(url, payload, { headers });
      renderData(null, { id: response.data?.id });
    } catch (error) {
      console.log("Failed to register tenant", error);
      console.log("Error response", error.response);
      const message = error.response?.data?.message;
      renderData({
        status: error.response?.status || 400,
        message: message || "Validation failed",
      });
    }
  },

  authConnection: async function (options) {
    try {
      if (options?.app1_connection_id && options.isApp1) {
        // edit existing FS connection
        console.log(
          "FS connection updated - connection ID",
          options?.app1_connection_id,
        );
        const result = await editConnection(
          options,
          options?.app1_connection_id,
        );
        renderData(null, { data: result });
      } else if (options?.app2_connection_id && options.isApp2) {
        // edit existing SO-IT connection
        const result = await editConnection(
          options,
          options?.app2_connection_id,
        );
        renderData(null, { data: result });
      } else {
        // create new connection
        const url = `https://${options.subDomain}${rootDomain}/komp/api/connections?token=${options.token}`;
        const body = extractOption(options);
        const response = await axios.post(url, body);
        console.log("New connection created", response.data);
        renderData(null, { data: response.data });
      }
    } catch (error) {
      console.error("Failed to authenticate connection ", error.response.data);
      renderData({
        status: 500,
        message: error.response?.data?.message || "Internal Server Error",
      });
    }
  },

  verifyLogin: async function (options) {
    try {
      const query = `query=${options.query}&pageSize=${options.pageSize}&pageNumber=${options.currentPage}`;
      const url = `https://${options.domain}${rootDomain}/admin/api/tenants?${query}`;
      const headers = setHeader(options.token);
      const searchResult = await axios.get(url, { headers });
      renderData(null, { data: searchResult.data?.data });
    } catch (error) {
      console.error("Failed to login user", error.response);
      const message = error.response?.data?.message;
      renderData({ status: error.response?.status, message });
    }
  },

  getAssetById: async function (options) {
    try {
      const assetResponse = await $request.invokeTemplate("getAssetById", {
        context: {
          assetId: options.assetId,
          domain: options.iparams?.freshserviceDomain?.split("https://")[1],
        },
      });
      console.log("get asset by ID ", assetResponse.response);
      const asset = JSON.parse(assetResponse.response).asset;
      renderData(null, { response: asset.asset_tag });
    } catch (error) {
      console.log("Error in fetching asset by id: ", error);
      console.log("Error response", error.response);
      renderData({ status: 400, message: "Error in fetching asset" });
    }
  },
};

async function editConnection(options, connectionId) {
  const url = `https://${options.subDomain}${rootDomain}/komp/api/connections/${connectionId}?token=${options.token}`;
  const body = extractOption(options);
  const response = await axios.patch(url, body);
  console.log("Connection updated : ", response.data);
  return { ...response.data };
}

function extractOption(options) {
  return {
    appId: options.appId,
    name: options.name,
    data: options.data,
  };
}

function setHeader(token) {
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

async function getTenantToken(userId, adminToken, domain) {
  try {
    const getToken = await axios.get(
      `https://${domain}${rootDomain}/admin/api/tenants/token?id=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      },
    );
    const token = getToken.data?.token;
    return token;
  } catch (error) {
    console.log("Error in fetching tenant token", error);
    console.log("Error response", error.response);
    throw error;
  }
}

async function checkUserExistance(options) {
  const query = `{"AND":[{"key":"custom_field.domain","operator":"equals","value":"${options.superopsDomain}"}]}`;
  const url = `https://${options.adminDomain}${rootDomain}/admin/api/tenants?pageNumber=1&pageSize=10&query=${query}`;
  const headers = setHeader(options.token);
  const findTenant = await axios.get(url, { headers });
  let tenantId = null;
  if (findTenant.data?.data?.list?.length === 1) {
    tenantId = findTenant.data.data.list[0].id;
  }
  return tenantId;
}

// Helper function to create and activate a connector
async function createAndActivateConnector(
  name,
  builderMethod,
  options,
  converter,
  baseUrl,
  tenantToken,
  headers,
  needsWebhook = false,
) {
  // Create draft
  const draftConnector = createDraftNode(name);
  const connectorDraft = await axios.post(
    `${baseUrl}/konnectors?token=${tenantToken}`,
    draftConnector,
    headers,
  );
  const connectorID = connectorDraft.data?.id;
  console.log("Draft connector ID", connectorID);
  // Build and activate
  const connector = converter[builderMethod](options.iparams);
  await converter.saveAndActivate(
    options,
    connectorID,
    connector,
    needsWebhook,
  );
  // Generate webhook if needed
  let webhookUrl = null;
  if (needsWebhook) {
    const generateWebhookURL = `https://${options.iparams.domain}${rootDomain}/komp/api/konnectors/${connectorID}/catch-hook/generate-hook?token=${tenantToken}`;
    const webhookResponse = await axios.post(generateWebhookURL);
    webhookUrl = webhookResponse.data?.webhookUrl;
    console.log("Generated webhook url : ", webhookUrl);
    const activateConnectorUrl = `https://${options.iparams.domain}${rootDomain}/komp/api/konnectors/${connectorID}/ACTIVE?token=${tenantToken}`;
    await axios.post(activateConnectorUrl);
  }
  return { connectorID, webhookUrl };
}

async function createNewConnectors(options) {
  try {
    const tenantToken = await getTenantToken(
      options.iparams?.tenantId,
      options.iparams?.accessToken,
      options.iparams?.domain,
    );
    const headers = { headers: { "Content-Type": "application/json" } };
    const baseUrl = `https://${options.iparams?.domain}${rootDomain}/komp/api`;
    const newAssetKonnector = createDraftNode("Create Asset");
    const updateAssetKonnector = createDraftNode("Update Asset");
    const [newAssetDraft, updateAssetDraft] = await Promise.all([
      axios.post(
        `${baseUrl}/konnectors?token=${tenantToken}`,
        newAssetKonnector,
        headers,
      ),
      axios.post(
        `${baseUrl}/konnectors?token=${tenantToken}`,
        updateAssetKonnector,
        headers,
      ),
    ]);
    const newAssetKonnectorId = newAssetDraft?.data?.id;
    const updateAssetKonnectorId = updateAssetDraft?.data?.id;
    options.iparams.tenantToken = tenantToken;
    await $db.set("assetConnector", {
      newAssetId: newAssetKonnectorId,
      updateAssetId: updateAssetKonnectorId,
    });
    const onAppInstallHandler = new OnAppInstallHandler();
    await onAppInstallHandler.handleCallback(options);
    // additional connectors - related to alerts
    const converter = new ConvertDraftToDynamicConnector();
    // create all additional connectors
    const [alertCreated, alertResolved, alertResolvedOnUpdate] =
      await Promise.all([
        createAndActivateConnector(
          "Create Ticket",
          "buildSuperopsAlertCreatedDraft",
          options,
          converter,
          baseUrl,
          tenantToken,
          headers,
        ),
        createAndActivateConnector(
          "Resolve Ticket in Freshservice",
          "buildSuperopsAlertResolvedDraft",
          options,
          converter,
          baseUrl,
          tenantToken,
          headers,
        ),
        createAndActivateConnector(
          "Resolve Alert in Superops",
          "alertResolvedOnTicketUpdate",
          options,
          converter,
          baseUrl,
          tenantToken,
          headers,
          true, // needs webhook
        ),
      ]);
    // save alert connector IDs - for updating connector we use this id
    await $db.set("alertConnector", {
      alertCreatedConnectorId: alertCreated.connectorID,
      alertResolvedConnectorId: alertResolved.connectorID,
      resolveAlertOnTicketChangeConnectorId: alertResolvedOnUpdate.connectorID,
      webhookUrl: alertResolvedOnUpdate.webhookUrl,
    });
    renderData(null, {});
  } catch (error) {
    console.log("Error in on app install", error);
    console.log("Error data", error.response?.data);
    renderData({ error: 400, message: "App installation failed" });
  }
}

async function getConnectorDetails(options, adminToken="") {
  console.log("--------->  get connector fn called");
  try {
    let adminAccessToken;
    // fetch connector ids from DB
    const [assetConnectors, alertConnectors] = await Promise.all([
      $db.get("assetConnector"),
      $db.get("alertConnector"),
    ]);
    console.log("assetConnectors", alertConnectors);
    // extract IDs safely
    const konnectorIds = [
      assetConnectors?.newAssetId,
      assetConnectors?.updateAssetId,
      alertConnectors?.alertCreatedConnectorId,
      alertConnectors?.alertResolvedConnectorId,
      alertConnectors?.resolveAlertOnTicketChangeConnectorId,
    ].filter(Boolean);
    console.log("connector ids", konnectorIds);
    if (konnectorIds.length === 0) {
      console.log("No connectors found to deactivate");
      return { hasConnectors: false };
    }
    // if admin token is not passed in args then get it from api
    if (!adminToken) {
      console.log("no token")
      const tokenResponse = await $request.invokeTemplate(
        "getAdminAccessToken",
        {
          context: {
            host: options.iparams.domain,
          },
          body: JSON.stringify({
            email: options.iparams.adminEmail,
            password: options.iparams.adminPassword,
          }),
        },
      );
      adminAccessToken = JSON.parse(tokenResponse.response)?.accessToken;
    } else {
      adminAccessToken = adminToken;
    }
    if (!adminAccessToken) {
      console.log("Admin access token not found");
      throw new Error("Failed to fetch admin access token");
    }
    const headers = setHeader(adminAccessToken);
    console.log(headers);
    // console.log(`https://${options.iparams.domain}${rootDomain}/admin/api/konnectors/${id}`)
    // find the active connector and fetch their id - if we try to deactivate the already deactivated connector we get error
    const connectorResponses = await Promise.all(
      konnectorIds.map((id) =>
        axios.get(
          `https://${options.iparams.domain}${rootDomain}/admin/api/konnectors/${id}`,
          { headers },
        ),
      ),
    );
    const connectorStatuses = connectorResponses.map((res) => ({
      status: res.data?.status,
    }));
    return {
      hasConnectors: true,
      connectors: connectorStatuses,
      adminToken: adminAccessToken,
      connectorIdsFromDB: konnectorIds,
    };
  } catch (error) {
    console.log("Failed to fetch all connector", error.response || error.message || error);
    throw error;
  }
}

async function deactivateConnectors(
  connectors,
  adminToken,
  domain,
  connectorIdsFromDB,
  operation,
) {
  try {
    // if you want to deactivate all connectors then check for connectors which are in activate status
    // extract only ACTIVE connector IDs
    const connectorIds = [];
    connectors.forEach((connector, index) => {
      console.log(connector, index);
      if (connector.status !== operation) {
        // "ACTIVE"
        connectorIds.push(connectorIdsFromDB[index]);
      }
    });
    const headers = setHeader(adminToken);
    // activate/deactivate connectors
    await Promise.all(
      connectorIds.map((id) =>
        axios.post(
          `https://${domain}${rootDomain}/admin/api/konnectors/${id}/${operation}`,
          {},
          { headers },
        ),
      ),
    );
    console.log(`${operation} connectors`, connectorIds);
  } catch (error) {
    console.log("Error in deactivating the connectors", error.response);
    throw error;
  }
}
