const API = "http://localhost:5000";

const listEl = document.querySelector(".assignment-list");
const userSelect = document.getElementById("userSelect");

// ---------- STATE ----------
let allAssignments = [];
let activeFilter = "all"; // all | overdue | in_progress | done
let activeView = "due";   // due | course

// ---------- HELPERS ----------
function toDate(dueAt) {
  if (!dueAt) return new Date(0);
  return new Date(String(dueAt).replace(" ", "T"));
}

function fmtDue(dueAt) {
  const d = toDate(dueAt);
  if (Number.isNaN(d.getTime())) return String(dueAt);
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function normalizeStatus(s) {
  return String(s || "").toLowerCase().replace(" ", "_");
}

function isOverdue(a) {
  return toDate(a.due_at) < new Date() && normalizeStatus(a.status) !== "done";
}

function startOfWeek(d) {
  const x = new Date(d);
  const day = x.getDay();
  const diff = (day === 0 ? -6 : 1) - day;
  x.setDate(x.getDate() + diff);
  x.setHours(0, 0, 0, 0);
  return x;
}

function weekBucket(dueAt) {
  const now = new Date();
  const w0 = startOfWeek(now);
  const w1 = new Date(w0); w1.setDate(w1.getDate() + 7);
  const w2 = new Date(w0); w2.setDate(w2.getDate() + 14);

  const d = toDate(dueAt);
  if (d >= w0 && d < w1) return "This Week";
  if (d >= w1 && d < w2) return "Next Week";
  return "Later";
}

function statusBadge(a) {
  const st = normalizeStatus(a.status);
  if (isOverdue(a)) return { cls: "overdue", text: "Overdue" };
  if (st === "done") return { cls: "done", text: "Completed" };
  if (st === "in_progress") return { cls: "progress", text: "In Progress" };
  return { cls: "todo", text: "To-Do" };
}

// ---------- COURSE LABELS ----------
const COURSE_LABELS = {
  4999: "CS 4999: Capstone",
  4700: "CS 4700: Software Security",
  4810: "CS 4810: Data Mining",
  4500: "CS 4500: Operating Systems",
  3450: "CS 3450: Database Systems",
  2470: "CS 2470: Networking",
  3370: "CS 3370: Software Engineering",
};

function courseLabel(courseId) {
  return COURSE_LABELS[courseId] || `Course ${courseId}`;
}

// ---------- API ----------
async function fetchJSON(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`${res.status}: ${txt}`);
  }
  return res.json();
}

function loadAssignments(userId) {
  return fetchJSON(`${API}/assignments?user_id=${userId}`);
}

function loadSummary(userId) {
  return fetchJSON(`${API}/assignments/summary?user_id=${userId}`);
}

function updateStatus(assignmentId, userId, status) {
  return fetchJSON(`${API}/assignments/${assignmentId}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: Number(userId), status }),
  });
}

// ---------- TEMPLATE ----------
function cardTemplate(a, course, badge, dueText) {
  return `
    <div class="assignment-card" data-id="${a.assignment_id}">
      <div class="assignment-left">
        <div class="assignment-top">
          <span class="badge ${badge.cls}">${badge.text}</span>
          <span class="course-pill">${course}</span>
        </div>

        <p class="assignment-title">${a.title}</p>
        <p class="assignment-meta">Due ${dueText}</p>
      </div>

      <div class="assignment-right">
        <select class="status">
          <option value="to_do">To do</option>
          <option value="in_progress">In progress</option>
          <option value="done">Done</option>
        </select>
        <a class="open-link" href="#">Open Assignment</a>
      </div>
    </div>
  `;
}

// ---------- RENDER ----------
function render(assignments, userId) {
  console.log(assignments)
  listEl.innerHTML = "";
  if (!assignments.length) {
    listEl.innerHTML = `<p class="page-subtitle">No assignments found.</p>`;
    return;
  }

  const groups = new Map();

  if (activeView === "due") {
    assignments.forEach(a => {
      const key = weekBucket(a.due_at);
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(a);
    });

    ["This Week", "Next Week", "Later"].forEach(key => {
      if (!groups.has(key)) return;
      const items = groups.get(key);

      listEl.insertAdjacentHTML(
        "beforeend",
        `<div class="group-header">
           <div class="group-title">${key}</div>
           <div class="group-count">${items.length} ${items.length === 1 ? "Task" : "Tasks"}</div>
         </div>`
      );

      items.forEach(a => renderCard(a, userId));
    });
  } else {
    assignments.forEach(a => {
      const key = courseLabel(a.course_id);
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(a);
    });

    [...groups.keys()].sort().forEach(key => {
      const items = groups.get(key);

      listEl.insertAdjacentHTML(
        "beforeend",
        `<div class="group-header">
           <div class="group-title">${key}</div>
           <div class="group-count">${items.length} ${items.length === 1 ? "Task" : "Tasks"}</div>
         </div>`
      );

      items.forEach(a => renderCard(a, userId));
    });
  }
}

function renderCard(a, userId) {
  const badge = statusBadge(a);
  const html = cardTemplate(a, courseLabel(a.course_id), badge, fmtDue(a.due_at));
  listEl.insertAdjacentHTML("beforeend", html);

  const card = listEl.lastElementChild;
  const select = card.querySelector(".status");
  select.value = normalizeStatus(a.status);

  select.addEventListener("change", async () => {
    await updateStatus(a.assignment_id, userId, select.value);
    refresh();
  });
}

// ---------- FILTERS ----------
function applyFilter(list) {
  if (activeFilter === "all") return list;
  if (activeFilter === "overdue") return list.filter(isOverdue);
  return list.filter(a => normalizeStatus(a.status) === activeFilter);
}

function updateStats(s) {
  document.getElementById("stat-total").textContent = s.total;
  document.getElementById("stat-overdue").textContent = s.overdue;
  document.getElementById("stat-progress").textContent = s.in_progress;
  document.getElementById("stat-done").textContent = s.done_count;
}

// ---------- UI ----------
function refreshActiveUI() {
  document.querySelectorAll(".stat-filter").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.filter === activeFilter);
  });

  document.getElementById("viewByDue")?.classList.toggle("active", activeView === "due");
  document.getElementById("viewByCourse")?.classList.toggle("active", activeView === "course");
}

document.querySelectorAll(".stat-filter").forEach(btn => {
  btn.addEventListener("click", () => {
    activeFilter = btn.dataset.filter;
    render(applyFilter(allAssignments), userSelect.value);
    refreshActiveUI();
  });
});

document.getElementById("viewByDue")?.addEventListener("click", () => {
  activeView = "due";
  render(applyFilter(allAssignments), userSelect.value);
  refreshActiveUI();
});

document.getElementById("viewByCourse")?.addEventListener("click", () => {
  activeView = "course";
  render(applyFilter(allAssignments), userSelect.value);
  refreshActiveUI();
});

// ---------- MAIN ----------
async function refresh() {
  const userId = userSelect.value;
  const [assignments, summary] = await Promise.all([
    loadAssignments(userId),
    loadSummary(userId),
  ]);

  allAssignments = assignments;
  updateStats(summary);
  render(applyFilter(allAssignments), userId);
  refreshActiveUI();
}

userSelect.addEventListener("change", refresh);
refresh();
