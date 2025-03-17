import joblib
from flask import Flask, request, jsonify
import pandas as pd

app = Flask(__name__)

# Load model, scaler, and encoders
model = joblib.load("model.pkl")
scaler = joblib.load("scaler.pkl")
label_encoders = joblib.load("label_encoders.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        df = pd.DataFrame([data])

        # Encode categorical values
        for column in df.select_dtypes(include=['object']).columns:
            if column in label_encoders:
                df[column] = label_encoders[column].transform([df[column][0]])

        # Scale numerical data
        df_scaled = scaler.transform(df)

        # Make a prediction
        prediction = model.predict(df_scaled)[0]

        return jsonify({"fraud_prediction": int(prediction)})
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)
