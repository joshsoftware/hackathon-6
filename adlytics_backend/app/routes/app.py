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
    clean_data_path = 'clean_data.xlsx'
    cleaned_data.to_excel(clean_data_path, index=False)

    crunched_data['Result'] = cleaned_data['Result']
    output_path = 'generated_output_file.xlsx'
    crunched_data.to_excel(output_path, index=False)

  except Exception as e:
    return JSONResponse(content={"error": str(e)}, status_code=500)

  return {"file_name": file.filename, "message": "File received successfully"}

@app_router.get("/list-ads")
async def list_ads():
  try:
    data = pd.read_excel('/home/josh-jin0141/josh/hackathon/hackathon-6/adlytics_backend/app/generated_output_file.xlsx')
        
    required_columns = ['AdID', 'AdName']
        
    ads_list = data[['AdID', 'AdName']].dropna().to_dict(orient='records')
    return JSONResponse(content={"ads": ads_list}, status_code=200)
    
  except FileNotFoundError:
    return JSONResponse(
      content={"error": "The specified file was not found."},
      status_code=404
    )
  except Exception as e:
    return JSONResponse(
      content={"error": str(e)},
      status_code=500
    )  

@app_router.get("/dashboard")
async def dashboards():
  try:
    data = pd.read_excel('/home/josh-jin0141/josh/hackathon/hackathon-6/adlytics_backend/app/clean_data.xlsx')
        
    data = data[['AdID', 'AdName', 'CreativeObjectType', 'Cost', 'CTR', 'Clicks', 'Impressions', 'OutboundClicks']]
    data['CreativeObjectType'] = data['CreativeObjectType'].fillna('Unknown')    

    # Group by CREATIVE_OBJECT_TYPE and calculate counts
    pie_chart_data = (data['CreativeObjectType'].value_counts().reset_index().rename(columns={'index': 'name', 'CreativeObjectType': 'value'}))

    bar_chart_data = (data.groupby('CreativeObjectType')['Cost'].mean().reset_index().rename(columns={'CreativeObjectType': 'creative_object_type', 'Cost': 'average_cost'}))

    line_chart_data = (data[['Cost', 'Clicks']].rename(columns={'Cost': 'Cost', 'Clicks': 'Clicks'}))

    scatter_plot_data = (data[['Impressions', 'Clicks', 'Cost']].rename(columns={'Impressions': 'x', 'Clicks': 'y', 'Cost': 'z'}))

    # Convert to the required JSON format
    result_json = {
        "pieChart": {
            "data": pie_chart_data.to_dict(orient='records')
        },
        "barChart": {
            "data": bar_chart_data.to_dict(orient='records')
        },
        "lineChart": {
            "data": line_chart_data.to_dict(orient='records')
        },
        "scatter plot": {
          "data": scatter_plot_data.to_dict(orient='records')
        }
    }
    
    return JSONResponse(content={"data": result_json}, status_code=200)
  except FileNotFoundError:
    return JSONResponse(
      content={"error": "The specified file was not found."},
      status_code=404
    )
  except Exception as e:
    return JSONResponse(
      content={"error": str(e)},
      status_code=500
    )  
      