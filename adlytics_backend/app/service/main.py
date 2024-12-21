import ollama
import json
from fastapi import HTTPException
from helper.utils import create_prompt
from helper.constants import LLM, TEMPERATURE, LLM_ROLE

def analyze_add(ad_id):
    try:
        prompt = create_prompt(file_path="/home/rushikesh/hackathon/hackathon-6/adlytics_backend/app/generated_output_file.xlsx", ad_id=ad_id)
        
        response = ollama.chat(
            model=LLM,
            options={"temperature": TEMPERATURE},
            messages=[{"role": LLM_ROLE, "content": prompt}],
        )
        
        response_text = response.get("message", {}).get("content", "")
        cleaned_response_text = response_text.strip().replace('\\n', ' ').replace('\\"', '"')
    
        try:
            response_json = json.loads(cleaned_response_text)
            if not all(key in response_json.analysis for key in ["ad_id", "ad_name", "result", "reasons", "insights", "suggestions"]):
                raise ValueError("Invalid JSON response format from LLM")
        except (json.JSONDecodeError, ValueError) as e:
            print(f"Failed to parse response: {cleaned_response_text}")
            raise HTTPException(status_code=500, detail=f"Invalid response format: {str(e)}")
        
        return {"analysis": response_json}
    
    except Exception as e:
        print(f"Error in analysis: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to analyze ads")