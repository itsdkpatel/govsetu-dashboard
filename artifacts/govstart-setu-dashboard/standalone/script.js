const problems = [
  { id: "traffic", title: "Smart Traffic Optimization for Bengaluru", copy: "Reducing congestion in Metro cities empowers enforcement challenges.", matches: "20" },
  { id: "records", title: "Digital Land Records via Blockchain", copy: "Focus on transparency for mentory and decentralized security and invtixvity moroner.", matches: "315" },
  { id: "water", title: "AI for Urban Water Management", copy: "Detecting leaks early and making every drop visible across city networks.", matches: "42" },
];

const tenders = [
  { id: "bins", title: "E1. Tender for Smart Waste Bins", meta: "Randomized: $7.31M • Date: 25-14-2023", type: "procurement" },
  { id: "schools", title: "E2. Request for Proposal: EdTech for Rural Schools", meta: "Randomized: $7.31M • Date: 12-19-2023", type: "education" },
  { id: "health", title: "E3. EOI: Digital Healthcare Platforms", meta: "Randomized: $3.31M • Date: 16-09-2023", type: "health" },
];

const timelineItems = [
  { id: "drone", phase: "Phase 21", title: "A1. Drone-based Crop Monitoring (Phase 2)" },
  { id: "water", phase: "Phase 22", title: "A2. AI for Urban Water Management (Proof of Concept)" },
  { id: "solar", phase: "Phase 23", title: "A3. Solar Power Grid Edge Analytics (Pre-Pilot)", warn: true },
  { id: "records", phase: "Phase 24", title: "A4. Secure Digital Records Exchange" },
];

const startupMatches = [
  { id: "urbanpulse", name: "UrbanPulse Technologies", specialty: "AI traffic intelligence & adaptive signals", score: 96, reason: "Strong match for congestion forecasting and live traffic optimisation." },
  { id: "civisense", name: "CiviSense Labs", specialty: "Computer vision for public infrastructure", score: 91, reason: "Proven city pilots with camera-based incident detection." },
  { id: "routecraft", name: "RouteCraft Mobility", specialty: "Transit routing & commuter analytics", score: 87, reason: "Best fit for public transport coordination and commuter insights." },
];

const state = {
  search: "",
  problemFilter: "all",
  tenderFilter: "all",
  timelineTab: "Timeline",
  timelinePage: 0,
  problemStatement: "How can Bengaluru reduce congestion during peak hours?",
  submittedProblem: "How can Bengaluru reduce congestion during peak hours?",
  analysisStage: "complete",
  analysisStep: 5,
  toast: "",
  modal: "",
  feedback: "",
  replies: [],
};

const root = document.getElementById("app");
let toastTimer;
let analysisTimers = [];

