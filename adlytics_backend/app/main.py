from fastapi import FastAPI, File, UploadFile
from routes.app import app_router
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Ad Performance Analysis", version="1.0.0")

app.include_router(app_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def Home():
  return {"message": "Welcome to Ad Analysis World!"}
