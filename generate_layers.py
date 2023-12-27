import pandas as pd
import json
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# Load the data
data = pd.read_csv('enhanced_groups_with_metrics.csv')

# Selecting features and label for training
# Ensure some rows in your data have manually assigned 'Layer' labels for training
features = data[['Accumulative_Instability', 'Accumulative_Responsibility']]
labels = data['Layer']  # Make sure this column exists with some labels

# Remove rows where 'Layer' is not labeled
labeled_data = data.dropna(subset=['Layer'])

# Split labeled data into training and testing
X_labeled = labeled_data[['Accumulative_Instability', 'Accumulative_Responsibility']]
y_labeled = labeled_data['Layer']
X_train, X_test, y_train, y_test = train_test_split(X_labeled, y_labeled, test_size=0.3, random_state=42)

# Feature scaling
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Create KNN classifier
knn = KNeighborsClassifier(n_neighbors=5)  # Adjust the number of neighbors

# Train the classifier
knn.fit(X_train_scaled, y_train)

# Predict layers for the rest of the groups
# First, scale the entire features set
features_scaled = scaler.transform(features)
predictions = knn.predict(features_scaled)

# Add predictions to the data
data['Predicted_Layer'] = predictions

# Save the updated data
data.to_csv('groups_with_predicted_layers.csv', index=False)

# Convert the DataFrame to a JSON format
json_data = data.to_json(orient='records')

# Parse the JSON string back into a dictionary for pretty printing
parsed_json_data = json.loads(json_data)

# Save the JSON data to a file
json_file_path = 'groups_with_predicted_layers.json'  # Output JSON file path
with open(json_file_path, 'w') as file:
    json.dump(parsed_json_data, file, indent=4)

print(f"JSON file saved to {json_file_path}")