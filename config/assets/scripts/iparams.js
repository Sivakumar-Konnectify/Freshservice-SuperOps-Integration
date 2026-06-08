// document.addEventListener("DOMContentLoaded", async function () {
//   try {
//     const _client = await app.initialized();
//     window.client = _client;
//   } catch (error) {
//     console.log("app error", error);
//     toast.trigger({
//       type: "error",
//       content: "App initialization failed. Please try later",
//     });
//   }
// });

// // html elements
// let freshserviceDomainField = document.getElementById("fs-domain");
// let freshserviceApikeyField = document.getElementById("fs-apikey");
// const freshserviceApikeyHideIcon = document.getElementById("fs-apikey-icon");
// const freshserviceValidateButton = document.getElementById("fs-validate-btn");
// const toast = document.getElementById("toast-msg");
// const superopsTab = document.getElementById("superops-tab");
// const fieldMappingTab = document.getElementById("field-mapping-tab");
// const tab = document.getElementById("tabs");
// const superopsValidateButton = document.getElementById("superopsValidateBtn");
// const superopsDomainField = document.getElementById("superops-domain");
// const superopsApikeyHideIcon = document.getElementById("superops-apikey-hide-icon");
// const superopsApikeyField = document.getElementById("superops-apikey");
// const superopsAccountType = "it";
// const superopsRegionField = document.getElementById("superops-region");
// const sinceDateField = document.getElementById("since-date");
// const ticketFormTab = document.getElementById("ticket-form-tab");
// const workspaceSelect = document.getElementById("ticketFormWorkspaceSelect");

// // ─── Mapping button references (set after DOM is ready) ───────────────────────
// const addSiteMappingButton = document.getElementById("addSiteMappingBtn");
// const addSeverityMappingButton = document.getElementById("addSeverityMappingBtn");
// const saveSiteMappingButton = document.getElementById("saveSiteMappingButton");
// const saveSeverityMappingButton = document.getElementById("saveSeverityMappingButton");

// // event listeners
// superopsDomainField.addEventListener("fwInputKeyDown", () => {
//   clearInputError(superopsDomainField);
//   superopsValidateButton.innerText = "Validate";
//   superopsValidateButton.disabled = false;
//   validationChecklist.superops = false;
// });
// superopsDomainField.addEventListener("fwInputClear", () => {
//   clearInputError(superopsDomainField);
//   superopsValidateButton.innerText = "Validate";
//   superopsValidateButton.disabled = false;
//   validationChecklist.superops = false;
// });
// superopsApikeyField.addEventListener("fwInputKeyDown", () => {
//   clearInputError(superopsApikeyField);
//   superopsValidateButton.innerText = "Validate";
//   superopsValidateButton.disabled = false;
//   validationChecklist.superops = false;
// });
// superopsApikeyField.addEventListener("fwInputClear", () => {
//   clearInputError(superopsApikeyField);
//   superopsValidateButton.innerText = "Validate";
//   superopsValidateButton.disabled = false;
//   validationChecklist.superops = false;
// });
// superopsRegionField.addEventListener("fwChange", () => {
//   clearInputError(superopsRegionField);
//   superopsValidateButton.innerText = "Validate";
//   superopsValidateButton.disabled = false;
//   validationChecklist.superops = false;
// });
// freshserviceValidateButton.addEventListener("fwClick", validateFreshservice);
// freshserviceApikeyHideIcon.addEventListener("click", () =>
//   tooglePasswordVisiblity(freshserviceApikeyField, freshserviceApikeyHideIcon),
// );
// superopsApikeyHideIcon.addEventListener("click", () =>
//   tooglePasswordVisiblity(superopsApikeyField, superopsApikeyHideIcon),
// );
// superopsValidateButton.addEventListener("click", validateSuperops);
// freshserviceDomainField.addEventListener("fwInputKeyDown", () => {
//   freshserviceValidateButton.disabled = false;
//   freshserviceValidateButton.innerText = "Validate";
//   validationChecklist.freshservice = false;
// });
// freshserviceDomainField.addEventListener("fwInputClear", () => {
//   freshserviceValidateButton.disabled = false;
//   freshserviceValidateButton.innerText = "Validate";
//   validationChecklist.freshservice = false;
// });
// freshserviceApikeyField.addEventListener("fwInputKeyDown", () => {
//   freshserviceValidateButton.disabled = false;
//   freshserviceValidateButton.innerText = "Validate";
//   validationChecklist.freshservice = false;
// });
// freshserviceApikeyField.addEventListener("fwInputClear", () => {
//   freshserviceValidateButton.disabled = false;
//   freshserviceValidateButton.innerText = "Validate";
//   validationChecklist.freshservice = false;
// });

// workspaceSelect.addEventListener("fwChange", async (e) => {
//   console.log("event", e);
//   const newWorkspaceId = e.detail?.value || workspaceSelect.value;
//   console.log("new workspace id", newWorkspaceId);
//   if (!newWorkspaceId) return;
//   console.log("comparison", selectedWorkspaceId, newWorkspaceId);
//   if (
//     selectedWorkspaceId &&
//     String(selectedWorkspaceId) !== String(newWorkspaceId)
//   ) {
//     clearTicketFormFieldsDOM();
//     ticketForm = undefined;
//     formattedTicketForm = undefined;
//     validationChecklist.ticketForm = false;
//     if (saveFormButton) {
//       saveFormButton.disabled = false;
//       saveFormButton.textContent = "Save Form";
//     }
//   }
//   if (!selectedWorkspaceId || String(selectedWorkspaceId) !== String(newWorkspaceId)) {
//     selectedWorkspaceId = newWorkspaceId;
//     await loadTicketFieldsForWorkspace(newWorkspaceId);
//   }
// });

// // variable declaration
// const freshserviceAppId = "freshservice-1.0.0";
// const freshserviceAppName = "Freshservice";
// const superopsAppName = "Superops";
// const usDataCenter = "api";
// const euDataCenter = "euapi";
// const adminEmail = "sivakumar@konnectify.co";
// const adminPassword = "konnectify";
// const adminDomain = "skdemo";
// let fieldMappingResult = [];
// let freshserviceConnectionName = "";
// let superopsConnectionName = "";
// let isInEditConfig = "";
// // ── Split mapping state ────────────────────────────────────────────────────────
// let siteMapping;          // stores site-location mapping  (saved from asset mapping tab)
// let severityMapping;      // stores severity-priority mapping (saved from ticket form tab)
// // backward-compat alias used when reading/writing iparams (combined object)
// let siteSeverityMapping;
// // ─────────────────────────────────────────────────────────────────────────────
// let ticketForm;
// let formattedTicketForm;
// let selectedWorkspaceId = null;
// let validatedSuperopsDomain = "";
// let superopsDomainFromIparams = "";
// const fieldNameConversion = {
//   product: "product_id",
//   group: "group_id",
//   company: "company_id",
//   department: "department_id",
//   ticket_type: "type",
//   requester: "email",
//   agent: "responder_id"
// };
// const defaultFieldTypes = {
//   status: "number",
//   priority: "number",
//   group: "string",
//   department: "number",
//   workspace_id: "number",
// };

// // ── Validation checklist ───────────────────────────────────────────────────────
// // siteSeverityMapping split into siteMapping + severityMapping
// const validationChecklist = {
//   freshservice: false,
//   superops: false,
//   fieldMapping: false,
//   sinceDate: false,
//   siteMapping: true,       // was: siteSeverityMapping (site part) — now under asset mapping tab
//   severityMapping: true,   // was: siteSeverityMapping (severity part) — now under ticket form tab
//   ticketForm: false,
// };
// // ─────────────────────────────────────────────────────────────────────────────

// let user = {
//   name: "",
//   id: "",
//   admin_token: "",
//   tenant_token: "",
//   app1_connection_id: "",
//   app2_connection_id: "",
// };
// let autoTabSwitch = {
//   freshservice: false,
//   superops: false,
//   assetMapping: false,
//   siteSeverityMapping: false,
// };

// // asset mapping variables
// const PAGE_SIZE = 100;
// let SO_SUBDOMAIN = "";
// let SO_API_KEY = "";
// let FS_DOMAIN = "";
// let FS_API_KEY = "";
// let SO_HOST = "";
// let SO_PATH = "";
// let soClasses = [];
// let fsTypes = [];
// let fsFieldCache = {};
// let pairs = [];
// let nextId = 1;
// let delTarget = null;
// let bootDone = false;
// let fieldMappingEventsBound = false;

// // graphQL queries
// const GQL_ASSET_CLASSES = `
//   query getAssetClassListV3($listInfo: ListInfoInput!) {
//     getAssetClassListV3(listInfo: $listInfo) {
//       assetClass { classId name }
//       listInfo { totalCount page pageSize }
//     }
//   }`;

// const GQL_ASSET_FIELDS = `
//   query getAssetClassFieldsForIntegration($input: AssetClassIdentifierInput!) {
//     getAssetClassFieldsForIntegration(input: $input) {
//       fields { fieldKey fieldLabel isCustomField  }
//       keyFields
//     }
//   }`;

// // to prevent attaching multiple event listeners
// let isSiteMappingInitialized = false;
// let isSeverityMappingInitialized = false;

// const priority = [
//   { value: 1, text: "Low" },
//   { value: 2, text: "Medium" },
//   { value: 3, text: "High" },
//   { value: 4, text: "Urgent" },
// ];
// const severity = [
//   { value: "Low", text: "Low" },
//   { value: "Medium", text: "Medium" },
//   { value: "High", text: "High" },
//   { value: "Critical", text: "Critical" },
// ];
// let superopsSites = [];
// let fsLocations = [];
// let saveFormButton;
// let workspaceOptions = [];

// function mapType(type) {
//   switch (type) {
//     case "checkbox": return "boolean";
//     case "number": case "integer": case "decimal": return "number";
//     case "lookup": return "string";
//     case "Array": return "array";
//     case "custom_text": return "string";
//     case "custom_paragraph": return "string";
//     case "custom_dropdown":
//     case "custom_lookup_bigint":
//     case "custom_radio": return "string";
//     case "custom_multi_select_dropdown":
//     case "custom_multi_lookup": return "array";
//     case "custom_number":
//     case "custom_decimal": return "number";
//     case "custom_date": return "date";
//     case "custom_date_time": return "datetime";
//     case "custom_checkbox": return "boolean";
//     case "custom_email": return "string";
//     case "custom_url": return "string";
//     default: return "string";
//   }
// }

// // ═══════════════════════════════════════════════════════════════════════════════
// // HELPER FUNCTIONS
// // ═══════════════════════════════════════════════════════════════════════════════

// function tooglePasswordVisiblity(inputElement, icon) {
//   const input_type = inputElement.type;
//   if (input_type === "password") {
//     inputElement.type = "text";
//     icon.name = "visible";
//   } else {
//     inputElement.type = "password";
//     icon.name = "hidden";
//   }
// }

// function removeProtocol(url) {
//   const protocol = "https://";
//   if (url.includes(protocol)) {
//     return url.split(protocol)[1];
//   } else {
//     return url;
//   }
// }

// function showInputError(element, errorMsg = "") {
//   if (!element) return;
//   if (errorMsg) element.errorText = errorMsg;
//   element.state = "error";
// }

// function clearInputError(element) {
//   if (!element) return;
//   element.state = "normal";
// }

// function capitalizeFirstLetter(string) {
//   return string.charAt(0).toUpperCase() + string.slice(1);
// }

// // ═══════════════════════════════════════════════════════════════════════════════
// // AUTH / CONNECTION
// // ═══════════════════════════════════════════════════════════════════════════════

// async function registerNewTenant() {
//   try {
//     if (!user.admin_token) {
//       await getAdminAccessToken();
//     }
//     const response = await client.request.invoke("registerUser", {
//       adminDomain: adminDomain,
//       superopsDomain: superopsDomainField?.value,
//       token: user.admin_token,
//     });
//     if (!response.response?.id) {
//       console.log("Failed to create tenant");
//       throw new Error("Failed to validate Superops account");
//     }
//     user.id = response.response?.id;
//   } catch (error) {
//     console.error("Error registering user:", error);
//     throw error;
//   }
// }

// async function validateFreshservice() {
//   const domain = freshserviceDomainField?.value;
//   const apikey = freshserviceApikeyField?.value;
//   fsLocations = [];
//   if (resetSiteMapping) {
//     resetSiteMapping();
//   }
//   try {
//     freshserviceValidateButton.loading = true;
//     if (!domain) {
//       freshserviceDomainField.setFocus();
//       freshserviceValidateButton.loading = false;
//       toast.trigger({ type: "error", content: "Please enter your domain." });
//       return;
//     }
//     if (!apikey) {
//       freshserviceApikeyField.setFocus();
//       freshserviceValidateButton.loading = false;
//       toast.trigger({ type: "error", content: "Please enter your API Key." });
//       return;
//     }
//     const freshserviceDomain = removeProtocol(domain);
//     if (!domain || !apikey) return;

//     await client.request.invokeTemplate("getAllTickets", {
//       context: { host: freshserviceDomain, apikey: apikey },
//     });

//     superopsTab.disabled = false;
//     if (!autoTabSwitch.freshservice) {
//       tab.activeTabIndex = 1;
//       autoTabSwitch.freshservice = true;
//     }
//     toast.trigger({ type: "success", content: "Freshservice validated successfully" });
//     freshserviceValidateButton.innerText = "Validated";
//     freshserviceValidateButton.loading = false;
//     freshserviceValidateButton.disabled = true;

//     if (isInEditConfig) {
//       await createFreshserviceConnection();
//     }

//     // get all locations for site mapping
//     const locationsRes = await client.request.invokeTemplate("getLocations", {
//       context: { host: freshserviceDomain, apikey: apikey },
//     });
//     const locationsData = JSON.parse(locationsRes.response);
//     fsLocations = locationsData.locations.map((loc) => ({
//       value: loc.id,
//       text: loc.name,
//     }));

//     if (!isInEditConfig) {
//       await fetchAndRenderWorkspaces();
//     }
//   } catch (error) {
//     console.log("Error in Freshservice validation", error);
//     validationChecklist.freshservice = false;
//     if (error.status == 403) {
//       const parsedResponse = JSON.parse(error.response);
//       const message = parsedResponse.code + ": " + parsedResponse.message;
//       freshserviceValidateButton.loading = false;
//       if (message.startsWith("access")) {
//         toast.trigger({ type: "error", content: "Invalid domain or API key" });
//         return;
//       }
//       toast.trigger({ type: "error", content: message });
//     } else if (error.errors) {
//       freshserviceValidateButton.loading = false;
//       toast.trigger({ type: "error", content: "Domain must be in this format 'domain.freshservice.com'" });
//     } else {
//       const errorMsg = error?.message || "Invalid domain or API key";
//       freshserviceValidateButton.loading = false;
//       toast.trigger({ type: "error", content: errorMsg });
//     }
//   }
// }

// async function authConnection(options, app_connection, app_name) {
//   try {
//     const auth_connection = await client.request.invoke("authConnection", {
//       ...options,
//       app1_connection_id: user?.app1_connection_id || null,
//       app2_connection_id: user?.app2_connection_id || null,
//     });
//     const connectionId = auth_connection.response?.data?.id;
//     if (connectionId) {
//       if (options.isApp1) {
//         user[app_connection] = connectionId;
//         validationChecklist.freshservice = true;
//         freshserviceValidateButton.innerText = "Validated";
//         freshserviceValidateButton.disabled = true;
//         freshserviceValidateButton.loading = false;
//         superopsTab.disabled = false;
//       }
//       if (options.isApp2) {
//         user[app_connection] = connectionId;
//         validationChecklist.superops = true;
//         superopsValidateButton.loading = false;
//         superopsValidateButton.innerText = "Validated";
//         superopsValidateButton.disabled = true;
//         fieldMappingTab.disabled = false;
//         if (!autoTabSwitch.superops) {
//           tab.activeTabIndex = 2;
//           autoTabSwitch.superops = true;
//         }
//         boot();
//         toast.trigger({
//           type: "success",
//           content: `${capitalizeFirstLetter(app_name)} validated successfully`,
//         });
//       }
//     }
//     return true;
//   } catch (error) {
//     console.log("Error in connection authentication", error);
//     freshserviceValidateButton.loading = false;
//     toast.trigger({
//       type: "error",
//       content: `${capitalizeFirstLetter(app_name)} authentication failed`,
//     });
//   }
// }

// async function validateSuperops() {
//   try {
//     const domain = superopsDomainField.value;
//     const apikey = superopsApikeyField.value;
//     const region = superopsRegionField.value;
//     superopsValidateButton.loading = true;

//     if (!domain) {
//       superopsDomainField.focus();
//       superopsValidateButton.loading = false;
//       showInputError(superopsDomainField, "Please enter your Superops domain.");
//       toast.trigger({ type: "error", content: "Please enter your Superops domain." });
//       return;
//     }
//     if (!apikey) {
//       superopsApikeyField.setFocus();
//       superopsValidateButton.loading = false;
//       showInputError(superopsApikeyField, "Please enter your Superops API key.");
//       toast.trigger({ type: "error", content: "Please enter your Superops API key." });
//       return;
//     }
//     if (!region) {
//       superopsRegionField.focus();
//       superopsValidateButton.loading = false;
//       showInputError(superopsRegionField, "Please enter your data center region.");
//       toast.trigger({ type: "error", content: "Please enter your data center region." });
//       return;
//     }

//     const dataCenter = region.toLowerCase() === "us" ? usDataCenter : euDataCenter;
//     const body = {
//       query: "query getAssetClassListV3($listInfo: ListInfoInput!) {\n  getAssetClassListV3(listInfo: $listInfo) {   assetClass {   classId      name     moduleType      isNonMonitored       isSystemGenerated    }   listInfo {       totalCount        page        pageSize    }  }}",
//       variables: { listInfo: { pageSize: 100 } },
//     };

//     await client.request.invokeTemplate("getAssets", {
//       context: {
//         host: dataCenter + ".superops.ai",
//         path: "/" + superopsAccountType,
//         token: superopsApikeyField.value,
//         domain: superopsDomainField.value,
//       },
//       body: JSON.stringify(body),
//     });

//     initFieldMapping(
//       domain,
//       apikey,
//       freshserviceDomainField?.value,
//       freshserviceApikeyField?.value,
//       region,
//       superopsAccountType,
//     );

//     if (superopsDomainFromIparams !== domain && superopsDomainFromIparams.length) {
//       user.app1_connection_id = "";
//       user.app2_connection_id = "";
//     }

//     await createConnection();
//     superopsValidateButton.innerText = "Validated";
//     superopsValidateButton.disabled = true;
//     fieldMappingTab.disabled = false;

//     if (validatedSuperopsDomain && validatedSuperopsDomain !== domain) {
//       if (typeof resetBootState === "function") {
//         resetBootState();
//       }
//       if (resetSiteMapping) {
//         resetSiteMapping();
//       }
//       toast.trigger({
//         type: "info",
//         content: "SuperOps domain changed. Asset mapping and site mapping have been reset.",
//       });
//       tab.activeTabIndex = 2;
//       await boot();
//     }
//     validatedSuperopsDomain = domain;

//     // fetch sites for site mapping (in asset mapping tab)
//     const sites = await getAllSuperOpsSites(
//       dataCenter + ".superops.ai",
//       "/" + superopsAccountType,
//       superopsDomainField.value,
//       superopsApikeyField.value,
//     );
//     initSiteMappingWithData(sites);

//   } catch (error) {
//     console.log("Error in validating superops", error);
//     superopsValidateButton.loading = false;
//     validationChecklist.superops = false;
//     if (error.status == 403) {
//       const parsedResponse = JSON.parse(error.response);
//       const message = parsedResponse.code + ": " + parsedResponse.message;
//       superopsValidateButton.loading = false;
//       if (message.startsWith("access")) {
//         toast.trigger({ type: "error", content: "Invalid domain or API key" });
//         return;
//       }
//       toast.trigger({ type: "error", content: message });
//     } else if (error.errors) {
//       const message = error.errors[0].message;
//       superopsValidateButton.loading = false;
//       toast.trigger({ type: "error", content: message });
//     } else {
//       const errorMsg = error?.message || "Invalid credentials";
//       superopsValidateButton.loading = false;
//       toast.trigger({ type: "error", content: errorMsg });
//     }
//   }
// }

// async function getAdminAccessToken() {
//   try {
//     const tokenResponse = await client.request.invokeTemplate("getAdminAccessToken", {
//       context: { host: adminDomain },
//       body: JSON.stringify({ email: adminEmail, password: adminPassword }),
//     });
//     const adminAccessToken = JSON.parse(tokenResponse.response)?.accessToken;
//     if (adminAccessToken) {
//       user.admin_token = adminAccessToken;
//     }
//     return adminAccessToken;
//   } catch (error) {
//     console.log("Error in fetching admin token", error);
//     throw error;
//   }
// }

// function dataToPostConfig() {
//   // Build the combined siteSeverityMapping for backward compatibility
//   const combinedSiteSeverity = {
//     siteLocationMapping: siteMapping?.siteLocationMapping || [],
//     severityPriorityMapping: severityMapping?.severityPriorityMapping || [],
//   };

//   const data = {
//     domain: adminDomain,
//     freshserviceDomain: freshserviceDomainField?.value,
//     freshserviceApikey: freshserviceApikeyField?.value,
//     accessToken: user.admin_token,
//     tenantId: user.id,
//     isInEditConfig: isInEditConfig,
//     superopsDomain: superopsDomainField?.value,
//     superopsApikey: superopsApikeyField?.value,
//     freshserviceConnectionId: user.app1_connection_id,
//     superopsConnectionId: user.app2_connection_id,
//     FreshserviceConnectionName: freshserviceConnectionName,
//     superopsConnectionName: superopsConnectionName,
//     superopsRegion: superopsRegionField?.value,
//     superopsAccountType: superopsAccountType,
//     assetMappingData: typeof fieldMappingResult !== "undefined" ? fieldMappingResult : [],
//     tenantToken: user.tenant_token,
//     sinceDate: sinceDateField?.value,
//     siteSeverityMapping: combinedSiteSeverity,
//     ticketForm: ticketForm,
//     formattedTicketForm: formattedTicketForm,
//     adminEmail: adminEmail,
//     adminPassword: adminPassword,
//   };
//   return data;
// }

// async function autoLoginAndValidation(iparams) {
//   try {
//     autoTabSwitch = {
//       freshservice: true,
//       superops: true,
//       assetMapping: true,
//       siteSeverityMapping: true,
//     };
//     validatedSuperopsDomain = iparams?.superopsDomain;
//     const isLoginSuccessful = true;
//     const selectedSinceDate = iparams.sinceDate;

//     if (isLoginSuccessful) {
//       freshserviceValidateButton.loading = true;
//       user.app1_connection_id = iparams?.freshserviceConnectionId;
//       freshserviceDomainField.disabled = true;

//       toast.trigger({ type: "success", content: `${capitalizeFirstLetter(freshserviceAppName)} validated successfully` });
//       validationChecklist.freshservice = true;
//       freshserviceValidateButton.loading = false;
//       freshserviceValidateButton.innerText = "Validated";
//       freshserviceValidateButton.disabled = true;
//       superopsTab.disabled = false;
//       tab.activeTabIndex = 1;

//       await superopsRegionField.setSelectedValues(iparams.superopsRegion);
//       user.app2_connection_id = iparams?.superopsConnectionId;
//       toast.trigger({ type: "success", content: `${capitalizeFirstLetter(superopsAppName)} validated successfully` });
//       validationChecklist.superops = true;
//       superopsValidateButton.loading = false;
//       superopsValidateButton.innerText = "Validated";
//       superopsValidateButton.disabled = true;
//       freshserviceConnectionName = iparams.freshserviceConnectionName;
//       superopsConnectionName = iparams.superopsConnectionName;
//       isUserLoggedinInEditConfig = true;
//       isInEditConfig = true;
//       user.id = iparams.tenantId;
//       superopsDomainFromIparams = iparams.superopsDomain;

//       // field mapping pre filling values
//       initFieldMapping(
//         iparams.superopsDomain,
//         iparams.superopsApikey,
//         iparams.freshserviceDomain,
//         iparams.freshserviceApikey,
//         iparams.superopsRegion,
//         iparams.superopsAccountType,
//       );
//       bootDone = false;
//       fieldMappingTab.disabled = false;
//       tab.activeTabIndex = 2;
//       await boot(iparams.assetMapping);

//       const [day, month, year] = selectedSinceDate.split("-");
//       const isoDate = `${year}-${month}-${day}`;
//       const assetmappingButton = document.getElementById("validate-btn");
//       if (assetmappingButton) {
//         assetmappingButton.disabled = true;
//         assetmappingButton.textContent = "Saved Mappings";
//       }
//       sinceDateField.value = isoDate;
//       sinceDateField.setAttribute("value", isoDate);
//       validationChecklist.sinceDate = true;
//       validationChecklist.fieldMapping = true;

//       // fetch locations
//       const locationsRes = await client.request.invokeTemplate("getLocations", {
//         context: {
//           host: removeProtocol(iparams?.freshserviceDomain),
//           apikey: iparams?.freshserviceApikey,
//         },
//       });
//       const locationsData = JSON.parse(locationsRes.response);
//       fsLocations = locationsData.locations.map((loc) => ({
//         value: loc.id,
//         text: loc.name,
//       }));

//       // fetch sites
//       const superopsDomain = iparams.superopsRegion === "us" ? "api" : "euapi";
//       const url = superopsDomain + ".superops.ai";
//       const sites = await getAllSuperOpsSites(
//         url,
//         "/" + iparams.superopsAccountType,
//         iparams.superopsDomain,
//         iparams.superopsApikey,
//       );

//       // init severity mapping (static — always ready)
//       initSeverityMapping();
//       // init site mapping with fetched sites
//       initSiteMappingWithData(sites);

//       // pre-populate site & severity from saved iparams
//       populateMappings(iparams.siteSeverityMapping);

//       // mark site mapping saved
//       if (saveSiteMappingButton) {
//         saveSiteMappingButton.disabled = true;
//         saveSiteMappingButton.textContent = "Saved Site Mappings";
//       }
//       validationChecklist.siteMapping = true;
//       siteMapping = { siteLocationMapping: iparams.siteSeverityMapping?.siteLocationMapping || [] };

//       // mark severity mapping saved
//       if (saveSeverityMappingButton) {
//         saveSeverityMappingButton.disabled = true;
//         saveSeverityMappingButton.textContent = "Saved Severity Mappings";
//       }
//       validationChecklist.severityMapping = true;
//       severityMapping = { severityPriorityMapping: iparams.siteSeverityMapping?.severityPriorityMapping || [] };

