# app/main.py
from fastapi import FastAPI
from . import models, database
from .routers import tasks

models.Base.metadata.create_all(bind=database.engine)
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Task Tracker API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allows requests from any frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tasks.router)

@app.get("/")
def root():
    return {"message": "Welcome to Task Tracker API"}
