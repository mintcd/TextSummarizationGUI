from flask import Flask, request, jsonify
import os
from flask_cors import CORS

import SumSumma
import SumNLTK
# import SumGensim
# import SumSpacy

path_cwd = os.path.dirname(os.path.realpath(__file__))
path_templates = os.path.join(path_cwd, 'templates')
path_static = os.path.join(path_cwd, 'static')

app = Flask(__name__)
CORS(app)


@app.route("/test", methods=['GET', 'POST'])
def handle_test():
    return "test"


@app.route("/summarizer", methods=['GET', 'POST'])
def handle_post_request():
    data = request.get_json()
    print(data)
    response = ""
    print(data['type'])
    if data['type'] == 'spacy': 
        response = SumSpacy.summarize(data['text'])
    elif data['type'] == 'NLTK':
        print("OK")
        response = SumNLTK.summarize(data['text'])
    elif data['type'] == 'summa':
        response = SumSumma.summarize(data['text'])
    print("OK")
    return jsonify(response), 200

if __name__ == '__main__':
    app.run(debug=True)