//       toast.trigger({ type: "success", content: "Asset mapping saved successfully" });
//       toast.trigger({ type: "success", content: "Mapping saved successfully" });

//       ticketFormTab.disabled = false;
//       showTicketFormLoader("Setting up ticket form…");

//       await fetchAndRenderWorkspaces();

//       if (iparams.ticketForm?.workspace_id) {
//         selectedWorkspaceId = String(iparams.ticketForm.workspace_id);
//         console.log("ws select element", workspaceSelect, "selected workspace id", selectedWorkspaceId);
//         if (workspaceSelect?.options?.length) {
//           workspaceSelect.value = selectedWorkspaceId;
//           console.log("test-0", workspaceSelect.value);
//         }
//         await loadTicketFieldsForWorkspace(selectedWorkspaceId);
//       }
//       console.log("test-1", workspaceSelect.value);
//       await populateTicketForm(iparams.ticketForm);
//       console.log("test-2", workspaceSelect.value);
//       hideTicketFormLoader();
//       tab.activeTabIndex = 3;
//       toast.trigger({ type: "success", content: "Form saved successfully" });
//       validationChecklist.ticketForm = true;

//       // keep combined alias in sync
//       siteSeverityMapping = iparams.siteSeverityMapping;
//       fieldMappingResult = iparams.assetMapping;
//       formattedTicketForm = iparams.formattedTicketForm;
//       ticketForm = iparams.ticketForm;

//     } else {
//       validationChecklist.login = false;
//     }
//   } catch (error) {
//     console.log("Error in pre populating the value", error);
//     toast.trigger({ type: "error", content: "Failed to pre fill values" });
//   }
// }

// async function getTenantToken() {
//   try {
//     if (!user.id) {
//       console.log("Tenant ID not found", user);
//       toast.trigger({ type: "error", content: "Tenant ID not found" });
//       return;
//     }
//     const getToken = await client.request.invokeTemplate("getTenantToken", {
//       context: { host: adminDomain, tenantId: user.id, token: user.admin_token },
//     });
//     const token = JSON.parse(getToken.response)?.token;
//     user.tenant_token = token;
//     return token;
//   } catch (error) {
//     console.log("Error in fetching tenant token", error);
//     throw error;
//   }
// }

// async function validate() {
//   try {
//     const isSuperopsDomainChanged =
//       superopsDomainFromIparams.length &&
//       superopsDomainFromIparams !== superopsDomainField.value;

//     if (!validationChecklist.freshservice) {
//       toast.trigger({ type: "error", content: "Please complete Freshservice validation" });
//       tab.activeTabIndex = 0;
//       return false;
//     }
//     if (!validationChecklist.superops) {
//       toast.trigger({ type: "error", content: "Please complete Superops validation" });
//       tab.activeTabIndex = 1;
//       return false;
//     }
//     if (!sinceDateField.value) {
//       toast.trigger({ type: "error", content: "Please fill the since date in asset mapping tab" });
//       tab.activeTabIndex = 2;
//       return false;
//     }
//     // site mapping now lives in asset mapping tab (tab index 2)
//     if (!validationChecklist.siteMapping) {
//       toast.trigger({ type: "error", content: "Please save the site mapping in the Asset Mapping tab" });
//       tab.activeTabIndex = 2;
//       return false;
//     }
//     if (!validationChecklist.fieldMapping) {
//       toast.trigger({ type: "error", content: "Please complete asset mapping" });
//       tab.activeTabIndex = 2;
//       return false;
//     }
//     // severity mapping now lives in ticket form tab (tab index 3)
//     if (!validationChecklist.severityMapping) {
//       toast.trigger({ type: "error", content: "Please save the severity mapping in the Ticket Form tab" });
//       tab.activeTabIndex = 3;
//       return false;
//     }
//     if (!validationChecklist.ticketForm) {
//       toast.trigger({ type: "error", content: "Please fill the ticket form" });
//       tab.activeTabIndex = 3;
//       return false;
//     }

//     await getAdminAccessToken();
//     await getTenantToken();

//     // build combined siteSeverityMapping for the server
//     const combinedSiteSeverity = {
//       siteLocationMapping: siteMapping?.siteLocationMapping || [],
//       severityPriorityMapping: severityMapping?.severityPriorityMapping || [],
//     };

//     if (isInEditConfig && !isSuperopsDomainChanged) {
//       await client.request.invoke("updateKonnector", {
//         isInstallationPhase: isInEditConfig,
//         tenantId: user.id || "",
//         accessToken: user.admin_token || "",
//         soDomain: adminDomain,
//         since: sinceDateField?.value,
//         assetMapping: typeof fieldMappingResult !== "undefined" ? fieldMappingResult : [],
//         freshserviceAppName: "Freshservice",
//         freshserviceAppId: "freshservice-1.0.0",
//         superopsAppId: "superopsit-1.0.0",
//         superopsAppName: "SuperOps IT",
//         freshserviceConnectionName: freshserviceConnectionName,
//         freshserviceConnectionId: user.app1_connection_id,
//         superopsConnectionId: user.app2_connection_id,
//         superopsConnectionName: superopsConnectionName,
//         siteSeverityMapping: combinedSiteSeverity,
//         ticketForm: ticketForm,
//         formattedTicketForm: formattedTicketForm,
//       });
//       return true;
//     }

//     console.log(`Superops domain changed from ${superopsDomainFromIparams} to ${superopsDomainField.value}`);
//     if (isInEditConfig && isSuperopsDomainChanged) {
//       await client.request.invoke("updateKonnector", {
//         isSuperopsDomainChanged: isSuperopsDomainChanged,
//         tenantId: user.id || "",
//         accessToken: user.admin_token || "",
//         adminDomain: adminDomain,
//         tenantToken: user.tenant_token,
//         assetMapping: typeof fieldMappingResult !== "undefined" ? fieldMappingResult : [],
//         freshserviceAppId: "freshservice-1.0.0",
//         freshserviceAppName: "Freshservice",
//         freshserviceConnectionId: user.app1_connection_id,
//         superopsAppId: "superopsit-1.0.0",
//         superopsAppName: "SuperOps IT",
//         superopsConnectionId: user.app2_connection_id,
//         superopsAccountType: "it",
//         freshserviceConnectionName: freshserviceConnectionName,
//         superopsConnectionName: superopsConnectionName,
//         siteSeverityMapping: combinedSiteSeverity,
//         since: sinceDateField?.value,
//         isInEditConfig: true,
//         ticketForm: ticketForm,
//         formattedTicketForm: formattedTicketForm,
//         adminEmail: adminEmail,
//         adminPassword: adminPassword,
//       });
//     }
//     return true;
//   } catch (error) {
//     console.log("Error in validate function", error);
//   }
// }

// async function createConnection() {
//   try {
//     const now = new Date();
//     const isoString = now.toISOString();
//     const dataCenter = superopsRegionField.value.toLowerCase() === "us" ? usDataCenter : euDataCenter;
//     const superopsAppName = "SuperOps IT";
//     let freshserviceDomain = freshserviceDomainField?.value;
//     let superopsDomain = superopsDomainField?.value;

//     await getAdminAccessToken();
//     await registerNewTenant();
//     await getTenantToken();

//     freshserviceDomain = freshserviceDomain.replace(/^https?:\/\//, "");
//     freshserviceDomain = freshserviceDomain.replace(/\.freshservice\.com$/, "");
//     freshserviceDomain = freshserviceDomain.trim();

//     const freshserviceOptions = {
//       name: `Freshservice Connection - ${isoString}`,
//       subDomain: adminDomain,
//       appId: freshserviceAppId,
//       token: user.tenant_token,
//       data: { domain: freshserviceDomain, api_key: freshserviceApikeyField?.value },
//       isApp1: true,
//     };
//     freshserviceConnectionName = `Freshservice Connection - ${isoString}`;
//     await authConnection(freshserviceOptions, "app1_connection_id", freshserviceAppName);

//     superopsDomain = superopsDomain.replace(/^https?:\/\//, "");
//     superopsDomain = superopsDomain.replace(/\.superops\.ai$/, "");
//     superopsDomain = superopsDomain.trim();

//     const superopsOptions = {
//       name: `Superops Connection - ${isoString}`,
//       subDomain: adminDomain,
//       appId: "superopsit-1.0.0",
//       token: user.tenant_token,
//       data: {
//         domain: superopsDomain,
//         base_url: "https://" + dataCenter + ".superops.ai/" + superopsAccountType,
//         api_key: superopsApikeyField?.value,
//       },
//       isApp2: true,
//     };
//     superopsConnectionName = `Superops Connection - ${isoString}`;
//     await authConnection(superopsOptions, "app2_connection_id", superopsAppName);
//   } catch (error) {
//     console.log("Error in create connection", error);
//     superopsValidateButton.loading = false;
//     throw error;
//   }
// }

// // ═══════════════════════════════════════════════════════════════════════════════
// // POPULATE MAPPINGS (pre-fill on edit)
// // populateMappings now only writes to the DOM; it does NOT set saved-state flags.
// // The caller (autoLoginAndValidation) handles those.
// // ═══════════════════════════════════════════════════════════════════════════════
// function populateMappings(data) {
//   if (!data) return;

//   // SITE → LOCATION (in asset mapping tab)
//   const siteContainer = document.getElementById("siteMappingContainer");
//   if (siteContainer) {
//     siteContainer.innerHTML = "";
//     data.siteLocationMapping?.forEach((item) => {
//       const row = createMappingRow("so-site", "fs-location");
//       siteContainer.appendChild(row);
//       const siteDropdown = row.querySelector(".so-site");
//       const locationDropdown = row.querySelector(".fs-location");
//       siteDropdown.options = superopsSites;
//       locationDropdown.options = fsLocations;
//       siteDropdown.value = item.superops_site;
//       locationDropdown.value = item.freshservice_location;
//     });
//   }

//   // SEVERITY → PRIORITY (in ticket form tab)
//   const severityContainer = document.getElementById("severityMappingContainer");
//   if (severityContainer) {
//     severityContainer.innerHTML = "";
//     data.severityPriorityMapping?.forEach((item) => {
//       const row = createMappingRow("so-severity", "fs-priority");
//       severityContainer.appendChild(row);
//       const severityDropdown = row.querySelector(".so-severity");
//       const priorityDropdown = row.querySelector(".fs-priority");
//       severityDropdown.options = severity;
//       priorityDropdown.options = priority;
//       severityDropdown.value = item.superops_severity;
//       priorityDropdown.value = item.freshservice_priority;
//     });
//   }
// }

// function createMappingRow(leftClass, rightClass) {
//   const row = document.createElement("div");
//   row.className = "mapping-row";
//   row.innerHTML = `
//     <fw-select class="${leftClass}"></fw-select>
//     <span class="arrow-icon">→</span>
//     <fw-select class="${rightClass}"></fw-select>
//     <fw-button class="delete-btn" color="text">
//         <fw-icon name="delete" size="18"></fw-icon>
//     </fw-button>
//   `;
//   return row;
// }

// // ═══════════════════════════════════════════════════════════════════════════════
// // TICKET FORM — POPULATE
// // ═══════════════════════════════════════════════════════════════════════════════
// async function populateTicketForm(data) {
//   if (!data) return;
//   const container = document.getElementById("ticketFormContainer");

//   container.querySelectorAll("fw-input[data-fieldname]").forEach((el) => {
//     const key = el.getAttribute("data-fieldname");
//     if (data[key] !== undefined) el.value = data[key];
//   });
//   container.querySelectorAll("fw-textarea[data-fieldname]").forEach((el) => {
//     const key = el.getAttribute("data-fieldname");
//     if (data[key] !== undefined) el.value = data[key];
//   });
//   container.querySelectorAll("fw-datepicker[data-fieldname]").forEach((el) => {
//     const key = el.getAttribute("data-fieldname");
//     if (data[key] !== undefined) el.value = data[key];
//   });
//   container.querySelectorAll("input[type='checkbox'][data-fieldname]").forEach((el) => {
//     const key = el.getAttribute("data-fieldname");
//     if (data[key] !== undefined) el.checked = !!data[key];
//   });

//   await populateSelectFields(container, data);
//   await populateAsyncFields(container, data);

//   if (saveFormButton) {
//     saveFormButton.disabled = true;
//     saveFormButton.textContent = "Saved Form";
//   }
//   validationChecklist.ticketForm = true;
// }

// async function populateSelectFields(container, data) {
//   const wrappers = container.querySelectorAll("[data-fieldname]");
//   for (const wrapper of wrappers) {
//     const fieldMeta = wrapper.__fieldMeta;
//     if (!fieldMeta || !fieldMeta.choices) continue;
//     await populateNestedDropdown(wrapper, fieldMeta, data);
//   }
// }

// async function populateNestedDropdown(container, field, data) {
//   let currentChoices = field.choices;
//   let level = 1;
//   while (true) {
//     const fieldName = level === 1 ? field.name : field.nested_fields?.[level - 2]?.name;
//     if (!fieldName) break;
//     const value = data[fieldName];
//     if (!value) break;
//     let select;
//     if (level === 1) {
//       select = container.querySelector("fw-select");
//     } else {
//       select = container.querySelector(`fw-select[data-level="${level}"]`);
//     }
//     if (!select) break;
//     select.options = mapOptions(currentChoices);
//     select.value = value;
//     const selected = currentChoices.find((c) => c.id == value);
//     if (!selected || !selected.nested_options) break;
//     const nextField = field.nested_fields?.[level - 1];
//     if (!nextField) break;
//     const wrapper = document.createElement("div");
//     wrapper.classList.add("nested-select-wrapper");
//     const nextSelect = document.createElement("fw-select");
//     nextSelect.setAttribute("label", nextField.label);
//     nextSelect.setAttribute("name", nextField.name);
//     nextSelect.setAttribute("data-level", level + 1);
//     nextSelect.setAttribute("data-fieldname", nextField.name);
//     nextSelect.options = mapOptions(selected.nested_options);
//     wrapper.appendChild(nextSelect);
//     container.appendChild(wrapper);
//     currentChoices = selected.nested_options;
//     level++;
//     await customElements.whenDefined("fw-select");
//     await new Promise((r) => requestAnimationFrame(r));
//   }
// }

// async function populateAsyncFields(container, data) {
//   const inputs = container.querySelectorAll("input.async-search-input[data-fieldname]");
//   for (const input of inputs) {
//     const key = input.getAttribute("data-fieldname");
//     const value = data[key];
//     if (!value) continue;
//     input.dataset.value = value;
//     let displayName = value;
//     if (key === "requester") {
//       const requester = await getRequesterById(value);
//       if (requester) {
//         displayName =
//           requester.name ||
//           `${requester.first_name || ""} ${requester.last_name || ""}`.trim() ||
//           requester.primary_email;
//       }
//     }
//     if (key === "agent") {
//       const agent = await getAgentById(value);
//       if (agent) {
//         displayName =
//           agent.name ||
//           `${agent.first_name || ""} ${agent.last_name || ""}`.trim() ||
//           agent.email;
//       }
//     }
//     input.value = displayName;
//   }
// }

// async function getRequesterById(id) {
//   try {
//     const fsDomain = removeProtocol(freshserviceDomainField?.value);
//     const fsApikey = freshserviceApikeyField?.value;
//     const getRequesterById = await client.request.invokeTemplate("getRequesterById", {
//       context: { host: fsDomain, apikey: fsApikey, requesterId: id },
//     });
//     const data = JSON.parse(getRequesterById.response);
//     return data.requester;
//   } catch (err) {
//     console.log("Error in fetching requester by ID", err);
//     return null;
//   }
// }

// async function getAgentById(id) {
//   try {
//     const fsDomain = removeProtocol(freshserviceDomainField?.value);
//     const fsApikey = freshserviceApikeyField?.value;
//     const getAgentById = await client.request.invokeTemplate("getAgentById", {
//       context: { host: fsDomain, apikey: fsApikey, agentId: id },
//     });
//     const data = JSON.parse(getAgentById.response);
//     return data.agent;
//   } catch (err) {
//     console.log("Error in fetching agent by ID", err);
//     return null;
//   }
// }

// // ═══════════════════════════════════════════════════════════════════════════════
// // SUPEROPS SITES
// // ═══════════════════════════════════════════════════════════════════════════════
// async function getAllSuperOpsSites(host, path, domain, token) {
//   const query = `
//     query getSiteList($input: ListInfoInput!) {
//       getSiteList(input: $input) {
//         sites { id name }
//         listInfo { page pageSize hasMore }
//       }
//     }`;
//   let page = 1;
//   const pageSize = 100;
//   let hasMore = true;
//   let allSites = [];
//   try {
//     while (hasMore) {
//       const variables = { input: { page, pageSize } };
//       const response = await client.request.invokeTemplate("getAllSiteFromSuperops", {
//         body: JSON.stringify({ query, variables }),
//         context: { host, path, domain, token },
//       });
//       const data = JSON.parse(response.response);
//       const result = data?.data?.getSiteList;
//       const sites = result?.sites || [];
//       allSites = allSites.concat(sites);
//       hasMore = result?.listInfo?.hasMore === true;
//       page++;
//     }
//     return allSites.map((site) => ({ value: site.id, text: site.name }));
//   } catch (error) {
//     console.error("Error fetching all sites:", error);
//     throw error;
//   }
// }

// async function createFreshserviceConnection() {
//   try {
//     const now = new Date();
//     const isoString = now.toISOString();
//     let freshserviceDomain = freshserviceDomainField?.value;
//     await getAdminAccessToken();
//     await getTenantToken();
//     freshserviceDomain = freshserviceDomain.replace(/^https?:\/\//, "");
//     freshserviceDomain = freshserviceDomain.replace(/\.freshservice\.com$/, "");
//     freshserviceDomain = freshserviceDomain.trim();
//     const freshserviceOptions = {
//       name: `Freshservice Connection - ${isoString}`,
//       subDomain: adminDomain,
//       appId: freshserviceAppId,
//       token: user.tenant_token,
//       data: { domain: freshserviceDomain, api_key: freshserviceApikeyField?.value },
//       isApp1: true,
//     };
//     freshserviceConnectionName = `Freshservice Connection - ${isoString}`;
//     const auth_connection = await client.request.invoke("authConnection", {
//       ...freshserviceOptions,
//       app1_connection_id: user?.app1_connection_id || null,
//     });
//     const connectionId = auth_connection.response?.data?.id;
//     if (connectionId) {
//       user.app1_connection_id = connectionId;
//       validationChecklist.freshservice = true;
//       freshserviceValidateButton.innerText = "Validated";
//       freshserviceValidateButton.disabled = true;
//       freshserviceValidateButton.loading = false;
//     }
//   } catch (error) {
//     console.log("Error in creating freshservice connection", error);
//   }
// }

// // ═══════════════════════════════════════════════════════════════════════════════
// // ASSET MAPPING
// // ═══════════════════════════════════════════════════════════════════════════════
// async function fetchAssetClassPage(apiKey, page) {
//   const res = await client.request.invokeTemplate("getAssets", {
//     context: { host: SO_HOST, domain: SO_SUBDOMAIN, token: `${apiKey}`, path: SO_PATH },
//     body: JSON.stringify({
//       query: GQL_ASSET_CLASSES,
//       variables: { listInfo: { page, pageSize: PAGE_SIZE } },
//     }),
//   });
//   const data = JSON.parse(res.response)?.data?.getAssetClassListV3;
//   if (!data || !data.assetClass?.length) {
//     return { assetClass: [], listInfo: { totalCount: 0, page, pageSize: PAGE_SIZE } };
//   }
//   return data;
// }

// async function apiGetAssetClasses(apiKey) {
//   const first = await fetchAssetClassPage(apiKey, 1);
//   const { totalCount, pageSize } = first.listInfo;
//   let allAssetClass = [...first.assetClass];
//   const totalPages = Math.ceil(totalCount / pageSize);
//   if (totalPages > 1) {
//     const rest = Array.from({ length: totalPages - 1 }, (_, i) => i + 2);
//     const results = await Promise.all(rest.map((page) => fetchAssetClassPage(apiKey, page)));
//     results.forEach((r) => allAssetClass.push(...r.assetClass));
//   }
//   return allAssetClass.map((asset) => ({ id: String(asset.classId), name: asset.name }));
// }

// async function apiGetAssetFields(apiKey, classID) {
//   const res = await client.request.invokeTemplate("getAssets", {
//     context: { host: SO_HOST, domain: SO_SUBDOMAIN, token: `${apiKey}`, path: SO_PATH },
//     body: JSON.stringify({
//       query: GQL_ASSET_FIELDS,
//       variables: { input: { classId: classID } },
//     }),
//   });
//   const json = JSON.parse(res.response);
//   const result = json.data.getAssetClassFieldsForIntegration;
//   if (!result) return [];
//   const { fields, keyFields = [] } = result;
//   return fields.map((field) => ({
//     id: field.fieldKey,
//     name: field.fieldLabel,
//     type: field.isCustomField ? "custom" : "standard",
//     isKeyField: keyFields.includes(field.fieldKey),
//   }));
// }

// function showLoader(container, id, msg) {
//   if (!container) return;
//   let loader = document.getElementById(id);
//   if (!loader) {
//     loader = document.createElement("div");
//     loader.id = id;
//     loader.className = "tab-loader";
//     loader.innerHTML = `
//       <div class="tab-loader__spinner"></div>
//       <span class="tab-loader__msg" id="${id}-msg">${esc(msg)}</span>`;
//     container.classList.add("tab-loader-host");
//     container.appendChild(loader);
//   } else {
//     document.getElementById(`${id}-msg`).textContent = msg;
//     loader.classList.remove("tab-loader--hidden");
//   }
// }

// function hideLoader(id) {
//   const loader = document.getElementById(id);
//   if (loader) loader.classList.add("tab-loader--hidden");
// }

// function showTabLoader(msg = "Loading asset classes…") {
//   showLoader(
//     document.querySelector('fw-tab-panel[name="fieldMapping"] .tab-area'),
//     "fm-tab-loader",
//     msg
//   );
// }
// function hideTabLoader() { hideLoader("fm-tab-loader"); }

// function showTicketFormLoader(msg = "Loading ticket form…") {
//   showLoader(
//     document.querySelector('fw-tab-panel[name="ticketForm"]'),
//     "tf-tab-loader",
//     msg
//   );
// }
// function hideTicketFormLoader() { hideLoader("tf-tab-loader"); }

// async function boot(existingMappings = []) {
//   if (bootDone) return;
//   showTabLoader("Loading…");
//   try {
//     const [soResult, fsResult] = await Promise.all([
//       apiGetAssetClasses(SO_API_KEY),
//       apiGetFsAssetTypes(),
//     ]);
//     soClasses = soResult;
//     fsTypes = fsResult;
//     bootDone = true;
//     if (existingMappings.length) {
//       await prefillPairs(existingMappings);
//     }
//   } catch (error) {
//     console.error("Boot failed:", error);
//     const errEl = document.getElementById("empty-state");
//     if (errEl) {
//       errEl.innerHTML = `
//         <div style="font-size:22px;opacity:.4">⚠</div>
//         <div style="font-size:14px;font-weight:600;color:#b91c1c">Failed to load data</div>
//         <div style="font-size:12px;color:#9ca3af;margin-bottom:4px">${esc(error.message)}</div>
//         <fw-button color="primary" size="small" onclick="bootDone=false;boot()">Retry</fw-button>`;
//     }
//   } finally {
//     hideTabLoader();
//     renderAll();
//   }
// }

// function initFieldMapping(subdomain, apiKey, fsDomain, fsApikey, region) {
//   SO_SUBDOMAIN = subdomain;
//   SO_API_KEY = apiKey;
//   FS_DOMAIN = fsDomain;
//   FS_API_KEY = fsApikey;
//   SO_HOST = (region === "us" ? "api" : "euapi") + ".superops.ai";
//   SO_PATH = "/it";
//   if (fieldMappingEventsBound) return;
//   fieldMappingEventsBound = true;
//   const tabs = document.getElementById("tabs");
//   if (tabs) {
//     tabs.addEventListener("fwChange", (event) => {
//       if (event.detail?.tabIndex === 2) {
//         boot();
//       }
//     });
//   }
//   document.getElementById("add-btn").addEventListener("fwClick", addPair);
//   document.getElementById("validate-btn").addEventListener("fwClick", validateFieldMapping);
//   document.getElementById("del-cancel").addEventListener("fwClick", () => {
//     document.getElementById("del-modal").classList.remove("show");
//     delTarget = null;
//   });
//   document.getElementById("del-confirm").addEventListener("fwClick", () => {
//     if (delTarget !== null) {
//       pairs = pairs.filter((p) => p.id !== delTarget);
//       markFieldMappingDirty();
//       renderAll();
//     }
//     document.getElementById("del-modal").classList.remove("show");
//     delTarget = null;
//   });
// }

// function addPair() {
//   markFieldMappingDirty();
//   pairs.push({
//     id: nextId++,
//     soId: "", soName: "",
//     fsId: "", fsName: "",
//     soFields: [], fsFields: [],
//     mappings: {},
//     selOpen: true,
//     drOpen: false,
//     fieldsLoading: false,
//   });
//   renderAll();
//   setTimeout(() => {
//     document.getElementById(`pair-${pairs[pairs.length - 1].id}`)?.scrollIntoView({ behavior: "smooth", block: "nearest" });
//   }, 60);
// }

// function openDelModal(id) {
//   const selectedCard = pairs.find((x) => x.id === id);
//   delTarget = id;
//   document.getElementById("del-msg").textContent =
//     selectedCard?.soName && selectedCard?.fsName
//       ? `Remove mapping "${selectedCard.soName} → ${selectedCard.fsName}"?`
//       : "Remove this asset mapping?";
//   document.getElementById("del-modal").classList.add("show");
// }

// function toggleSel(id) {
//   const pair = pairs.find((x) => x.id === id);
//   if (!pair) return;
//   pair.selOpen = !pair.selOpen;
//   if (pair.selOpen) pair.drOpen = false;
//   renderPair(pair);
// }

