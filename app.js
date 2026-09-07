
const INCIDENTS = [
  {
    "id": "21a-7598",
    "date": "2026-09-06",
    "title": "21 Air Flight 7598 Operations Event",
    "aircraft": "Boeing 767-300ER (Cargo Platform)",
    "classification": "Investigation Active",
    "critical": false,
    "doc": "21A_7598_Dossier.pdf",
    "archive": "September 2026"
  },
  {
    "id": "ololokwe",
    "date": "2026-08-19",
    "title": "Mount Ololokwe Helicopter Impact",
    "aircraft": "Commercial Utility Rotorcraft",
    "classification": "Controlled Terrain Impact",
    "critical": true,
    "doc": "KCAA_Rec_0819.pdf",
    "archive": "August 2026"
  },
  {
    "id": "ai-2379",
    "date": "2026-08-04",
    "title": "Air India Flight 2379 En-Route Incident",
    "aircraft": "Airbus A320neo (AI-2379)",
    "classification": "Technical Divert",
    "critical": false,
    "doc": "DGCA_AI_2379.pdf",
    "archive": "August 2026"
  },
  {
    "id": "nazca",
    "date": "2026-08-01",
    "title": "Aerodiana Nazca Line Survey Crash",
    "aircraft": "Cessna 208 Grand Caravan",
    "classification": "Fatal Impact",
    "critical": true,
    "doc": "CIAA_Nazca_Log.pdf",
    "archive": "August 2026"
  },
  {
    "id": "rio",
    "date": "2026-06-14",
    "title": "Rio de Janeiro Mid-Air Collision",
    "aircraft": "Bell 206B JetRanger III (PP-MAC) / Airbus AS350 B2",
    "classification": "Mid-Air Collision",
    "critical": true,
    "doc": "CENIPA_Dossier_614.pdf",
    "archive": "June 2026"
  },
  {
    "id": "puerto",
    "date": "2026-03-23",
    "title": "Puerto Leguízamo Troop Transport Accident",
    "aircraft": "Colombian Aerospace Force Lockheed C-130H (FAC1016)",
    "classification": "Takeoff Excursion",
    "critical": true,
    "doc": "FAC_C130_Report.pdf",
    "archive": "March 2026"
  },
  {
    "id": "laguardia",
    "date": "2026-03-22",
    "title": "LaGuardia Airport Runway Service Collision",
    "aircraft": "Air Canada Express / Jazz Aviation CRJ-900",
    "classification": "Ground Collision",
    "critical": true,
    "doc": "NTSB_LGA_2026.pdf",
    "archive": "March 2026"
  },
  {
    "id": "iraq",
    "date": "2026-03-13",
    "title": "Western Iraq Refueling Mission Failure",
    "aircraft": "USAF KC-135 Stratotanker",
    "classification": "Operational Loss",
    "critical": true,
    "doc": "CENTCOM_AAR_13M.pdf",
    "archive": "March 2026"
  },
  {
    "id": "bangor",
    "date": "2026-01-25",
    "title": "Bangor Airport Runway Excursion",
    "aircraft": "Bombardier Challenger 650 (N-650XB)",
    "classification": "Runway Excursion",
    "critical": false,
    "doc": "NTSB_BGR_Jan25.pdf",
    "archive": "January 2026"
  },
  {
    "id": "sulawesi",
    "date": "2026-01-17",
    "title": "Sulawesi Fisheries Patrol Crash",
    "aircraft": "Indonesia Air Transport ATR 42-512",
    "classification": "Fatal Impact",
    "critical": true,
    "doc": "KNKT_ATR42_2026.pdf",
    "archive": "January 2026"
  }
];

