🤖 Aaru Bot – AI Chatbot | Your Personal Assistant

Aaru Bot is an AI-powered conversational chatbot built using Python (NLP-based model training) and integrated with a TypeScript/Next.js frontend interface.

The chatbot was initially developed as a terminal-based application and later enhanced with a modern UI to improve user interaction and usability.

🚀 Features

🧠 Custom trained NLP-based chatbot model

💬 Intent recognition and response generation

🖥 Initially terminal-based execution

🌐 Integrated TypeScript/Next.js frontend interface

🔄 Backend–Frontend integration

📦 Modular and scalable architecture

🛠 Tech Stack

Backend (AI Model):

Python

TensorFlow / Keras

NLTK

NumPy

Pickle

Frontend:

TypeScript

Next.js

JavaScript

HTML/CSS

📂 Project Structure
Aaru-chatbot/
│
├── train.py              # Model training script
├── chatbot_model.h5      # Trained chatbot model
├── intents.json          # Training intents data
├── words.pkl             # Processed vocabulary
├── classes.pkl           # Output classes
├── frontend/             # TypeScript / Next.js UI
└── ...
⚙️ How It Works

The chatbot is trained using predefined intents and responses.

NLP techniques process user input.

The trained model predicts the most relevant intent.

A structured response is returned.

The frontend interface displays the response in an interactive UI.

🧪 How to Run Locally
🔹 Backend (Python)
pip install -r requirements.txt
python train.py
python app.py
🔹 Frontend
cd frontend
npm install
npm run dev
🎯 Learning Outcomes

Practical implementation of conversational AI

NLP preprocessing and model training

TensorFlow/Keras model handling

Backend–Frontend integration

Building AI applications beyond terminal

📌 Future Improvements

Add context memory

Deploy as a cloud-based assistant

Add voice interaction

Improve response accuracy

👩‍💻 Author

Falak Jain
B.Tech Artificial Intelligence & Machine Learning