// async function onSoClassChange(id) {
//   const selectedCard = pairs.find((pair) => pair.id === id);
//   if (!selectedCard) return;
//   const superopsDropdown = document.getElementById(`so-sel-${id}`);
//   const assetClassId = superopsDropdown?.value;
//   if (!assetClassId) return;
//   markFieldMappingDirty();
//   if (assetClassId === selectedCard.soId && selectedCard.soFields.length) return;
//   const freshserviceDropdown = document.getElementById(`fs-sel-${id}`);
//   const currentFsId = freshserviceDropdown?.value || selectedCard.fsId;
//   const currentFsName =
//     (freshserviceDropdown?.value &&
//       freshserviceDropdown.options[freshserviceDropdown.selectedIndex]?.text) ||
//     selectedCard.fsName;
//   if (assetClassId !== selectedCard.soId) {
//     selectedCard.mappings = {};
//     selectedCard.soFields = [];
//     selectedCard.drOpen = false;
//   }
//   selectedCard.soId = assetClassId;
//   selectedCard.soName = superopsDropdown.options[superopsDropdown.selectedIndex].text;
//   if (currentFsId) {
//     selectedCard.fsId = currentFsId;
//     selectedCard.fsName = currentFsName;
//   }
//   setSelLoading(id, true);
//   selectedCard.fieldsLoading = true;
//   try {
//     const fields = await apiGetAssetFields(SO_API_KEY, assetClassId);
//     selectedCard._pendingSoFields = fields;
//     selectedCard._pendingSoId = assetClassId;
//   } catch (error) {
//     console.log("Error in fetching superops asset fields", error);
//     selectedCard._pendingSoFields = [];
//     selectedCard._pendingSoId = assetClassId;
//     fmToast(`Failed to load fields: ${error.message}`, "error");
//   } finally {
//     selectedCard.fieldsLoading = false;
//     setSelLoading(id, false);
//     if (selectedCard.fsId) {
//       selectedCard.soFields = selectedCard._pendingSoFields ?? [];
//       delete selectedCard._pendingSoFields;
//       if (!selectedCard.fsFields.length) {
//         const cacheKey = String(selectedCard.fsId);
//         if (fsFieldCache[cacheKey]) {
//           selectedCard.fsFields = fsFieldCache[cacheKey];
//         } else {
//           try {
//             selectedCard.fsFields = await apiGetFsAssetFields(selectedCard.fsId);
//             fsFieldCache[cacheKey] = selectedCard.fsFields;
//           } catch (err) {
//             console.log("Error in fetching freshservice asset type fields", err);
//             fmToast(`Failed to load Freshservice fields`, "error");
//           }
//         }
//       }
//       selectedCard.selOpen = false;
//       selectedCard.drOpen = true;
//     }
//     renderAll();
//   }
// }

// function setSelLoading(id, loading) {
//   const superopsLabel = document.getElementById(`so-lbl-${id}`);
//   const spinner = document.getElementById(`so-spin-${id}`);
//   if (superopsLabel) superopsLabel.style.opacity = loading ? "0.5" : "1";
//   if (spinner) spinner.style.display = loading ? "inline-flex" : "none";
// }

// async function onFsTypeChange(id) {
//   const selectedCard = pairs.find((x) => x.id === id);
//   if (!selectedCard) return;
//   const superopsDropdown = document.getElementById(`so-sel-${id}`);
//   const freshserviceDropdown = document.getElementById(`fs-sel-${id}`);
//   if (!freshserviceDropdown?.value) return;
//   markFieldMappingDirty();
//   const newlySelectedFsAssetId = freshserviceDropdown.value;
//   const newlySelectedFsAssetName = freshserviceDropdown.options[freshserviceDropdown.selectedIndex].text;
//   const newlySelectedSoAssetId = superopsDropdown?.value || selectedCard.soId;
//   const newlySelectedSoAssetName =
//     (superopsDropdown?.value && superopsDropdown.options[superopsDropdown.selectedIndex]?.text) ||
//     selectedCard.soName;
//   const soChanged = String(newlySelectedSoAssetId) !== String(selectedCard.soId);
//   const fsChanged = String(newlySelectedFsAssetId) !== String(selectedCard.fsId);
//   if (soChanged || fsChanged) {
//     selectedCard.mappings = {};
//     selectedCard.drOpen = false;
//   }
//   if (fsChanged) selectedCard.fsFields = [];
//   selectedCard.soId = newlySelectedSoAssetId;
//   selectedCard.soName = newlySelectedSoAssetName;
//   selectedCard.fsId = newlySelectedFsAssetId;
//   selectedCard.fsName = newlySelectedFsAssetName;
//   selectedCard.soFields = selectedCard._pendingSoFields ?? selectedCard.soFields;
//   delete selectedCard._pendingSoFields;
//   if (!selectedCard.soId) { renderAll(); return; }
//   const cacheKey = String(selectedCard.fsId);
//   if (fsFieldCache[cacheKey]) {
//     selectedCard.fsFields = fsFieldCache[cacheKey];
//   } else {
//     try {
//       selectedCard.fsFields = await apiGetFsAssetFields(selectedCard.fsId);
//       fsFieldCache[cacheKey] = selectedCard.fsFields;
//     } catch (error) {
//       console.log("Error in fetching freshservice asset fields", error);
//       fmToast(`Failed to load Freshservice fields`, "error");
//       return;
//     }
//   }
//   selectedCard.selOpen = false;
//   selectedCard.drOpen = true;
//   renderAll();
// }

// function toggleDrawer(id) {
//   const selectedCard = pairs.find((x) => x.id === id);
//   if (!selectedCard || !selectedCard.soId) return;
//   selectedCard.drOpen = !selectedCard.drOpen;
//   if (selectedCard.drOpen) selectedCard.selOpen = false;
//   renderPair(selectedCard);
//   if (selectedCard.drOpen) {
//     buildRows(selectedCard);
//     setTimeout(() => {
//       document.getElementById(`pair-${id}`)?.scrollIntoView({ behavior: "smooth", block: "nearest" });
//     }, 80);
//   }
// }

// function buildRows(selectedPair) {
//   const fieldMappingContainer = document.getElementById(`rows-${selectedPair.id}`);
//   if (!fieldMappingContainer) return;
//   fieldMappingContainer.innerHTML = "";
//   const SoAssetFieldCount = document.getElementById(`tc-${selectedPair.id}`);
//   if (SoAssetFieldCount) SoAssetFieldCount.textContent = selectedPair.soFields.length;
//   if (!selectedPair.soFields.length) {
//     fieldMappingContainer.innerHTML = '<div style="padding:18px 14px;font-size:12px;color:#6b7280;">No fields found.</div>';
//     return;
//   }
//   if (!selectedPair.mappings["assetId"] && selectedPair.fsFields.find((ff) => ff.id === "asset_tag")) {
//     selectedPair.mappings["assetId"] = "asset_tag";
//   }
//   selectedPair.soFields.forEach((superopsField) => {
//     const isLocked = superopsField.id === "assetId";
//     const row = document.createElement("div");
//     row.className = "map-row" + (isLocked ? " map-row-locked" : "");
//     const soCell = document.createElement("div");
//     soCell.className = "cell-so";
//     soCell.innerHTML = `<div><div class="fn">${esc(superopsField.name)}</div></div>`;
//     const middleCell = document.createElement("div");
//     middleCell.className = "cell-mid";
//     middleCell.textContent = "→";
//     const fsCell = document.createElement("div");
//     fsCell.className = "cell-fs";
//     const fsSelectElement = document.createElement("select");
//     fsSelectElement.className = "fs-sel";
//     fsSelectElement.disabled = isLocked;
//     if (isLocked) fsSelectElement.style.cssText = "opacity:.65;cursor:not-allowed;background:#f9fafb;";
//     fsSelectElement.innerHTML = '<option value="">— Not mapped —</option>';
//     const sortByLabel = (a, b) => a.l.localeCompare(b.l);
//     const requiredFields = selectedPair.fsFields.filter((ff) => ff.required).sort(sortByLabel);
//     const optionalFields = selectedPair.fsFields.filter((ff) => !ff.required).sort(sortByLabel);
//     if (requiredFields.length) {
//       const reqGroup = document.createElement("optgroup");
//       reqGroup.label = "Required Fields";
//       requiredFields.forEach((ff) => {
//         const requiredOption = document.createElement("option");
//         requiredOption.value = ff.id;
//         requiredOption.textContent = `${ff.l} *`;
//         if (String(selectedPair.mappings[String(superopsField.id)]) === String(ff.id)) requiredOption.selected = true;
//         reqGroup.appendChild(requiredOption);
//       });
//       fsSelectElement.appendChild(reqGroup);
//     }
//     if (optionalFields.length) {
//       const optGroup = document.createElement("optgroup");
//       optGroup.label = "Optional Fields";
//       optionalFields.forEach((ff) => {
//         const optionalOption = document.createElement("option");
//         optionalOption.value = ff.id;
//         optionalOption.textContent = ff.l;
//         if (String(selectedPair.mappings[String(superopsField.id)]) === String(ff.id)) optionalOption.selected = true;
//         optGroup.appendChild(optionalOption);
//       });
//       fsSelectElement.appendChild(optGroup);
//     }
//     if (!isLocked) {
//       fsSelectElement.addEventListener("change", () => {
//         if (fsSelectElement.value) {
//           selectedPair.mappings[superopsField.id] = fsSelectElement.value;
//         } else {
//           delete selectedPair.mappings[superopsField.id];
//         }
//         markFieldMappingDirty();
//         refreshFoot(selectedPair);
//         refreshBadge(selectedPair);
//       });
//     }
//     if (isLocked) {
//       const lockBadge = document.createElement("span");
//       lockBadge.title = "This mapping is required and cannot be changed";
//       lockBadge.style.cssText = "margin-left:6px;font-size:11px;color:#9ca3af;flex-shrink:0;";
//       lockBadge.textContent = "🔒";
//       fsCell.style.display = "flex";
//       fsCell.style.alignItems = "center";
//       fsCell.appendChild(fsSelectElement);
//       fsCell.appendChild(lockBadge);
//     } else {
//       fsCell.appendChild(fsSelectElement);
//     }
//     row.append(soCell, middleCell, fsCell);
//     fieldMappingContainer.appendChild(row);
//   });
//   refreshFoot(selectedPair);
// }

// function refreshFoot(selectedPair) {
//   const mapped = Object.values(selectedPair.mappings).filter(Boolean).length;
//   const total = selectedPair.soFields.length;
//   const stat = document.getElementById(`stat-${selectedPair.id}`);
//   const btn = document.getElementById(`save-btn-${selectedPair.id}`);
//   if (stat) stat.innerHTML = `<strong>${mapped}</strong> of <strong>${total}</strong> mapped`;
//   if (btn) btn.disabled = mapped === 0;
// }

// function refreshBadge(selectedCard) {
//   const badge = document.getElementById(`badge-${selectedCard.id}`);
//   if (!badge) return;
//   const fieldMappingCount = Object.values(selectedCard.mappings).filter(Boolean).length;
//   badge.className = "sbadge " + bCls(selectedCard, fieldMappingCount);
//   badge.textContent = bTxt(selectedCard, fieldMappingCount);
// }

// function bCls(selectedCard, fieldMappingCount) {
//   if (!selectedCard.soId || !selectedCard.fsId) return "s-new";
//   if (fieldMappingCount > 0) return "s-mapped";
//   return "s-empty";
// }

// function bTxt(selectedCard, fieldMappingCount) {
//   if (!selectedCard.soId || !selectedCard.fsId) return "New";
//   if (fieldMappingCount > 0) return `${fieldMappingCount} mapped`;
//   return "Not mapped";
// }

// function usedSoIds(excludePairId) {
//   return new Set(pairs.filter((pair) => pair.id !== excludePairId && pair.soId).map((pair) => String(pair.soId)));
// }
// function usedFsIds(excludePairId) {
//   return new Set(pairs.filter((pair) => pair.id !== excludePairId && pair.fsId).map((pair) => String(pair.fsId)));
// }

// function validateFieldMapping() {
//   const errorListContainer = document.getElementById("verr-list");
//   errorListContainer.innerHTML = "";
//   errorListContainer.classList.remove("show");
//   const errors = [];
//   if (!pairs.length) {
//     errors.push("No asset mappings added.");
//   } else {
//     pairs.forEach((pair, index) => {
//       const n = index + 1;
//       if (!pair.soId || !pair.fsId) {
//         errors.push(`Mapping #${n}: Asset classes not selected.`);
//         return;
//       }
//       const mappedFsFieldIds = new Set(Object.values(pair.mappings).filter(Boolean));
//       const unmappedRequired = pair.fsFields.filter((ff) => ff.required && !mappedFsFieldIds.has(ff.id));
//       if (unmappedRequired.length > 0) {
//         const fieldNames = unmappedRequired.map((ff) => `"${ff.l}"`).join(", ");
//         errors.push(
//           `Mapping #${n} (${pair.soName} → ${pair.fsName}): ` +
//           `Required Freshservice field${unmappedRequired.length > 1 ? "s" : ""} not mapped: ${fieldNames}.`,
//         );
//       }
//     });
//   }
//   if (errors.length) {
//     errorListContainer.innerHTML = errors.map((err) =>
//       `<div class="verr-row"><span>⚠</span><span>${esc(err)}</span></div>`).join("");
//     errorListContainer.classList.add("show");
//     return;
//   }
//   const allMappings = pairs.map((pair) => ({
//     superops_asset_class: { id: pair.soId, name: pair.soName },
//     freshservice_asset_type: { id: pair.fsId, name: pair.fsName },
//     field_mappings: Object.entries(pair.mappings).map(([soFieldId, fsFieldId]) => {
//       const soField = pair.soFields.find((field) => field.id === soFieldId);
//       const fsField = pair.fsFields.find((field) => field.id === fsFieldId);
//       return {
//         superops_field: { id: soFieldId, name: soField?.name },
//         freshservice_field: { id: fsFieldId, name: fsField?.l },
//       };
//     }),
//   }));
//   fieldMappingResult = allMappings;
//   fmToast("Asset mapping saved successfully", "success");
//   validationChecklist.fieldMapping = true;

//   const validateBtn = document.getElementById("validate-btn");
//   if (validateBtn) {
//     validateBtn.disabled = true;
//     validateBtn.textContent = "Saved Mappings";
//   }

//   // if site mapping is also done, unlock ticket form tab
//   if (validationChecklist.siteMapping) {
//     ticketFormTab.disabled = false;
//     if (!autoTabSwitch.assetMapping) {
//       tab.activeTabIndex = 3;
//       autoTabSwitch.assetMapping = true;
//     }
//   }
// }

// function renderPair(pair) {
//   const list = document.getElementById("pair-list");
//   let card = document.getElementById(`pair-${pair.id}`);
//   if (!card) {
//     card = document.createElement("div");
//     card.className = "pair-card";
//     card.id = `pair-${pair.id}`;
//     list.appendChild(card);
//   }
//   const idx = pairs.findIndex((x) => x.id === pair.id) + 1;
//   const mappedFieldCount = Object.values(pair.mappings).filter(Boolean).length;
//   const usedSO = usedSoIds(pair.id);
//   const usedFS = usedFsIds(pair.id);
//   const soOptions = soClasses
//     .filter((c) => !usedSO.has(String(c.id)) || String(pair.soId) === String(c.id))
//     .sort((a, b) => a.name.localeCompare(b.name))
//     .map((c) => `<option value="${c.id}"${String(pair.soId) === String(c.id) ? " selected" : ""}>${esc(c.name)}</option>`)
//     .join("");
//   const fsOptions = fsTypes
//     .filter((t) => !usedFS.has(String(t.id)) || String(pair.fsId) === String(t.id))
//     .sort((a, b) => a.label.localeCompare(b.label))
//     .map((t) => `<option value="${t.id}"${String(pair.fsId) === String(t.id) ? " selected" : ""}>${esc(t.label)}</option>`)
//     .join("");

//   card.innerHTML = `
//     <div class="pair-head" data-pair-id="${pair.id}">
//       <div class="pnum">${idx}</div>
//       <div class="pair-tags">
//         ${pair.soName
//       ? `<span class="ptag ptag-so">${esc(pair.soName)}</span>
//              <span class="ptag-arr">→</span>
//              <span class="ptag ptag-fs">${esc(pair.fsName)}</span>`
//       : `<span class="ptag-ph">Select asset classes to get started…</span>`}
//       </div>
//       <span class="sbadge ${bCls(pair, mappedFieldCount)}" id="badge-${pair.id}">${esc(bTxt(pair, mappedFieldCount))}</span>
//       <div class="head-acts">
//         ${pair.soId && pair.fsId
//       ? `<fw-button size="small" color="${pair.drOpen ? "secondary" : "primary"}" data-pair-id="${pair.id}" class="toggle-drawer-btn">
//                ${pair.drOpen ? "▾ Close" : "⇄ Map Fields"}
//              </fw-button>`
//       : ""}
//         <button class="del-btn" data-pair-id="${pair.id}" title="Remove">✕</button>
//       </div>
//       <span class="chevron ${pair.selOpen ? "open" : ""}">▾</span>
//     </div>

//     <div class="sel-panel ${pair.selOpen ? "open" : ""}">
//       <div class="sel-body-v2">
//         <div class="sel-row-split">
//           <div class="sel-col">
//             <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">
//               <span class="sel-lbl" id="so-lbl-${pair.id}">SuperOps Asset Class</span>
//               <span id="so-spin-${pair.id}" style="display:none;align-items:center;gap:4px;font-size:11px;color:#6b7280;">
//                 <span style="width:10px;height:10px;border:2px solid #e5e7eb;border-top-color:#2c5cc5;
//                              border-radius:50%;animation:spin .7s linear infinite;display:inline-block"></span>
//                 fetching fields…
//               </span>
//             </div>
//             <select class="cr-sel" id="so-sel-${pair.id}">
//               <option value="">Select asset class…</option>
//               ${soOptions}
//             </select>
//           </div>
//           <div class="sel-conn">⇄</div>
//           <div class="sel-col">
//             <span class="sel-lbl">Freshservice Asset Type</span>
//             <select class="cr-sel" id="fs-sel-${pair.id}">
//               <option value="">Select asset type…</option>
//               ${fsOptions}
//             </select>
//           </div>
//         </div>
//       </div>
//     </div>

//     <div class="fdrawer ${pair.drOpen ? "open" : ""}">
//       <div class="drawer-inner">
//         <div class="col-hdrs">
//           <div class="chd chd-so"><span class="cdot"></span>SuperOps Fields</div>
//           <div class="chd chd-mid"></div>
//           <div class="chd chd-fs"><span class="cdot"></span>Freshservice Fields</div>
//         </div>
//         <div class="map-rows" id="rows-${pair.id}"></div>
//         <div class="d-foot">
//           <span class="map-stat" id="stat-${pair.id}">
//             <strong>0</strong> of <strong id="tc-${pair.id}">${pair.soFields.length}</strong> mapped
//           </span>
//           <div class="d-btns"></div>
//         </div>
//       </div>
//     </div>`;

//   card.querySelector(".pair-head").addEventListener("click", () => toggleSel(pair.id));
//   card.querySelector(".head-acts").addEventListener("click", (e) => e.stopPropagation());
//   card.querySelector(".del-btn").addEventListener("click", () => openDelModal(pair.id));
//   const toggleDrawerBtn = card.querySelector(".toggle-drawer-btn");
//   if (toggleDrawerBtn) toggleDrawerBtn.addEventListener("click", () => toggleDrawer(pair.id));
//   card.querySelector(`#so-sel-${pair.id}`).addEventListener("change", () => onSoClassChange(pair.id));
//   card.querySelector(`#fs-sel-${pair.id}`).addEventListener("change", () => onFsTypeChange(pair.id));
//   if (pair.drOpen && pair.soFields.length) buildRows(pair);
// }

// function renderAll() {
//   const list = document.getElementById("pair-list");
//   const liveIds = new Set(pairs.map((p) => `pair-${p.id}`));
//   Array.from(list.children).forEach((child) => {
//     if (!liveIds.has(child.id)) child.remove();
//   });
//   pairs.forEach((p) => renderPair(p));
//   pairs.forEach((p) => {
//     const e = document.getElementById(`pair-${p.id}`);
//     if (e) list.appendChild(e);
//   });
//   const has = pairs.length > 0;
//   document.getElementById("pair-count").textContent = pairs.length;
//   document.getElementById("empty-state").style.display = has ? "none" : "flex";
//   document.getElementById("val-section").style.display = has ? "block" : "none";
//   document.getElementById("verr-list").classList.remove("show");
// }

// function fmToast(msg, type = "success") {
//   const t = document.getElementById("toast");
//   if (t && typeof t.trigger === "function") t.trigger({ type, content: msg });
// }

// function esc(s) {
//   return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
// }

// async function fetchFsAssetTypePage(page) {
//   const res = await client.request.invokeTemplate("getFreshserviceAssetTypes", {
//     context: {
//       host: FS_DOMAIN.replace(/^https?:\/\//, "").replace(/\.freshservice\.com$/, "").trim(),
//       auth: FS_API_KEY,
//       perPage: 100,
//       page,
//     },
//   });
//   const json = JSON.parse(res.response);
//   json.headers = res.headers;
//   return json;
// }

// async function apiGetFsAssetTypes() {
//   const first = await fetchFsAssetTypePage(1);
//   let hasMore;
//   let all = [...first.asset_types];
//   hasMore = first.headers?.link;
//   let page = 1;
//   while (hasMore) {
//     page = ++page;
//     const assetTypes = await fetchFsAssetTypePage(page);
//     all = [...all, ...assetTypes.asset_types];
//     hasMore = assetTypes.headers?.link;
//   }
//   return all.map((t) => ({ id: String(t.id), label: t.name }));
// }

// async function apiGetFsAssetFields(typeId) {
//   const res = await client.request.invokeTemplate("getFreshserviceAssetFields", {
//     context: {
//       host: FS_DOMAIN.replace(/^https?:\/\//, "").replace(/\.freshservice\.com$/, "").trim(),
//       auth: FS_API_KEY,
//       typeId,
//     },
//   });
//   const json = JSON.parse(res.response);
//   const allFields = (json.asset_type_fields ?? [])
//     .flatMap((group) => group.fields ?? [])
//     .filter((f) => f.name !== "asset_type_id");
//   return allFields.map((f) => ({ id: f.name, l: f.label, type: f.field_type, required: f.required === true }));
// }

// async function prefillPairs(assetMappings) {
//   for (const mapping of assetMappings) {
//     const soClass = soClasses.find((assetClass) => assetClass.id === mapping.superops_asset_class.id);
//     const fsType = fsTypes.find((assetType) => assetType.id === mapping.freshservice_asset_type.id);
//     if (!soClass || !fsType) continue;
//     let soFields = [];
//     try {
//       soFields = await apiGetAssetFields(SO_API_KEY, soClass.id);
//     } catch (error) {
//       console.error("Failed to load SO fields for", soClass.name, error);
//     }
//     let fsFields = [];
//     const cacheKey = String(fsType.id);
//     if (fsFieldCache[cacheKey]) {
//       fsFields = fsFieldCache[cacheKey];
//     } else {
//       try {
//         fsFields = await apiGetFsAssetFields(fsType.id);
//         fsFieldCache[cacheKey] = fsFields;
//       } catch (error) {
//         console.error("Failed to load FS fields for", fsType.label, error);
//       }
//     }
//     const mappings = {};
//     mapping.field_mappings.forEach((fm) => {
//       mappings[String(fm.superops_field.id)] = String(fm.freshservice_field.id);
//     });
//     pairs.push({
//       id: nextId++,
//       soId: soClass.id, soName: soClass.name,
//       fsId: fsType.id, fsName: fsType.label,
//       soFields, fsFields, mappings,
//       selOpen: false, drOpen: false, fieldsLoading: false,
//     });
//   }
// }

// function resetBootState() {
//   bootDone = false;
//   soClasses = [];
//   fsTypes = [];
//   fsFieldCache = {};
//   pairs = [];
//   nextId = 1;
//   fieldMappingResult = [];
//   validationChecklist.fieldMapping = false;
//   renderAll();
//   markFieldMappingDirty();
// }

// function markFieldMappingDirty() {
//   const validateBtn = document.getElementById("validate-btn");
//   if (validateBtn) {
//     validateBtn.disabled = false;
//     validateBtn.textContent = "Save Mappings";
//   }
//   validationChecklist.fieldMapping = false;
// }

// // ═══════════════════════════════════════════════════════════════════════════════
// // SITE MAPPING (now in asset mapping tab)
// // ═══════════════════════════════════════════════════════════════════════════════

// function initSiteMappingWithData(sites) {
//   superopsSites = sites;
//   if (isSiteMappingInitialized) return;
//   isSiteMappingInitialized = true;

//   initMapping({
//     container: document.getElementById("siteMappingContainer"),
//     saveButton: saveSiteMappingButton,
//     addButton: document.getElementById("addSiteMappingBtn"),
//     leftClass: "so-site",
//     rightClass: "fs-location",
//     leftData: () => superopsSites,
//     rightData: () => fsLocations,
//      onDirty: () => {
//      // Only mark dirty (and show save button) when there are actual rows
//      const hasRows = document.getElementById("siteMappingContainer")
//        .querySelectorAll(".mapping-row").length > 0;
//      if (hasRows) {
//        markSiteMappingDirty();
//      } else {
//        // No rows — nothing to save, keep valid and hide button
//        saveSiteMappingButton.style.display = "none";
//        validationChecklist.siteMapping = true;
//      }
//    }
//   });
// }

// /** Save site mapping — button lives in the asset mapping tab */
// saveSiteMappingButton.addEventListener("click", () => {
//   try {
//     const rows = getSiteLocationMapping(true);
//     siteMapping = { siteLocationMapping: rows };
//     saveSiteMappingButton.disabled = true;
//     saveSiteMappingButton.textContent = "Saved Site Mappings";
//     fmToast("Site mappings saved successfully", "success");
//     validationChecklist.siteMapping = true;

//     // if asset field mapping is also done, unlock ticket form tab
//     if (validationChecklist.fieldMapping) {
//       ticketFormTab.disabled = false;
//     }
//   } catch (error) {
//     validationChecklist.siteMapping = false;
//     fmToast(error.message, "error");
//   }
// });

// function markSiteMappingDirty() {
//   if (saveSiteMappingButton) {
//     saveSiteMappingButton.disabled = false;
//     saveSiteMappingButton.textContent = "Save Site Mappings";
//   }
//   validationChecklist.siteMapping = false;
// }

// function resetSiteMapping() {
//   const siteContainer = document.getElementById("siteMappingContainer");
//   if (siteContainer) siteContainer.innerHTML = "";
//   validationChecklist.siteMapping = false;
//   siteMapping = undefined;
//   if (saveSiteMappingButton) {
//     saveSiteMappingButton.disabled = false;
//     saveSiteMappingButton.textContent = "Save Site Mappings";
//   }
//   if (addSiteMappingButton) addSiteMappingButton.disabled = false;
// }

