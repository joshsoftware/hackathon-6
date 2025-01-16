# Adlytics Ninjas : Project Setup Instructions

Follow these steps to set up the project locally.

# Backend Setup 🚀

### Step 1: Install Python

Ensure that you have Python 3.8+ installed on your system.

To verify the installation, run:

```bash
python --version
```

If Python is not installed, you can download it from python.org.

### Step 2: Clone the repository
Clone the Repository
Clone the project repository by running:
```bash
git clone https://github.com/joshsoftware/hackathon-6.git
```

### Step 3: Move to Project Directory
Navigate to the project directory:
```bash
cd adlytics_backend
```

### Step 4: Create a Virtual Environment
To create a virtual environment, run:
```bash
python -m venv venv
```
or, if you are using Python 3:
```bash
python3 -m venv venv
```

### Step 5: Activate the Virtual Environment

For macOS/Linux:
```bash
source venv/bin/activate
```
For Windows:
```bash
.\venv\Scripts\activate
```

### Step 6: Install Dependencies 🛠️
Install the required dependencies by running:
```bash
pip install -r ../requirements.txt
```

### Step 7: Run the Backend
To run the backend, use the following command:
```bash
uvicorn main:app --reload
```

# Frontend Setup

### 🚀 Quick start

```bash
git clone https://github.com/joshsoftware/hackathon-6
npm install
npm run dev
```

### 🛠️ Built With
- Vite
- React
- TypeScript
- Google TypeScript Style (gts)

### 📁 Project Structure
```
src/
├── api/              # API requests & axios setup
├── components/       # Shared components
├── constants/        # Global constants
├── hooks/           # Shared hooks
├── screens/         # App screens
└── utils/           # Utility functions
```

### 🎯 Key Features
- Fast development with Vite
- TypeScript support
- Modular architecture
- Component-based structure

### 🔧 Development
```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

### 📝 Notes
- No Redux - using React's built-in state management
- Following Google TypeScript Style guide
- Screen-specific components kept close to usage

### 👥 Contributing
1. Clone the repo
2. Create your feature branch
3. Commit changes
4. Push to the branch
5. Open a Pull Request
