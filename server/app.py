from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return jsonify({"message": "Hello World!"})

@app.route('/new')
def index():
    return jsonify({"message": "Welcome to home route"})


if __name__ == '__main__':
    app.run(debug=True)
