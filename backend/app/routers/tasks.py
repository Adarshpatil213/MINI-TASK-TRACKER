from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from sqlalchemy import func
from .. import models, schemas, database

router = APIRouter(prefix="/tasks", tags=["Tasks"])

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()


# 🟢 Create a new task
@router.post("/", response_model=schemas.TaskResponse)
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    new_task = models.Task(
        title=task.title,
        description=task.description,
        status=task.status,
        due_date=task.due_date,
        priority=task.priority,
    )
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task


# 🟢 Get all tasks (filter + sort)
@router.get("/", response_model=list[schemas.TaskResponse])
def get_tasks(
    status: str = None,
    priority: str = None,
    sort_by_due: str = None,  # "asc" or "desc"
    db: Session = Depends(get_db),
):
    query = db.query(models.Task)

    # Filter by status
    if status:
        query = query.filter(models.Task.status == status)

    # Filter by priority
    if priority:
        query = query.filter(models.Task.priority == priority)

    # Sort by due date
    if sort_by_due == "asc":
        query = query.order_by(models.Task.due_date.asc())
    elif sort_by_due == "desc":
        query = query.order_by(models.Task.due_date.desc())

    return query.all()


# 🟢 Update a task
@router.patch("/{task_id}", response_model=schemas.TaskResponse)
def update_task(task_id: int, task_update: schemas.TaskUpdate, db: Session = Depends(get_db)):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    if task_update.status is not None:
        task.status = task_update.status
    if task_update.title is not None:
        task.title = task_update.title
    if task_update.description is not None:
        task.description = task_update.description
    if task_update.due_date is not None:
        task.due_date = task_update.due_date
    if task_update.priority is not None:
        task.priority = task_update.priority

    db.commit()
    db.refresh(task)
    return task


# 🟢 Delete a task
@router.delete("/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    db.delete(task)
    db.commit()
    return {"message": f"Task '{task.title}' deleted successfully"}


# 🧠 Insights endpoint with enhanced logic
@router.get("/insights")
def get_insights(db: Session = Depends(get_db)):
    total_tasks = db.query(func.count(models.Task.id)).scalar()

    if total_tasks == 0:
        return {
            "total_tasks": 0,
            "by_status": {},
            "by_priority": {},
            "due_soon": 0,
            "insight": "You have no tasks yet. Let's get started!",
        }

    # Group by status
    status_counts = (
        db.query(models.Task.status, func.count(models.Task.id))
        .group_by(models.Task.status)
        .all()
    )
    status_summary = {status: count for status, count in status_counts}

    # Group by priority
    priority_counts = (
        db.query(models.Task.priority, func.count(models.Task.id))
        .group_by(models.Task.priority)
        .all()
    )
    priority_summary = {priority: count for priority, count in priority_counts}

    # Due soon (next 3 days)
    now = datetime.utcnow()
    soon = now + timedelta(days=3)
    due_soon_count = db.query(models.Task).filter(models.Task.due_date <= soon).count()

    # Determine top status & priority
    top_status = max(status_summary, key=status_summary.get)
    top_priority = max(priority_summary, key=priority_summary.get)

    # 🧠 Generate a smart summary
    insight_text = (
        f"You have {total_tasks} total tasks — most are '{top_status}' "
        f"and '{top_priority}' priority."
    )
    if due_soon_count > 0:
        insight_text += f" {due_soon_count} task(s) are due within 3 days."

    return {
        "total_tasks": total_tasks,
        "by_status": status_summary,
        "by_priority": priority_summary,
        "due_soon": due_soon_count,
        "insight": insight_text,
    }
