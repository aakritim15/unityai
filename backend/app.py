from flask import Flask, request, jsonify
import json
from flask_cors import CORS
CORS(app)

app = Flask(__name__)

@app.route('/submit-loan-application', methods=['POST'])
def submit_loan_application():
    # Get data from the request
    data = request.get_json()
    
    # Process the data (e.g., store it in a database or apply business logic)
    print(f"Received data: {data}")
    
    # You can perform validation here if needed
    
    # Respond with a success message
    return jsonify({"message": "Loan application submitted successfully!"}), 200

if __name__ == '__main__':
    app.run(debug=True)
