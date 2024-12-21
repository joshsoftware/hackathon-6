
from fastapi import APIRouter
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
import pandas as pd
import numpy as np

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