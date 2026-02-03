from flask import Flask, request, jsonify, render_template, redirect, url_for, session, flash
from flask_cors import CORS
import random
import json
import pickle
import numpy as np
import nltk
import os
from nltk.stem import WordNetLemmatizer
from tensorflow.keras.models import load_model
from chat import predict_class, get_response

app = Flask(__name__, static_folder='static', template_folder='templates')
app.secret_key = 'super_secret_key'  # Needed for sessions
CORS(app)

# Define base directory
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load intents
with open(os.path.join(BASE_DIR, 'intents.json'), 'r', encoding='utf-8') as f:
    intents = json.load(f)

# Load trained data
print("Loading model...")
try:
    words = pickle.load(open(os.path.join(BASE_DIR, 'words.pkl'), 'rb'))
    classes = pickle.load(open(os.path.join(BASE_DIR, 'classes.pkl'), 'rb'))
    model = load_model(os.path.join(BASE_DIR, 'chatbot_model.h5'))
    print("Model loaded! Server ready.")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

@app.route('/')
def home():
    return render_template('index.html', username="Operator")

@app.route('/chat', methods=['POST'])
def chat():
    if not model:
        return jsonify({"response": "Model not loaded. Please train the model first."})
        
    message = request.json['message']
    ints = predict_class(message, model)
    res = get_response(ints, intents)
    return jsonify({"response": res})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