// function getSiteLocationMapping(validate = false) {
//   const rows = document.querySelectorAll("#siteMappingContainer .mapping-row");
//   return Array.from(rows).map((row, index) => {
//     const site = row.querySelector(".so-site")?.value;
//     const location = row.querySelector(".fs-location")?.value;
//     if (validate && (!site || !location)) {
//       throw new Error(`Site Mapping Row ${index + 1} is incomplete`);
//     }
//     return { superops_site: site, freshservice_location: location };
//   });
// }

// // ═══════════════════════════════════════════════════════════════════════════════
// // SEVERITY MAPPING (now in ticket form tab)
// // ═══════════════════════════════════════════════════════════════════════════════

// function initSeverityMapping() {
//   if (isSeverityMappingInitialized) return;
//   isSeverityMappingInitialized = true;
//   initMapping({
//     container: document.getElementById("severityMappingContainer"),
//     saveButton: saveSeverityMappingButton,
//     addButton: document.getElementById("addSeverityMappingBtn"),
//     leftClass: "so-severity",
//     rightClass: "fs-priority",
//     leftData: severity,
//     rightData: priority,
//      onDirty: () => {
//      // Only mark dirty (and show save button) when there are actual rows
//      const hasRows = document.getElementById("severityMappingContainer")
//        .querySelectorAll(".mapping-row").length > 0;
//      if (hasRows) {
//        markSeverityMappingDirty();
//      } else {
//        // No rows — nothing to save, keep valid and hide button
//        saveSeverityMappingButton.style.display = "none";
//        validationChecklist.severityMapping = true;
//      }
//    }

//   });
// }

// /** Save severity mapping — button lives in the ticket form tab */
// saveSeverityMappingButton.addEventListener("click", () => {
//   try {
//     const rows = getSeverityPriorityMapping(true);
//     severityMapping = { severityPriorityMapping: rows };
//     saveSeverityMappingButton.disabled = true;
//     saveSeverityMappingButton.textContent = "Saved Severity Mappings";
//     toast.trigger({ type: "success", content: "Severity mappings saved successfully" });
//     validationChecklist.severityMapping = true;
//   } catch (error) {
//     validationChecklist.severityMapping = false;
//     toast.trigger({ type: "error", content: error.message });
//   }
// });

// function markSeverityMappingDirty() {
//   if (saveSeverityMappingButton) {
//     saveSeverityMappingButton.disabled = false;
//     saveSeverityMappingButton.textContent = "Save Severity Mappings";
//   }
//   validationChecklist.severityMapping = false;
// }

// function getSeverityPriorityMapping(validate = false) {
//   const rows = document.querySelectorAll("#severityMappingContainer .mapping-row");
//   return Array.from(rows).map((row, index) => {
//     const sev = row.querySelector(".so-severity")?.value;
//     const pri = row.querySelector(".fs-priority")?.value;
//     if (validate && (!sev || !pri)) {
//       throw new Error(`Severity Mapping Row ${index + 1} is incomplete`);
//     }
//     return { superops_severity: sev, freshservice_priority: pri };
//   });
// }

// // init severity mapping at load time (static data — no async needed)
// initSeverityMapping();

// // ═══════════════════════════════════════════════════════════════════════════════
// // GENERIC MAPPING INITIALIZER
// // ═══════════════════════════════════════════════════════════════════════════════
// function initMapping({ container, saveButton, addButton, leftClass, rightClass, leftData, rightData, onDirty }) {
//   const getLeftData = () => (typeof leftData === "function" ? leftData() || [] : leftData || []);
//   const getRightData = () => (typeof rightData === "function" ? rightData() || [] : rightData || []);

//   addButton.addEventListener("click", () => {
//     markDirty();
//     const row = document.createElement("div");
//     row.className = "mapping-row";
//     row.innerHTML = `
//       <fw-select class="${leftClass}" placeholder="Select ${leftClass === "so-site" ? "SuperOps Site" : "SuperOps Severity"}"></fw-select>
//       <span class="arrow-icon">→</span>
//       <fw-select class="${rightClass}" placeholder="Select ${rightClass === "fs-location" ? "Freshservice Location" : "Freshservice Priority"}"></fw-select>
//       <fw-button class="delete-btn" color="text">
//           <fw-icon name="delete" size="18"></fw-icon>
//       </fw-button>
//     `;
//     console.log("container", container);
//     container.appendChild(row);
//     toggleAddButton();
//     toggleSaveButton();
//   });

//   container.addEventListener("focusin", (e) => {
//     const left = e.target.closest(`.${leftClass}`);
//     const right = e.target.closest(`.${rightClass}`);
//     if (left) populateLeft(left);
//     if (right) populateRight(right);
//   });

//   container.addEventListener("click", (e) => {
//     const btn = e.target.closest(".delete-btn");
//     if (btn) {
//       btn.closest(".mapping-row").remove();
//       toggleAddButton();
//       toggleSaveButton();
//       markDirty();
//     }
//   });

//   container.addEventListener("change", (e) => {
//     if (e.target.closest(`.${leftClass}`)) {
//       toggleAddButton();
//       toggleSaveButton();
//       markDirty()
//     }
//   });

//     container.addEventListener("fwChange", (e) => {
//     console.log("change event", e);
//     console.log("class", leftClass, rightClass);
//     const className = e.target?.className?.split(" ")[0];
//     console.log("evnt class", className);
//     if ((leftClass === className) || (rightClass === className)) { // e.target.classList?.includes(`${rightClass}`
//       toggleAddButton();
//       toggleSaveButton();
//       markDirty()
//     }
//   });

//   function getSelectedLeft() {
//     return Array.from(container.querySelectorAll(`.${leftClass}`)).map((el) => el.value).filter(Boolean);
//   }

//   function populateLeft(dropdown) {
//     const currentValue = dropdown.value;
//     const currentLeftData = getLeftData();
//     const selected = getSelectedLeft().filter((v) => v !== currentValue);
//     const filtered = currentLeftData.filter((item) => !selected.includes(item.value));
//     dropdown.options = filtered;
//     dropdown.value = currentValue || "";
//   }

//   function populateRight(dropdown) {
//     const currentValue = dropdown.value;
//     dropdown.options = getRightData();
//     dropdown.value = currentValue || "";
//   }

//   function toggleAddButton() {
//     const totalRows = container.querySelectorAll(".mapping-row").length;
//     addButton.disabled = totalRows >= getLeftData().length;
//   }

//   function toggleSaveButton() {
//     const hasRows = container.querySelectorAll(".mapping-row").length > 0;
//     saveButton.style.display = hasRows ? "" : "none";
//   }

//   function markDirty() {
//     const hasRows = container.querySelectorAll(".mapping-row").length > 0;
//     toggleSaveButton();
//     if (hasRows && onDirty) onDirty();
//     // When no rows remain, caller's validationChecklist stays true (already saved/empty = valid)
//   }
// }

// // ═══════════════════════════════════════════════════════════════════════════════
// // TICKET FORM — WORKSPACE & FIELDS
// // ═══════════════════════════════════════════════════════════════════════════════

// async function fetchAndRenderWorkspaces() {
//   const wsSelect = document.getElementById("ticketFormWorkspaceSelect");
//   if (!wsSelect) return;
//   showTicketFormLoader("Loading workspaces…");
//   try {
//     const fsDomain = removeProtocol(freshserviceDomainField?.value);
//     const fsApikey = freshserviceApikeyField?.value;
//     let freshserviceDomain = removeProtocol(fsDomain);
//     freshserviceDomain = freshserviceDomain.replace(/\.freshservice\.com$/, "").trim();
//     const res = await client.request.invokeTemplate("getFreshserviceWorkspace", {
//       context: { domain: freshserviceDomain, apikey: fsApikey },
//     });
//     const data = JSON.parse(res.response);
//     const workspaces = data.workspaces || [];
//     workspaceOptions = workspaces.map((w) => ({ value: String(w.id), text: w.name }));
//     wsSelect.options = workspaceOptions;
//   } catch (err) {
//     console.error("Error fetching workspaces", err);
//     toast.trigger({ type: "error", content: "Failed to load workspaces" });
//   } finally {
//     hideTicketFormLoader();
//   }
// }

// async function loadTicketFieldsForWorkspace(workspaceId) {
//   showTicketFormLoader("Loading ticket fields…");
//   clearTicketFormFieldsDOM();
//   try {
//     const fsDomain = removeProtocol(freshserviceDomainField?.value);
//     const fsApikey = freshserviceApikeyField?.value;
//     const res = await client.request.invokeTemplate("getAllTicketFields", {
//       context: { host: fsDomain, apikey: fsApikey, workspaceId },
//     });
//     const ticketFields = JSON.parse(res.response).ticket_fields;
//     await renderTicketForm(ticketFields);
//   } catch (err) {
//     console.error("Error loading ticket fields for workspace", err);
//     toast.trigger({ type: "error", content: "Failed to load ticket fields" });
//   } finally {
//     hideTicketFormLoader();
//   }
// }

// function clearTicketFormFieldsDOM() {
//   const container = document.getElementById("ticketFormContainer");
//   if (!container) return;
//   const header = document.getElementById("ticketFormWorkspaceHeader");
//   Array.from(container.children).forEach((child) => {
//     if (child !== header) child.remove();
//   });
//   saveFormButton = null;
// }

// function clearTicketFormFields() {
//   const container = document.getElementById("ticketFormContainer");
//   if (!container) return;
//   container.querySelectorAll("fw-input[data-fieldname]").forEach((el) => { el.value = ""; });
//   container.querySelectorAll("fw-textarea[data-fieldname]").forEach((el) => { el.value = ""; });
//   container.querySelectorAll("fw-datepicker[data-fieldname]").forEach((el) => { el.value = ""; });
//   container.querySelectorAll("input[type='checkbox'][data-fieldname]").forEach((el) => { el.checked = false; });
//   container.querySelectorAll("fw-select[data-fieldname]").forEach((el) => { el.value = ""; });
//   container.querySelectorAll("input.async-search-input[data-fieldname]").forEach((el) => {
//     el.value = "";
//     el.dataset.value = "";
//   });
// }

// async function renderTicketForm(fields) {
//   const container = document.getElementById("ticketFormContainer");
//   Array.from(container.children).forEach((child) => child.remove());

//   const wsSelect = document.getElementById("ticketFormWorkspaceSelect");
//   if (wsSelect && workspaceOptions.length) wsSelect.options = workspaceOptions;

//   const filteredFields = fields.filter(
//     (f) => f.field_type !== "default_priority" && f.field_type !== "default_workspace"
//   );
//   const subjectField = filteredFields.find((f) => f.field_type === "default_subject");
//   const descriptionField = filteredFields.find((f) => f.field_type === "default_description");
//   const remainingFields = filteredFields.filter(
//     (f) => f.field_type !== "default_subject" && f.field_type !== "default_description",
//   );
//   const isLongField = (field) =>
//     field.field_type &&
//     (field.field_type === "default_description" ||
//       field.field_type.includes("paragraph") ||
//       field.field_type.includes("content"));
//   const shortFields = remainingFields.filter((f) => !isLongField(f));
//   const longFields = remainingFields.filter((f) => isLongField(f));
//   const sortFields = (arr) => {
//     const required = arr.filter((f) => f.required_for_agents);
//     const defaultFields = arr.filter((f) => !f.required_for_agents && f.default_field);
//     const customFields = arr.filter((f) => !f.required_for_agents && !f.default_field);
//     return [...required, ...defaultFields, ...customFields];
//   };
//   const sortedShort = sortFields(shortFields);
//   const sortedLong = sortFields(longFields);
//   const orderedFields = [
//     ...(subjectField ? [subjectField] : []),
//     ...(descriptionField ? [descriptionField] : []),
//     ...sortedShort,
//     ...sortedLong,
//   ];
//   orderedFields.forEach((field) => {
//     const fieldEl = createField(field);
//     if (fieldEl) {
//       if (
//         field.field_type === "default_description" ||
//         isLongField(field) ||
//         field.label?.toLowerCase().includes("description") ||
//         field.label?.toLowerCase().includes("business impact")
//       ) {
//         fieldEl.classList.add("full-width");
//       }
//       container.appendChild(fieldEl);
//     }
//   });
//   renderSaveButton(container);
//   attachFormChangeListeners();
//   validationChecklist.ticketForm = false;
// }

// function createField(field) {
//   if (field.field_type === "default_agent") return createAsyncSearchField(field, "getAgents");
//   if (field.field_type === "default_requester") return createAsyncSearchField(field, "getRequesters");
//   if (field.choices && field.choices.length) return createDropdown(field);
//   const type = getFieldType(field.field_type);
//   switch (type) {
//     case "textarea": return createTextarea(field);
//     case "checkbox": return createCheckbox(field);
//     case "datepicker": return createDatepicker(field);
//     default: return createInput(field);
//   }
// }

// function getFieldType(fieldType) {
//   if (!fieldType) return "input";
//   if (fieldType === "default_description") return "textarea";
//   const type = fieldType.split("_")[1] || "";
//   if (type.includes("paragraph") || type.includes("content")) return "textarea";
//   if (type.includes("checkbox")) return "checkbox";
//   if (type.includes("date")) return "datepicker";
//   if (type.includes("text") || type.includes("number") || type.includes("decimal")) return "input";
//   return "input";
// }

// function createInput(field) {
//   const el = document.createElement("fw-input");
//   el.setAttribute("label", field.label);
//   el.setAttribute("name", field.name);
//   if(field.name === "subject"){
//     el.setAttribute("hint-text", "The ticket subject will be created as: Your Subject + {{Alert Subject}}. Alert subject will be added automatically.");
//   }
//   el.setAttribute("data-fieldname", field.name);
//   if (field.required_for_agents) el.setAttribute("required", true);
//   return wrapField(el, field);
// }

// function createTextarea(field) {
//   const el = document.createElement("fw-textarea");
//   el.setAttribute("label", field.label);
//   el.setAttribute("name", field.name);
//   if(field.name === "description"){
//     el.setAttribute("hint-text", "Ticket description will be created as: Your Description + {{Alert Description}}. Alert description will be added automatically.");
//   }
//   el.setAttribute("rows", "4");
//   el.setAttribute("data-fieldname", field.name);
//   if (field.required_for_agents) el.setAttribute("required", true);
//   return wrapField(el, field);
// }

// function createCheckbox(field) {
//   const wrapper = document.createElement("div");
//   wrapper.classList.add("checkbox-field-wrapper");
//   wrapper.setAttribute("data-fieldname", field.name);
//   const id = "checkbox-" + field.name;
//   const input = document.createElement("input");
//   input.type = "checkbox";
//   input.id = id;
//   input.name = field.name;
//   input.setAttribute("data-fieldname", field.name);
//   input.classList.add("checkbox-native");
//   const labelEl = document.createElement("label");
//   labelEl.htmlFor = id;
//   labelEl.classList.add("checkbox-native-label");
//   labelEl.textContent = field.label;
//   wrapper.appendChild(input);
//   wrapper.appendChild(labelEl);
//   return wrapField(wrapper, field);
// }

// function createDatepicker(field) {
//   const el = document.createElement("fw-datepicker");
//   el.setAttribute("label", field.label);
//   el.setAttribute("name", field.name);
//   el.setAttribute("data-fieldname", field.name);
//   if (field.required_for_agents) el.setAttribute("required", true);
//   return wrapField(el, field);
// }

// function createDropdown(field) {
//   const container = document.createElement("div");
//   container.setAttribute("data-fieldname", field.name);
//   container.__fieldMeta = field;
//   const select = document.createElement("fw-select");
//   select.setAttribute("label", field.label);
//   select.setAttribute("name", field.name);
//   select.setAttribute("data-level", 1);
//   select.setAttribute("data-fieldname", field.name);
//   if (field.required_for_agents) select.setAttribute("required", true);
//   select.options = mapOptions(field.choices);
//   container.appendChild(select);
//   if (field.nested_fields && field.nested_fields.length) {
//     select.addEventListener("fwChange", (e) => {
//       handleNestedChange(e, field.choices, field.nested_fields, container);
//     });
//   }
//   return wrapField(container, field);
// }

// function handleNestedChange(event, choices, nestedFields, container) {
//   const selectedValue = event.target.value;
//   const level = Number(event.target.dataset.level);
//   container.querySelectorAll("fw-select").forEach((sel) => {
//     if (Number(sel.dataset.level) > level) sel.parentElement.remove();
//   });
//   const selected = choices.find((c) => c.id === selectedValue);
//   if (!selected || !selected.nested_options?.length) return;
//   const nextField = nestedFields[level - 1];
//   if (!nextField) return;
//   const wrapper = document.createElement("div");
//   wrapper.classList.add("nested-select-wrapper");
//   const select = document.createElement("fw-select");
//   select.setAttribute("label", nextField.label);
//   select.setAttribute("name", nextField.name);
//   select.setAttribute("data-level", level + 1);
//   select.setAttribute("data-fieldname", nextField.name);
//   select.options = mapOptions(selected.nested_options);
//   wrapper.appendChild(select);
//   container.appendChild(wrapper);
//   select.addEventListener("fwChange", (e) => {
//     handleNestedChange(e, selected.nested_options, nestedFields, container);
//   });
// }

// function mapOptions(choices) {
//   return choices.map((c) => ({ value: c.id, text: String(c.value) }));
// }

// function wrapField(el, field) {
//   const div = document.createElement("div");
//   div.classList.add("field-wrapper");
//   if (field && field.required_for_agents) div.classList.add("field-required");
//   div.appendChild(el);
//   return div;
// }

// function createAsyncSearchField(field, templateName) {
//   const wrapper = document.createElement("div");
//   wrapper.classList.add("async-search-wrapper");
//   wrapper.setAttribute("data-fieldname", field.name);
//   const label = document.createElement("label");
//   label.classList.add("async-search-label");
//   label.innerText = field.label;
//   if (field.required_for_agents) {
//     const asterisk = document.createElement("span");
//     asterisk.classList.add("required-asterisk");
//     asterisk.innerText = " *";
//     label.appendChild(asterisk);
//   }
//   const inputWrapper = document.createElement("div");
//   inputWrapper.classList.add("async-input-wrapper");
//   const input = document.createElement("input");
//   input.type = "text";
//   input.placeholder = "Search...";
//   input.classList.add("async-search-input");
//   input.setAttribute("data-fieldname", field.name);
//   if (field.required_for_agents) input.required = true;
//   const dropdown = document.createElement("div");
//   dropdown.classList.add("async-dropdown");
//   dropdown.style.display = "none";
//   inputWrapper.appendChild(input);
//   inputWrapper.appendChild(dropdown);
//   wrapper.appendChild(label);
//   wrapper.appendChild(inputWrapper);
//   document.addEventListener("click", (e) => {
//     if (!inputWrapper.contains(e.target)) dropdown.style.display = "none";
//   });
//   dropdown.addEventListener("click", (e) => e.stopPropagation());
//   let debounceTimer;
//   input.addEventListener("input", () => {
//     const query = input.value.trim();
//     clearTimeout(debounceTimer);
//     if (query.length < 2) { dropdown.style.display = "none"; return; }
//     debounceTimer = setTimeout(async () => {
//       const results = await fetchSearchResults(query, templateName);
//       renderDropdown(dropdown, results, input);
//     }, 400);
//   });
//   return wrapField(wrapper, field);
// }

// async function fetchSearchResults(query, templateName, page = 1) {
//   try {
//     const safeQuery = query.trim().replace(/'/g, "\\'");
//     let searchQuery;
//     if (templateName === "getRequesters") {
//       searchQuery = `name:'${safeQuery}'`;
//     } else {
//       searchQuery = `name:'${safeQuery}' OR first_name:'${safeQuery}' OR last_name:'${safeQuery}' OR email:'${safeQuery}' OR work_phone_number:'${safeQuery}' OR mobile_phone_number:'${safeQuery}'`;
//     }
//     const fsDomain = removeProtocol(freshserviceDomainField?.value);
//     const fsApikey = freshserviceApikeyField?.value;
//     const res = await client.request.invokeTemplate(templateName, {
//       context: { host: fsDomain, apikey: fsApikey, query: searchQuery, page: Number(page) },
//     });
//     const data = JSON.parse(res.response);
//     return data.agents || data.requesters || [];
//   } catch (err) {
//     console.error("Error in finding requester", err);
//     return [];
//   }
// }

// function renderDropdown(dropdown, items, input) {
//   dropdown.innerHTML = "";
//   if (!items.length) { dropdown.style.display = "none"; return; }
//   items.forEach((item) => {
//     const option = document.createElement("div");
//     option.classList.add("async-dropdown-option");
//     if (item.first_name && item.last_name) {
//       option.innerText = item.first_name + " " + item.last_name;
//     } else if (item.name) {
//       option.innerText = item.name;
//     } else if (item.primary_email) {
//       option.innerText = item.primary_email;
//     } else {
//       option.innerText = item.email;
//     }
//     option.addEventListener("click", () => {
//       input.value = option.innerText;
//       input.dataset.value = item.id;
//       dropdown.style.display = "none";
//       markFormDirty();
//     });
//     dropdown.appendChild(option);
//   });
//   dropdown.style.display = "block";
// }

// function renderSaveButton(container) {
//   const buttonRow = document.createElement("div");
//   buttonRow.classList.add("save-button-row", "full-width");
//   const btn = document.createElement("fw-button");
//   btn.textContent = "Save Form";
//   btn.type = "button";
//   saveFormButton = btn;
//   btn.addEventListener("click", handleSaveForm);
//   buttonRow.appendChild(btn);
//   container.appendChild(buttonRow);
// }

// const useValueInsteadOfId = ["ticket_type", "category", "sub_category", "item_category"];

// function handleSaveForm() {
//   const container = document.getElementById("ticketFormContainer");
//   const formData = {};
//   const errors = [];

//   container.querySelectorAll("fw-input[data-fieldname]").forEach((el) => {
//     const key = el.getAttribute("data-fieldname");
//     const value = el.value || "";
//     formData[key] = value;
//     if (el.hasAttribute("required") && !value.trim()) errors.push(el.getAttribute("label") || key);
//   });
//   container.querySelectorAll("fw-textarea[data-fieldname]").forEach((el) => {
//     const key = el.getAttribute("data-fieldname");
//     const value = el.value || "";
//     formData[key] = value;
//     if (el.hasAttribute("required") && !value.trim()) errors.push(el.getAttribute("label") || key);
//   });
//   container.querySelectorAll("fw-select[data-fieldname]").forEach((el) => {
//     const key = el.getAttribute("data-fieldname");
//     const value = el.value || "";
//     formData[key] = value;
//     const selectedOption = el.options?.find((opt) => opt.value === value);
//     if (selectedOption && useValueInsteadOfId.includes(key)) formData[key + "_text"] = selectedOption.text;
//     if (el.hasAttribute("required") && !value) errors.push(el.getAttribute("label") || key);
//   });
//   container.querySelectorAll("fw-datepicker[data-fieldname]").forEach((el) => {
//     const key = el.getAttribute("data-fieldname");
//     const value = el.value || "";
//     formData[key] = value;
//     if (el.hasAttribute("required") && !value) errors.push(el.getAttribute("label") || key);
//   });
//   container.querySelectorAll("input[type='checkbox'][data-fieldname]").forEach((el) => {
//     const key = el.getAttribute("data-fieldname");
//     formData[key] = el.checked;
//   });
//   container.querySelectorAll("input.async-search-input[data-fieldname]").forEach((el) => {
//     const key = el.getAttribute("data-fieldname");
//     if (key === "requester") {
//       const value = el.value || "";
//       formData[key] = value;
//       formData[key + "_email"] = el.dataset.email || "";
//     } else {
//       const value = el.dataset.value || el.value || "";
//       formData[key] = value;
//     }
//     if (el.required && !el.value.trim()) {
//       const label =
//         el.closest(".async-search-wrapper")?.querySelector(".async-search-label")?.innerText?.replace(" *", "") || key;
//       errors.push(label);
//     }
//   });

//   if (errors.length > 0) {
//     toast.trigger({ type: "error", content: `Please fill in the required fields: ${errors.join(", ")}` });
//     return;
//   }

//   ticketForm = formData;
//   if (selectedWorkspaceId) ticketForm.workspace_id = selectedWorkspaceId;
//   formattedTicketForm = buildFormattedFormData(formData);
//   saveFormButton.disabled = true;
//   saveFormButton.textContent = "Saved Form";
//   toast.trigger({ type: "success", content: "Form saved successfully" });
//   validationChecklist.ticketForm = true;
// }

// function addGlobalFormStyles() {
//   const style = document.createElement("style");
//   style.textContent = `
//     #ticketFormContainer fw-input,
//     #ticketFormContainer fw-select,
//     #ticketFormContainer fw-textarea,
//     #ticketFormContainer fw-datepicker,
//     #ticketFormContainer fw-checkbox {
//       width: 100%;
//     }
//   `;
//   document.head.appendChild(style);
// }
// let initFormStylesCalled = false;
// if (!initFormStylesCalled) {
//   addGlobalFormStyles();
//   initFormStylesCalled = true;
// }

// function markFormDirty() {
//   if (!saveFormButton) return;
//   saveFormButton.disabled = false;
//   saveFormButton.textContent = "Save Form";
//   validationChecklist.ticketForm = false;
// }

// function attachFormChangeListeners() {
//   const container = document.getElementById("ticketFormContainer");
//   container.addEventListener("fwChange", (e) => {
//     if (e.target.closest("[data-fieldname]")) markFormDirty();
//   });
//   container.addEventListener("input", (e) => {
//     if (e.target.closest("[data-fieldname]")) markFormDirty();
//   });
//   container.addEventListener("change", (e) => {
//     if (e.target.closest("[data-fieldname]")) markFormDirty();
//   });
// }

// function getFieldMetadata(fieldName) {
//   const container = document.getElementById("ticketFormContainer");
//   const wrapper = container.querySelector(`[data-fieldname="${fieldName}"]`);
//   if (wrapper && wrapper.__fieldMeta) return wrapper.__fieldMeta;
//   return null;
// }

