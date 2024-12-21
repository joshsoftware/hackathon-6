from fastapi import FastAPI, File, UploadFile
from routes.app import app_router
from fastapi.responses import JSONResponse

app = FastAPI(title="Ad Performance Analysis", version="1.0.0")

app.include_router(app_router)

@app.get("/")
def Home():
  return {"message": "Welcome to Ad Analysis World!"}
