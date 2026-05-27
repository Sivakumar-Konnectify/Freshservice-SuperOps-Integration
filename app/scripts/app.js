let client;
let globalAssets = [];
let globalRegion, globalDomain;
const CARD_HEIGHT = 58;
const LIST_HEADER = 40;
const LIST_PADDING = 32;
const MAX_VISIBLE_CARDS = 3;
const DETAIL_HEIGHT = 280;

init();

async function init() {
  client = await app.initialized();
  let activated = false;
  const fallback = setTimeout(() => {
    if (!activated) loadAssets();
  }, 3000);
  client.events.on("app.activated", async function () {
    activated = true;
    clearTimeout(fallback);
    await loadAssets();
  });
}

async function loadAssets() {
  try {
    const iparams = await client.iparams.get();
    globalRegion = iparams.superopsRegion;
    globalDomain = iparams.superopsDomain;
    const ticketData = await client.data.get("ticketAssets");
    globalAssets = ticketData.ticketAssets || [];
    if (!globalAssets.length) {
      document.getElementById("asset-list-content").innerHTML = '<p class="message">No assets associated with this ticket.</p>';
      await resizeTo(100);
      return;
    }
    renderAssetList();
  } catch (err) {
    console.error("Error in loading asset:", err);
    document.getElementById("asset-list-content").innerHTML = '<p class="message">Error loading assets.</p>';
    await resizeTo(100);
  }
}

function renderAssetList() {
  const assetCount = globalAssets.length;
  const listHtml = globalAssets.map((asset) => `
    <li class="asset-item" data-assetid="${asset.id}" data-assetname="${asset.name}">
      <div class="asset-icon">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="1" y="3" width="14" height="10" rx="2" stroke="#4285f4" stroke-width="1.2"/>
          <rect x="4" y="7" width="2" height="2" rx="0.5" fill="#4285f4"/>
          <rect x="7" y="7" width="2" height="2" rx="0.5" fill="#4285f4"/>
          <rect x="10" y="7" width="2" height="2" rx="0.5" fill="#4285f4"/>
        </svg>
      </div>
      <div class="asset-info">
        <div class="asset-name">${asset.name}</div>
        <div class="asset-sub">ID: ${asset.id}</div>
      </div>
      <svg class="asset-chevron" width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M5.5 3.5L9 7L5.5 10.5" stroke="currentColor" stroke-width="1.2"
          stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </li>
  `).join("");
  document.getElementById("asset-list-content").innerHTML = `
    <p class="section-label">Associated Assets (${assetCount})</p>
    <ul class="asset-list" id="asset-ul">${listHtml}</ul>
  `;
  // Enable scroll only when more than 3 assets
  const ul = document.getElementById("asset-ul");
  if (assetCount > MAX_VISIBLE_CARDS) {
    ul.style.maxHeight = `${MAX_VISIBLE_CARDS * CARD_HEIGHT}px`;
    ul.style.overflowY = "auto";
  }
  document.querySelectorAll(".asset-item").forEach(item => {
    item.addEventListener("click", function () {
      showDetailView(
        this.getAttribute("data-assetid"),
        this.getAttribute("data-assetname")
      );
    });
  });
  // Resize sidebar to fit up to 3 cards
  const newHeight = LIST_PADDING + LIST_HEADER + (Math.min(assetCount, MAX_VISIBLE_CARDS) * CARD_HEIGHT);
  resizeTo(newHeight);
}

async function showDetailView(assetId, assetName) {
  document.getElementById("detail-name").textContent = assetName;
  document.getElementById("detail-id").textContent = "ID: " + assetId;
  document.getElementById("detail-actions-content").innerHTML = '<div class="loading"><div class="spinner"></div> Fetching asset info…</div>';
  switchView("view-detail");
  // Resize to detail height immediately (no scroll)
  await resizeTo(DETAIL_HEIGHT);
  try {
    const assetResponse = await client.request.invoke("getAssetById", { assetId });
    const assetTag = assetResponse.response?.response;
    if (!assetTag) {
      document.getElementById("detail-actions-content").innerHTML =
        '<p class="message">No SuperOps asset tag found.</p>';
      return;
    }
    const regionBase = globalRegion.toLowerCase() === "eu" ? "https://euserv.superops.ai" : "https://usserv.superops.ai";
    const remoteSessionUrl = `${regionBase}/rmm-web/external-web-api/initiate-remote-session/${assetTag}`;
    const assetDetailsUrl = `https://${globalDomain}.superops.ai/#/rmm/asset/details/${assetTag}`;
    document.getElementById("detail-actions-content").innerHTML = `
      <button class="action-btn primary" id="remote-btn">
        <div class="action-btn-icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="1" y="3" width="14" height="8" rx="1.5" stroke="#1a56db" stroke-width="1.2"/>
            <path d="M5 11v2M11 11v2M3.5 13h9" stroke="#1a56db" stroke-width="1.2" stroke-linecap="round"/>
            <circle cx="8" cy="7" r="1.5" fill="#1a56db"/>
          </svg>
        </div>
        <div class="action-btn-text">
          <div class="action-btn-label">Initiate Remote Session</div>
          <div class="action-btn-sub">Connect to this device remotely</div>
        </div>
        <svg class="action-btn-arrow" width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M4.5 2.5L8 6L4.5 9.5" stroke="currentColor" stroke-width="1.2"
            stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <button class="action-btn" id="details-btn">
        <div class="action-btn-icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="2" width="12" height="12" rx="2" stroke="#555" stroke-width="1.2"/>
            <path d="M5 6h6M5 8.5h4" stroke="#555" stroke-width="1.2" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="action-btn-text">
          <div class="action-btn-label">Open Asset Details</div>
          <div class="action-btn-sub">View full profile in SuperOps</div>
        </div>
        <svg class="action-btn-arrow" width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M4.5 2.5L8 6L4.5 9.5" stroke="currentColor" stroke-width="1.2"
            stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    `;
    document.getElementById("remote-btn").addEventListener("click", () => {
      window.open(remoteSessionUrl, "_blank");
    });
    document.getElementById("details-btn").addEventListener("click", () => {
      window.open(assetDetailsUrl, "_blank");
    });
  } catch (err) {
    console.error("Error in viewing details", err);
    document.getElementById("detail-actions-content").innerHTML = '<p class="message">Error loading asset details.</p>';
  }
}

function switchView(viewId) {
  document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
  document.getElementById(viewId).classList.add("active");
}

async function resizeTo(heightPx) {
  try {
    await client.instance.resize({ height: `${heightPx}px` });
  } catch (err) {
    console.warn("Resize failed:", err);
  }
}

document.getElementById("back-btn").addEventListener("click", async () => {
  switchView("view-list");
  // Resize back to list height when returning
  const newHeight = LIST_PADDING + LIST_HEADER + (Math.min(globalAssets.length, MAX_VISIBLE_CARDS) * CARD_HEIGHT);
  await resizeTo(newHeight);
});