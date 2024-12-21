from fastapi import APIRouter
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from io import StringIO
import pandas as pd
import joblib
import os
import numpy as np
import shutil

from helper.utils import feature_engineering, get_crunched_data

app_router = APIRouter(prefix="/analysis", tags=["Analysis Page"])

@app_router.get("/")
def getAnalysis():
  return {"message": "This is the analysis page!"}

@app_router.post("/upload-file")
async def upload_file(file: UploadFile = File(...)):
  try:
    file_location = f"uploaded_files/{file.filename}"
    
    os.makedirs(os.path.dirname(file_location), exist_ok=True)

    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    model_path = '/home/josh-jin0141/josh/hackathon/hackathon-6/adlytics_backend/app/models/ad_performance_model.pkl'

    if not os.path.exists(model_path):
      raise FileNotFoundError(f"Model file not found: {model_path}")

    model = joblib.load(model_path)

    data = pd.read_excel(file_location)

    cleaned_data = feature_engineering(data)
    crunched_data = get_crunched_data(cleaned_data)

    features = [
      'Cost', 'CTR', 'PurchaseROAS', 'Clicks', 'Impressions', 'CostPerClick', 'CostPerThousandImpressions', 'OutboundCTR']
    X = cleaned_data[features]

    cleaned_data['Result'] = model.predict(X)

    label_mapping = {
      0: 'Stop',
      1: 'Continue',
      2: 'Spend More',
      3: 'Spend Less'
    }
    cleaned_data['Result'] = cleaned_data['Result'].map(label_mapping)

    crunched_data['Result'] = cleaned_data['Result']
    output_path = 'generated_output_file.xlsx'
    crunched_data.to_excel(output_path, index=False)

  except Exception as e:
    return JSONResponse(content={"error": str(e)}, status_code=500)

  return {"file_name": file.filename, "message": "File received successfully"}