// function buildFormattedFormData(data) {
//   const result = {};
//   Object.entries(data).forEach(([key, value]) => {
//     if (value === "" || value === null || value === undefined || key.endsWith("_email") || key.endsWith("_text")) return;
//     const convertedKey = fieldNameConversion[key] || key;
//     let finalValue = value;
//     if (key === "requester") finalValue = data[key + "_email"] || value;
//     if (useValueInsteadOfId.includes(key) && data[key + "_text"]) finalValue = data[key + "_text"];
//     let type;
//     if (defaultFieldTypes[key] || defaultFieldTypes[convertedKey]) {
//       type = defaultFieldTypes[key] || defaultFieldTypes[convertedKey];
//     } else {
//       const fieldMeta = getFieldMetadata(key);
//       if (fieldMeta && fieldMeta.field_type) {
//         type = mapType(fieldMeta.field_type);
//       } else if (typeof value === "boolean") {
//         type = "boolean";
//       } else if (typeof value === "number") {
//         type = "number";
//       } else if (!isNaN(value) && value !== true && value !== false && value.trim() !== "") {
//         type = "number";
//       } else {
//         type = "string";
//       }
//     }
//     result[convertedKey] = { schema: String(finalValue), type };
//   });
//   return result;
// }

// // ═══════════════════════════════════════════════════════════════════════════════
// // IPARAMS — postConfigs / getConfigs
// // ═══════════════════════════════════════════════════════════════════════════════

// function postConfigs() {
//   const fieldValues = dataToPostConfig();
//   return {
//     __meta: { secure: ["app1_apikey"] },
//     domain: fieldValues.domain,
//     accessToken: fieldValues.accessToken,
//     tenantToken: fieldValues.tenantToken,
//     tenantId: fieldValues.tenantId,
//     adminEmail: fieldValues.adminEmail,
//     adminPassword: fieldValues.adminPassword,
//     freshserviceAppName: "Freshservice",
//     freshserviceAppId: "freshservice-1.0.0",
//     freshserviceDomain: fieldValues.freshserviceDomain,
//     freshserviceApikey: fieldValues.freshserviceApikey,
//     freshserviceConnectionId: fieldValues.freshserviceConnectionId,
//     freshserviceConnectionName: fieldValues.FreshserviceConnectionName,
//     superopsAppName: "SuperOps IT",
//     superopsAppId: "superopsit-1.0.0",
//     superopsDomain: fieldValues.superopsDomain,
//     superopsConnectionId: fieldValues.superopsConnectionId,
//     superopsApikey: fieldValues.superopsApikey,
//     superopsConnectionName: fieldValues.superopsConnectionName,
//     superopsAccountType: fieldValues.superopsAccountType,
//     superopsRegion: fieldValues.superopsRegion,
//     sinceDate: fieldValues.sinceDate,
//     isInEditConfig: fieldValues.isInEditConfig,
//     assetMapping: fieldValues.assetMappingData,
//     siteSeverityMapping: fieldValues.siteSeverityMapping,
//     ticketForm: fieldValues.ticketForm,
//     formattedTicketForm: fieldValues.formattedTicketForm,
//   };
// }

// function getConfigs(iparams) {
//   console.log("get config", iparams);
//   const freshserviceDomainField = document.getElementById("fs-domain");
//   const freshserviceApikeyField = document.getElementById("fs-apikey");
//   const superopsDomainField = document.getElementById("superops-domain");
//   const superopsApikeyField = document.getElementById("superops-apikey");
//   freshserviceDomainField.value = iparams.freshserviceDomain;
//   freshserviceApikeyField.value = iparams.freshserviceApikey;
//   superopsDomainField.value = iparams.superopsDomain;
//   superopsApikeyField.value = iparams.superopsApikey;
//   autoLoginAndValidation(iparams);
// }

document.addEventListener("DOMContentLoaded", async function () {
  try {
    const _client = await app.initialized();
    window.client = _client;
  } catch (error) {
    console.log("app error", error);
    toast.trigger({
      type: "error",
      content: "App initialization failed. Please try later",
    });
  }
});

// html elements
let freshserviceDomainField = document.getElementById("fs-domain");
let freshserviceApikeyField = document.getElementById("fs-apikey");
const freshserviceApikeyHideIcon = document.getElementById("fs-apikey-icon");
const freshserviceValidateButton = document.getElementById("fs-validate-btn");
const toast = document.getElementById("toast-msg");
const superopsTab = document.getElementById("superops-tab");
const fieldMappingTab = document.getElementById("field-mapping-tab");
const tab = document.getElementById("tabs");
const superopsValidateButton = document.getElementById("superopsValidateBtn");
const superopsDomainField = document.getElementById("superops-domain");
const superopsApikeyHideIcon = document.getElementById("superops-apikey-hide-icon");
const superopsApikeyField = document.getElementById("superops-apikey");
const superopsAccountType = "it";
const superopsRegionField = document.getElementById("superops-region");
const sinceDateField = document.getElementById("since-date");
const ticketFormTab = document.getElementById("ticket-form-tab");
const workspaceSelect = document.getElementById("ticketFormWorkspaceSelect");

// ─── Mapping button references (set after DOM is ready) ───────────────────────
const addSiteMappingButton = document.getElementById("addSiteMappingBtn");
const addSeverityMappingButton = document.getElementById("addSeverityMappingBtn");
const saveSiteMappingButton = document.getElementById("saveSiteMappingButton");
const saveSeverityMappingButton = document.getElementById("saveSeverityMappingButton");

// event listeners
superopsDomainField.addEventListener("fwInputKeyDown", () => {
  clearInputError(superopsDomainField);
  superopsValidateButton.innerText = "Validate";
  superopsValidateButton.disabled = false;
  validationChecklist.superops = false;
});
superopsDomainField.addEventListener("fwInputClear", () => {
  clearInputError(superopsDomainField);
  superopsValidateButton.innerText = "Validate";
  superopsValidateButton.disabled = false;
  validationChecklist.superops = false;
});
superopsApikeyField.addEventListener("fwInputKeyDown", () => {
  clearInputError(superopsApikeyField);
  superopsValidateButton.innerText = "Validate";
  superopsValidateButton.disabled = false;
  validationChecklist.superops = false;
});
superopsApikeyField.addEventListener("fwInputClear", () => {
  clearInputError(superopsApikeyField);
  superopsValidateButton.innerText = "Validate";
  superopsValidateButton.disabled = false;
  validationChecklist.superops = false;
});
superopsRegionField.addEventListener("fwChange", () => {
  clearInputError(superopsRegionField);
  superopsValidateButton.innerText = "Validate";
  superopsValidateButton.disabled = false;
  validationChecklist.superops = false;
});
freshserviceValidateButton.addEventListener("fwClick", validateFreshservice);
freshserviceApikeyHideIcon.addEventListener("click", () =>
  tooglePasswordVisiblity(freshserviceApikeyField, freshserviceApikeyHideIcon),
);
superopsApikeyHideIcon.addEventListener("click", () =>
  tooglePasswordVisiblity(superopsApikeyField, superopsApikeyHideIcon),
);
superopsValidateButton.addEventListener("click", validateSuperops);
freshserviceDomainField.addEventListener("fwInputKeyDown", () => {
  freshserviceValidateButton.disabled = false;
  freshserviceValidateButton.innerText = "Validate";
  validationChecklist.freshservice = false;
});
freshserviceDomainField.addEventListener("fwInputClear", () => {
  freshserviceValidateButton.disabled = false;
  freshserviceValidateButton.innerText = "Validate";
  validationChecklist.freshservice = false;
});
freshserviceApikeyField.addEventListener("fwInputKeyDown", () => {
  freshserviceValidateButton.disabled = false;
  freshserviceValidateButton.innerText = "Validate";
  validationChecklist.freshservice = false;
});
freshserviceApikeyField.addEventListener("fwInputClear", () => {
  freshserviceValidateButton.disabled = false;
  freshserviceValidateButton.innerText = "Validate";
  validationChecklist.freshservice = false;
});

workspaceSelect.addEventListener("fwChange", async (e) => {
  console.log("event", e);
  const newWorkspaceId = e.detail?.value || workspaceSelect.value;
  console.log("new workspace id", newWorkspaceId);
  if (!newWorkspaceId) return;
  console.log("comparison", selectedWorkspaceId, newWorkspaceId);
  if (
    selectedWorkspaceId &&
    String(selectedWorkspaceId) !== String(newWorkspaceId)
  ) {
    clearTicketFormFieldsDOM();
    ticketForm = undefined;
    formattedTicketForm = undefined;
    validationChecklist.ticketForm = false;
    if (saveFormButton) {
      saveFormButton.disabled = false;
      saveFormButton.textContent = "Save Configuration";
    }
  }
  if (!selectedWorkspaceId || String(selectedWorkspaceId) !== String(newWorkspaceId)) {
    selectedWorkspaceId = newWorkspaceId;
    await loadTicketFieldsForWorkspace(newWorkspaceId);
  }
});

// variable declaration
const freshserviceAppId = "freshservice-1.0.0";
const freshserviceAppName = "Freshservice";
const superopsAppName = "Superops";
const usDataCenter = "api";
const euDataCenter = "euapi";
const adminEmail = "sivakumar@konnectify.co";
const adminPassword = "konnectify";
const adminDomain = "skdemo";
let fieldMappingResult = [];
let freshserviceConnectionName = "";
let superopsConnectionName = "";
let isInEditConfig = "";
// ── Split mapping state ────────────────────────────────────────────────────────
let siteMapping;          // stores site-location mapping  (saved from asset mapping tab)
let severityMapping;      // stores severity-priority mapping (saved from ticket form tab)
// backward-compat alias used when reading/writing iparams (combined object)
let siteSeverityMapping;
// ─────────────────────────────────────────────────────────────────────────────
let ticketForm;
let formattedTicketForm;
let selectedWorkspaceId = null;
let validatedSuperopsDomain = "";
let superopsDomainFromIparams = "";
const fieldNameConversion = {
  product: "product_id",
  group: "group_id",
  company: "company_id",
  department: "department_id",
  ticket_type: "type",
  requester: "email",
  agent: "responder_id"
};
const defaultFieldTypes = {
  status: "number",
  priority: "number",
  group: "string",
  department: "number",
  workspace_id: "number",
};

// ── Validation checklist ───────────────────────────────────────────────────────
// siteSeverityMapping split into siteMapping + severityMapping
const validationChecklist = {
  freshservice: false,
  superops: false,
  fieldMapping: false,
  sinceDate: false,
  siteMapping: true,        // starts true — no rows = nothing to save = valid
  severityMapping: true,    // starts true — no rows = nothing to save = valid
  ticketForm: false,
};
// ─────────────────────────────────────────────────────────────────────────────

let user = {
  name: "",
  id: "",
  admin_token: "",
  tenant_token: "",
  app1_connection_id: "",
  app2_connection_id: "",
};
let autoTabSwitch = {
  freshservice: false,
  superops: false,
  assetMapping: false,
  siteSeverityMapping: false,
};

// asset mapping variables
const PAGE_SIZE = 100;
let SO_SUBDOMAIN = "";
let SO_API_KEY = "";
let FS_DOMAIN = "";
let FS_API_KEY = "";
let SO_HOST = "";
let SO_PATH = "";
let soClasses = [];
let fsTypes = [];
let fsFieldCache = {};
let pairs = [];
let nextId = 1;
let delTarget = null;
let bootDone = false;
let fieldMappingEventsBound = false;

// graphQL queries
const GQL_ASSET_CLASSES = `
  query getAssetClassListV3($listInfo: ListInfoInput!) {
    getAssetClassListV3(listInfo: $listInfo) {
      assetClass { classId name }
      listInfo { totalCount page pageSize }
    }
  }`;

const GQL_ASSET_FIELDS = `
  query getAssetClassFieldsForIntegration($input: AssetClassIdentifierInput!) {
    getAssetClassFieldsForIntegration(input: $input) {
      fields { fieldKey fieldLabel isCustomField  }
      keyFields
    }
  }`;

// to prevent attaching multiple event listeners
let isSiteMappingInitialized = false;
let isSeverityMappingInitialized = false;

const priority = [
  { value: 1, text: "Low" },
  { value: 2, text: "Medium" },
  { value: 3, text: "High" },
  { value: 4, text: "Urgent" },
];
const severity = [
  { value: "Low", text: "Low" },
  { value: "Medium", text: "Medium" },
  { value: "High", text: "High" },
  { value: "Critical", text: "Critical" },
];
let superopsSites = [];
let fsLocations = [];
let saveFormButton;
let workspaceOptions = [];