function icon(name) {
  const paths = {
    search: '<circle cx="11" cy="11" r="7"></circle><path d="m20 20-4-4"></path>',
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"></path>',
    lightbulb: '<path d="M9 18h6M10 22h4M8 14a7 7 0 1 1 8 0c-1 1-2 2-2 4h-4c0-2-1-3-2-4Z"></path>',
    clock: '<circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 2"></path>',
    landmark: '<path d="m3 10 9-6 9 6M5 10h14M6 10v8m4-8v8m4-8v8m4-8v8M3 20h18"></path>',
    sparkles: '<path d="m12 3-1.2 4.8L6 9l4.8 1.2L12 15l1.2-4.8L18 9l-4.8-1.2L12 3ZM5 16l-.6 2.4L2 19l2.4.6L5 22l.6-2.4L8 19l-2.4-.6L5 16Z"></path>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"></path>',
    wallet: '<path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"></path><path d="M3 8h18M16 14h.01"></path>',
    chart: '<path d="M4 19V5M4 19h17M8 15l3-4 3 2 5-7"></path>',
    shield: '<path d="M12 3 4 6v5c0 5 3.4 8.2 8 10 4.6-1.8 8-5 8-10V6l-8-3Z"></path><path d="m8 12 2.5 2.5L16 9"></path>',
    check: '<path d="m5 12 4 4L19 6"></path>',
    chevronRight: '<path d="m9 18 6-6-6-6"></path>',
    chevronLeft: '<path d="m15 18-6-6 6-6"></path>',
    arrowLeft: '<path d="M19 12H5M12 19l-7-7 7-7"></path>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"></path><path d="M14 2v6h6M8 13h8M8 17h6"></path>',
    external: '<path d="M14 3h7v7M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>',
    send: '<path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path>',
    x: '<path d="M18 6 6 18M6 6l12 12"></path>',
    circle: '<circle cx="12" cy="12" r="8"></circle>',
    lock: '<rect width="14" height="11" x="5" y="10" rx="2"></rect><path d="M8 10V7a4 4 0 0 1 8 0v3"></path>',
  };
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || ""}</svg>`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
}

function isDetail() {
  return location.hash.startsWith("#/pilot/");
}

function notify(message) {
  state.toast = message;
  render();
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { state.toast = ""; render(); }, 2800);
}

function header() {
  const active = isDetail() ? "Pilot Workspace" : "Identify Challenges";
  const nav = [
    ["Identify Challenges", "Discover", "lightbulb"],
    ["Pilot Workspace", "Run pilots", "clock"],
    ["Procure Solutions", "Buy better", "landmark"],
  ];
  return `
    <header class="window-top">
      <a class="window-brand" href="#">
        <span class="govsetu-logo compact"><svg viewBox="0 0 40 40" fill="none"><path d="M8 26.5 20 8l12 18.5M12 24.5v7M20 21v10.5M28 24.5v7M7 31.5h26" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="20" cy="8" r="3" fill="currentColor"/><circle cx="8" cy="26.5" r="3" fill="currentColor"/><circle cx="32" cy="26.5" r="3" fill="currentColor"/></svg></span>
        <span><strong>GovSetu</strong><small>Startup Innovation &amp; Public Procurement Portal</small></span>
      </a>
      <div class="window-tools">
        <label class="search-box" aria-label="Search portal">${icon("search")}<input id="global-search" value="${escapeHtml(state.search)}" placeholder="Search" /></label>
        <button class="icon-button" data-action="notify" data-message="You have 3 new workspace updates" aria-label="Notifications">${icon("bell")}<span class="notification-dot">3</span></button>
        <span class="avatar">US</span>
      </div>
    </header>
    <nav class="main-nav" aria-label="Main navigation">
      ${nav.map(([label, hint, glyph]) => `<button class="${active === label ? "active" : ""}" data-action="nav" data-target="${label}"><span class="nav-icon">${icon(glyph)}</span><span class="nav-copy"><strong>${label}</strong><small>${hint}</small></span></button>`).join("")}
    </nav>`;
}

function panelHead(title, content = "") {
  return `<div class="panel-head"><h2>${title}</h2>${content}</div>`;
}

function matchingPipeline() {
  const labels = ["Government", "Post Problem Statement", "AI Problem Analysis", "Find Matching Startups", "AI Ranking", "Startup Shortlist"];
  return `<div class="matching-pipeline" aria-label="AI startup matching pipeline">${labels.map((label, index) => {
    const complete = state.analysisStage === "complete" || state.analysisStep > index + 1;
    const current = state.analysisStage === "analyzing" && state.analysisStep === index + 1;
    return `<div class="pipeline-step-group"><div class="pipeline-step ${complete ? "complete" : ""} ${current ? "current" : ""}"><span class="pipeline-number">${complete ? icon("check") : index + 1}</span><span>${label}</span>${current ? '<span class="pipeline-pulse">Processing</span>' : ""}</div>${index < labels.length - 1 ? `<span class="pipeline-arrow ${complete ? "complete" : ""}">↓</span>` : ""}</div>`;
  }).join("")}</div>`;
}

function startupList() {
  if (state.analysisStage === "analyzing") {
    return `<div class="matching-empty">${icon("sparkles")}<strong>Finding and ranking startup solutions...</strong><span>AI is comparing capability, pilot readiness and public-sector fit.</span></div>`;
  }
  return `<div class="startup-list">${startupMatches.map((startup, index) => `
    <button class="startup-match" data-action="shortlist" data-name="${escapeHtml(startup.name)}">
      <span class="rank-badge">${index + 1}</span>
      <span class="startup-details"><strong>${startup.name}</strong><small>${startup.specialty}</small><em>${startup.reason}</em></span>
      <span class="match-score"><strong>${startup.score}%</strong><small>match</small></span>${icon("chevronRight")}
    </button>`).join("")}</div>`;
}

function dashboard() {
  const search = state.search.toLowerCase();
  const visibleProblems = problems.filter((problem) => {
    const matchesSearch = `${problem.title} ${problem.copy}`.toLowerCase().includes(search);
    const matchesFilter = state.problemFilter === "all" || (state.problemFilter === "high" && Number(problem.matches) >= 100) || (state.problemFilter === "new" && problem.id !== "records");
    return matchesSearch && matchesFilter;
  });
  const visibleTenders = tenders.filter((tender) => `${tender.title} ${tender.meta}`.toLowerCase().includes(search) && (state.tenderFilter === "all" || tender.type === state.tenderFilter));
  const timeline = timelineItems.slice(state.timelinePage * 3, state.timelinePage * 3 + 3).filter((item) => item.title.toLowerCase().includes(search));

  return `
    <main class="main-content">
      <div class="dashboard-grid">
        <div class="stack">
          <section class="panel">${panelHead("AI Match: Ranked Startups", `<span class="ai-live">${icon("sparkles")} Live ranking</span>`)}<div class="panel-body">${startupList()}</div></section>
          <section class="panel">
            <div class="problem-intake">
              <div class="intake-heading"><div><span class="eyebrow">${icon("landmark")} Government</span><h2>Post a problem statement</h2><p>Describe a public challenge and let AI find the strongest startup solutions.</p></div><span class="intake-step">01 / AI MATCHING</span></div>
              <form class="problem-search" id="problem-form">${icon("search")}<input id="problem-statement" value="${escapeHtml(state.problemStatement)}" placeholder="e.g. Reduce peak-hour congestion across Bengaluru" aria-label="Government problem statement" /><button class="solid-button" type="submit">${icon("sparkles")} Analyze &amp; find startups</button></form>
              ${matchingPipeline()}
              ${state.analysisStage === "complete" ? `<div class="match-context"><span>AI shortlist for</span><strong>“${escapeHtml(state.submittedProblem)}”</strong></div>` : ""}
            </div>
            ${panelHead("Identify: Top Problem Statements", `<select class="select-control" id="problem-filter"><option value="all" ${state.problemFilter === "all" ? "selected" : ""}>All Problem Statements</option><option value="new" ${state.problemFilter === "new" ? "selected" : ""}>New this month</option><option value="high" ${state.problemFilter === "high" ? "selected" : ""}>High match count</option></select>`)}
            <div class="panel-body">${visibleProblems.length ? visibleProblems.slice(0, 2).map((problem, index) => `<article class="statement"><div class="statement-title">${index + 1}. ${problem.title}</div><p class="statement-copy">${problem.copy}</p><div class="statement-actions"><button class="outline-button" data-action="notify" data-message="Opening details for ${escapeHtml(problem.title)}">View Details</button><span class="statement-meta">New metrics: ${problem.matches}</span><button class="solid-button" data-action="notify" data-message="Proposal saved to your workspace">Submit Proposal</button></div></article>`).join("") : '<div class="empty-state">No problem statements match your search.</div>'}</div>
          </section>
          <section class="panel">
            ${panelHead("Procure Solutions", `<select class="select-control" id="tender-filter"><option value="all" ${state.tenderFilter === "all" ? "selected" : ""}>All Search</option><option value="procurement" ${state.tenderFilter === "procurement" ? "selected" : ""}>Procurement</option><option value="education" ${state.tenderFilter === "education" ? "selected" : ""}>Education</option><option value="health" ${state.tenderFilter === "health" ? "selected" : ""}>Healthcare</option></select>`)}
            <div class="metric-grid">
              ${metric("green", "users", "Active Pilots", "12", "Randomized")}${metric("gold", "clock", "Randomized", "25.80N")}${metric("rose", "wallet", "Funding Disbursed", "$7.31 MN")}${metric("lilac", "chart", "Scalable Isable Solutions", "20", "Randomized")}
            </div>
            <div class="chip-row"><span class="chip">${icon("shield")} Prior Exp. Waived</span><span class="chip gold">${icon("landmark")} Relaxed Turnover</span></div>
            <div class="panel-body"><div class="tender-list">${visibleTenders.length ? visibleTenders.map((tender) => `<button class="tender-item" data-action="notify" data-message="${escapeHtml(tender.title)} added to review"><strong>${tender.title}</strong><small>${tender.meta}</small></button>`).join("") : '<div class="empty-state">No tenders match your search.</div>'}</div></div>
          </section>
        </div>
        <div class="stack">
          <section class="panel">
            ${panelHead("Pilot: Active PoCs & Sandbox", `<label class="search-box" aria-label="Search pilot timeline">${icon("search")}<input id="pilot-search" value="${escapeHtml(state.search)}" placeholder="Search" /></label>`)}
            <div class="panel-body">
              <div class="chip-row" style="padding:0 0 9px">${["Timeline", "Sandbox", "Sanctions"].map((tab) => `<button class="chip ${state.timelineTab === tab ? "" : "inactive"}" data-action="timeline-tab" data-tab="${tab}">${tab}</button>`).join("")}</div>
              ${state.timelineTab === "Timeline" ? `${timeline.length ? timeline.map((item) => `<div class="timeline-row"><span class="phase">${item.phase}</span><span class="timeline-marker"></span><span class="timeline-label">${item.title}</span><span class="status-tag ${item.warn ? "warn" : ""}">${item.warn ? "Review" : "Status"}</span></div>`).join("") : '<div class="empty-state">No pilots match your search.</div>'}<div class="pager"><button data-action="timeline-page" data-page="-1" ${state.timelinePage === 0 ? "disabled" : ""}>${icon("chevronLeft")}</button><span>${state.timelinePage + 1} of 2</span><button data-action="timeline-page" data-page="1" ${state.timelinePage === 1 ? "disabled" : ""}>${icon("chevronRight")}</button></div>` : `<div class="empty-state">${state.timelineTab} workspace is clear for the next review.</div>`}
            </div>
          </section>
        </div>
      </div>
    </main>`;
}

function metric(color, glyph, label, value, note = "") {
  return `<article class="metric-card ${color}"><div class="metric-label">${icon(glyph)}${label}</div><strong>${value}</strong>${note ? `<div class="meter"><span></span></div><span class="meter-note">${note}</span>` : ""}</article>`;
}

function detail() {
  return `
    <main class="main-content"><div class="detail-layout">
      <div class="detail-topline"><div><div class="detail-title">Department of Technical Education, Kanpur</div><span class="detail-id">ID: PILOT-2026-89</span></div><div class="detail-actions"><button class="action-link" data-action="back">${icon("arrowLeft")} Back to workspace</button><button class="action-link" data-action="modal" data-modal="progress">${icon("clock")} Phase 2 in Progress</button><button class="action-link primary" data-action="notify" data-message="PoC report uploader opened">${icon("file")} Upload PoC Report</button></div></div>
      <section class="panel detail-panel">${panelHead("Milestone Tracking & Deliverables")}<div class="milestone-list">
        ${milestone("approved", "check", "Phase 1: Architecture & Prototyping", "Aug 10, 2026", "Core architecture mapped and initial AI model trained with sample data.", '<span class="mini-badge">' + icon("check") + ' Approved</span><button class="mini-badge file" data-action="notify" data-message="Arch_Design.pdf downloaded">' + icon("file") + ' Arch_Design.pdf</button>')}
        ${milestone("pending", "circle", "Phase 2: Sandbox Testing & API Integration", "Expected: Sep 05, 2026", "Live testing in isolated sandbox. Integrate NLP models for student queries.", '<span style="font-size:9px;color:#40506a">65% Completed</span><div class="progress-line"><span></span></div><button class="outline-button" data-action="modal" data-modal="progress">Update Progress</button><button class="mini-badge file" data-action="modal" data-modal="sandbox">' + icon("external") + ' Sandbox URL</button>')}
        ${milestone("locked", "lock", "Phase 3: Final Security Audit & Deployment", "TBD", "Security vetting by NIC and scaling the solution to live servers.", "")}
      </div></section>
      <section class="panel detail-panel">${panelHead("Funding & Escrow", `<button class="icon-button" data-action="notify" data-message="Escrow ledger is verified" aria-label="Funding details">${icon("wallet")}</button>`)}<div class="amount"><span class="amount-label">Total Approved Grant</span><strong>₹15,00,000</strong></div><div class="funding-rows"><div class="funding-row"><span>Disbursed (Ph1)</span><strong>₹5,00,000</strong></div><div class="funding-row"><span>Pending (Escrow)</span><strong>₹10,00,000</strong></div></div><button class="contract-button" data-action="modal" data-modal="contract">${icon("file")} View Smart Contract</button></section>
      <section class="panel detail-panel"><div class="panel-head"><h2>Official's Feedback</h2></div><div class="feedback-body"><div class="feedback-message"><span class="feedback-avatar">SG</span><div><strong>Sanjay Gupta</strong><small>Nodal Officer, UP Govt</small><p>“Phase 1 prototype looks solid. For Phase 2, please ensure the system handles regional language queries efficiently. Sandbox access granted.”</p><span class="feedback-age">2 days ago</span></div></div>${state.replies.map((reply) => `<div class="feedback-message" style="margin-top:7px"><span class="feedback-avatar" style="background:#2966a9">US</span><div><strong>Your team</strong><small>Startup workspace</small><p>${escapeHtml(reply)}</p><span class="feedback-age">Just now</span></div></div>`).join("")}<form class="feedback-form" id="feedback-form"><input id="feedback-input" value="${escapeHtml(state.feedback)}" placeholder="Type an update or reply..." /><button class="send-button" type="submit" aria-label="Send feedback">${icon("send")}</button></form></div></section>
    </div></main>`;
}

function milestone(stateName, glyph, title, date, copy, tools) {
  return `<article class="milestone"><span class="milestone-icon ${stateName}">${icon(glyph)}</span><div><h3>${title}</h3><p>${date}</p><p>${copy}</p>${tools ? `<div class="milestone-tools">${tools}</div>` : ""}</div></article>`;
}

function modal() {
  const content = {
    progress: ["Update Phase 2 progress", "Keep the official team aligned with the latest delivery status.", "Save progress", `<label style="display:block;color:#40516c;font-size:10px;font-weight:700;margin-bottom:5px" for="progress-note">Progress note</label><textarea id="progress-note">Regional language testing is underway.</textarea>`],
    sandbox: ["Sandbox access", "The test environment is ready for approved pilot collaborators.", "Copy sandbox URL", '<input readonly value="https://sandbox.govstartsetu.in/pilot-2026-89" />'],
    contract: ["Smart contract ledger", "Escrow release is tied to the approved Phase 2 deliverable.", "Acknowledge ledger", `<div style="display:grid;gap:7px;color:#687587;font-size:11px"><span>${icon("check")} Phase 1 release verified</span><span>${icon("shield")} Escrow protected</span></div>`],
  }[state.modal];
  if (!content) return "";
  return `<div class="modal-backdrop" data-action="close-backdrop"><section class="modal" role="dialog" aria-modal="true"><div class="modal-head"><h2>${content[0]}</h2><button class="icon-button" data-action="close-modal" aria-label="Close dialog">${icon("x")}</button></div><p>${content[1]}</p>${content[3]}<div class="modal-actions"><button class="outline-button" data-action="close-modal">Cancel</button><button class="solid-button" data-action="confirm-modal" data-message="${content[2]}">${content[2]}</button></div></section></div>`;
}

function render() {
  root.innerHTML = `<div class="portal-window">${header()}${isDetail() ? detail() : dashboard()}</div>${state.toast ? `<div class="toast" role="status">${icon("check")}${escapeHtml(state.toast)}</div>` : ""}${modal()}`;
  bindEvents();
}

function runAnalysis(event) {
  event.preventDefault();
  const value = document.getElementById("problem-statement").value.trim();
  state.problemStatement = value;
  if (!value) return notify("Enter a government problem statement first");
  state.submittedProblem = value;
  state.analysisStage = "analyzing";
  state.analysisStep = 1;
  notify("AI is analysing the government problem statement");
  analysisTimers.forEach(clearTimeout);
  analysisTimers = [2, 3, 4, 5].map((step, index) => setTimeout(() => { state.analysisStep = step; render(); }, (index + 1) * 420));
  analysisTimers.push(setTimeout(() => { state.analysisStage = "complete"; notify("Top matching startups have been ranked"); }, 1850));
}

function bindEvents() {
  document.querySelectorAll("[data-action]").forEach((element) => element.addEventListener("click", (event) => {
    const action = element.dataset.action;
    if (action === "nav") {
      if (element.dataset.target === "Identify Challenges") location.hash = "";
      else if (element.dataset.target === "Pilot Workspace") location.hash = "/pilot/2026-89";
      else notify("Procure Solutions view selected");
    }
    if (action === "back") location.hash = "";
    if (action === "notify") notify(element.dataset.message);
    if (action === "shortlist") notify(`${element.dataset.name} added to shortlist`);
    if (action === "timeline-tab") { state.timelineTab = element.dataset.tab; notify(`${state.timelineTab} view selected`); }
    if (action === "timeline-page") state.timelinePage = Math.max(0, Math.min(1, state.timelinePage + Number(element.dataset.page)));
    if (action === "modal") { state.modal = element.dataset.modal; render(); }
    if (action === "close-modal" || (action === "close-backdrop" && event.target === element)) { state.modal = ""; render(); }
    if (action === "confirm-modal") { const message = element.dataset.message; state.modal = ""; render(); notify(message); }
  }));

  const globalSearch = document.getElementById("global-search");
  const pilotSearch = document.getElementById("pilot-search");
  [globalSearch, pilotSearch].filter(Boolean).forEach((input) => input.addEventListener("input", () => { state.search = input.value; render(); const next = document.getElementById(input.id); next?.focus(); next?.setSelectionRange(next.value.length, next.value.length); }));
  document.getElementById("problem-filter")?.addEventListener("change", (event) => { state.problemFilter = event.target.value; render(); });
  document.getElementById("tender-filter")?.addEventListener("change", (event) => { state.tenderFilter = event.target.value; render(); });
  document.getElementById("problem-form")?.addEventListener("submit", runAnalysis);
  document.getElementById("problem-statement")?.addEventListener("input", (event) => { state.problemStatement = event.target.value; });
  document.getElementById("feedback-form")?.addEventListener("submit", (event) => { event.preventDefault(); const value = document.getElementById("feedback-input").value.trim(); if (!value) return notify("Write an update before sending"); state.replies.push(value); state.feedback = ""; notify("Reply shared with the official team"); });
}

window.addEventListener("hashchange", render);
render();