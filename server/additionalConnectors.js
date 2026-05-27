const axios = require("axios");
const rootDomain = ".konnectifyapp.co";

function buildFieldMapping(ticketForm = {}) {
  const mapping = {};
  Object.entries(ticketForm).forEach(([key, value]) => {
    if (value === undefined || value === null || value === ""){ 
      return
    }
    // If already formatted like { schema, type }
    if (
      typeof value === "object" &&
      value.schema !== undefined &&
      value.type !== undefined
    ) {
      mapping[key] = value;
      return;
    }
    // Otherwise build mapping
    let type = "string";
    let schema = value;
    if (typeof value === "number") {
      type = "number";
      schema = String(value);
    } else if (typeof value === "boolean") {
      type = "boolean";
      schema = String(value);
    } else {
      schema = String(value);
    }
    mapping[key] = { type, schema };
  });

  mapping.tags = {
    type: "array",
    schema: ["SUPEROPS_ALERT_ID_{{1:data.id}}"],
  };

  mapping.workspace_id = {
    type: "string",
    schema: String(ticketForm.workspace_id || 2),
  } 

  mapping.subject = {
    type: "string",
    schema: mapping?.subject?.schema ? `${mapping.subject.schema} / {{1:data.message}}_#{{1:data.id}}` : `{{1:data.message}}_#{{1:data.id}}`
  };

  mapping.description = {
    type: "string",
    schema: `${mapping.description?.schema} - ALERT DESCRIPTION FROM SUPEROPS: {{1:data.description}}`,
  };

  mapping.priority = {
    type: "string",
    schema: "1",
  };

  mapping.assets = {
    schema: "{{3:assets.0.id}}",
    type: "string",
  };
  console.log("Schema for creating ticket", mapping);
  return mapping;
}

class ConvertDraftToDynamicConnector {
  async saveAndActivate(option, konnectorId, result, isWebhookTrigger = false) {
    const tenantToken = option.iparams?.tenantToken || option.tenantToken;
    const domain = option.iparams?.domain;
    const isSuperopsDomainChanged = option.iparams?.isSuperopsDomainChanged;
    const saveUrl = `https://${domain}${rootDomain}/komp/api/konnector-nodes/${konnectorId}/save?token=${tenantToken}`;
    const activateUrl = `https://${domain}${rootDomain}/komp/api/konnectors/${konnectorId}/ACTIVE?token=${tenantToken}`;
    console.log("save - url : ", saveUrl);
    await axios.post(saveUrl, result);
    if ((!option.iparams?.isInEditConfig && !isWebhookTrigger) || (isSuperopsDomainChanged && !isWebhookTrigger)) {
      console.log("activate - url : ", activateUrl);
      await axios.post(activateUrl);
    }
  }

