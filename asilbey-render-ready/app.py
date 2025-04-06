
from flask import Flask, render_template, request, jsonify
import openai
from dotenv import load_dotenv
import os

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

app = Flask(__name__, static_url_path='/static')

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/chat", methods=["POST"])
def chat():
    user_input = request.json.get("message")
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "Sen AsilBey Sanal Akademi'nin AI eğitim danışmanısın."},
                {"role": "user", "content": user_input}
            ]
        )
        answer = response["choices"][0]["message"]["content"]
        return jsonify({"reply": answer})
    except Exception as e:
        return jsonify({"reply": "Hata: " + str(e)})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)
