from flask import Flask

app = Flask(__name__)

@app.route('/')
def index():
    return app.send_static_file('main.html')

if __name__ == '__main__':
    import sys
    app.run(debug='--debug' in sys.argv)