function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function setupNav() {
  const page = document.body.dataset.page;
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.dataset.page === page) a.classList.add('active');
  });
}
function showToast(msg) {
  const t=document.getElementById('toast'); if(!t) return;
  t.textContent=msg; t.style.display='block'; clearTimeout(window.__toast);
  window.__toast=setTimeout(()=>t.style.display='none',2200);
}
function openIncident(item) {
  const modal=document.getElementById('modalBackdrop'); if(!modal) return;
  document.getElementById('modalTitle').textContent=item.title;
  document.getElementById('modalBody').innerHTML = `
    <div class="detail-grid">
      <b>Date</b><span>${esc(item.date)}</span>
      <b>Aircraft</b><span>${esc(item.aircraft)}</span>
      <b>Classification</b><span>${esc(item.classification)}</span>
      <b>Record ID</b><span>${esc(item.id)}</span>
      <b>Documentation</b><span>${esc(item.doc)}</span>
    </div>
    <div style="margin-top:18px;color:#71717a;font-size:12px">
      This local interface displays the registry information supplied to the site. It does not fetch or verify external investigation records.
    </div>`;
  modal.style.display='flex';
}
function closeModal() { const m=document.getElementById('modalBackdrop'); if(m) m.style.display='none'; }
function openDocument(item) {
  const modal=document.getElementById('modalBackdrop'); if(!modal) return;
  document.getElementById('modalTitle').textContent=item.doc;
  document.getElementById('modalBody').innerHTML = `
    <div style="border:1px solid #29292f;background:#0a0a0c;padding:26px;text-align:center">
      <div style="font-family:ui-monospace,monospace;color:#a1a1aa;font-size:12px">DOCUMENT INDEX</div>
      <div style="font-size:18px;font-weight:600;margin:8px 0 4px">${esc(item.doc)}</div>
      <div style="color:#71717a;font-size:12px">No PDF file is bundled with this static demo.</div>
    </div>
    <div style="margin-top:14px;display:flex;gap:8px">
      <button class="action-btn" onclick="showToast('Document placeholder opened')">Open record</button>
      <button class="action-btn" onclick="closeModal()">Close</button>
    </div>`;
  modal.style.display='flex';
}
function renderRegistry(filter='', mode='all') {
  const body=document.getElementById('registryBody'); if(!body) return;
  const q=filter.trim().toLowerCase();
  let rows=INCIDENTS.filter(i => {
    const text=`${i.date} ${i.title} ${i.aircraft} ${i.classification} ${i.doc}`.toLowerCase();
    return (!q || text.includes(q)) && (mode==='all' || (mode==='critical' && i.critical) || (mode==='active' && i.classification==='Investigation Active'));
  });
  body.innerHTML=rows.map(i=>`
    <tr class="registry-row" data-id="${esc(i.id)}">
      <td class="date-cell">${esc(i.date)}</td>
      <td><div class="incident-title">${esc(i.title)}</div><div class="aircraft-tag">${esc(i.aircraft)}</div></td>
      <td><span class="status-badge ${i.critical?'critical':''}">${esc(i.classification)}</span></td>
      <td><a href="#" class="doc-link" data-doc="${esc(i.id)}">▣ ${esc(i.doc)}</a></td>
    </tr>`).join('');
  document.getElementById('emptyState').style.display=rows.length?'none':'block';
  const count=document.getElementById('resultCount'); if(count) count.textContent=rows.length;
  body.querySelectorAll('.registry-row').forEach(row=>row.addEventListener('click', e=>{
    if(e.target.closest('.doc-link')) return;
    openIncident(INCIDENTS.find(i=>i.id===row.dataset.id));
  }));
  body.querySelectorAll('.doc-link').forEach(a=>a.addEventListener('click', e=>{
    e.preventDefault(); e.stopPropagation(); openDocument(INCIDENTS.find(i=>i.id===a.dataset.doc));
  }));
}
function initRegistry() {
  const input=document.getElementById('registrySearch');
  const clear=document.getElementById('clearSearch');
  let mode='all';
  const update=()=>{ renderRegistry(input.value,mode); clear.style.display=input.value?'block':'none'; };
  input.addEventListener('input',update);
  clear.addEventListener('click',()=>{input.value='';input.focus();update();});
  document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{
    mode=b.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(x=>x.classList.remove('active'));
    b.classList.add('active'); update();
  }));
  renderRegistry();
}
document.addEventListener('DOMContentLoaded',()=>{setupNav();initRegistry();});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});
