// const API_BASE = "http://127.0.0.1:8000";

// const taskForm = document.getElementById("taskForm");
// const taskList = document.getElementById("taskList");
// const insightsBox = document.getElementById("insights");
// const filterStatus = document.getElementById("filterStatus");
// const filterPriority = document.getElementById("filterPriority");
// const sortOrder = document.getElementById("sortOrder");
// const applyFilters = document.getElementById("applyFilters");

// // 🟢 Fetch tasks
// async function fetchTasks() {
//   let url = `${API_BASE}/tasks`;
//   const status = filterStatus.value;
//   const priority = filterPriority.value;
//   const sort = sortOrder.value;
//   const params = [];

//   if (status) params.push(`status=${encodeURIComponent(status)}`);
//   if (priority) params.push(`priority=${encodeURIComponent(priority)}`);
//   if (sort) params.push(`sort_by_due=${sort}`);
//   if (params.length) url += "?" + params.join("&");

//   const res = await fetch(url);
//   const data = await res.json();

//   taskList.innerHTML = data.length
//     ? data.map(taskCardHTML).join("")
//     : "<p>No tasks found.</p>";
// }

// // 🧩 Render a task card
// function taskCardHTML(task) {
//   const due = task.due_date ? new Date(task.due_date).toLocaleString() : "—";
//   return `
//     <div class="task-card">
//       <h3>${task.title}</h3>
//       <p>${task.description || ""}</p>
//       <p><b>Status:</b> ${task.status}</p>
//       <p><b>Priority:</b> ${task.priority}</p>
//       <p><b>Due:</b> ${due}</p>
//       <div class="task-actions">
//         <button onclick="editTask(${task.id})">✏️ Update</button>
//         <button onclick="deleteTask(${task.id})">🗑️ Delete</button>
//       </div>
//     </div>
//   `;
// }

// // 🧠 Fetch Insights
// async function fetchInsights() {
//   const res = await fetch(`${API_BASE}/tasks/insights`);
//   const data = await res.json();

//   insightsBox.innerHTML = `
//     <p><b>Total Tasks:</b> ${data.total_tasks}</p>
//     <p><b>By Status:</b> ${formatDict(data.by_status)}</p>
//     <p><b>By Priority:</b> ${formatDict(data.by_priority)}</p>
//     <p><b>Due Soon:</b> ${data.due_soon}</p>
//     <p><b>Insight:</b> ${data.insight}</p>
//   `;
// }

// function formatDict(obj) {
//   return Object.entries(obj)
//     .map(([key, val]) => `${key}: ${val}`)
//     .join(", ");
// }

// // ➕ Handle Task Creation
// taskForm.addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const newTask = {
//     title: document.getElementById("title").value,
//     description: document.getElementById("description").value,
//     status: document.getElementById("status").value,
//     priority: document.getElementById("priority").value,
//     due_date: document.getElementById("due_date").value || null,
//   };

//   await fetch(`${API_BASE}/tasks`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(newTask),
//   });

//   taskForm.reset();
//   await fetchTasks();
//   await fetchInsights();
// });

// // ✏️ Update task
// async function editTask(id) {
//   const newStatus = prompt("Enter new status (not yet started / in-progress / completed):");
//   const newPriority = prompt("Enter new priority (low / medium / high):");
  
//   const payload = {};
//   if (newStatus) payload.status = newStatus;
//   if (newPriority) payload.priority = newPriority;

//   if (Object.keys(payload).length === 0) return alert("No changes made.");

//   await fetch(`${API_BASE}/tasks/${id}`, {
//     method: "PATCH",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(payload),
//   });

//   await fetchTasks();
//   await fetchInsights();
// }

// // 🗑️ Delete task
// async function deleteTask(id) {
//   if (!confirm("Are you sure you want to delete this task?")) return;

//   await fetch(`${API_BASE}/tasks/${id}`, { method: "DELETE" });
//   await fetchTasks();
//   await fetchInsights();
// }

// // 🔄 Filter button click
// applyFilters.addEventListener("click", async () => {
//   await fetchTasks();
// });

// // 🚀 Initial Load
// fetchTasks();
// fetchInsights();
const API_BASE = "http://127.0.0.1:8000";

const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const insightsBox = document.getElementById("insights");
const filterStatus = document.getElementById("filterStatus");
const filterPriority = document.getElementById("filterPriority");
const sortOrder = document.getElementById("sortOrder");
const applyFilters = document.getElementById("applyFilters");

