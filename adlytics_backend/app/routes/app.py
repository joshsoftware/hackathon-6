from fastapi import APIRouter

app_router = APIRouter(prefix="/analysis", tags=["Analysis Page"])

@app_router.get("/")
def getAnalysis():
  return {"message": "This is the analysis page!"}