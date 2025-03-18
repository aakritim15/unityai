import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import OneHotEncoder, StandardScaler, LabelEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from imblearn.over_sampling import SMOTE

# Load dataset
data = pd.read_csv('creditt.csv')

# Drop irrelevant columns
columns_to_drop = ['trans_date', 'trans_time', 'name', 'street', 'city', 'state', 'zip', 'dob', 'trans_number', 'cc_num']
data = data.drop(columns=columns_to_drop)

# Define features and target variable
target = 'is_fraud'
X = data.drop(columns=[target])
y = data[target]

# Identify categorical and numerical columns
categorical_cols = X.select_dtypes(include=['object']).columns.tolist()
numerical_cols = X.select_dtypes(include=['int64', 'float64']).columns.tolist()

# Encode categorical variables
label_encoders = {}
for col in categorical_cols:
    le = LabelEncoder()
    X[col] = le.fit_transform(X[col])
    label_encoders[col] = le

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

# Apply SMOTE to handle class imbalance
smote = SMOTE(sampling_strategy=1.0, random_state=42)
X_train_resampled, y_train_resampled = smote.fit_resample(X_train, y_train)

# Preprocessing pipeline
preprocessor = ColumnTransformer(
    transformers=[
        ('num', StandardScaler(), numerical_cols),
        ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_cols)
    ])

# Adjust model parameters to increase accuracy (~95%)
pipeline = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('classifier', RandomForestClassifier(n_estimators=500, max_depth=None, 
                                            min_samples_split=2, min_samples_leaf=1, 
                                            random_state=42))
])

# Train the model
pipeline.fit(X_train_resampled, y_train_resampled)

# Predictions
y_pred = pipeline.predict(X_test)

# Model evaluation
accuracy = accuracy_score(y_test, y_pred)
report = classification_report(y_test, y_pred)
conf_matrix = confusion_matrix(y_test, y_pred)

print(f'Accuracy: {accuracy:.4f}')
print('\nClassification Report:\n', report)
print('\nConfusion Matrix:\n', conf_matrix)

# Function to make predictions on new user input
def predict_transaction():
    user_input = {}
    for col in X.columns:
        value = input(f"Enter value for {col}: ")
        try:
            user_input[col] = float(value) if col in numerical_cols else value
        except ValueError:
            user_input[col] = value
    
    df = pd.DataFrame([user_input])
    for col in categorical_cols:
        if col in label_encoders:
            df[col] = label_encoders[col].transform([df[col].values[0]])
    
    prediction = pipeline.predict(df)[0]
    print("Predicted Transaction Status:", "Fraud" if prediction == 1 else "Not Fraud")

# Take user input for prediction
predict_transaction()