  // Trigger - Alert Resolve
  buildSuperopsAlertResolvedDraft(iparams) {
    const now = Date.now();

    return {
      appId: "freshservice-1.0.0",
      status: "ACTIVE",
      description: "Resolved Alert",
      settings: {},
      nodeData: [
        {
          id: "1",
          position: { x: 40, y: 40 },
          executionId: String(now + 1),
          data: {
            appId: iparams.superopsAppId,
            connectionId: iparams.superopsConnectionId,
            eventId: "alert_resolved",
            hasWarning: false,
            hasConfigured: true,
            fieldsConfigured: true,
            connection: {
              id: iparams.superopsConnectionId,
              name: iparams.superopsConnectionName,
              status: "SUCCESS",
            },
            type: "trigger",
            event: {
              id: "alert_resolved",
              name: "Alert Resolved",
              description:
                "Fires in real-time when SuperOps marks an alert as resolved.",
              has_config_fields: false,
              has_custom_fields: false,
              batch: false,
            },
            AppName: iparams.superopsAppName,
            positionId: "1",
            showExtension: false,
            hasMandatoryFields: false,
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
            connectionId: iparams.freshserviceConnectionId,
            eventId: "filter_tickets",
            FieldMapping: {
              tag: {
                schema: "SUPEROPS_ALERT_ID_{{1:data.id}}",
                type: "string",
              },
            },
            hasWarning: false,
            hasConfigured: true,
            fieldsConfigured: true,
            connection: {
              id: iparams.freshserviceConnectionId,
              name: iparams.freshserviceConnectionName,
              status: "SUCCESS",
            },
            type: "app",
            event: {
              id: "filter_tickets",
              name: "Filter Tickets",
              description:
                "Retrieves tickets matching a Freshservice filter query and returns the latest created 200 records. Supports logical operators, date conditions, custom fields, and optional workspace scope.",
              has_config_fields: false,
              has_custom_fields: false,
              batch: false,
            },
            AppName: "Freshservice",
            positionId: "2",
            showExtension: true,
            _updateTimestamp: 1777457490977,
            hasMandatoryFields: false,
          },
          type: "app",
        },
        {
          id: "3",
          position: {
            x: 40,
            y: 390,
          },
          data: {
            appId: "freshservice-1.0.0",
            connectionId: iparams.freshserviceConnectionId,
            eventId: "update_ticket",
            config_fields: {
              workspace_id: {
                schema: iparams.ticketForm.workspace_id,
                type: "number",
              },
            },
            FieldMapping: {
              ticket_id: {
                schema: "{{2:tickets.0.id}}",
                type: "string",
              },
              status: {
                schema: "4",
                type: "number",
              },
              tags: {
                schema: "SUPEROP_ALERT_RESOLVED",
                type: "array",
              },
            },
            hasWarning: false,
            hasConfigured: true,
            fieldsConfigured: true,
            connection: {
              id: iparams.freshserviceConnectionId,
              name: iparams.freshserviceConnectionName,
              status: "SUCCESS",
            },
            type: "app",
            hasMandatoryFields: false,
            showExtension: true,
            _updateTimestamp: 1777558826121,
            positionId: "3",
            AppName: "Freshservice",
            event: {
              id: "update_ticket",
              name: "Update Ticket",
              description: "Updates the properties of a specific ticket.",
              has_config_fields: true,
              has_custom_fields: false,
              batch: false,
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
        {
          id: "e2-3",
          type: "buttonedge",
          source: "2",
          target: "3",
        },
      ],
    };
  }

  // Trigger - webhook
  alertResolvedOnTicketUpdate(iparams) {
    return {
      appId: "freshservice-1.0.0",
      status: "ACTIVE",
      description: "Resolve superops alert",
      settings: {},
      templateId: 1,
      nodeData: [
        {
          id: "1",
          position: {
            x: 40,
            y: 40,
          },
          data: {
            appId: "catch-hooks-1.0.0",
            eventId: "catch-hook",
            hasWarning: false,
            hasConfigured: true,
            fieldsConfigured: true,
            eventData: {
              alert_id: "232",
            },
            type: "trigger",
            event: {
              id: "catch-hook",
              name: "Catch Hook",
              batch: false,
              description:
                "A universal webhook receiver that captures and returns all incoming data without modification",
              has_config_fields: false,
              has_custom_fields: false,
            },
            AppName: "Web Hooks",
            positionId: "1",
            showExtension: true,
            hasMandatoryFields: false,
            _updateTimestamp: 1777563918507,
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
            appId: iparams.superopsAppId,
            connectionId: iparams.superopsConnectionId,
            eventId: "resolve_alerts",
            FieldMapping: {
              alertIds: {
                schema: "{{1:alert_id}}",
                type: "string",
              },
            },
            hasWarning: false,
            hasConfigured: true,
            fieldsConfigured: true,
            connection: {
              id: iparams.superopsConnectionId,
              name: iparams.superopsConnectionName,
              status: "SUCCESS",
            },
            type: "app",
            hasMandatoryFields: false,
            showExtension: true,
            _updateTimestamp: 1777563920243,
            positionId: "2",
            AppName: iparams.superopsAppName,
            event: {
              id: "resolve_alerts",
              name: "Resolve Alerts",
              description:
                "Resolves a list of alerts by their IDs. Use this to close alerts after remediation.",
              has_config_fields: false,
              has_custom_fields: false,
              batch: false,
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
  }

  // Trigger - Alert Created
  buildSuperopsAlertCreatedDraft(iparams) {
    const severityPriorityMapping = iparams?.siteSeverityMapping?.severityPriorityMapping;
    const mapping = JSON.stringify(severityPriorityMapping);
    return {
      appId: "freshservice-1.0.0",
      status: "ACTIVE",
      description:
        "Create ticket in Freshservice for alert created by Superops",
      settings: {},
      nodeData: [
        {
          id: "1",
          position: {
            x: 40,
            y: 40,
          },
          type: "trigger",
          data: {
            type: "trigger",
            appId: iparams.superopsAppId,
            hasWarning: false,
            hasMandatoryFields: false,
            showExtension: false,
            positionId: "1",
            AppName: iparams.superopsAppName,
            eventId: "alert_created",
            event: {
              id: "alert_created",
              name: "Alert Created",
              description:
                "Fires in real-time when SuperOps raises a new alert against an asset.",
              has_config_fields: false,
              has_custom_fields: false,
              batch: false,
            },
            connectionId: iparams.superopsConnectionId,
            connection: {
              id: iparams.superopsConnectionId,
              name: iparams.superopsConnectionName,
              status: "SUCCESS",
            },
            hasConfigured: true,
            fieldsConfigured: true,
          },
        },
        {
          id: "2",
          position: {
            x: 40,
            y: 215,
          },
          type: "codeblock",
          data: {
            type: "codeblock",
            appId: "codeblock",
            hasWarning: false,
            hasMandatoryFields: true,
            showExtension: true,
            _updateTimestamp: 1778134016478,
            positionId: "2",
            code: `const mapping = ${mapping};\nconst findPriority = mapping.filter(s => s.superops_severity === input.severity);\nlet priority = null;\nif(findPriority.length){\n  priority = findPriority[0].freshservice_priority;\n}\nOutput = {\n  priority:priority\n}`,
            FieldMapping: {
              severity: {
                type: "string",
                schema: "{{1:data.severity}}",
              },
            },
            hasConfigured: true,
            fieldsConfigured: true,
            outputSchema: [
              {
                name: "priority",
                key: "priority",
                label: "priority",
                type: "number",
                optional: true,
                control_type: "text",
              },
            ],
          },
        },
        {
          id: "3",
          position: {
            x: 40,
            y: 390,
          },
          type: "app",
          data: {
            type: "app",
            appId: "freshservice-1.0.0",
            hasWarning: false,
            hasMandatoryFields: false,
            hasConfigured: true,
            fieldsConfigured: true,
            showExtension: true,
            _updateTimestamp: 1778134347424,
            positionId: "3",
            AppName: "Freshservice",
            eventId: "search_asset",
            event: {
              id: "search_asset",
              name: "Search Asset",
              description:
                "Search for assets using fields like name, asset tag, serial number, etc. Supports pagination to fetch all matching assets.",
              has_config_fields: false,
              has_custom_fields: false,
              batch: false,
            },
            connectionId: iparams.freshserviceConnectionId,
            connection: {
              id: iparams.freshserviceConnectionId,
              name: iparams.freshserviceConnectionName,
              status: "SUCCESS",
            },
            FieldMapping: {
              asset_tag: {
                schema: "{{1:data.assetId}}",
                type: "string",
              },
            },
          },
        },
        {
          id: "4",
          position: {
            x: 40,
            y: 565,
          },
          type: "app",
          data: {
            type: "app",
            appId: "freshservice-1.0.0",
            hasWarning: false,
            hasMandatoryFields: false,
            hasConfigured: true,
            fieldsConfigured: true,
            showExtension: true,
            _updateTimestamp: 1778134370420,
            positionId: "4",
            AppName: "Freshservice",
            eventId: "create_ticket",
            event: {
              id: "create_ticket",
              name: "Create Ticket",
              description:
                "Creates a new ticket with required and optional fields.",
              has_config_fields: true,
              has_custom_fields: false,
              batch: false,
            },
            connectionId: iparams.freshserviceConnectionId,
            connection: {
              id: iparams.freshserviceConnectionId,
              name: iparams.freshserviceConnectionName,
              status: "SUCCESS",
            },
            config_fields: {
              workspace_id: {
                schema: String(iparams.ticketForm?.workspace_id || 2),
                type: "number",
              },
            },
            FieldMapping: buildFieldMapping(iparams.formattedTicketForm),
          },
        },
        {
          id: "5",
          position: {
            x: 40,
            y: 740,
          },
          type: "app",
          data: {
            type: "app",
            appId: "freshservice-1.0.0",
            hasWarning: false,
            hasMandatoryFields: false,
            hasConfigured: true,
            fieldsConfigured: true,
            showExtension: true,
            _updateTimestamp: 1778134474752,
            positionId: "5",
            AppName: "Freshservice",
            eventId: "update_ticket",
            event: {
              id: "update_ticket",
              name: "Update Ticket",
              description: "Updates the properties of a specific ticket.",
              has_config_fields: true,
              has_custom_fields: false,
              batch: false,
            },
            connectionId: iparams.freshserviceConnectionId,
            connection: {
              id: iparams.freshserviceConnectionId,
              name: iparams.freshserviceConnectionName,
              status: "SUCCESS",
            },
            config_fields: {
              workspace_id: {
                schema: String(iparams.ticketForm?.workspace_id || 2),
                type: "number",
              },
            },
            FieldMapping: {
              ticket_id: {
                schema: "{{4:id}}",
                type: "string",
              },
              priority: {
                schema: "{{2:priority}}",
                type: "number",
              },
            },
          },
        },
      ],
      edgeData: [
        {
          id: "e1-2",
          type: "buttonedge",
          source: "1",
          target: "2",
        },
        {
          id: "e2-3",
          type: "buttonedge",
          source: "2",
          target: "3",
        },
        {
          id: "e3-4",
          type: "buttonedge",
          source: "3",
          target: "4",
        },
        {
          id: "e4-5",
          type: "buttonedge",
          source: "4",
          target: "5",
        },
      ],
    };
  }

}

exports.ConvertDraftToDynamicConnector = ConvertDraftToDynamicConnector;

