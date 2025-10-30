
---

Overview

This project was built to demonstrate my **full-stack development skills** — from backend API design and database schema creation to frontend integration and visualization of task insights.

The main goal was to build a simple yet meaningful **Task Tracker** that not only manages tasks but also gives a small “AI-like” summary about priorities and workload trends.

I chose to focus on **clean structure, meaningful logic, and usability** rather than unnecessary visual complexity.

---

 ⚙️ Tech Stack

Backend: Flask (Python)  
Database: SQLite (lightweight, reliable for testing)  
Frontend: HTML, CSS, and Vanilla JavaScript (fetch API for communication)

I chose Flask + SQLite for quick setup and easy debugging.  
On the frontend, I avoided frameworks like React to keep things simple and dependency-free, focusing purely on API integration and DOM manipulation.

---

🧱 Database Schema Design

Table: tasks

| Column       | Type         | Description                            |
|---------------|--------------|----------------------------------------|
| id            | Integer (PK) | Unique task ID                         |
| title         | Text         | Task title (required)                  |
| description   | Text         | Optional task details                  |
| status        | Text         | Task status (not yet started / in-progress / completed) |
| priority      | Text         | low / medium / high                    |
| due_date      | DateTime     | Deadline for the task                  |
| created_at    | DateTime     | Automatically recorded at insertion    |

Reasoning: 
- Each field directly represents a user-facing attribute.  
- Status and priority are string-based to simplify querying and front-end logic.  
- `due_date` allows filtering and insights on time-based trends.  
- `created_at` helps in tracking recency (useful for future improvements like analytics).

---

 🧠 Insight Logic

The `/tasks/insights` endpoint generates a **summary** based on:
- Total number of tasks
- Distribution by status and priority
- Number of tasks due within the next 48 hours
- A human-readable “insight” string such as:

> “You have 10 total tasks. Most are high priority, and 3 are due soon. It’s going to be a busy week!”

This was written using **simple conditional logic and time comparisons** — no machine learning or AI tools.  
The goal was to give a sense of “smartness” while still relying only on Python logic.

---

🎨 Frontend Structure

The frontend (`index.html`, `style.css`, `script.js`) is built to be minimal and intuitive.

- **Task Creation Form:** Allows users to add title, description, priority, due date, and status.
- **Task Cards:** Displayed with color-coded highlights:
  - 🟢 Completed → Green  
  - 🔵 In Progress → Blue  
  - 🔴 Not Yet Started → Red
- **Filter & Sort Options:** Let users filter tasks by status or priority, and sort by due date.
- **Insights Box:** Dynamically updated with data from the backend’s `/tasks/insights` endpoint.

I also added **subtle hover transitions** and **box-shadow effects** to make the interface cleaner and more modern-looking.

---

 🔄 API Endpoints Implemented

| Method | Endpoint | Description |
|--------|-----------|-------------|
| **POST** | `/tasks` | Add a new task |
| **GET** | `/tasks` | Fetch all tasks (with filters for status/priority/sort) |
| **PATCH** | `/tasks/<id>` | Update task status or priority |
| **DELETE** | `/tasks/<id>` | Delete a task |
| **GET** | `/tasks/insights` | Generate summary and counts |

---

💡 Design Decisions

- I intentionally avoided using heavy frameworks or libraries — focusing on **clarity and understanding** of each line of code.
- The backend and frontend are kept decoupled, communicating only through REST APIs.
- The app runs completely locally and can be tested by running the Flask server and opening `index.html` in a browser.

---

🚀 How I Tested

- Verified all CRUD operations using both **frontend** and **Postman**.
- Checked edge cases like missing fields, invalid IDs, and empty filters.
- Ensured insights update automatically after each CRUD operation.

---

🌱 Possible Improvements (Future Scope)

1. **User Authentication:** Add JWT-based login for multiple users.
2. **Pagination:** Useful for handling large sets of tasks.
3. **Task Timeline Chart:** Visualize due dates using Chart.js or Recharts.
4. **Email Notifications:** Send alerts for tasks nearing due date.
5. **Dark Mode Toggle:** For better UX flexibility.

---

🧾 Final Thoughts

This 24-hour project was a great test of planning, organization, and execution speed.  
I made sure to:
- Keep the API modular and easy to extend.
- Maintain data consistency and validation.
- Write readable, structured, and maintainable code.

Everything — from backend routes to frontend event handling — was implemented manually and thoughtfully.

---

Submitted by: Adarsh Patil 
Date: 30/10/25 
Location: Bengaluru,India  
Project: Task Tracker with Smart Insights
