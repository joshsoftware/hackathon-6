# hackathon-6
### Ad Performance Analysis</br>
#### Backend: </br>
Step 1: Install Python </br>
Ensure you have Python 3.8+ installed.</br>

Verify installation: </br>
```
python --version
```
Step 2: Set Up a Virtual Environment</br>
```
git clone https://github.com/joshsoftware/hackathon-6.git</br>
```
move to project directory: 
```
cd adlytics_backend</br>
```
Create a virtual environment: 
```
python -m venv venv OR python3 -m venv venv
```
Activate the virtual environment: 
```
source venv/bin/activate
```

Run a Command: 
```
pip install -r requirements.txt
```
To run Backend - 
```
cd adlytics_backend && uvicorn main:app --reload
```