function mapType(type) {
  switch (type) {
    case "checkbox": return "boolean";
    case "number": case "integer": case "decimal": return "number";
    case "lookup": return "string";
    case "Array": return "array";
    case "custom_text": return "string";
    case "custom_paragraph": return "string";
    case "custom_dropdown":
    case "custom_lookup_bigint":
    case "custom_radio": return "string";
    case "custom_multi_select_dropdown":
    case "custom_multi_lookup": return "array";
    case "custom_number":
    case "custom_decimal": return "number";
    case "custom_date": return "date";
    case "custom_date_time": return "datetime";
    case "custom_checkbox": return "boolean";
    case "custom_email": return "string";
    case "custom_url": return "string";
    default: return "string";
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

function tooglePasswordVisiblity(inputElement, icon) {
  const input_type = inputElement.type;
  if (input_type === "password") {
    inputElement.type = "text";
    icon.name = "visible";
  } else {
    inputElement.type = "password";
    icon.name = "hidden";
  }
}

function removeProtocol(url) {
  const protocol = "https://";
  if (url.includes(protocol)) {
    return url.split(protocol)[1];
  } else {
    return url;
  }
}

function showInputError(element, errorMsg = "") {
  if (!element) return;
  if (errorMsg) element.errorText = errorMsg;
  element.state = "error";
}

function clearInputError(element) {
  if (!element) return;
  element.state = "normal";
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// ═══════════════════════════════════════════════════════════════════════════════
// AUTH / CONNECTION
// ═══════════════════════════════════════════════════════════════════════════════

async function registerNewTenant() {
  try {
    if (!user.admin_token) {
      await getAdminAccessToken();
    }
    const response = await client.request.invoke("registerUser", {
      adminDomain: adminDomain,
      superopsDomain: superopsDomainField?.value,
      token: user.admin_token,
    });
    if (!response.response?.id) {
      console.log("Failed to create tenant");
      throw new Error("Failed to validate Superops account");
    }
    user.id = response.response?.id;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}

async function validateFreshservice() {
  const domain = freshserviceDomainField?.value;
  const apikey = freshserviceApikeyField?.value;
  fsLocations = [];
  if (resetSiteMapping) {
    resetSiteMapping();
  }
  try {
    freshserviceValidateButton.loading = true;
    if (!domain) {
      freshserviceDomainField.setFocus();
      freshserviceValidateButton.loading = false;
      toast.trigger({ type: "error", content: "Please enter your domain." });
      return;
    }
    if (!apikey) {
      freshserviceApikeyField.setFocus();
      freshserviceValidateButton.loading = false;
      toast.trigger({ type: "error", content: "Please enter your API Key." });
      return;
    }
    const freshserviceDomain = removeProtocol(domain);
    if (!domain || !apikey) return;

    await client.request.invokeTemplate("getAllTickets", {
      context: { host: freshserviceDomain, apikey: apikey },
    });

    superopsTab.disabled = false;
    if (!autoTabSwitch.freshservice) {
      tab.activeTabIndex = 1;
      autoTabSwitch.freshservice = true;
    }
    toast.trigger({ type: "success", content: "Freshservice validated successfully" });
    freshserviceValidateButton.innerText = "Validated";
    freshserviceValidateButton.loading = false;
    freshserviceValidateButton.disabled = true;

    if (isInEditConfig) {
      await createFreshserviceConnection();
    }

    // get all locations for site mapping
    const locationsRes = await client.request.invokeTemplate("getLocations", {
      context: { host: freshserviceDomain, apikey: apikey },
    });
    const locationsData = JSON.parse(locationsRes.response);
    fsLocations = locationsData.locations.map((loc) => ({
      value: loc.id,
      text: loc.name,
    }));

    if (!isInEditConfig) {
      await fetchAndRenderWorkspaces();
    }
  } catch (error) {
    console.log("Error in Freshservice validation", error);
    validationChecklist.freshservice = false;
    if (error.status == 403) {
      const parsedResponse = JSON.parse(error.response);
      const message = parsedResponse.code + ": " + parsedResponse.message;
      freshserviceValidateButton.loading = false;
      if (message.startsWith("access")) {
        toast.trigger({ type: "error", content: "Invalid domain or API key" });
        return;
      }
      toast.trigger({ type: "error", content: message });
    } else if (error.errors) {
      freshserviceValidateButton.loading = false;
      toast.trigger({ type: "error", content: "Domain must be in this format 'domain.freshservice.com'" });
    } else {
      const errorMsg = error?.message || "Invalid domain or API key";
      freshserviceValidateButton.loading = false;
      toast.trigger({ type: "error", content: errorMsg });
    }
  }
}

async function authConnection(options, app_connection, app_name) {
  try {
    const auth_connection = await client.request.invoke("authConnection", {
      ...options,
      app1_connection_id: user?.app1_connection_id || null,
      app2_connection_id: user?.app2_connection_id || null,
    });
    const connectionId = auth_connection.response?.data?.id;
    if (connectionId) {
      if (options.isApp1) {
        user[app_connection] = connectionId;
        validationChecklist.freshservice = true;
        freshserviceValidateButton.innerText = "Validated";
        freshserviceValidateButton.disabled = true;
        freshserviceValidateButton.loading = false;
        superopsTab.disabled = false;
      }
      if (options.isApp2) {
        user[app_connection] = connectionId;
        validationChecklist.superops = true;
        superopsValidateButton.loading = false;
        superopsValidateButton.innerText = "Validated";
        superopsValidateButton.disabled = true;
        fieldMappingTab.disabled = false;
        if (!autoTabSwitch.superops) {
          tab.activeTabIndex = 2;
          autoTabSwitch.superops = true;
        }
        boot();
        toast.trigger({
          type: "success",
          content: `${capitalizeFirstLetter(app_name)} validated successfully`,
        });
      }
    }
    return true;
  } catch (error) {
    console.log("Error in connection authentication", error);
    freshserviceValidateButton.loading = false;
    toast.trigger({
      type: "error",
      content: `${capitalizeFirstLetter(app_name)} authentication failed`,
    });
  }
}

async function validateSuperops() {
  try {
    const domain = superopsDomainField.value;
    const apikey = superopsApikeyField.value;
    const region = superopsRegionField.value;
    superopsValidateButton.loading = true;

    if (!domain) {
      superopsDomainField.focus();
      superopsValidateButton.loading = false;
      showInputError(superopsDomainField, "Please enter your Superops domain.");
      toast.trigger({ type: "error", content: "Please enter your Superops domain." });
      return;
    }
    if (!apikey) {
      superopsApikeyField.setFocus();
      superopsValidateButton.loading = false;
      showInputError(superopsApikeyField, "Please enter your Superops API key.");
      toast.trigger({ type: "error", content: "Please enter your Superops API key." });
      return;
    }
    if (!region) {
      superopsRegionField.focus();
      superopsValidateButton.loading = false;
      showInputError(superopsRegionField, "Please enter your data center region.");
      toast.trigger({ type: "error", content: "Please enter your data center region." });
      return;
    }

    const dataCenter = region.toLowerCase() === "us" ? usDataCenter : euDataCenter;
    const body = {
      query: "query getAssetClassListV3($listInfo: ListInfoInput!) {\n  getAssetClassListV3(listInfo: $listInfo) {   assetClass {   classId      name     moduleType      isNonMonitored       isSystemGenerated    }   listInfo {       totalCount        page        pageSize    }  }}",
      variables: { listInfo: { pageSize: 100 } },
    };

    await client.request.invokeTemplate("getAssets", {
      context: {
        host: dataCenter + ".superops.ai",
        path: "/" + superopsAccountType,
        token: superopsApikeyField.value,
        domain: superopsDomainField.value,
      },
      body: JSON.stringify(body),
    });

    initFieldMapping(
      domain,
      apikey,
      freshserviceDomainField?.value,
      freshserviceApikeyField?.value,
      region,
      superopsAccountType,
    );

    if (superopsDomainFromIparams !== domain && superopsDomainFromIparams.length) {
      user.app1_connection_id = "";
      user.app2_connection_id = "";
    }

    await createConnection();
    superopsValidateButton.innerText = "Validated";
    superopsValidateButton.disabled = true;
    fieldMappingTab.disabled = false;

    if (validatedSuperopsDomain && validatedSuperopsDomain !== domain) {
      if (typeof resetBootState === "function") {
        resetBootState();
      }
      if (resetSiteMapping) {
        resetSiteMapping();
      }
      toast.trigger({
        type: "info",
        content: "SuperOps domain changed. Asset mapping and site mapping have been reset.",
      });
      tab.activeTabIndex = 2;
      await boot();
    }
    validatedSuperopsDomain = domain;

    // fetch sites for site mapping (in asset mapping tab)
    const sites = await getAllSuperOpsSites(
      dataCenter + ".superops.ai",
      "/" + superopsAccountType,
      superopsDomainField.value,
      superopsApikeyField.value,
    );
    initSiteMappingWithData(sites);

  } catch (error) {
    console.log("Error in validating superops", error);
    superopsValidateButton.loading = false;
    validationChecklist.superops = false;
    if (error.status == 403) {
      const parsedResponse = JSON.parse(error.response);
      const message = parsedResponse.code + ": " + parsedResponse.message;
      superopsValidateButton.loading = false;
      if (message.startsWith("access")) {
        toast.trigger({ type: "error", content: "Invalid domain or API key" });
        return;
      }
      toast.trigger({ type: "error", content: message });
    } else if (error.errors) {
      const message = error.errors[0].message;
      superopsValidateButton.loading = false;
      toast.trigger({ type: "error", content: message });
    } else {
      const errorMsg = error?.message || "Invalid credentials";
      superopsValidateButton.loading = false;
      toast.trigger({ type: "error", content: errorMsg });
    }
  }
}

async function getAdminAccessToken() {
  try {
    const tokenResponse = await client.request.invokeTemplate("getAdminAccessToken", {
      context: { host: adminDomain },
      body: JSON.stringify({ email: adminEmail, password: adminPassword }),
    });
    const adminAccessToken = JSON.parse(tokenResponse.response)?.accessToken;
    if (adminAccessToken) {
      user.admin_token = adminAccessToken;
    }
    return adminAccessToken;
  } catch (error) {
    console.log("Error in fetching admin token", error);
    throw error;
  }
}

function dataToPostConfig() {
  // Build the combined siteSeverityMapping for backward compatibility
  const combinedSiteSeverity = {
    siteLocationMapping: siteMapping?.siteLocationMapping || [],
    severityPriorityMapping: severityMapping?.severityPriorityMapping || [],
  };

  const data = {
    domain: adminDomain,
    freshserviceDomain: freshserviceDomainField?.value,
    freshserviceApikey: freshserviceApikeyField?.value,
    accessToken: user.admin_token,
    tenantId: user.id,
    isInEditConfig: isInEditConfig,
    superopsDomain: superopsDomainField?.value,
    superopsApikey: superopsApikeyField?.value,
    freshserviceConnectionId: user.app1_connection_id,
    superopsConnectionId: user.app2_connection_id,
    FreshserviceConnectionName: freshserviceConnectionName,
    superopsConnectionName: superopsConnectionName,
    superopsRegion: superopsRegionField?.value,
    superopsAccountType: superopsAccountType,
    assetMappingData: typeof fieldMappingResult !== "undefined" ? fieldMappingResult : [],
    tenantToken: user.tenant_token,
    sinceDate: sinceDateField?.value,
    siteSeverityMapping: combinedSiteSeverity,
    ticketForm: ticketForm,
    formattedTicketForm: formattedTicketForm,
    adminEmail: adminEmail,
    adminPassword: adminPassword,
  };
  return data;
}

async function autoLoginAndValidation(iparams) {
  try {
    autoTabSwitch = {
      freshservice: true,
      superops: true,
      assetMapping: true,
      siteSeverityMapping: true,
    };
    validatedSuperopsDomain = iparams?.superopsDomain;
    const isLoginSuccessful = true;
    const selectedSinceDate = iparams.sinceDate;

    if (isLoginSuccessful) {
      freshserviceValidateButton.loading = true;
      user.app1_connection_id = iparams?.freshserviceConnectionId;
      freshserviceDomainField.disabled = true;

      toast.trigger({ type: "success", content: `${capitalizeFirstLetter(freshserviceAppName)} validated successfully` });
      validationChecklist.freshservice = true;
      freshserviceValidateButton.loading = false;
      freshserviceValidateButton.innerText = "Validated";
      freshserviceValidateButton.disabled = true;
      superopsTab.disabled = false;
      tab.activeTabIndex = 1;

      await superopsRegionField.setSelectedValues(iparams.superopsRegion);
      user.app2_connection_id = iparams?.superopsConnectionId;
      toast.trigger({ type: "success", content: `${capitalizeFirstLetter(superopsAppName)} validated successfully` });
      validationChecklist.superops = true;
      superopsValidateButton.loading = false;
      superopsValidateButton.innerText = "Validated";
      superopsValidateButton.disabled = true;
      freshserviceConnectionName = iparams.freshserviceConnectionName;
      superopsConnectionName = iparams.superopsConnectionName;
      isUserLoggedinInEditConfig = true;
      isInEditConfig = true;
      user.id = iparams.tenantId;
      superopsDomainFromIparams = iparams.superopsDomain;

      // field mapping pre filling values
      initFieldMapping(
        iparams.superopsDomain,
        iparams.superopsApikey,
        iparams.freshserviceDomain,
        iparams.freshserviceApikey,
        iparams.superopsRegion,
        iparams.superopsAccountType,
      );
      bootDone = false;
      fieldMappingTab.disabled = false;
      tab.activeTabIndex = 2;
      await boot(iparams.assetMapping);

      const [day, month, year] = selectedSinceDate.split("-");
      const isoDate = `${year}-${month}-${day}`;
      const assetmappingButton = document.getElementById("validate-btn");
      if (assetmappingButton) {
        assetmappingButton.disabled = true;
        assetmappingButton.textContent = "Saved Mappings";
      }
      sinceDateField.value = isoDate;
      sinceDateField.setAttribute("value", isoDate);
      validationChecklist.sinceDate = true;
      validationChecklist.fieldMapping = true;

      // fetch locations
      const locationsRes = await client.request.invokeTemplate("getLocations", {
        context: {
          host: removeProtocol(iparams?.freshserviceDomain),
          apikey: iparams?.freshserviceApikey,
        },
      });
      const locationsData = JSON.parse(locationsRes.response);
      fsLocations = locationsData.locations.map((loc) => ({
        value: loc.id,
        text: loc.name,
      }));

      // fetch sites
      const superopsDomain = iparams.superopsRegion === "us" ? "api" : "euapi";
      const url = superopsDomain + ".superops.ai";
      const sites = await getAllSuperOpsSites(
        url,
        "/" + iparams.superopsAccountType,
        iparams.superopsDomain,
        iparams.superopsApikey,
      );

      // init severity mapping (static — always ready)
      initSeverityMapping();
      // init site mapping with fetched sites
      initSiteMappingWithData(sites);

      // pre-populate site & severity from saved iparams
      populateMappings(iparams.siteSeverityMapping);

      const savedSiteRows = iparams.siteSeverityMapping?.siteLocationMapping || [];
      const savedSeverityRows = iparams.siteSeverityMapping?.severityPriorityMapping || [];

      // site mapping: show/hide save button and set validation based on saved row count
      if (savedSiteRows.length > 0) {
        if (saveSiteMappingButton) {
          saveSiteMappingButton.style.display = "";
          saveSiteMappingButton.disabled = true;
          saveSiteMappingButton.textContent = "Saved Site Mappings";
        }
        validationChecklist.siteMapping = true;
      } else {
        if (saveSiteMappingButton) {
          saveSiteMappingButton.style.display = "none";
        }
        validationChecklist.siteMapping = true; // no rows = nothing to save = valid
      }
      siteMapping = { siteLocationMapping: savedSiteRows };

      // severity mapping: show/hide save button and set validation based on saved row count
      if (savedSeverityRows.length > 0) {
        if (saveSeverityMappingButton) {
          saveSeverityMappingButton.style.display = "";
          saveSeverityMappingButton.disabled = true;
          saveSeverityMappingButton.textContent = "Saved Severity Mappings";
        }
        validationChecklist.severityMapping = true;
      } else {
        if (saveSeverityMappingButton) {
          saveSeverityMappingButton.style.display = "none";
        }
        validationChecklist.severityMapping = true; // no rows = nothing to save = valid
      }
      severityMapping = { severityPriorityMapping: savedSeverityRows };

      toast.trigger({ type: "success", content: "Asset sync configuration saved successfully" }); // new
      // toast.trigger({ type: "success", content: "Mapping saved successfully" }); // new

      ticketFormTab.disabled = false;
      showTicketFormLoader("Setting up ticket form…");

      await fetchAndRenderWorkspaces();

      if (iparams.ticketForm?.workspace_id) {
        selectedWorkspaceId = String(iparams.ticketForm.workspace_id);
        console.log("ws select element", workspaceSelect, "selected workspace id", selectedWorkspaceId);
        if (workspaceSelect?.options?.length) {
          workspaceSelect.value = selectedWorkspaceId;
          console.log("test-0", workspaceSelect.value);
        }
        await loadTicketFieldsForWorkspace(selectedWorkspaceId);
      }
      console.log("test-1", workspaceSelect.value);
      await populateTicketForm(iparams.ticketForm);
      console.log("test-2", workspaceSelect.value);
      hideTicketFormLoader();
      tab.activeTabIndex = 3;
      toast.trigger({ type: "success", content: "Alert sync configuration saved successfully" });
      validationChecklist.ticketForm = true;

      // keep combined alias in sync
      siteSeverityMapping = iparams.siteSeverityMapping;
      fieldMappingResult = iparams.assetMapping;
      formattedTicketForm = iparams.formattedTicketForm;
      ticketForm = iparams.ticketForm;

    } else {
      validationChecklist.login = false;
    }
  } catch (error) {
    console.log("Error in pre populating the value", error);
    toast.trigger({ type: "error", content: "Failed to pre fill values" });
  }
}

async function getTenantToken() {
  try {
    if (!user.id) {
      console.log("Tenant ID not found", user);
      toast.trigger({ type: "error", content: "Tenant ID not found" });
      return;
    }
    const getToken = await client.request.invokeTemplate("getTenantToken", {
      context: { host: adminDomain, tenantId: user.id, token: user.admin_token },
    });
    const token = JSON.parse(getToken.response)?.token;
    user.tenant_token = token;
    return token;
  } catch (error) {
    console.log("Error in fetching tenant token", error);
    throw error;
  }
}

async function validate() {
  try {
    const isSuperopsDomainChanged =
      superopsDomainFromIparams.length &&
      superopsDomainFromIparams !== superopsDomainField.value;

    if (!validationChecklist.freshservice) {
      toast.trigger({ type: "error", content: "Please complete Freshservice validation" });
      tab.activeTabIndex = 0;
      return false;
    }
    if (!validationChecklist.superops) {
      toast.trigger({ type: "error", content: "Please complete Superops validation" });
      tab.activeTabIndex = 1;
      return false;
    }
    if (!sinceDateField.value) {
      toast.trigger({ type: "error", content: "Please select a Since Date in the Asset Sync Configuration tab" });
      tab.activeTabIndex = 2;
      return false;
    }
    // site mapping now lives in asset mapping tab (tab index 2)
    if (!validationChecklist.siteMapping) {
      toast.trigger({ type: "error", content: "Please save the Site-to-Location mapping in the Asset Sync Configuration tab" });
      tab.activeTabIndex = 2;
      return false;
    }
    if (!validationChecklist.fieldMapping) {
      toast.trigger({ type: "error", content: "Please complete the asset mapping before proceeding" });
      tab.activeTabIndex = 2;
      return false;
    }
    // severity mapping now lives in ticket form tab (tab index 3)
    if (!validationChecklist.severityMapping) {
      toast.trigger({ type: "error", content: "Please save the Severity-to-Priority mapping in the Alert Sync Configuration tab" });
      tab.activeTabIndex = 3;
      return false;
    }
    if (!validationChecklist.ticketForm) {
      toast.trigger({ type: "error", content: "Please provide values for the ticket form fields and save the configuration" });
      tab.activeTabIndex = 3;
      return false;
    }

    await getAdminAccessToken();
    await getTenantToken();

    // build combined siteSeverityMapping for the server
    const combinedSiteSeverity = {
      siteLocationMapping: siteMapping?.siteLocationMapping || [],
      severityPriorityMapping: severityMapping?.severityPriorityMapping || [],
    };

    if (isInEditConfig && !isSuperopsDomainChanged) {
      await client.request.invoke("updateKonnector", {
        isInstallationPhase: isInEditConfig,
        tenantId: user.id || "",
        accessToken: user.admin_token || "",
        soDomain: adminDomain,
        since: sinceDateField?.value,
        assetMapping: typeof fieldMappingResult !== "undefined" ? fieldMappingResult : [],
        freshserviceAppName: "Freshservice",
        freshserviceAppId: "freshservice-1.0.0",
        superopsAppId: "superopsit-1.0.0",
        superopsAppName: "SuperOps IT",
        freshserviceConnectionName: freshserviceConnectionName,
        freshserviceConnectionId: user.app1_connection_id,
        superopsConnectionId: user.app2_connection_id,
        superopsConnectionName: superopsConnectionName,
        siteSeverityMapping: combinedSiteSeverity,
        ticketForm: ticketForm,
        formattedTicketForm: formattedTicketForm,
      });
      return true;
    }

    console.log(`Superops domain changed from ${superopsDomainFromIparams} to ${superopsDomainField.value}`);
    if (isInEditConfig && isSuperopsDomainChanged) {
      await client.request.invoke("updateKonnector", {
        isSuperopsDomainChanged: isSuperopsDomainChanged,
        tenantId: user.id || "",
        accessToken: user.admin_token || "",
        adminDomain: adminDomain,
        tenantToken: user.tenant_token,
        assetMapping: typeof fieldMappingResult !== "undefined" ? fieldMappingResult : [],
        freshserviceAppId: "freshservice-1.0.0",
        freshserviceAppName: "Freshservice",
        freshserviceConnectionId: user.app1_connection_id,
        superopsAppId: "superopsit-1.0.0",
        superopsAppName: "SuperOps IT",
        superopsConnectionId: user.app2_connection_id,
        superopsAccountType: "it",
        freshserviceConnectionName: freshserviceConnectionName,
        superopsConnectionName: superopsConnectionName,
        siteSeverityMapping: combinedSiteSeverity,
        since: sinceDateField?.value,
        isInEditConfig: true,
        ticketForm: ticketForm,
        formattedTicketForm: formattedTicketForm,
        adminEmail: adminEmail,
        adminPassword: adminPassword,
      });
    }
    return true;
  } catch (error) {
    console.log("Error in validate function", error);
  }
}

async function createConnection() {
  try {
    const now = new Date();
    const isoString = now.toISOString();
    const dataCenter = superopsRegionField.value.toLowerCase() === "us" ? usDataCenter : euDataCenter;
    const superopsAppName = "SuperOps IT";
    let freshserviceDomain = freshserviceDomainField?.value;
    let superopsDomain = superopsDomainField?.value;

    await getAdminAccessToken();
    await registerNewTenant();
    await getTenantToken();

    freshserviceDomain = freshserviceDomain.replace(/^https?:\/\//, "");
    freshserviceDomain = freshserviceDomain.replace(/\.freshservice\.com$/, "");
    freshserviceDomain = freshserviceDomain.trim();

    const freshserviceOptions = {
      name: `Freshservice Connection - ${isoString}`,
      subDomain: adminDomain,
      appId: freshserviceAppId,
      token: user.tenant_token,
      data: { domain: freshserviceDomain, api_key: freshserviceApikeyField?.value },
      isApp1: true,
    };
    freshserviceConnectionName = `Freshservice Connection - ${isoString}`;
    await authConnection(freshserviceOptions, "app1_connection_id", freshserviceAppName);

    superopsDomain = superopsDomain.replace(/^https?:\/\//, "");
    superopsDomain = superopsDomain.replace(/\.superops\.ai$/, "");
    superopsDomain = superopsDomain.trim();

    const superopsOptions = {
      name: `Superops Connection - ${isoString}`,
      subDomain: adminDomain,
      appId: "superopsit-1.0.0",
      token: user.tenant_token,
      data: {
        domain: superopsDomain,
        base_url: "https://" + dataCenter + ".superops.ai/" + superopsAccountType,
        api_key: superopsApikeyField?.value,
      },
      isApp2: true,
    };
    superopsConnectionName = `Superops Connection - ${isoString}`;
    await authConnection(superopsOptions, "app2_connection_id", superopsAppName);
  } catch (error) {
    console.log("Error in create connection", error);
    superopsValidateButton.loading = false;
    throw error;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// POPULATE MAPPINGS (pre-fill on edit)
// populateMappings now only writes to the DOM; it does NOT set saved-state flags.
// The caller (autoLoginAndValidation) handles those.
// ═══════════════════════════════════════════════════════════════════════════════
function populateMappings(data) {
  if (!data) return;

  // SITE → LOCATION (in asset mapping tab)
  const siteContainer = document.getElementById("siteMappingContainer");
  if (siteContainer) {
    siteContainer.innerHTML = "";
    data.siteLocationMapping?.forEach((item) => {
      const row = createMappingRow("so-site", "fs-location");
      siteContainer.appendChild(row);
      const siteDropdown = row.querySelector(".so-site");
      const locationDropdown = row.querySelector(".fs-location");
      siteDropdown.options = superopsSites;
      locationDropdown.options = fsLocations;
      siteDropdown.value = item.superops_site;
      locationDropdown.value = item.freshservice_location;
    });
  }

  // SEVERITY → PRIORITY (in ticket form tab)
  const severityContainer = document.getElementById("severityMappingContainer");
  if (severityContainer) {
    severityContainer.innerHTML = "";
    data.severityPriorityMapping?.forEach((item) => {
      const row = createMappingRow("so-severity", "fs-priority");
      severityContainer.appendChild(row);
      const severityDropdown = row.querySelector(".so-severity");
      const priorityDropdown = row.querySelector(".fs-priority");
      severityDropdown.options = severity;
      priorityDropdown.options = priority;
      severityDropdown.value = item.superops_severity;
      priorityDropdown.value = item.freshservice_priority;
    });
  }
}

function createMappingRow(leftClass, rightClass) {
  const row = document.createElement("div");
  row.className = "mapping-row";
  row.innerHTML = `
    <fw-select class="${leftClass}"></fw-select>
    <span class="arrow-icon">→</span>
    <fw-select class="${rightClass}"></fw-select>
    <fw-button class="delete-btn" color="text">
        <fw-icon name="delete" size="18"></fw-icon>
    </fw-button>
  `;
  return row;
}

// ═══════════════════════════════════════════════════════════════════════════════
// TICKET FORM — POPULATE
// ═══════════════════════════════════════════════════════════════════════════════
async function populateTicketForm(data) {
  if (!data) return;
  const container = document.getElementById("ticketFormContainer");

  container.querySelectorAll("fw-input[data-fieldname]").forEach((el) => {
    const key = el.getAttribute("data-fieldname");
    if (data[key] !== undefined) el.value = data[key];
  });
  container.querySelectorAll("fw-textarea[data-fieldname]").forEach((el) => {
    const key = el.getAttribute("data-fieldname");
    if (data[key] !== undefined) el.value = data[key];
  });
  container.querySelectorAll("fw-datepicker[data-fieldname]").forEach((el) => {
    const key = el.getAttribute("data-fieldname");
    if (data[key] !== undefined) el.value = data[key];
  });
  container.querySelectorAll("input[type='checkbox'][data-fieldname]").forEach((el) => {
    const key = el.getAttribute("data-fieldname");
    if (data[key] !== undefined) el.checked = !!data[key];
  });

  await populateSelectFields(container, data);
  await populateAsyncFields(container, data);

  if (saveFormButton) {
    saveFormButton.disabled = true;
    saveFormButton.textContent = "Configuration Saved";
  }
  validationChecklist.ticketForm = true;
}

async function populateSelectFields(container, data) {
  const wrappers = container.querySelectorAll("[data-fieldname]");
  for (const wrapper of wrappers) {
    const fieldMeta = wrapper.__fieldMeta;
    if (!fieldMeta || !fieldMeta.choices) continue;
    await populateNestedDropdown(wrapper, fieldMeta, data);
  }
}

async function populateNestedDropdown(container, field, data) {
  let currentChoices = field.choices;
  let level = 1;
  while (true) {
    const fieldName = level === 1 ? field.name : field.nested_fields?.[level - 2]?.name;
    if (!fieldName) break;
    const value = data[fieldName];
    if (!value) break;
    let select;
    if (level === 1) {
      select = container.querySelector("fw-select");
    } else {
      select = container.querySelector(`fw-select[data-level="${level}"]`);
    }
    if (!select) break;
    select.options = mapOptions(currentChoices);
    select.value = value;
    const selected = currentChoices.find((c) => c.id == value);
    if (!selected || !selected.nested_options) break;
    const nextField = field.nested_fields?.[level - 1];
    if (!nextField) break;
    const wrapper = document.createElement("div");
    wrapper.classList.add("nested-select-wrapper");
    const nextSelect = document.createElement("fw-select");
    nextSelect.setAttribute("label", nextField.label);
    nextSelect.setAttribute("name", nextField.name);
    nextSelect.setAttribute("data-level", level + 1);
    nextSelect.setAttribute("data-fieldname", nextField.name);
    nextSelect.options = mapOptions(selected.nested_options);
    wrapper.appendChild(nextSelect);
    container.appendChild(wrapper);
    currentChoices = selected.nested_options;
    level++;
    await customElements.whenDefined("fw-select");
    await new Promise((r) => requestAnimationFrame(r));
  }
}

async function populateAsyncFields(container, data) {
  const inputs = container.querySelectorAll("input.async-search-input[data-fieldname]");
  for (const input of inputs) {
    const key = input.getAttribute("data-fieldname");
    const value = data[key];
    if (!value) continue;
    input.dataset.value = value;
    let displayName = value;
    if (key === "requester") {
      const requester = await getRequesterById(value);
      if (requester) {
        displayName =
          requester.name ||
          `${requester.first_name || ""} ${requester.last_name || ""}`.trim() ||
          requester.primary_email;
      }
    }
    if (key === "agent") {
      const agent = await getAgentById(value);
      if (agent) {
        displayName =
          agent.name ||
          `${agent.first_name || ""} ${agent.last_name || ""}`.trim() ||
          agent.email;
      }
    }
    input.value = displayName;
  }
}

async function getRequesterById(id) {
  try {
    const fsDomain = removeProtocol(freshserviceDomainField?.value);
    const fsApikey = freshserviceApikeyField?.value;
    const getRequesterById = await client.request.invokeTemplate("getRequesterById", {
      context: { host: fsDomain, apikey: fsApikey, requesterId: id },
    });
    const data = JSON.parse(getRequesterById.response);
    return data.requester;
  } catch (err) {
    console.log("Error in fetching requester by ID", err);
    return null;
  }
}

async function getAgentById(id) {
  try {
    const fsDomain = removeProtocol(freshserviceDomainField?.value);
    const fsApikey = freshserviceApikeyField?.value;
    const getAgentById = await client.request.invokeTemplate("getAgentById", {
      context: { host: fsDomain, apikey: fsApikey, agentId: id },
    });
    const data = JSON.parse(getAgentById.response);
    return data.agent;
  } catch (err) {
    console.log("Error in fetching agent by ID", err);
    return null;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// SUPEROPS SITES
// ═══════════════════════════════════════════════════════════════════════════════
async function getAllSuperOpsSites(host, path, domain, token) {
  const query = `
    query getSiteList($input: ListInfoInput!) {
      getSiteList(input: $input) {
        sites { id name }
        listInfo { page pageSize hasMore }
      }
    }`;
  let page = 1;
  const pageSize = 100;
  let hasMore = true;
  let allSites = [];
  try {
    while (hasMore) {
      const variables = { input: { page, pageSize } };
      const response = await client.request.invokeTemplate("getAllSiteFromSuperops", {
        body: JSON.stringify({ query, variables }),
        context: { host, path, domain, token },
      });
      const data = JSON.parse(response.response);
      const result = data?.data?.getSiteList;
      const sites = result?.sites || [];
      allSites = allSites.concat(sites);
      hasMore = result?.listInfo?.hasMore === true;
      page++;
    }
    return allSites.map((site) => ({ value: site.id, text: site.name }));
  } catch (error) {
    console.error("Error fetching all sites:", error);
    throw error;
  }
}

async function createFreshserviceConnection() {
  try {
    const now = new Date();
    const isoString = now.toISOString();
    let freshserviceDomain = freshserviceDomainField?.value;
    await getAdminAccessToken();
    await getTenantToken();
    freshserviceDomain = freshserviceDomain.replace(/^https?:\/\//, "");
    freshserviceDomain = freshserviceDomain.replace(/\.freshservice\.com$/, "");
    freshserviceDomain = freshserviceDomain.trim();
    const freshserviceOptions = {
      name: `Freshservice Connection - ${isoString}`,
      subDomain: adminDomain,
      appId: freshserviceAppId,
      token: user.tenant_token,
      data: { domain: freshserviceDomain, api_key: freshserviceApikeyField?.value },
      isApp1: true,
    };
    freshserviceConnectionName = `Freshservice Connection - ${isoString}`;
    const auth_connection = await client.request.invoke("authConnection", {
      ...freshserviceOptions,
      app1_connection_id: user?.app1_connection_id || null,
    });
    const connectionId = auth_connection.response?.data?.id;
    if (connectionId) {
      user.app1_connection_id = connectionId;
      validationChecklist.freshservice = true;
      freshserviceValidateButton.innerText = "Validated";
      freshserviceValidateButton.disabled = true;
      freshserviceValidateButton.loading = false;
    }
  } catch (error) {
    console.log("Error in creating freshservice connection", error);
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// ASSET MAPPING
// ═══════════════════════════════════════════════════════════════════════════════
async function fetchAssetClassPage(apiKey, page) {
  const res = await client.request.invokeTemplate("getAssets", {
    context: { host: SO_HOST, domain: SO_SUBDOMAIN, token: `${apiKey}`, path: SO_PATH },
    body: JSON.stringify({
      query: GQL_ASSET_CLASSES,
      variables: { listInfo: { page, pageSize: PAGE_SIZE } },
    }),
  });
  const data = JSON.parse(res.response)?.data?.getAssetClassListV3;
  if (!data || !data.assetClass?.length) {
    return { assetClass: [], listInfo: { totalCount: 0, page, pageSize: PAGE_SIZE } };
  }
  return data;
}

async function apiGetAssetClasses(apiKey) {
  const first = await fetchAssetClassPage(apiKey, 1);
  const { totalCount, pageSize } = first.listInfo;
  let allAssetClass = [...first.assetClass];
  const totalPages = Math.ceil(totalCount / pageSize);
  if (totalPages > 1) {
    const rest = Array.from({ length: totalPages - 1 }, (_, i) => i + 2);
    const results = await Promise.all(rest.map((page) => fetchAssetClassPage(apiKey, page)));
    results.forEach((r) => allAssetClass.push(...r.assetClass));
  }
  return allAssetClass.map((asset) => ({ id: String(asset.classId), name: asset.name }));
}

async function apiGetAssetFields(apiKey, classID) {
  const res = await client.request.invokeTemplate("getAssets", {
    context: { host: SO_HOST, domain: SO_SUBDOMAIN, token: `${apiKey}`, path: SO_PATH },
    body: JSON.stringify({
      query: GQL_ASSET_FIELDS,
      variables: { input: { classId: classID } },
    }),
  });
  const json = JSON.parse(res.response);
  const result = json.data.getAssetClassFieldsForIntegration;
  if (!result) return [];
  const { fields, keyFields = [] } = result;
  return fields.map((field) => ({
    id: field.fieldKey,
    name: field.fieldLabel,
    type: field.isCustomField ? "custom" : "standard",
    isKeyField: keyFields.includes(field.fieldKey),
  }));
}

function showLoader(container, id, msg) {
  if (!container) return;
  let loader = document.getElementById(id);
  if (!loader) {
    loader = document.createElement("div");
    loader.id = id;
    loader.className = "tab-loader";
    loader.innerHTML = `
      <div class="tab-loader__spinner"></div>
      <span class="tab-loader__msg" id="${id}-msg">${esc(msg)}</span>`;
    container.classList.add("tab-loader-host");
    container.appendChild(loader);
  } else {
    document.getElementById(`${id}-msg`).textContent = msg;
    loader.classList.remove("tab-loader--hidden");
  }
}

function hideLoader(id) {
  const loader = document.getElementById(id);
  if (loader) loader.classList.add("tab-loader--hidden");
}

function showTabLoader(msg = "Loading asset classes…") {
  showLoader(
    document.querySelector('fw-tab-panel[name="fieldMapping"] .tab-area'),
    "fm-tab-loader",
    msg
  );
}
function hideTabLoader() { hideLoader("fm-tab-loader"); }

function showTicketFormLoader(msg = "Loading ticket form…") {
  showLoader(
    document.querySelector('fw-tab-panel[name="ticketForm"]'),
    "tf-tab-loader",
    msg
  );
}
function hideTicketFormLoader() { hideLoader("tf-tab-loader"); }

async function boot(existingMappings = []) {
  if (bootDone) return;
  showTabLoader("Loading…");
  try {
    const [soResult, fsResult] = await Promise.all([
      apiGetAssetClasses(SO_API_KEY),
      apiGetFsAssetTypes(),
    ]);
    soClasses = soResult;
    fsTypes = fsResult;
    bootDone = true;
    if (existingMappings.length) {
      await prefillPairs(existingMappings);
    }
  } catch (error) {
    console.error("Boot failed:", error);
    const errEl = document.getElementById("empty-state");
    if (errEl) {
      errEl.innerHTML = `
        <div style="font-size:22px;opacity:.4">⚠</div>
        <div style="font-size:14px;font-weight:600;color:#b91c1c">Failed to load data</div>
        <div style="font-size:12px;color:#9ca3af;margin-bottom:4px">${esc(error.message)}</div>
        <fw-button color="primary" size="small" onclick="bootDone=false;boot()">Retry</fw-button>`;
    }
  } finally {
    hideTabLoader();
    renderAll();
  }
}

function initFieldMapping(subdomain, apiKey, fsDomain, fsApikey, region) {
  SO_SUBDOMAIN = subdomain;
  SO_API_KEY = apiKey;
  FS_DOMAIN = fsDomain;
  FS_API_KEY = fsApikey;
  SO_HOST = (region === "us" ? "api" : "euapi") + ".superops.ai";
  SO_PATH = "/it";
  if (fieldMappingEventsBound) return;
  fieldMappingEventsBound = true;
  const tabs = document.getElementById("tabs");
  if (tabs) {
    tabs.addEventListener("fwChange", (event) => {
      if (event.detail?.tabIndex === 2) {
        boot();
      }
    });
  }
  document.getElementById("add-btn").addEventListener("fwClick", addPair);
  document.getElementById("validate-btn").addEventListener("fwClick", validateFieldMapping);
  document.getElementById("del-cancel").addEventListener("fwClick", () => {
    document.getElementById("del-modal").classList.remove("show");
    delTarget = null;
  });
  document.getElementById("del-confirm").addEventListener("fwClick", () => {
    if (delTarget !== null) {
      pairs = pairs.filter((p) => p.id !== delTarget);
      markFieldMappingDirty();
      renderAll();
    }
    document.getElementById("del-modal").classList.remove("show");
    delTarget = null;
  });
}

function addPair() {
  markFieldMappingDirty();
  pairs.push({
    id: nextId++,
    soId: "", soName: "",
    fsId: "", fsName: "",
    soFields: [], fsFields: [],
    mappings: {},
    selOpen: true,
    drOpen: false,
    fieldsLoading: false,
  });
  renderAll();
  setTimeout(() => {
    document.getElementById(`pair-${pairs[pairs.length - 1].id}`)?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, 60);
}

function openDelModal(id) {
  const selectedCard = pairs.find((x) => x.id === id);
  delTarget = id;
  document.getElementById("del-msg").textContent =
    selectedCard?.soName && selectedCard?.fsName
      ? `Remove mapping "${selectedCard.soName} → ${selectedCard.fsName}"?`
      : "Remove this asset mapping?";
  document.getElementById("del-modal").classList.add("show");
}

function toggleSel(id) {
  const pair = pairs.find((x) => x.id === id);
  if (!pair) return;
  pair.selOpen = !pair.selOpen;
  if (pair.selOpen) pair.drOpen = false;
  renderPair(pair);
}

async function onSoClassChange(id) {
  const selectedCard = pairs.find((pair) => pair.id === id);
  if (!selectedCard) return;
  const superopsDropdown = document.getElementById(`so-sel-${id}`);
  const assetClassId = superopsDropdown?.value;
  if (!assetClassId) return;
  markFieldMappingDirty();
  if (assetClassId === selectedCard.soId && selectedCard.soFields.length) return;
  const freshserviceDropdown = document.getElementById(`fs-sel-${id}`);
  const currentFsId = freshserviceDropdown?.value || selectedCard.fsId;
  const currentFsName =
    (freshserviceDropdown?.value &&
      freshserviceDropdown.options[freshserviceDropdown.selectedIndex]?.text) ||
    selectedCard.fsName;
  if (assetClassId !== selectedCard.soId) {
    selectedCard.mappings = {};
    selectedCard.soFields = [];
    selectedCard.drOpen = false;
  }
  selectedCard.soId = assetClassId;
  selectedCard.soName = superopsDropdown.options[superopsDropdown.selectedIndex].text;
  if (currentFsId) {
    selectedCard.fsId = currentFsId;
    selectedCard.fsName = currentFsName;
  }
  setSelLoading(id, true);
  selectedCard.fieldsLoading = true;
  try {
    const fields = await apiGetAssetFields(SO_API_KEY, assetClassId);
    selectedCard._pendingSoFields = fields;
    selectedCard._pendingSoId = assetClassId;
  } catch (error) {
    console.log("Error in fetching superops asset fields", error);
    selectedCard._pendingSoFields = [];
    selectedCard._pendingSoId = assetClassId;
    fmToast(`Failed to load fields: ${error.message}`, "error");
  } finally {
    selectedCard.fieldsLoading = false;
    setSelLoading(id, false);
    if (selectedCard.fsId) {
      selectedCard.soFields = selectedCard._pendingSoFields ?? [];
      delete selectedCard._pendingSoFields;
      if (!selectedCard.fsFields.length) {
        const cacheKey = String(selectedCard.fsId);
        if (fsFieldCache[cacheKey]) {
          selectedCard.fsFields = fsFieldCache[cacheKey];
        } else {
          try {
            selectedCard.fsFields = await apiGetFsAssetFields(selectedCard.fsId);
            fsFieldCache[cacheKey] = selectedCard.fsFields;
          } catch (err) {
            console.log("Error in fetching freshservice asset type fields", err);
            fmToast(`Failed to load Freshservice fields`, "error");
          }
        }
      }
      selectedCard.selOpen = false;
      selectedCard.drOpen = true;
    }
    renderAll();
  }
}

function setSelLoading(id, loading) {
  const superopsLabel = document.getElementById(`so-lbl-${id}`);
  const spinner = document.getElementById(`so-spin-${id}`);
  if (superopsLabel) superopsLabel.style.opacity = loading ? "0.5" : "1";
  if (spinner) spinner.style.display = loading ? "inline-flex" : "none";
}

async function onFsTypeChange(id) {
  const selectedCard = pairs.find((x) => x.id === id);
  if (!selectedCard) return;
  const superopsDropdown = document.getElementById(`so-sel-${id}`);
  const freshserviceDropdown = document.getElementById(`fs-sel-${id}`);
  if (!freshserviceDropdown?.value) return;
  markFieldMappingDirty();
  const newlySelectedFsAssetId = freshserviceDropdown.value;
  const newlySelectedFsAssetName = freshserviceDropdown.options[freshserviceDropdown.selectedIndex].text;
  const newlySelectedSoAssetId = superopsDropdown?.value || selectedCard.soId;
  const newlySelectedSoAssetName =
    (superopsDropdown?.value && superopsDropdown.options[superopsDropdown.selectedIndex]?.text) ||
    selectedCard.soName;
  const soChanged = String(newlySelectedSoAssetId) !== String(selectedCard.soId);
  const fsChanged = String(newlySelectedFsAssetId) !== String(selectedCard.fsId);
  if (soChanged || fsChanged) {
    selectedCard.mappings = {};
    selectedCard.drOpen = false;
  }
  if (fsChanged) selectedCard.fsFields = [];
  selectedCard.soId = newlySelectedSoAssetId;
  selectedCard.soName = newlySelectedSoAssetName;
  selectedCard.fsId = newlySelectedFsAssetId;
  selectedCard.fsName = newlySelectedFsAssetName;
  selectedCard.soFields = selectedCard._pendingSoFields ?? selectedCard.soFields;
  delete selectedCard._pendingSoFields;
  if (!selectedCard.soId) { renderAll(); return; }
  const cacheKey = String(selectedCard.fsId);
  if (fsFieldCache[cacheKey]) {
    selectedCard.fsFields = fsFieldCache[cacheKey];
  } else {
    try {
      selectedCard.fsFields = await apiGetFsAssetFields(selectedCard.fsId);
      fsFieldCache[cacheKey] = selectedCard.fsFields;
    } catch (error) {
      console.log("Error in fetching freshservice asset fields", error);
      fmToast(`Failed to load Freshservice fields`, "error");
      return;
    }
  }
  selectedCard.selOpen = false;
  selectedCard.drOpen = true;
  renderAll();
}

function toggleDrawer(id) {
  const selectedCard = pairs.find((x) => x.id === id);
  if (!selectedCard || !selectedCard.soId) return;
  selectedCard.drOpen = !selectedCard.drOpen;
  if (selectedCard.drOpen) selectedCard.selOpen = false;
  renderPair(selectedCard);
  if (selectedCard.drOpen) {
    buildRows(selectedCard);
    setTimeout(() => {
      document.getElementById(`pair-${id}`)?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 80);
  }
}

function buildRows(selectedPair) {
  const fieldMappingContainer = document.getElementById(`rows-${selectedPair.id}`);
  if (!fieldMappingContainer) return;
  fieldMappingContainer.innerHTML = "";
  const SoAssetFieldCount = document.getElementById(`tc-${selectedPair.id}`);
  if (SoAssetFieldCount) SoAssetFieldCount.textContent = selectedPair.soFields.length;
  if (!selectedPair.soFields.length) {
    fieldMappingContainer.innerHTML = '<div style="padding:18px 14px;font-size:12px;color:#6b7280;">No fields found.</div>';
    return;
  }
  if (!selectedPair.mappings["assetId"] && selectedPair.fsFields.find((ff) => ff.id === "asset_tag")) {
    selectedPair.mappings["assetId"] = "asset_tag";
  }
  selectedPair.soFields.forEach((superopsField) => {
    const isLocked = superopsField.id === "assetId";
    const row = document.createElement("div");
    row.className = "map-row" + (isLocked ? " map-row-locked" : "");
    const soCell = document.createElement("div");
    soCell.className = "cell-so";
    soCell.innerHTML = `<div><div class="fn">${esc(superopsField.name)}</div></div>`;
    const middleCell = document.createElement("div");
    middleCell.className = "cell-mid";
    middleCell.textContent = "→";
    const fsCell = document.createElement("div");
    fsCell.className = "cell-fs";
    const fsSelectElement = document.createElement("select");
    fsSelectElement.className = "fs-sel";
    fsSelectElement.disabled = isLocked;
    if (isLocked) fsSelectElement.style.cssText = "opacity:.65;cursor:not-allowed;background:#f9fafb;";
    fsSelectElement.innerHTML = '<option value="">— Not mapped —</option>';
    const sortByLabel = (a, b) => a.l.localeCompare(b.l);
    const requiredFields = selectedPair.fsFields.filter((ff) => ff.required).sort(sortByLabel);
    const optionalFields = selectedPair.fsFields.filter((ff) => !ff.required).sort(sortByLabel);
    if (requiredFields.length) {
      const reqGroup = document.createElement("optgroup");
      reqGroup.label = "Required Fields";
      requiredFields.forEach((ff) => {
        const requiredOption = document.createElement("option");
        requiredOption.value = ff.id;
        requiredOption.textContent = `${ff.l} *`;
        if (String(selectedPair.mappings[String(superopsField.id)]) === String(ff.id)) requiredOption.selected = true;
        reqGroup.appendChild(requiredOption);
      });
      fsSelectElement.appendChild(reqGroup);
    }
    if (optionalFields.length) {
      const optGroup = document.createElement("optgroup");
      optGroup.label = "Optional Fields";
      optionalFields.forEach((ff) => {
        const optionalOption = document.createElement("option");
        optionalOption.value = ff.id;
        optionalOption.textContent = ff.l;
        if (String(selectedPair.mappings[String(superopsField.id)]) === String(ff.id)) optionalOption.selected = true;
        optGroup.appendChild(optionalOption);
      });
      fsSelectElement.appendChild(optGroup);
    }
    if (!isLocked) {
      fsSelectElement.addEventListener("change", () => {
        if (fsSelectElement.value) {
          selectedPair.mappings[superopsField.id] = fsSelectElement.value;
        } else {
          delete selectedPair.mappings[superopsField.id];
        }
        markFieldMappingDirty();
        refreshFoot(selectedPair);
        refreshBadge(selectedPair);
      });
    }
    if (isLocked) {
      const lockBadge = document.createElement("span");
      lockBadge.title = "This mapping is required and cannot be changed";
      lockBadge.style.cssText = "margin-left:6px;font-size:11px;color:#9ca3af;flex-shrink:0;";
      lockBadge.textContent = "🔒";
      fsCell.style.display = "flex";
      fsCell.style.alignItems = "center";
      fsCell.appendChild(fsSelectElement);
      fsCell.appendChild(lockBadge);
    } else {
      fsCell.appendChild(fsSelectElement);
    }
    row.append(soCell, middleCell, fsCell);
    fieldMappingContainer.appendChild(row);
  });
  refreshFoot(selectedPair);
}

function refreshFoot(selectedPair) {
  const mapped = Object.values(selectedPair.mappings).filter(Boolean).length;
  const total = selectedPair.soFields.length;
  const stat = document.getElementById(`stat-${selectedPair.id}`);
  const btn = document.getElementById(`save-btn-${selectedPair.id}`);
  if (stat) stat.innerHTML = `<strong>${mapped}</strong> of <strong>${total}</strong> mapped`;
  if (btn) btn.disabled = mapped === 0;
}

function refreshBadge(selectedCard) {
  const badge = document.getElementById(`badge-${selectedCard.id}`);
  if (!badge) return;
  const fieldMappingCount = Object.values(selectedCard.mappings).filter(Boolean).length;
  badge.className = "sbadge " + bCls(selectedCard, fieldMappingCount);
  badge.textContent = bTxt(selectedCard, fieldMappingCount);
}

function bCls(selectedCard, fieldMappingCount) {
  if (!selectedCard.soId || !selectedCard.fsId) return "s-new";
  if (fieldMappingCount > 0) return "s-mapped";
  return "s-empty";
}

function bTxt(selectedCard, fieldMappingCount) {
  if (!selectedCard.soId || !selectedCard.fsId) return "New";
  if (fieldMappingCount > 0) return `${fieldMappingCount} mapped`;
  return "Not mapped";
}

function usedSoIds(excludePairId) {
  return new Set(pairs.filter((pair) => pair.id !== excludePairId && pair.soId).map((pair) => String(pair.soId)));
}
function usedFsIds(excludePairId) {
  return new Set(pairs.filter((pair) => pair.id !== excludePairId && pair.fsId).map((pair) => String(pair.fsId)));
}

function validateFieldMapping() {
  const errorListContainer = document.getElementById("verr-list");
  errorListContainer.innerHTML = "";
  errorListContainer.classList.remove("show");
  const errors = [];
  if (!pairs.length) {
    errors.push("No asset mappings added.");
  } else {
    pairs.forEach((pair, index) => {
      const n = index + 1;
      if (!pair.soId || !pair.fsId) {
        errors.push(`Mapping #${n}: Asset classes not selected.`);
        return;
      }
      const mappedFsFieldIds = new Set(Object.values(pair.mappings).filter(Boolean));
      const unmappedRequired = pair.fsFields.filter((ff) => ff.required && !mappedFsFieldIds.has(ff.id));
      if (unmappedRequired.length > 0) {
        const fieldNames = unmappedRequired.map((ff) => `"${ff.l}"`).join(", ");
        errors.push(
          `Mapping #${n} (${pair.soName} → ${pair.fsName}): ` +
          `Required Freshservice field${unmappedRequired.length > 1 ? "s" : ""} not mapped: ${fieldNames}.`,
        );
      }
    });
  }
  if (errors.length) {
    errorListContainer.innerHTML = errors.map((err) =>
      `<div class="verr-row"><span>⚠</span><span>${esc(err)}</span></div>`).join("");
    errorListContainer.classList.add("show");
    return;
  }
  const allMappings = pairs.map((pair) => ({
    superops_asset_class: { id: pair.soId, name: pair.soName },
    freshservice_asset_type: { id: pair.fsId, name: pair.fsName },
    field_mappings: Object.entries(pair.mappings).map(([soFieldId, fsFieldId]) => {
      const soField = pair.soFields.find((field) => field.id === soFieldId);
      const fsField = pair.fsFields.find((field) => field.id === fsFieldId);
      return {
        superops_field: { id: soFieldId, name: soField?.name },
        freshservice_field: { id: fsFieldId, name: fsField?.l },
      };
    }),
  }));
  fieldMappingResult = allMappings;
  fmToast("Asset mapping saved successfully", "success"); // new
  validationChecklist.fieldMapping = true;

  const validateBtn = document.getElementById("validate-btn");
  if (validateBtn) {
    validateBtn.disabled = true;
    validateBtn.textContent = "Saved Mappings";
  }

  // if site mapping is also done, unlock ticket form tab
  if (validationChecklist.siteMapping) {
    ticketFormTab.disabled = false;
    if (!autoTabSwitch.assetMapping) {
      tab.activeTabIndex = 3;
      autoTabSwitch.assetMapping = true;
    }
  }
}

function renderPair(pair) {
  const list = document.getElementById("pair-list");
  let card = document.getElementById(`pair-${pair.id}`);
  if (!card) {
    card = document.createElement("div");
    card.className = "pair-card";
    card.id = `pair-${pair.id}`;
    list.appendChild(card);
  }
  const idx = pairs.findIndex((x) => x.id === pair.id) + 1;
  const mappedFieldCount = Object.values(pair.mappings).filter(Boolean).length;
  const usedSO = usedSoIds(pair.id);
  const usedFS = usedFsIds(pair.id);
  const soOptions = soClasses
    .filter((c) => !usedSO.has(String(c.id)) || String(pair.soId) === String(c.id))
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((c) => `<option value="${c.id}"${String(pair.soId) === String(c.id) ? " selected" : ""}>${esc(c.name)}</option>`)
    .join("");
  const fsOptions = fsTypes
    .filter((t) => !usedFS.has(String(t.id)) || String(pair.fsId) === String(t.id))
    .sort((a, b) => a.label.localeCompare(b.label))
    .map((t) => `<option value="${t.id}"${String(pair.fsId) === String(t.id) ? " selected" : ""}>${esc(t.label)}</option>`)
    .join("");

  card.innerHTML = `
    <div class="pair-head" data-pair-id="${pair.id}">
      <div class="pnum">${idx}</div>
      <div class="pair-tags">
        ${pair.soName
      ? `<span class="ptag ptag-so">${esc(pair.soName)}</span>
             <span class="ptag-arr">→</span>
             <span class="ptag ptag-fs">${esc(pair.fsName)}</span>`
      : `<span class="ptag-ph">Select asset classes to get started…</span>`}
      </div>
      <span class="sbadge ${bCls(pair, mappedFieldCount)}" id="badge-${pair.id}">${esc(bTxt(pair, mappedFieldCount))}</span>
      <div class="head-acts">
        ${pair.soId && pair.fsId
      ? `<fw-button size="small" color="${pair.drOpen ? "secondary" : "primary"}" data-pair-id="${pair.id}" class="toggle-drawer-btn">
               ${pair.drOpen ? "▾ Close" : "⇄ Map Fields"}
             </fw-button>`
      : ""}
        <button class="del-btn" data-pair-id="${pair.id}" title="Remove">✕</button>
      </div>
      <span class="chevron ${pair.selOpen ? "open" : ""}">▾</span>
    </div>

    <div class="sel-panel ${pair.selOpen ? "open" : ""}">
      <div class="sel-body-v2">
        <div class="sel-row-split">
          <div class="sel-col">
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">
              <span class="sel-lbl" id="so-lbl-${pair.id}">SuperOps Asset Class</span>
              <span id="so-spin-${pair.id}" style="display:none;align-items:center;gap:4px;font-size:11px;color:#6b7280;">
                <span style="width:10px;height:10px;border:2px solid #e5e7eb;border-top-color:#2c5cc5;
                             border-radius:50%;animation:spin .7s linear infinite;display:inline-block"></span>
                fetching fields…
              </span>
            </div>
            <select class="cr-sel" id="so-sel-${pair.id}">
              <option value="">Select asset class…</option>
              ${soOptions}
            </select>
          </div>
          <div class="sel-conn">⇄</div>
          <div class="sel-col">
            <span class="sel-lbl">Freshservice Asset Type</span>
            <select class="cr-sel" id="fs-sel-${pair.id}">
              <option value="">Select asset type…</option>
              ${fsOptions}
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="fdrawer ${pair.drOpen ? "open" : ""}">
      <div class="drawer-inner">
        <div class="col-hdrs">
          <div class="chd chd-so"><span class="cdot"></span>SuperOps Fields</div>
          <div class="chd chd-mid"></div>
          <div class="chd chd-fs"><span class="cdot"></span>Freshservice Fields</div>
        </div>
        <div class="map-rows" id="rows-${pair.id}"></div>
        <div class="d-foot">
          <span class="map-stat" id="stat-${pair.id}">
            <strong>0</strong> of <strong id="tc-${pair.id}">${pair.soFields.length}</strong> mapped
          </span>
          <div class="d-btns"></div>
        </div>
      </div>
    </div>`;

  card.querySelector(".pair-head").addEventListener("click", () => toggleSel(pair.id));
  card.querySelector(".head-acts").addEventListener("click", (e) => e.stopPropagation());
  card.querySelector(".del-btn").addEventListener("click", () => openDelModal(pair.id));
  const toggleDrawerBtn = card.querySelector(".toggle-drawer-btn");
  if (toggleDrawerBtn) toggleDrawerBtn.addEventListener("click", () => toggleDrawer(pair.id));
  card.querySelector(`#so-sel-${pair.id}`).addEventListener("change", () => onSoClassChange(pair.id));
  card.querySelector(`#fs-sel-${pair.id}`).addEventListener("change", () => onFsTypeChange(pair.id));
  if (pair.drOpen && pair.soFields.length) buildRows(pair);
}

function renderAll() {
  const list = document.getElementById("pair-list");
  const liveIds = new Set(pairs.map((p) => `pair-${p.id}`));
  Array.from(list.children).forEach((child) => {
    if (!liveIds.has(child.id)) child.remove();
  });
  pairs.forEach((p) => renderPair(p));
  pairs.forEach((p) => {
    const e = document.getElementById(`pair-${p.id}`);
    if (e) list.appendChild(e);
  });
  const has = pairs.length > 0;
  document.getElementById("pair-count").textContent = pairs.length;
  document.getElementById("empty-state").style.display = has ? "none" : "flex";
  document.getElementById("val-section").style.display = has ? "block" : "none";
  document.getElementById("verr-list").classList.remove("show");
}

function fmToast(msg, type = "success") {
  const t = document.getElementById("toast");
  if (t && typeof t.trigger === "function") t.trigger({ type, content: msg });
}

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

async function fetchFsAssetTypePage(page) {
  const res = await client.request.invokeTemplate("getFreshserviceAssetTypes", {
    context: {
      host: FS_DOMAIN.replace(/^https?:\/\//, "").replace(/\.freshservice\.com$/, "").trim(),
      auth: FS_API_KEY,
      perPage: 100,
      page,
    },
  });
  const json = JSON.parse(res.response);
  json.headers = res.headers;
  return json;
}

async function apiGetFsAssetTypes() {
  const first = await fetchFsAssetTypePage(1);
  let hasMore;
  let all = [...first.asset_types];
  hasMore = first.headers?.link;
  let page = 1;
  while (hasMore) {
    page = ++page;
    const assetTypes = await fetchFsAssetTypePage(page);
    all = [...all, ...assetTypes.asset_types];
    hasMore = assetTypes.headers?.link;
  }
  return all.map((t) => ({ id: String(t.id), label: t.name }));
}

async function apiGetFsAssetFields(typeId) {
  const res = await client.request.invokeTemplate("getFreshserviceAssetFields", {
    context: {
      host: FS_DOMAIN.replace(/^https?:\/\//, "").replace(/\.freshservice\.com$/, "").trim(),
      auth: FS_API_KEY,
      typeId,
    },
  });
  const json = JSON.parse(res.response);
  const allFields = (json.asset_type_fields ?? [])
    .flatMap((group) => group.fields ?? [])
    .filter((f) => f.name !== "asset_type_id");
  return allFields.map((f) => ({ id: f.name, l: f.label, type: f.field_type, required: f.required === true }));
}

async function prefillPairs(assetMappings) {
  for (const mapping of assetMappings) {
    const soClass = soClasses.find((assetClass) => assetClass.id === mapping.superops_asset_class.id);
    const fsType = fsTypes.find((assetType) => assetType.id === mapping.freshservice_asset_type.id);
    if (!soClass || !fsType) continue;
    let soFields = [];
    try {
      soFields = await apiGetAssetFields(SO_API_KEY, soClass.id);
    } catch (error) {
      console.error("Failed to load SO fields for", soClass.name, error);
    }
    let fsFields = [];
    const cacheKey = String(fsType.id);
    if (fsFieldCache[cacheKey]) {
      fsFields = fsFieldCache[cacheKey];
    } else {
      try {
        fsFields = await apiGetFsAssetFields(fsType.id);
        fsFieldCache[cacheKey] = fsFields;
      } catch (error) {
        console.error("Failed to load FS fields for", fsType.label, error);
      }
    }
    const mappings = {};
    mapping.field_mappings.forEach((fm) => {
      mappings[String(fm.superops_field.id)] = String(fm.freshservice_field.id);
    });
    pairs.push({
      id: nextId++,
      soId: soClass.id, soName: soClass.name,
      fsId: fsType.id, fsName: fsType.label,
      soFields, fsFields, mappings,
      selOpen: false, drOpen: false, fieldsLoading: false,
    });
  }
}

function resetBootState() {
  bootDone = false;
  soClasses = [];
  fsTypes = [];
  fsFieldCache = {};
  pairs = [];
  nextId = 1;
  fieldMappingResult = [];
  validationChecklist.fieldMapping = false;
  renderAll();
  markFieldMappingDirty();
}

function markFieldMappingDirty() {
  const validateBtn = document.getElementById("validate-btn");
  if (validateBtn) {
    validateBtn.disabled = false;
    validateBtn.textContent = "Save Mappings";
  }
  validationChecklist.fieldMapping = false;
}

// ═══════════════════════════════════════════════════════════════════════════════
// SITE MAPPING (now in asset mapping tab)
// ═══════════════════════════════════════════════════════════════════════════════

function initSiteMappingWithData(sites) {
  superopsSites = sites;
  if (isSiteMappingInitialized) return;
  isSiteMappingInitialized = true;

  initMapping({
    container: document.getElementById("siteMappingContainer"),
    saveButton: saveSiteMappingButton,
    addButton: document.getElementById("addSiteMappingBtn"),
    leftClass: "so-site",
    rightClass: "fs-location",
    leftData: () => superopsSites,
    rightData: () => fsLocations,
    onDirty: () => {
      // Only mark dirty (and show save button) when there are actual rows
      const hasRows = document.getElementById("siteMappingContainer")
        .querySelectorAll(".mapping-row").length > 0;
      if (hasRows) {
        markSiteMappingDirty();
      } else {
        // No rows — nothing to save, keep valid and hide button
        saveSiteMappingButton.style.display = "none";
        validationChecklist.siteMapping = true;
      }
    },
  });
}

/** Save site mapping — button lives in the asset mapping tab */
saveSiteMappingButton.addEventListener("click", () => {
  try {
    const rows = getSiteLocationMapping(true);
    siteMapping = { siteLocationMapping: rows };
    saveSiteMappingButton.disabled = true;
    saveSiteMappingButton.textContent = "Saved Site Mappings";
    fmToast("Site mappings saved successfully", "success");
    validationChecklist.siteMapping = true;

    // if asset field mapping is also done, unlock ticket form tab
    if (validationChecklist.fieldMapping) {
      ticketFormTab.disabled = false;
    }
  } catch (error) {
    validationChecklist.siteMapping = false;
    fmToast(error.message, "error");
  }
});

function markSiteMappingDirty() {
  if (saveSiteMappingButton) {
    saveSiteMappingButton.style.display = "";
    saveSiteMappingButton.disabled = false;
    saveSiteMappingButton.textContent = "Save Site Mappings";
  }
  validationChecklist.siteMapping = false;
}

function resetSiteMapping() {
  const siteContainer = document.getElementById("siteMappingContainer");
  if (siteContainer) siteContainer.innerHTML = "";
  validationChecklist.siteMapping = true; // empty = valid
  siteMapping = undefined;
  if (saveSiteMappingButton) {
    saveSiteMappingButton.style.display = "none";
  }
  if (addSiteMappingButton) addSiteMappingButton.disabled = false;
}

function getSiteLocationMapping(validate = false) {
  const rows = document.querySelectorAll("#siteMappingContainer .mapping-row");
  return Array.from(rows).map((row, index) => {
    const site = row.querySelector(".so-site")?.value;
    const location = row.querySelector(".fs-location")?.value;
    if (validate && (!site || !location)) {
      throw new Error(`Site Mapping Row ${index + 1} is incomplete`);
    }
    return { superops_site: site, freshservice_location: location };
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// SEVERITY MAPPING (now in ticket form tab)
// ═══════════════════════════════════════════════════════════════════════════════

function initSeverityMapping() {
  if (isSeverityMappingInitialized) return;
  isSeverityMappingInitialized = true;
  initMapping({
    container: document.getElementById("severityMappingContainer"),
    saveButton: saveSeverityMappingButton,
    addButton: document.getElementById("addSeverityMappingBtn"),
    leftClass: "so-severity",
    rightClass: "fs-priority",
    leftData: severity,
    rightData: priority,
    onDirty: () => {
      // Only mark dirty (and show save button) when there are actual rows
      const hasRows = document.getElementById("severityMappingContainer")
        .querySelectorAll(".mapping-row").length > 0;
      if (hasRows) {
        markSeverityMappingDirty();
      } else {
        // No rows — nothing to save, keep valid and hide button
        saveSeverityMappingButton.style.display = "none";
        validationChecklist.severityMapping = true;
      }
    },
  });
}

/** Save severity mapping — button lives in the ticket form tab */
saveSeverityMappingButton.addEventListener("click", () => {
  try {
    const rows = getSeverityPriorityMapping(true);
    severityMapping = { severityPriorityMapping: rows };
    saveSeverityMappingButton.disabled = true;
    saveSeverityMappingButton.textContent = "Saved Severity Mappings";
    toast.trigger({ type: "success", content: "Severity mappings saved successfully" });
    validationChecklist.severityMapping = true;
  } catch (error) {
    validationChecklist.severityMapping = false;
    toast.trigger({ type: "error", content: error.message });
  }
});

function markSeverityMappingDirty() {
  if (saveSeverityMappingButton) {
    saveSeverityMappingButton.style.display = "";
    saveSeverityMappingButton.disabled = false;
    saveSeverityMappingButton.textContent = "Save Severity Mappings";
  }
  validationChecklist.severityMapping = false;
}

function getSeverityPriorityMapping(validate = false) {
  const rows = document.querySelectorAll("#severityMappingContainer .mapping-row");
  return Array.from(rows).map((row, index) => {
    const sev = row.querySelector(".so-severity")?.value;
    const pri = row.querySelector(".fs-priority")?.value;
    if (validate && (!sev || !pri)) {
      throw new Error(`Severity Mapping Row ${index + 1} is incomplete`);
    }
    return { superops_severity: sev, freshservice_priority: pri };
  });
}

// init severity mapping at load time (static data — no async needed)
initSeverityMapping();

// ═══════════════════════════════════════════════════════════════════════════════
// GENERIC MAPPING INITIALIZER
// ═══════════════════════════════════════════════════════════════════════════════
function initMapping({ container, saveButton, addButton, leftClass, rightClass, leftData, rightData, onDirty }) {
  const getLeftData = () => (typeof leftData === "function" ? leftData() || [] : leftData || []);
  const getRightData = () => (typeof rightData === "function" ? rightData() || [] : rightData || []);

  addButton.addEventListener("click", () => {
    const row = document.createElement("div");
    row.className = "mapping-row";
    row.innerHTML = `
      <fw-select class="${leftClass}" placeholder="Select ${leftClass === "so-site" ? "SuperOps Site" : "SuperOps Severity"}"></fw-select>
      <span class="arrow-icon">→</span>
      <fw-select class="${rightClass}" placeholder="Select ${rightClass === "fs-location" ? "Freshservice Location" : "Freshservice Priority"}"></fw-select>
      <fw-button class="delete-btn" color="text">
          <fw-icon name="delete" size="18"></fw-icon>
      </fw-button>
    `;
    container.appendChild(row);
    toggleAddButton();
    toggleSaveButton();
    if (onDirty) onDirty();
  });

  container.addEventListener("focusin", (e) => {
    const left = e.target.closest(`.${leftClass}`);
    const right = e.target.closest(`.${rightClass}`);
    if (left) populateLeft(left);
    if (right) populateRight(right);
  });

  container.addEventListener("click", (e) => {
    const btn = e.target.closest(".delete-btn");
    if (btn) {
      btn.closest(".mapping-row").remove();
      toggleAddButton();
      toggleSaveButton();
      if (onDirty) onDirty();
    }
  });

  container.addEventListener("change", (e) => {
    if (e.target.closest(`.${leftClass}`) || e.target.closest(`.${rightClass}`)) {
      toggleAddButton();
      if (onDirty) onDirty();
    }
  });

  // fw-select fires fwChange (not native change) — catch option selections on both sides
  container.addEventListener("fwChange", (e) => {
    if (e.target.closest(`.${leftClass}`) || e.target.closest(`.${rightClass}`)) {
      toggleAddButton();
      if (onDirty) onDirty();
    }
  });

  function getSelectedLeft() {
    return Array.from(container.querySelectorAll(`.${leftClass}`)).map((el) => el.value).filter(Boolean);
  }

  function populateLeft(dropdown) {
    const currentValue = dropdown.value;
    const currentLeftData = getLeftData();
    const selected = getSelectedLeft().filter((v) => v !== currentValue);
    const filtered = currentLeftData.filter((item) => !selected.includes(item.value));
    dropdown.options = filtered;
    dropdown.value = currentValue || "";
  }

  function populateRight(dropdown) {
    const currentValue = dropdown.value;
    dropdown.options = getRightData();
    dropdown.value = currentValue || "";
  }

  function toggleAddButton() {
    const totalRows = container.querySelectorAll(".mapping-row").length;
    addButton.disabled = totalRows >= getLeftData().length;
  }

  function toggleSaveButton() {
    const hasRows = container.querySelectorAll(".mapping-row").length > 0;
    saveButton.style.display = hasRows ? "" : "none";
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// TICKET FORM — WORKSPACE & FIELDS
// ═══════════════════════════════════════════════════════════════════════════════

async function fetchAndRenderWorkspaces() {
  const wsSelect = document.getElementById("ticketFormWorkspaceSelect");
  if (!wsSelect) return;
  showTicketFormLoader("Loading workspaces…");
  try {
    const fsDomain = removeProtocol(freshserviceDomainField?.value);
    const fsApikey = freshserviceApikeyField?.value;
    let freshserviceDomain = removeProtocol(fsDomain);
    freshserviceDomain = freshserviceDomain.replace(/\.freshservice\.com$/, "").trim();
    const res = await client.request.invokeTemplate("getFreshserviceWorkspace", {
      context: { domain: freshserviceDomain, apikey: fsApikey },
    });
    const data = JSON.parse(res.response);
    const workspaces = data.workspaces || [];
    workspaceOptions = workspaces.map((w) => ({ value: String(w.id), text: w.name }));
    wsSelect.options = workspaceOptions;
  } catch (err) {
    console.error("Error fetching workspaces", err);
    toast.trigger({ type: "error", content: "Failed to load workspaces" });
  } finally {
    hideTicketFormLoader();
  }
}

async function loadTicketFieldsForWorkspace(workspaceId) {
  showTicketFormLoader("Loading ticket fields…");
  clearTicketFormFieldsDOM();
  try {
    const fsDomain = removeProtocol(freshserviceDomainField?.value);
    const fsApikey = freshserviceApikeyField?.value;
    const res = await client.request.invokeTemplate("getAllTicketFields", {
      context: { host: fsDomain, apikey: fsApikey, workspaceId },
    });
    const ticketFields = JSON.parse(res.response).ticket_fields;
    await renderTicketForm(ticketFields);
  } catch (err) {
    console.error("Error loading ticket fields for workspace", err);
    toast.trigger({ type: "error", content: "Failed to load ticket fields" });
  } finally {
    hideTicketFormLoader();
  }
}

function clearTicketFormFieldsDOM() {
  const container = document.getElementById("ticketFormContainer");
  if (!container) return;
  const header = document.getElementById("ticketFormWorkspaceHeader");
  Array.from(container.children).forEach((child) => {
    if (child !== header) child.remove();
  });
  saveFormButton = null;
}

function clearTicketFormFields() {
  const container = document.getElementById("ticketFormContainer");
  if (!container) return;
  container.querySelectorAll("fw-input[data-fieldname]").forEach((el) => { el.value = ""; });
  container.querySelectorAll("fw-textarea[data-fieldname]").forEach((el) => { el.value = ""; });
  container.querySelectorAll("fw-datepicker[data-fieldname]").forEach((el) => { el.value = ""; });
  container.querySelectorAll("input[type='checkbox'][data-fieldname]").forEach((el) => { el.checked = false; });
  container.querySelectorAll("fw-select[data-fieldname]").forEach((el) => { el.value = ""; });
  container.querySelectorAll("input.async-search-input[data-fieldname]").forEach((el) => {
    el.value = "";
    el.dataset.value = "";
  });
}

async function renderTicketForm(fields) {
  const container = document.getElementById("ticketFormContainer");
  Array.from(container.children).forEach((child) => child.remove());

  const wsSelect = document.getElementById("ticketFormWorkspaceSelect");
  if (wsSelect && workspaceOptions.length) wsSelect.options = workspaceOptions;

  const filteredFields = fields.filter(
    (f) => f.field_type !== "default_priority" && f.field_type !== "default_workspace"
  );
  const subjectField = filteredFields.find((f) => f.field_type === "default_subject");
  const descriptionField = filteredFields.find((f) => f.field_type === "default_description");
  const remainingFields = filteredFields.filter(
    (f) => f.field_type !== "default_subject" && f.field_type !== "default_description",
  );
  const isLongField = (field) =>
    field.field_type &&
    (field.field_type === "default_description" ||
      field.field_type === "default_subject" ||
      field.field_type.includes("paragraph") ||
      field.field_type.includes("content"));
  const shortFields = remainingFields.filter((f) => !isLongField(f));
  const longFields = remainingFields.filter((f) => isLongField(f));
  const sortFields = (arr) => {
    const required = arr.filter((f) => f.required_for_agents);
    const defaultFields = arr.filter((f) => !f.required_for_agents && f.default_field);
    const customFields = arr.filter((f) => !f.required_for_agents && !f.default_field);
    return [...required, ...defaultFields, ...customFields];
  };
  const sortedShort = sortFields(shortFields);
  const sortedLong = sortFields(longFields);
  const orderedFields = [
    ...(subjectField ? [subjectField] : []),
    ...(descriptionField ? [descriptionField] : []),
    ...sortedShort,
    ...sortedLong,
  ];
  orderedFields.forEach((field) => {
    const fieldEl = createField(field);
    if (fieldEl) {
      if (
        field.field_type === "default_description" ||
        isLongField(field) ||
        field.label?.toLowerCase().includes("description") ||
        field.label?.toLowerCase().includes("business impact")
      ) {
        fieldEl.classList.add("full-width");
      }
      container.appendChild(fieldEl);
    }
  });
  renderSaveButton(container);
  attachFormChangeListeners();
  validationChecklist.ticketForm = false;
}

function createField(field) {
  if (field.field_type === "default_agent") return createAsyncSearchField(field, "getAgents");
  if (field.field_type === "default_requester") return createAsyncSearchField(field, "getRequesters");
  if (field.choices && field.choices.length) return createDropdown(field);
  const type = getFieldType(field.field_type);
  switch (type) {
    case "textarea": return createTextarea(field);
    case "checkbox": return createCheckbox(field);
    case "datepicker": return createDatepicker(field);
    default: return createInput(field);
  }
}

function getFieldType(fieldType) {
  if (!fieldType) return "input";
  if (fieldType === "default_description") return "input"; // textarea
  const type = fieldType.split("_")[1] || "";
  if (type.includes("paragraph") || type.includes("content")) return "textarea";
  if (type.includes("checkbox")) return "checkbox";
  if (type.includes("date")) return "datepicker";
  if (type.includes("text") || type.includes("number") || type.includes("decimal")) return "input";
  return "input";
}

function createInput(field) {
  const el = document.createElement("fw-input");
  el.setAttribute("label", field.label);
  el.setAttribute("name", field.name);
  if(field.name === "subject" || field.name === "description"){
    const slotMessage = field.name === "subject" ? " + {{Alert Message}}_#{{Alert ID}}" : " + {{Alert Description}}";
    const hint = field.name === "subject" ?
      "The ticket subject will be created as: Your Subject + {{Alert Message}}_#{{Alert ID}}. Alert message will be added automatically."
      : "Ticket description will be created as: Your Description + {{Alert Description}}. Alert description will be added automatically."
    el.setAttribute("hint-text", hint);
    const suffixLabel = document.createElement("fw-label");
    suffixLabel.setAttribute("slot", "input-suffix");
    suffixLabel.setAttribute("value", slotMessage);
    el.appendChild(suffixLabel);
  }
  el.setAttribute("data-fieldname", field.name);
  if (field.required_for_agents && field.name !== "subject" && field.name !== "description") {
    el.setAttribute("required", true);
  }
  return wrapField(el, field);
}

function createTextarea(field) {
  const el = document.createElement("fw-textarea");
  el.setAttribute("label", field.label);
  el.setAttribute("name", field.name);
  el.setAttribute("rows", "4");
  el.setAttribute("data-fieldname", field.name);
  if (field.required_for_agents) el.setAttribute("required", true);
  return wrapField(el, field);
}

function createCheckbox(field) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("checkbox-field-wrapper");
  wrapper.setAttribute("data-fieldname", field.name);
  const id = "checkbox-" + field.name;
  const input = document.createElement("input");
  input.type = "checkbox";
  input.id = id;
  input.name = field.name;
  input.setAttribute("data-fieldname", field.name);
  input.classList.add("checkbox-native");
  const labelEl = document.createElement("label");
  labelEl.htmlFor = id;
  labelEl.classList.add("checkbox-native-label");
  labelEl.textContent = field.label;
  wrapper.appendChild(input);
  wrapper.appendChild(labelEl);
  return wrapField(wrapper, field);
}

function createDatepicker(field) {
  const el = document.createElement("fw-datepicker");
  el.setAttribute("label", field.label);
  el.setAttribute("name", field.name);
  el.setAttribute("data-fieldname", field.name);
  if (field.required_for_agents) el.setAttribute("required", true);
  return wrapField(el, field);
}

function createDropdown(field) {
  const container = document.createElement("div");
  container.setAttribute("data-fieldname", field.name);
  container.__fieldMeta = field;
  const select = document.createElement("fw-select");
  select.setAttribute("label", field.label);
  select.setAttribute("name", field.name);
  select.setAttribute("data-level", 1);
  select.setAttribute("data-fieldname", field.name);
  if (field.required_for_agents) select.setAttribute("required", true);
  select.options = mapOptions(field.choices);
  container.appendChild(select);
  if (field.nested_fields && field.nested_fields.length) {
    select.addEventListener("fwChange", (e) => {
      handleNestedChange(e, field.choices, field.nested_fields, container);
    });
  }
  return wrapField(container, field);
}

function handleNestedChange(event, choices, nestedFields, container) {
  const selectedValue = event.target.value;
  const level = Number(event.target.dataset.level);
  container.querySelectorAll("fw-select").forEach((sel) => {
    if (Number(sel.dataset.level) > level) sel.parentElement.remove();
  });
  const selected = choices.find((c) => c.id === selectedValue);
  if (!selected || !selected.nested_options?.length) return;
  const nextField = nestedFields[level - 1];
  if (!nextField) return;
  const wrapper = document.createElement("div");
  wrapper.classList.add("nested-select-wrapper");
  const select = document.createElement("fw-select");
  select.setAttribute("label", nextField.label);
  select.setAttribute("name", nextField.name);
  select.setAttribute("data-level", level + 1);
  select.setAttribute("data-fieldname", nextField.name);
  select.options = mapOptions(selected.nested_options);
  wrapper.appendChild(select);
  container.appendChild(wrapper);
  select.addEventListener("fwChange", (e) => {
    handleNestedChange(e, selected.nested_options, nestedFields, container);
  });
}

function mapOptions(choices) {
  return choices.map((c) => ({ value: c.id, text: String(c.value) }));
}

function wrapField(el, field) {
  const div = document.createElement("div");
  const isExcluded = field?.name === "subject" || field?.name === "description";
  div.classList.add("field-wrapper");
  if (field && field.required_for_agents && !isExcluded ) {
    div.classList.add("field-required");
  }
  div.appendChild(el);
  return div;
}

function createAsyncSearchField(field, templateName) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("async-search-wrapper");
  wrapper.setAttribute("data-fieldname", field.name);
  const label = document.createElement("label");
  label.classList.add("async-search-label");
  label.innerText = field.label;
  if (field.required_for_agents) {
    const asterisk = document.createElement("span");
    asterisk.classList.add("required-asterisk");
    asterisk.innerText = " *";
    label.appendChild(asterisk);
  }
  const inputWrapper = document.createElement("div");
  inputWrapper.classList.add("async-input-wrapper");
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Search by first name or enter email";
  input.classList.add("async-search-input");
  input.setAttribute("data-fieldname", field.name);
  if (field.required_for_agents) input.required = true;
  const dropdown = document.createElement("div");
  dropdown.classList.add("async-dropdown");
  dropdown.style.display = "none";
  inputWrapper.appendChild(input);
  inputWrapper.appendChild(dropdown);
  wrapper.appendChild(label);
  wrapper.appendChild(inputWrapper);
  document.addEventListener("click", (e) => {
    if (!inputWrapper.contains(e.target)) dropdown.style.display = "none";
  });
  dropdown.addEventListener("click", (e) => e.stopPropagation());
  let debounceTimer;
  input.addEventListener("input", () => {
    const query = input.value.trim();
    clearTimeout(debounceTimer);
    if (query.length < 2) { dropdown.style.display = "none"; return; }
    debounceTimer = setTimeout(async () => {
      const results = await fetchSearchResults(query, templateName);
      renderDropdown(dropdown, results, input);
    }, 400);
  });
  return wrapField(wrapper, field);
}

async function fetchSearchResults(query, templateName, page = 1) {
  try {
    const safeQuery = query.trim().replace(/'/g, "\\'");
    let searchQuery;
    if (templateName === "getRequesters") {
      searchQuery = `name:'${safeQuery}'`;
    } else {
      searchQuery = `name:'${safeQuery}' OR first_name:'${safeQuery}' OR last_name:'${safeQuery}' OR email:'${safeQuery}' OR work_phone_number:'${safeQuery}' OR mobile_phone_number:'${safeQuery}'`;
    }
    const fsDomain = removeProtocol(freshserviceDomainField?.value);
    const fsApikey = freshserviceApikeyField?.value;
    const res = await client.request.invokeTemplate(templateName, {
      context: { host: fsDomain, apikey: fsApikey, query: searchQuery, page: Number(page) },
    });
    const data = JSON.parse(res.response);
    return data.agents || data.requesters || [];
  } catch (err) {
    console.error("Error in finding requester", err);
    return [];
  }
}

function renderDropdown(dropdown, items, input) {
  dropdown.innerHTML = "";
  if (!items.length) { dropdown.style.display = "none"; return; }
  items.forEach((item) => {
    const option = document.createElement("div");
    option.classList.add("async-dropdown-option");
    if (item.first_name && item.last_name) {
      option.innerText = item.first_name + " " + item.last_name;
    } else if (item.name) {
      option.innerText = item.name;
    } else if (item.primary_email) {
      option.innerText = item.primary_email;
    } else {
      option.innerText = item.email;
    }
    option.addEventListener("click", () => {
      input.value = option.innerText;
      input.dataset.value = item.id;
      dropdown.style.display = "none";
      markFormDirty();
    });
    dropdown.appendChild(option);
  });
  dropdown.style.display = "block";
}

function renderSaveButton(container) {
  const buttonRow = document.createElement("div");
  buttonRow.classList.add("save-button-row", "full-width");
  const btn = document.createElement("fw-button");
  btn.textContent = "Save Configuration";
  btn.type = "button";
  saveFormButton = btn;
  btn.addEventListener("click", handleSaveForm);
  buttonRow.appendChild(btn);
  container.appendChild(buttonRow);
}

const useValueInsteadOfId = ["ticket_type", "category", "sub_category", "item_category"];

function handleSaveForm() {
  const container = document.getElementById("ticketFormContainer");
  const formData = {};
  const errors = [];

  container.querySelectorAll("fw-input[data-fieldname]").forEach((el) => {
    const key = el.getAttribute("data-fieldname");
    const value = el.value || "";
    formData[key] = value;
    if (el.hasAttribute("required") && !value.trim()) errors.push(el.getAttribute("label") || key);
  });
  container.querySelectorAll("fw-textarea[data-fieldname]").forEach((el) => {
    const key = el.getAttribute("data-fieldname");
    const value = el.value || "";
    formData[key] = value;
    if (el.hasAttribute("required") && !value.trim()) errors.push(el.getAttribute("label") || key);
  });
  container.querySelectorAll("fw-select[data-fieldname]").forEach((el) => {
    const key = el.getAttribute("data-fieldname");
    const value = el.value || "";
    formData[key] = value;
    const selectedOption = el.options?.find((opt) => opt.value === value);
    if (selectedOption && useValueInsteadOfId.includes(key)) formData[key + "_text"] = selectedOption.text;
    if (el.hasAttribute("required") && !value) errors.push(el.getAttribute("label") || key);
  });
  container.querySelectorAll("fw-datepicker[data-fieldname]").forEach((el) => {
    const key = el.getAttribute("data-fieldname");
    const value = el.value || "";
    formData[key] = value;
    if (el.hasAttribute("required") && !value) errors.push(el.getAttribute("label") || key);
  });
  container.querySelectorAll("input[type='checkbox'][data-fieldname]").forEach((el) => {
    const key = el.getAttribute("data-fieldname");
    formData[key] = el.checked;
  });
  container.querySelectorAll("input.async-search-input[data-fieldname]").forEach((el) => {
    const key = el.getAttribute("data-fieldname");
    if (key === "requester") {
      const value = el.value || "";
      formData[key] = value;
      formData[key + "_email"] = el.dataset.email || "";
    } else {
      const value = el.dataset.value || el.value || "";
      formData[key] = value;
    }
    if (el.required && !el.value.trim()) {
      const label =
        el.closest(".async-search-wrapper")?.querySelector(".async-search-label")?.innerText?.replace(" *", "") || key;
      errors.push(label);
    }
  });

  if (errors.length > 0) {
    toast.trigger({ type: "error", content: `Please fill in the required fields: ${errors.join(", ")}` });
    return;
  }

  ticketForm = formData;
  if (selectedWorkspaceId) ticketForm.workspace_id = selectedWorkspaceId;
  formattedTicketForm = buildFormattedFormData(formData);
  saveFormButton.disabled = true;
  saveFormButton.textContent = "Configuration Saved";
  toast.trigger({ type: "success", content: "Alert sync configuration saved successfully" });
  validationChecklist.ticketForm = true;
}

function addGlobalFormStyles() {
  const style = document.createElement("style");
  style.textContent = `
    #ticketFormContainer fw-input,
    #ticketFormContainer fw-select,
    #ticketFormContainer fw-textarea,
    #ticketFormContainer fw-datepicker,
    #ticketFormContainer fw-checkbox {
      width: 100%;
    }
  `;
  document.head.appendChild(style);
}
let initFormStylesCalled = false;
if (!initFormStylesCalled) {
  addGlobalFormStyles();
  initFormStylesCalled = true;
}

function markFormDirty() {
  if (!saveFormButton) return;
  saveFormButton.disabled = false;
  saveFormButton.textContent = "Save Configuration";
  validationChecklist.ticketForm = false;
}

function attachFormChangeListeners() {
  const container = document.getElementById("ticketFormContainer");
  container.addEventListener("fwChange", (e) => {
    if (e.target.closest("[data-fieldname]")) markFormDirty();
  });
  container.addEventListener("input", (e) => {
    if (e.target.closest("[data-fieldname]")) markFormDirty();
  });
  container.addEventListener("change", (e) => {
    if (e.target.closest("[data-fieldname]")) markFormDirty();
  });
}

function getFieldMetadata(fieldName) {
  const container = document.getElementById("ticketFormContainer");
  const wrapper = container.querySelector(`[data-fieldname="${fieldName}"]`);
  if (wrapper && wrapper.__fieldMeta) return wrapper.__fieldMeta;
  return null;
}

function buildFormattedFormData(data) {
  const result = {};
  Object.entries(data).forEach(([key, value]) => {
    if (value === "" || value === null || value === undefined || key.endsWith("_email") || key.endsWith("_text")) return;
    const convertedKey = fieldNameConversion[key] || key;
    let finalValue = value;
    if (key === "requester") finalValue = data[key + "_email"] || value;
    if (useValueInsteadOfId.includes(key) && data[key + "_text"]) finalValue = data[key + "_text"];
    let type;
    if (defaultFieldTypes[key] || defaultFieldTypes[convertedKey]) {
      type = defaultFieldTypes[key] || defaultFieldTypes[convertedKey];
    } else {
      const fieldMeta = getFieldMetadata(key);
      if (fieldMeta && fieldMeta.field_type) {
        type = mapType(fieldMeta.field_type);
      } else if (typeof value === "boolean") {
        type = "boolean";
      } else if (typeof value === "number") {
        type = "number";
      } else if (!isNaN(value) && value !== true && value !== false && value.trim() !== "") {
        type = "number";
      } else {
        type = "string";
      }
    }
    result[convertedKey] = { schema: String(finalValue), type };
  });
  return result;
}

// ═══════════════════════════════════════════════════════════════════════════════
// IPARAMS — postConfigs / getConfigs
// ═══════════════════════════════════════════════════════════════════════════════

function postConfigs() {
  const fieldValues = dataToPostConfig();
  return {
    __meta: { secure: ["app1_apikey"] },
    domain: fieldValues.domain,
    accessToken: fieldValues.accessToken,
    tenantToken: fieldValues.tenantToken,
    tenantId: fieldValues.tenantId,
    adminEmail: fieldValues.adminEmail,
    adminPassword: fieldValues.adminPassword,
    freshserviceAppName: "Freshservice",
    freshserviceAppId: "freshservice-1.0.0",
    freshserviceDomain: fieldValues.freshserviceDomain,
    freshserviceApikey: fieldValues.freshserviceApikey,
    freshserviceConnectionId: fieldValues.freshserviceConnectionId,
    freshserviceConnectionName: fieldValues.FreshserviceConnectionName,
    superopsAppName: "SuperOps IT",
    superopsAppId: "superopsit-1.0.0",
    superopsDomain: fieldValues.superopsDomain,
    superopsConnectionId: fieldValues.superopsConnectionId,
    superopsApikey: fieldValues.superopsApikey,
    superopsConnectionName: fieldValues.superopsConnectionName,
    superopsAccountType: fieldValues.superopsAccountType,
    superopsRegion: fieldValues.superopsRegion,
    sinceDate: fieldValues.sinceDate,
    isInEditConfig: fieldValues.isInEditConfig,
    assetMapping: fieldValues.assetMappingData,
    siteSeverityMapping: fieldValues.siteSeverityMapping,
    ticketForm: fieldValues.ticketForm,
    formattedTicketForm: fieldValues.formattedTicketForm,
  };
}

function getConfigs(iparams) {
  console.log("get config", iparams);
  const freshserviceDomainField = document.getElementById("fs-domain");
  const freshserviceApikeyField = document.getElementById("fs-apikey");
  const superopsDomainField = document.getElementById("superops-domain");
  const superopsApikeyField = document.getElementById("superops-apikey");
  freshserviceDomainField.value = iparams.freshserviceDomain;
  freshserviceApikeyField.value = iparams.freshserviceApikey;
  superopsDomainField.value = iparams.superopsDomain;
  superopsApikeyField.value = iparams.superopsApikey;
  autoLoginAndValidation(iparams);
}