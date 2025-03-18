

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline

# ---------------------------
# Load and Prepare Data
# ---------------------------
data = pd.read_csv('loan_dataset.csv')
# Include the Name column back into the dataset for predictions
target = 'Fraud'
X = data.drop(columns=[target])
y = data[target]

# Identify categorical and numerical columns
categorical_cols = X.select_dtypes(include=['object']).columns.tolist()
numerical_cols = X.select_dtypes(include=['int64', 'float64']).columns.tolist()

# Split data: 80% training, 20% testing
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# ---------------------------
# Add Gaussian Noise to Numerical Features:
# ---------------------------
for col in numerical_cols:
    std_val = X_train[col].std()
    noise = np.random.normal(0, 0.3 * std_val, size=X_train.shape[0])
    X_train[col] = X_train[col] + noise

# ---------------------------
# Inject Label Noise:
# ---------------------------
noise_fraction = 0.4
np.random.seed(42)
flip_mask = np.random.rand(len(y_train)) < noise_fraction
y_train_noisy = y_train.copy()
y_train_noisy[flip_mask] = 1 - y_train_noisy[flip_mask]

# ---------------------------
# Preprocessing: One-hot encode categorical columns and pass numerical columns as-is
# ---------------------------
preprocessor = ColumnTransformer(
    transformers=[ 
        ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_cols),
        ('num', 'passthrough', numerical_cols)
    ])

# ---------------------------
# Build the Model Pipeline:
# ---------------------------
pipeline = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('classifier', RandomForestClassifier(n_estimators=10, max_depth=8, random_state=42))
])

# Train the model on the noisy training data
pipeline.fit(X_train, y_train_noisy)

# Evaluate the model on the clean test set
y_pred = pipeline.predict(X_test)
acc = accuracy_score(y_test, y_pred)
report = classification_report(y_test, y_pred)
conf_matrix = confusion_matrix(y_test, y_pred)

print("Model Evaluation on Test Set:")
print("Accuracy:", acc)
print("\nClassification Report:\n", report)
print("\nConfusion Matrix:\n", conf_matrix)

# ---------------------------
# Function to Predict Fraud Based on User Input
# ---------------------------
def predict_fraud(input_data: dict):
    """
    Accepts a dictionary with keys matching the feature names (excluding target)
    and returns the model's prediction (0 for non-fraud, 1 for fraud).
    """
    # Convert the input dictionary into a DataFrame (single row)
    input_df = pd.DataFrame([input_data])
    # Predict using the trained pipeline
    prediction = pipeline.predict(input_df)
    return prediction[0]

# ---------------------------
# Take Input from the User
# ---------------------------
print("\nPlease enter values for the following features:")

user_input = {}

# Iterate over each feature in X, including 'Name'
for col in X.columns:
    if col == 'Name':  # If it's the Name column, handle it separately
        user_input[col] = input(f"{col}: ")  # Get Name input
    else:
        value = input(f"{col}: ")
        if col in numerical_cols:
            # Try converting to an integer first, if that fails, try a float.
            try:
                user_input[col] = int(value)
            except ValueError:
                user_input[col] = float(value)
        else:
            user_input[col] = value

# Make a prediction based on the user's input
prediction = predict_fraud(user_input)
result = "Fraud / High-Risk" if prediction == 1 else "Non-Fraud / Low-Risk"

print("\nPrediction for your input:", result)
