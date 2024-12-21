from fastapi import APIRouter
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from io import StringIO
import pandas as pd
import joblib
import os
import numpy as np
import shutil

ad_cache = {}

app_router = APIRouter(prefix="/analysis", tags=["Analysis Page"])

@app_router.get("/")
def getAnalysis():
  return {"message": "This is the analysis page!"}

def feature_engineering(data):
    """
    Does Feature Engineering and returns a cleaned DataFrame.

    Parameters:
    -----------
    data: pandas.DataFrame
        DataFrame on which you wish to perform Feature Engineering.

    Returns:
    --------
    pandas.DataFrame
        Cleaned and processed DataFrame.
    """

    # Select relevant columns
    relevant_columns = [
        'AD_ID', 'AD_NAME', 'CREATIVE_ID', 'CREATIVE_BODY',
        'CREATIVE_TITLE', 'CREATIVE_OBJECT_TYPE', 'COST',
        'CTR', 'ROAS', 'CLICKS', 'IMPRESSIONS', 'CPM',
        'COST_PER_WEBSITE_PURCHASE', 'T_ROAS_CALC_HRLY',
        'OUTBOUND_CLICKS', 'OUTBOUND_CTR'
    ]
    data = data[relevant_columns]

    # Rename columns for better readability
    data.rename(columns={
        'AD_ID': 'AdID',
        'AD_NAME': 'AdName',
        'CREATIVE_ID': 'CreativeID',
        'CREATIVE_BODY': 'CreativeBody',
        'CREATIVE_TITLE': 'CreativeTitle',
        'CREATIVE_OBJECT_TYPE': 'CreativeObjectType',
        'COST': 'Cost',
        'CTR': 'CTR',
        'ROAS': 'PurchaseROAS',
        'CLICKS': 'Clicks',
        'IMPRESSIONS': 'Impressions',
        'CPM': 'CPM',
        'COST_PER_WEBSITE_PURCHASE': 'CostPerWebsitePurchase',
        'T_ROAS_CALC_HRLY': 'TROASCalcHrly',
        'OUTBOUND_CLICKS': 'OutboundClicks',
        'OUTBOUND_CTR': 'OutboundCTR'
    }, inplace=True)

    # Fill missing values
    data['CreativeTitle'].fillna('Unknown', inplace=True)
    data['CTR'].fillna(0, inplace=True)
    data['PurchaseROAS'].fillna(0, inplace=True)
    data['CPM'].fillna(0, inplace=True)
    data['CostPerWebsitePurchase'].fillna(0, inplace=True)
    data['TROASCalcHrly'].fillna(0, inplace=True)
    data['OutboundCTR'].fillna(0, inplace=True)

    # Add calculated fields
    data['ClickThroughRate'] = (data['Clicks'] / data['Impressions']).replace([np.inf, np.nan], 0)
    data['CostPerClick'] = (data['Cost'] / data['Clicks']).replace([np.inf, np.nan], 0)
    data['CostPerThousandImpressions'] = data['CPM']

    # Ensure correct data types
    data = data.astype({
        'AdID': 'int',
        'CreativeID': 'int',
        'Cost': 'float',
        'CTR': 'float',
        'PurchaseROAS': 'float',
        'Clicks': 'int',
        'Impressions': 'int',
        'CPM': 'float',
        'CostPerWebsitePurchase': 'float',
        'TROASCalcHrly': 'float',
        'OutboundClicks': 'int',
        'OutboundCTR': 'float'
    })

    # Remove outliers
    cost_threshold = data['Cost'].quantile(0.99)
    data = data[data['Cost'] <= cost_threshold]

    # Drop unused columns if any
    # data.drop(['Reach', 'Frequency'], axis=1, inplace=True) # Uncomment if present in the dataset

    return data

# Crunched Data

def get_crunched_data(data):
    """
    Performs Feature Engineering and returns a cleaned DataFrame with unique AdID records.

    Parameters:
    -----------
    data: pandas.DataFrame
        DataFrame on which you wish to perform Feature Engineering.

    Returns:
    --------
    pandas.DataFrame
        Cleaned and processed DataFrame with unique AdID records.
    """

    # Select relevant columns
    relevant_columns = [
        'AdID', 'AdName', 'CreativeID', 'CreativeBody',
        'CreativeTitle', 'CreativeObjectType', 'Cost',
        'CTR', 'PurchaseROAS', 'Clicks', 'Impressions', 'CPM',
        'CostPerWebsitePurchase', 'TROASCalcHrly',
        'OutboundClicks', 'OutboundCTR'
    ]
    data = data[relevant_columns]

    # Fill missing values for numeric columns
    numeric_columns = [
        'Cost', 'CTR', 'PurchaseROAS', 'Clicks', 'Impressions', 'CPM',
        'CostPerWebsitePurchase', 'TROASCalcHrly', 'OutboundCTR'
    ]
    data[numeric_columns] = data[numeric_columns].fillna(0)

    # Fill missing values for object columns
    object_columns = ['CreativeTitle', 'AdName', 'CreativeBody', 'CreativeObjectType']
    for col in object_columns:
        data[col].fillna('Unknown', inplace=True)

    # Add calculated fields
    data['ClickThroughRate'] = (data['Clicks'] / data['Impressions']).replace([np.inf, np.nan], 0)
    data['CostPerClick'] = (data['Cost'] / data['Clicks']).replace([np.inf, np.nan], 0)
    data['CostPerThousandImpressions'] = data['CPM']

    # Group by `AdID`
    grouped_data = data.groupby('AdID').agg({
        'AdName': lambda x: x.mode()[0] if not x.mode().empty else 'Unknown',
        'CreativeID': 'mean',
        'CreativeBody': lambda x: x.mode()[0] if not x.mode().empty else 'Unknown',
        'CreativeTitle': lambda x: x.mode()[0] if not x.mode().empty else 'Unknown',
        'CreativeObjectType': lambda x: x.mode()[0] if not x.mode().empty else 'Unknown',
        'Cost': 'mean',
        'CTR': 'mean',
        'PurchaseROAS': 'mean',
        'Clicks': 'mean',
        'Impressions': 'mean',
        'CPM': 'mean',
        'CostPerWebsitePurchase': 'mean',
        'TROASCalcHrly': 'mean',
        'OutboundClicks': 'mean',
        'OutboundCTR': 'mean',
        'ClickThroughRate': 'mean',
        'CostPerClick': 'mean',
        'CostPerThousandImpressions': 'mean'
    }).reset_index()

    # Ensure proper data types
    grouped_data = grouped_data.astype({
        'AdID': 'int',
        'CreativeID': 'int',
        'Cost': 'float',
        'CTR': 'float',
        'PurchaseROAS': 'float',
        'Clicks': 'int',
        'Impressions': 'int',
        'CPM': 'float',
        'CostPerWebsitePurchase': 'float',
        'TROASCalcHrly': 'float',
        'OutboundClicks': 'int',
        'OutboundCTR': 'float',
        'ClickThroughRate': 'float',
        'CostPerClick': 'float',
        'CostPerThousandImpressions': 'float'
    })

    return grouped_data

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
      