
# Task Manager API (FastAPI + SQLite)

A simple yet powerful **Task Management System** built with **FastAPI** (Python) and **SQLite**, featuring a clean API backend and an interactive frontend.  
You can add, update, delete, and filter tasks — and even get insights on productivity trends!

---

🚀 Features

✅ **FastAPI Backend**  
✅ **SQLite Database (via SQLAlchemy ORM)**  
✅ **CRUD Operations for Tasks**  
✅ **Filter by Status / Priority**  
✅ **Insight Endpoint for Analytics**  
✅ **Minimal Frontend with Fetch API + Smooth Animations**

---

## 🏗️ Project Structure

```

📦 task-manager/
├── main.py              # FastAPI backend (core logic)
├── database.py          # SQLite DB connection + models
├── requirements.txt     # Dependencies list
├── static/
│   ├── index.html       # Frontend (UI)
│   ├── style.css        # Styling and animations
│   └── script.js        # JS logic for API communication
└── README.md            # Project documentation (this file)

````

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/task-manager.git
cd task-manager
````

### 2️⃣ Create and Activate Virtual Environment

```bash
python -m venv venv
# Windows
venv\Scripts\activate
# macOS / Linux
source venv/bin/activate
```

### 3️⃣ Install Dependencies

```bash
pip install -r requirements.txt
```

### 4️⃣ Run the FastAPI Server

```bash
uvicorn main:app --reload
```

The API will start at 👉 **[http://127.0.0.1:8000](http://127.0.0.1:8000)**

---

## 🌐 Accessing the Frontend

Once the server is running:

* Open your browser and visit:
  **[http://127.0.0.1:8000](http://127.0.0.1:8000)**

You’ll see a modern UI where you can:

* ➕ Add new tasks
* 🗂️ View tasks (with filters)
* ✏️ Edit or delete existing ones
* 📊 View insights about task load and priorities

---

## 🔌 API Endpoints

| Method     | Endpoint      | Description                        |
| ---------- | ------------- | ---------------------------------- |
| **POST**   | `/tasks`      | Add a new task                     |
| **GET**    | `/tasks`      | List all tasks (supports filters)  |
| **PATCH**  | `/tasks/{id}` | Update a task (status or priority) |
| **DELETE** | `/tasks/{id}` | Delete a task                      |
| **GET**    | `/insights`   | Get analytics summary              |

---

## 🧩 Example Task JSON

```json
{
  "title": "Complete project report",
  "description": "Finalize and submit the green computing report",
  "status": "in_progress",
  "priority": "high",
  "due_date": "2025-11-02"
}
```

---

## 📊 Insights API Example

**GET /insights**

Response:

```json
{
  "total_tasks": 12,
  "completed": 6,
  "pending": 3,
  "in_progress": 3,
  "by_priority": {
    "high": 4,
    "medium": 5,
    "low": 3
  },
  "due_soon": 2
}
```

---

🎨 UI Preview

* 🟢 Completed → Green badge
* 🔵 In Progress → Blue badge
* 🔴 Pending → Red badge

Includes:

* ✅ Smooth hover transitions
* ✅ Fade-in animations
* ✅ Compact cards with neat typography

---
🧠 Tech Stack

| Layer        | Technology                |
| ------------ | ------------------------- |
| **Backend**  | FastAPI (Python)          |
| **Database** | SQLite (SQLAlchemy ORM)   |
| **Frontend** | HTML, CSS, JS (Fetch API) |
| **Server**   | Uvicorn                   |

---

💡 Future Improvements

* 🔐 Add authentication (JWT-based login)
* 📅 Task reminders or notifications
* 📈 Export task insights as CSV or PDF
* ☁️ Deploy on Render / Railway

---

👨‍💻 Author

Adarsh Patil
📧 adarshpatilsonu@gmail.com


> *A minimalist task management project crafted with FastAPI for learning, experimentation, and clean code demonstration.*

---

🧾 License

This project is released under the **MIT License** — free for personal and educational use.

---

## Watch Demo Video

**[Link](https://drive.google.com/file/d/1xLhQ8Zpnxhj6Q1rGazHHRFMHTqwh8UKB/view?usp=sharing)**

```

---