// 🟢 Fetch tasks
async function fetchTasks() {
  let url = `${API_BASE}/tasks`;
  const status = filterStatus.value;
  const priority = filterPriority.value;
  const sort = sortOrder.value;
  const params = [];

  if (status) params.push(`status=${encodeURIComponent(status)}`);
  if (priority) params.push(`priority=${encodeURIComponent(priority)}`);
  if (sort) params.push(`sort_by_due=${sort}`);
  if (params.length) url += "?" + params.join("&");

  try {
    const res = await fetch(url);
    const data = await res.json();

    taskList.innerHTML = data.length
      ? data.map(taskCardHTML).join("")
      : `<p class="empty">No tasks found. 💤</p>`;
  } catch (err) {
    console.error(err);
    taskList.innerHTML = "<p class='error'>Failed to load tasks.</p>";
  }
}

// 🎨 Color-coded status
// function statusBadge(status) {
//   const normalized = status.toLowerCase();
//   let colorClass = "pending";
//   if (normalized.includes("progress")) colorClass = "progress";
//   else if (normalized.includes("completed")) colorClass = "completed";
//   return `<span class="status-badge ${colorClass}">${status}</span>`;
// }

// 🧩 Render a task card
// 🎨 Color-coded status badge
function statusBadge(status) {
  const normalized = status.toLowerCase();
  let colorClass = "pending";
  let label = "Pending";

  if (normalized.includes("progress")) {
    colorClass = "progress";
    label = "In Progress";
  } else if (normalized.includes("completed")) {
    colorClass = "completed";
    label = "Completed";
  } else if (normalized.includes("pending")) {
    colorClass = "pending";
    label = "Pending";
  }

  return `<span class="status-badge ${colorClass}">${label}</span>`;
}

// 🧩 Render a task card
function taskCardHTML(task) {
  const due = task.due_date ? new Date(task.due_date).toLocaleDateString() : "—";
  return `
    <div class="task-card fade-in">
      <div class="task-header">
        <h3>${task.title}</h3>
        ${statusBadge(task.status)}
      </div>
      <p class="desc">${task.description || "No description."}</p>
      <div class="meta">
        <span><b>Priority:</b> ${task.priority}</span>
        <span><b>Due:</b> ${due}</span>
      </div>
      <div class="task-actions">
        <button class="edit-btn" onclick="editTask(${task.id})">✏️ Update</button>
        <button class="delete-btn" onclick="deleteTask(${task.id})">🗑️ Delete</button>
      </div>
    </div>
  `;
}

// 🧠 Fetch Insights
async function fetchInsights() {
  try {
    const res = await fetch(`${API_BASE}/insights`);
    const data = await res.json();

    insightsBox.innerHTML = `
      <h2>📊 Insights</h2>
      <div class="insight-item"><b>Total Tasks:</b> ${data.total_tasks}</div>
      <div class="insight-item"><b>By Priority:</b> ${formatDict(data.by_priority)}</div>
      <div class="insight-item"><b>Due Soon (3 days):</b> ${data.due_soon_count}</div>
      <div class="insight-item"><b>Busiest Day:</b> ${data.busiest_day || "—"}</div>
    `;
  } catch (err) {
    console.error(err);
    insightsBox.innerHTML = "<p class='error'>Failed to load insights.</p>";
  }
}

function formatDict(obj) {
  return Object.entries(obj)
    .map(([key, val]) => `${key}: ${val}`)
    .join(", ");
}

// ➕ Handle Task Creation
taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newTask = {
    title: document.getElementById("title").value.trim(),
    description: document.getElementById("description").value.trim(),
    status: document.getElementById("status").value,
    priority: document.getElementById("priority").value,
    due_date: document.getElementById("due_date").value || null,
  };

  if (!newTask.title) return alert("Title is required!");

  await fetch(`${API_BASE}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTask),
  });

  taskForm.reset();
  await fetchTasks();
  await fetchInsights();
});

// ✏️ Update task
async function editTask(id) {
  const newStatus = prompt("Enter new status (pending / in_progress / completed):");
  const newPriority = prompt("Enter new priority (low / medium / high):");

  const payload = {};
  if (newStatus) payload.status = newStatus;
  if (newPriority) payload.priority = newPriority;

  if (Object.keys(payload).length === 0) return alert("No changes made.");

  await fetch(`${API_BASE}/tasks/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  await fetchTasks();
  await fetchInsights();
}

// 🗑️ Delete task
async function deleteTask(id) {
  if (!confirm("Are you sure you want to delete this task?")) return;
  await fetch(`${API_BASE}/tasks/${id}`, { method: "DELETE" });
  await fetchTasks();
  await fetchInsights();
}

// 🔄 Filter button click
applyFilters.addEventListener("click", async () => {
  await fetchTasks();
});

// 🚀 Initial Load
fetchTasks();
fetchInsights();
