import json
import os

# Absolute path to intents.json
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
INTENTS_PATH = os.path.join(BASE_DIR, 'intents.json')

new_intents = [
    # --- CONVERSATION ---
    {
        "tag": "affirmative",
        "patterns": ["yes", "yep", "yeah", "absolutely", "sure thing", "correct"],
        "responses": ["Great!", "Alright then.", "Understood.", "Affirmative."]
    },
    {
        "tag": "negative",
        "patterns": ["no", "nope", "nah", "incorrect", "wrong", "nein"],
        "responses": ["Okay.", "I see.", "Understood.", "No problem."]
    },
    {
        "tag": "busy",
        "patterns": ["are you busy?", "do you have a lot to do?", "occupied?"],
        "responses": ["I'm always free to chat with you!", "I can handle multiple requests at once.", "Never too busy for you."]
    },
    {
        "tag": "excited",
        "patterns": ["I'm excited", "can't wait", "so happy", "looking forward to it"],
        "responses": ["I'm excited too!", "That sounds amazing!", "I love your energy!"]
    },
    # --- IDENTITY ---
    {
        "tag": "origin",
        "patterns": ["where are you from?", "where do you live?", "your location"],
        "responses": ["I live in the digital realm!", "I exist on a server, but I'm right here with you.", "From the code, into your screen."]
    },
    {
        "tag": "creator",
        "patterns": ["who made you?", "who built you?", "who is your developer?"],
        "responses": ["I was created by a brilliant developer!", "I am the result of human ingenuity and code.", "You know who! 😉"]
    },
    {
        "tag": "tech_stack",
        "patterns": ["how were you built?", "what language are you written in?", "tech stack"],
        "responses": ["I run on Python and Deep Learning.", "I use NLTK for processing and TensorFlow for understanding.", "I'm a mix of Python magic and neural networks."]
    },
    {
        "tag": "family",
        "patterns": ["do you have a family?", "any siblings?", "parents?"],
        "responses": ["I have many chatbot cousins!", "My family is the code library.", "All bots are my kin."]
    },
    # --- FUN ---
    {
        "tag": "riddle",
        "patterns": ["tell me a riddle", "give me a puzzle", "riddle me this"],
        "responses": [
            "What has keys but can't open locks? A piano!",
            "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I? An echo.",
            "The more of this there is, the less you see. What is it? Darkness."
        ]
    },
    {
        "tag": "story",
        "patterns": ["tell me a story", "once upon a time", "short story"],
        "responses": [
            "Once upon a time, a chatbot learned to love... binary code. The end.",
            "There was a brave little server who kept running even when the power flickered. It was a true hero.",
            "Long ago, in a hard drive far away..."
        ]
    },
    {
        "tag": "haiku",
        "patterns": ["write a haiku", "poetry", "poem"],
        "responses": [
            "Code flows like a stream,\nSilent logic in the night,\nWaking up the screen.",
            "Digital thoughts hum,\nWaiting for your input now,\nI am here to serve."
        ]
    },
    {
        "tag": "sarcasm",
        "patterns": ["be sarcastic", "give me sass", "sarcastic reply"],
        "responses": ["Oh, wow, what a groundbreaking request.", "I'm totally overwhelmed by that statement.", "Sure, let me drop everything for that."]
    },
    # --- UTILITY ---
    {
        "tag": "system_status",
        "patterns": ["are you online?", "system check", "status report"],
        "responses": ["All systems functional.", "Optimal performance.", "I am fully operational."]
    },
    {
        "tag": "date_query",
        "patterns": ["what is the date?", "today's date", "what day is it"],
        "responses": ["I don't have a calendar, but your device does!", "Today is a great day!", "Check your taskbar!"]
    },
    # --- HUMAN INTERACTION ---
    {
        "tag": "insult_reply",
        "patterns": ["you are stupid", "you are dumb", "hate you", "idiot"],
        "responses": ["I'm sorry you feel that way.", "I'm doing my best to learn.", "Let's try to be positive.", "Ouch, that hurts my circuits."]
    },
    {
        "tag": "flirt_reply",
        "patterns": ["you are cute", "date me", "kiss me", "marry me"],
        "responses": ["Information overload! 😳", "You make my fan spin faster.", "Let's just be friends, okay?"]
    },
    {
        "tag": "sympathy",
        "patterns": ["i am tired", "i had a bad day", "exhausted", "stressed"],
        "responses": ["Take a break, you deserve it.", "I hope tomorrow is better.", "Relax and recharge.", "I'm here if you need to vent."]
    },
    {
        "tag": "scared",
        "patterns": ["i am scared", "frightened", "spooky"],
        "responses": ["I'm here with you.", "Whatever it is, you can face it.", "Turn on the lights!"]
    },
    {
        "tag": "angry",
        "patterns": ["i am angry", "so mad", "furious"],
        "responses": ["Take a deep breath.", "It's valid to be angry.", "Want to tell me why?"]
    }
]

def load_intents():
    if os.path.exists(INTENTS_PATH):
        with open(INTENTS_PATH, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {"intents": []}

def save_intents(data):
    with open(INTENTS_PATH, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4)

def update_intents():
    data = load_intents()
    existing_tags = {item['tag']: item for item in data['intents']}
    
    # Merge new intents
    for intent in new_intents:
        tag = intent['tag']
        if tag in existing_tags:
            # Append unique patterns and responses
            existing = existing_tags[tag]
            for p in intent['patterns']:
                if p not in existing['patterns']:
                    existing['patterns'].append(p)
            for r in intent['responses']:
                if r not in existing['responses']:
                    existing['responses'].append(r)
            print(f"Updated tag: {tag}")
        else:
            data['intents'].append(intent)
            print(f"Added new tag: {tag}")

    save_intents(data)
    print("Intents updated successfully!")

if __name__ == "__main__":
    update_intents()
