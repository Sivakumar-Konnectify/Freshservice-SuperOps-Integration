const axios = require("axios");
const rootDomain = ".konnectifyapp.co";

class OnAppInstallHandler {
    async handleCallback(options) {
        const GRP_TOP = "qCdv5D9mgVTNzPinj6z2I";
        const COND_TOP = "ZdYMFI6eFQr771Em-fHor";
        const GRP_TRUE = "a95QQeOoA66tokhk0BIWR";
        const COND_TRUE = "KBw--rAOU1YWQbcGjkZig";
        const GRP_FALSE = "8d2ejC9ES4a4CShzVh_SO";
        const COND_FALSE = "lvTKMUDufd4v6748Cd4K0";

        function generateWorkflow(iparams, eventConfig = {}, { includeCreatePath = true } = {}) {
            console.log("generate work flow :: ", iparams)
            const {
                assetMapping = [],
                freshserviceAppId,
                freshserviceAppName,
                freshserviceConnectionId,
                superopsAppId,
                superopsAppName,
                superopsConnectionId,
                freshserviceConnectionName,
                superopsConnectionName,
                siteSeverityMapping
            } = iparams;
            const fsConnId = freshserviceConnectionId;
            const fsConnName = freshserviceConnectionName;
            const soConnId = superopsConnectionId;
            const soConnName = superopsConnectionName;
            const siteLocationMapping =  siteSeverityMapping?.siteLocationMapping;
            console.log("Connection name and ID: ", fsConnId, fsConnName, soConnId, soConnName);

            // Unique _updateTimestamp for every node
            const BASE_TS = Date.now();
            let tsOffset = 0;
            const nextTs = () => BASE_TS + (++tsOffset);
            const nodeData = [];
            const edgeData = [];

            const pushNode = (id, type, x, y, data) => {
                nodeData.push({ id: String(id), position: { x, y }, type, data });
            };

            // NODE 1 — Trigger (SuperOps "New Asset Created")
            pushNode("1", "trigger", 978, 40, {
                type: "trigger",
                appId: superopsAppId,
                hasWarning: false,
                hasMandatoryFields: false,
                showExtension: true,
                positionId: "1",
                AppName: superopsAppName,
                hasConfigured: true,
                fieldsConfigured: true,
                ...eventConfig,
                connectionId: soConnId,
                connection: { id: soConnId, name: soConnName, status: "SUCCESS" },
                eventData: {},
                _updateTimestamp: nextTs(),
            });

            // NODE 2 — Codeblock (Site Location Mapping)
            // Generate the siteLocationMapping array string from iparams
            const siteLocationMappingStr = JSON.stringify(siteLocationMapping);
            
            pushNode("2", "codeblock", 978, 140, {
                type: "codeblock",
                appId: "codeblock",
                hasWarning: false,
                hasMandatoryFields: true,
                hasConfigured: true,
                fieldsConfigured: true,
                showExtension: true,
                positionId: "2",
                _updateTimestamp: nextTs(),
                FieldMapping: {
                    "site": {
                        "type": "string",
                        "schema": "{{1:site.id}}"
                    }
                },
                code: `const siteLocationMapping = ${siteLocationMappingStr};\nconst findLocation = siteLocationMapping.filter( l => l.superops_site === input.site);\nlet location;\nif(findLocation.length){\n  location = findLocation[0].freshservice_location;\n} else {\n  location = null;\n}\nOutput = {freshserviceLocation:location}`,
                outputSchema: [
                    {
                        name: "freshserviceLocation",
                        key: "freshserviceLocation",
                        label: "freshserviceLocation",
                        type: "number",
                        optional: true,
                        control_type: "text"
                    }
                ]
            });

            edgeData.push({ id: "e1-2", type: "buttonedge", source: "1", target: "2" });

            // NODE 3 — Top-level path splitter (one path per assetMapping entry)
            pushNode("3", "path", 978, 290, {
                type: "path",
                appId: "path",
                hasWarning: false,
                hasMandatoryFields: false,
                hasConfigured: false,
                fieldsConfigured: false,
                showExtension: true,
                _updateTimestamp: nextTs(),
                positionId: "3",
                AppName: "Path",
                paths: assetMapping.map((_, i) => ({
                    name: `Path ${i + 1}`,
                    pathId: `3_path_${i}`,
                })),
            });

            edgeData.push({ id: "e2-3", type: "buttonedge", source: "2", target: "3" });

            // X positions 
            const N = assetMapping.length;
            const BRANCH_W = 375;
            const startX = 978 - Math.floor((N * BRANCH_W) / 2) + Math.floor(BRANCH_W / 2);
            const bx = (i) => startX + i * BRANCH_W;
            const bxLeft = (i) => bx(i) - Math.floor(BRANCH_W / 4); // update (left)
            const bxRight = (i) => bx(i) + Math.floor(BRANCH_W / 4); // create (right)

            // Y positions (adjusted to account for new codeblock node)
            const Y_FILTER2 = 465;
            const Y_FSFIND = 640;
            const Y_PATHSPLIT = 815;
            const Y_SUBFILT = 990;
            const Y_ACTION = 1165;

            // Per-branch nodes
            assetMapping.forEach((mapping, i) => {
                const fsTypeId = mapping.freshservice_asset_type.id;
                const soClassName = mapping.superops_asset_class.name;
                // Numeric node IDs (shifted by 1 to account for new node 2)
                const fsFindId = String(4 + i * 4);
                const pathSplitId = String(5 + i * 4);
                const updateId = String(6 + i * 4);
                const createId = String(7 + i * 4);
                // String node IDs (updated to reference node "3" instead of "2")
                const filterId2 = `filter_3_${i}`;
                const filterFoundId = `filter_${pathSplitId}_0`;
                const filterMissedId = `filter_${pathSplitId}_1`;
                // positionIds — 7 per branch, base = 4 + i*7 (shifted by 1)
                const POS = 4 + i * 7;
                const pos = {
                    filter2: String(POS),
                    fsFind: String(POS + 1),
                    pathSplit: String(POS + 2),
                    filterFound: String(POS + 3),
                    update: String(POS + 4),
                    filterMissed: String(POS + 5),
                    create: String(POS + 6),
                };

                // Build FieldMapping from field_mappings (skip asset_type_id)
                const buildFM = (includeAssetId) => {
                    const fm = {};
                    if (includeAssetId) {
                        fm["asset_id"] = { schema: `{{${fsFindId}:assets.0.display_id}}`, type: "number" };  // ← changed
                        fm["asset_tag"] = { schema: `{{1:assetId}}`, type: "string" };                        // ← new
                    }
                    fm["location_id"] = { schema: `{{2:freshserviceLocation}}`, type:"number"} // adding location to create/update asset
                    mapping.field_mappings.forEach(({ superops_field, freshservice_field }) => {
                        if (freshservice_field.id === "asset_type_id") return;
                        fm[freshservice_field.id] = {
                            schema: `{{1:${superops_field.id}}}`,
                            type: "string",
                        };
                    });
                    return fm;
                };

                // A. Top-level path filter 
                pushNode(filterId2, "pathrule", bx(i), Y_FILTER2, {
                    type: "pathrule",
                    appId: "path-rule",
                    pathId: `3_path_${i}`,
                    parentId: "3",
                    branchIndex: i,
                    hasWarning: false,
                    hasMandatoryFields: true,
                    showExtension: true,
                    _updateTimestamp: nextTs(),
                    positionId: pos.filter2,
                    filterData: {
                        Filter_groups: [{
                            id: GRP_TOP,
                            matchType: "all",
                            conditions: [{
                                id: COND_TOP,
                                field: "{{1:assetClass.name}}",
                                operator: "EXACTLY_MATCHES",
                                value: soClassName,
                            }],
                        }],
                        groupOperators: [],
                    },
                    fieldsConfigured: true,
                    hasConfigured: true,
                    FieldMapping: {
                        [`condition_${COND_TOP}_field`]: { schema: "{{1:assetClass.name}}", type: "string" },
                        [`condition_${COND_TOP}_value`]: { schema: soClassName, type: "string" },
                    },
                });

                // B. Freshservice Search Asset
                pushNode(fsFindId, "app", bx(i), Y_FSFIND, {
                    type: "app",
                    appId: freshserviceAppId,
                    hasWarning: false,
                    hasMandatoryFields: false,
                    hasConfigured: true,
                    fieldsConfigured: true,
                    showExtension: true,
                    _updateTimestamp: nextTs(),
                    positionId: pos.fsFind,
                    AppName: freshserviceAppName,
                    eventId: "search_asset",
                    event: {
                        id: "search_asset",
                        name: "Search Asset",
                        batch: false,
                        description: "Search for assets using fields like name, asset tag, serial number, etc. Supports pagination to fetch all matching assets.",
                        has_config_fields: false,
                    },
                    connectionId: fsConnId,
                    connection: { id: fsConnId, name: fsConnName, status: "SUCCESS" },
                    FieldMapping: {
                        asset_tag: { schema: `{{1:assetId}}`, type: "string" },
                    },
                });

                if (includeCreatePath) {
                    // C. Path splitter
                    pushNode(pathSplitId, "path", bx(i), Y_PATHSPLIT, {
                        type: "path",
                        appId: "path",
                        paths: [
                            { name: "Path 1", pathId: `${pathSplitId}_path_0` },
                            { name: "Path 2", pathId: `${pathSplitId}_path_1` },
                        ],
                        hasWarning: false,
                        hasMandatoryFields: true,
                        hasConfigured: true,
                        fieldsConfigured: true,
                        parentId: fsFindId,
                        _updateTimestamp: nextTs(),
                        positionId: pos.pathSplit,
                    });

                    // D. Filter IS_TRUE 
                    pushNode(filterFoundId, "pathrule", bxLeft(i), Y_SUBFILT, {
                        type: "pathrule",
                        appId: "path-rule",
                        pathId: `${pathSplitId}_path_0`,
                        parentId: pathSplitId,
                        branchIndex: 0,
                        hasWarning: false,
                        hasMandatoryFields: true,
                        showExtension: true,
                        _updateTimestamp: nextTs(),
                        positionId: pos.filterFound,
                        filterData: {
                            Filter_groups: [{
                                id: GRP_TRUE,
                                matchType: "all",
                                conditions: [{
                                    id: COND_TRUE,
                                    field: `{{${fsFindId}:datafound}}`,
                                    operator: "IS_TRUE",
                                    value: "",
                                }],
                            }],
                            groupOperators: [],
                        },
                        fieldsConfigured: true,
                        hasConfigured: true,
                        FieldMapping: {
                            [`condition_${COND_TRUE}_field`]: {
                                schema: `{{${fsFindId}:datafound}}`,
                                type: "string",
                            },
                        },
                    });

                    // E. Update Asset
                    pushNode(updateId, "app", bxLeft(i), Y_ACTION, {
                        type: "app",
                        appId: freshserviceAppId,
                        hasWarning: false,
                        hasMandatoryFields: false,
                        hasConfigured: true,
                        fieldsConfigured: true,
                        showExtension: true,
                        _updateTimestamp: nextTs(),
                        positionId: pos.update,
                        AppName: freshserviceAppName,
                        eventId: "update_asset",
                        event: {
                            id: "update_asset",
                            name: "Update Asset",
                            description: "Updates an existing asset based on the selected asset ID.",
                            has_config_fields: true,
                            batch: false,
                        },
                        connectionId: fsConnId,
                        connection: { id: fsConnId, name: fsConnName, status: "SUCCESS" },
                        config_fields: {
                            asset_type_id: { schema: fsTypeId, type: "number" },
                        },
                        FieldMapping: buildFM(true),
                    });

                    //  F. Filter IS_FALSE
                    pushNode(filterMissedId, "pathrule", bxRight(i), Y_SUBFILT, {
                        type: "pathrule",
                        appId: "path-rule",
                        pathId: `${pathSplitId}_path_1`,
                        parentId: pathSplitId,
                        branchIndex: 1,
                        hasWarning: false,
                        hasMandatoryFields: true,
                        showExtension: true,
                        _updateTimestamp: nextTs(),
                        positionId: pos.filterMissed,
                        filterData: {
                            Filter_groups: [{
                                id: GRP_FALSE,
                                matchType: "all",
                                conditions: [{
                                    id: COND_FALSE,
                                    field: `{{${fsFindId}:datafound}}`,
                                    operator: "IS_FALSE",
                                    value: "",
                                }],
                            }],
                            groupOperators: [],
                        },
                        fieldsConfigured: true,
                        hasConfigured: true,
                        FieldMapping: {
                            [`condition_${COND_FALSE}_field`]: {
                                schema: `{{${fsFindId}:datafound}}`,
                                type: "string",
                            },
                        },
                    });

                    // G. Create Asset
                    pushNode(createId, "app", bxRight(i), Y_ACTION, {
                        type: "app",
                        appId: freshserviceAppId,
                        hasWarning: false,
                        hasMandatoryFields: false,
                        hasConfigured: true,
                        fieldsConfigured: true,
                        showExtension: true,
                        _updateTimestamp: nextTs(),
                        positionId: pos.create,
                        AppName: freshserviceAppName,
                        eventId: "create_asset",
                        event: {
                            id: "create_asset",
                            name: "Create Asset",
                            description: "Creates a new asset based on a selected asset type.",
                            has_config_fields: true,
                            batch: false,
                        },
                        connectionId: fsConnId,
                        connection: { id: fsConnId, name: fsConnName, status: "SUCCESS" },
                        config_fields: {
                            asset_type_id: { schema: fsTypeId, type: "number" },
                        },
                        FieldMapping: buildFM(false),
                    });

                    //  Edges (with path split)
                    edgeData.push({ id: `e3-${filterId2}`, type: "pathedge", source: "3", target: filterId2, sourceHandle: `3_path_${i}` });
                    edgeData.push({ id: `e${filterId2}-${fsFindId}`, type: "buttonedge", source: filterId2, target: fsFindId });
                    edgeData.push({ id: `e${fsFindId}-${pathSplitId}`, type: "buttonedge", source: fsFindId, target: pathSplitId });
                    edgeData.push({ id: `e${pathSplitId}-${filterFoundId}`, type: "pathedge", source: pathSplitId, target: filterFoundId, sourceHandle: `${pathSplitId}_path_0` });
                    edgeData.push({ id: `e${filterFoundId}-${updateId}`, type: "buttonedge", source: filterFoundId, target: updateId });
                    edgeData.push({ id: `e${pathSplitId}-${filterMissedId}`, type: "pathedge", source: pathSplitId, target: filterMissedId, sourceHandle: `${pathSplitId}_path_1` });
                    edgeData.push({ id: `e${filterMissedId}-${createId}`, type: "buttonedge", source: filterMissedId, target: createId });
                } else {
                    //  D. Filter IS_TRUE (direct from find asset, centered)
                    pushNode(filterFoundId, "pathrule", bx(i), Y_SUBFILT, {
                        type: "pathrule",
                        appId: "path-rule",
                        pathId: `${fsFindId}_path_0`,
                        parentId: fsFindId,
                        branchIndex: 0,
                        hasWarning: false,
                        hasMandatoryFields: true,
                        showExtension: true,
                        _updateTimestamp: nextTs(),
                        positionId: pos.filterFound,
                        filterData: {
                            Filter_groups: [{
                                id: GRP_TRUE,
                                matchType: "all",
                                conditions: [{
                                    id: COND_TRUE,
                                    field: `{{${fsFindId}:datafound}}`,
                                    operator: "IS_TRUE",
                                    value: "",
                                }],
                            }],
                            groupOperators: [],
                        },
                        fieldsConfigured: true,
                        hasConfigured: true,
                        FieldMapping: {
                            [`condition_${COND_TRUE}_field`]: {
                                schema: `{{${fsFindId}:datafound}}`,
                                type: "string",
                            },
                        },
                    });

                    //  E. Update Asset (centered) 
                    pushNode(updateId, "app", bx(i), Y_ACTION, {
                        type: "app",
                        appId: freshserviceAppId,
                        hasWarning: false,
                        hasMandatoryFields: false,
                        hasConfigured: true,
                        fieldsConfigured: true,
                        showExtension: true,
                        _updateTimestamp: nextTs(),
                        positionId: pos.update,
                        AppName: freshserviceAppName,
                        eventId: "update_asset",
                        event: {
                            id: "update_asset",
                            name: "Update Asset",
                            description: "Updates an existing asset based on the selected asset ID.",
                            has_config_fields: true,
                            batch: false,
                        },
                        connectionId: fsConnId,
                        connection: { id: fsConnId, name: fsConnName, status: "SUCCESS" },
                        config_fields: {
                            asset_type_id: { schema: fsTypeId, type: "number" },
                        },
                        FieldMapping: buildFM(true),
                    });

                    // Edges (no path split)
                    edgeData.push({ id: `e3-${filterId2}`, type: "pathedge", source: "3", target: filterId2, sourceHandle: `3_path_${i}` });
                    edgeData.push({ id: `e${filterId2}-${fsFindId}`, type: "buttonedge", source: filterId2, target: fsFindId });
                    edgeData.push({ id: `e${fsFindId}-${filterFoundId}`, type: "buttonedge", source: fsFindId, target: filterFoundId });
                    edgeData.push({ id: `e${filterFoundId}-${updateId}`, type: "buttonedge", source: filterFoundId, target: updateId });
                }
            });
            return { nodeData, edgeData };
        }

        const saveAndActivate = async (option, konnectorId, result) => {
            const tenantToken = option.iparams.tenantToken || option.tenantToken;
            const domain = option.iparams?.domain;
            const saveUrl = `https://${domain}${rootDomain}/komp/api/konnector-nodes/${konnectorId}/save?token=${tenantToken}`;
            const activateUrl = `https://${domain}${rootDomain}/komp/api/konnectors/${konnectorId}/ACTIVE?token=${tenantToken}`;
            console.log("Save url: ", saveUrl)
            if (!option.iparams?.isInEditConfig || options.iparams?.isSuperopsDomainChanged) {
                console.log("Activate url: ",activateUrl)
                await axios.post(saveUrl, result);
                await axios.post(activateUrl);
            } else {
                await axios.post(saveUrl, result);
            }
        };
        const konnector = await $db.get("assetConnector");
        const newAssetKonnectorId = konnector.newAssetId;
        const updateAssetKonnectorId = konnector.updateAssetId;
        const newAssetEvent = {
            eventId: "new_asset_created",
            event: {
                id: "new_asset_created",
                name: "New Asset Created",
                description: "Polls the SuperOps API to detect assets created since the last run.",
                has_config_fields: true,
                batch: false,
            },
            config_fields: {
                since: { schema: options.iparams?.since, type: "string" },
            }
        };
        const updateAssetEvent = {
            eventId: "asset_updated",
            event: {
                id: "asset_updated",
                name: "Asset Updated",
                description: "Polls the SuperOps API to detect assets updated since the last run.",
                has_config_fields: false,
            }
        };
        try {
            const newAssetResult = generateWorkflow(options.iparams, newAssetEvent, { includeCreatePath: true }); // contains nodeData and edgeData
            const updateAssetResult = generateWorkflow(options.iparams, updateAssetEvent, { includeCreatePath: false }); // contains nodeData and edgeData
            await saveAndActivate(options, newAssetKonnectorId, newAssetResult);
            await saveAndActivate(options, updateAssetKonnectorId, updateAssetResult);
        } catch (error) {
            console.error('Failed to create/update konnector:', error.response?.data);
            throw error
        }
    }
}

exports.OnAppInstallHandler = OnAppInstallHandler;