import json
import csv
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.neighbors import NearestNeighbors

# Load the JSON file
def load_data(file_path):
    with open(file_path, 'r') as file:
        return json.load(file)

# One-hot encode the dependencies
def encode_dependencies(data):
    all_dependencies = set()
    for component in data:
        for dependency in component['dependencies']:
            all_dependencies.add(dependency)

    mlb = MultiLabelBinarizer(classes=sorted(all_dependencies))
    return mlb.fit_transform([component['dependencies'] for component in data]), mlb.classes_

# Apply KNN to find similar components
def apply_knn(dependency_matrix, component_names, n_neighbors=5):
    knn = NearestNeighbors(n_neighbors=n_neighbors)
    knn.fit(dependency_matrix)

    neighbors = knn.kneighbors(dependency_matrix, return_distance=False)
    return {component_names[i]: [component_names[n] for n in neighbor] for i, neighbor in enumerate(neighbors)}

# Export results to a JSON file
def export_to_json(data, output_file_path):
    with open(output_file_path, 'w') as file:
        json.dump(data, file, indent=4)

def save_dependency_matrix_to_csv(dependency_matrix, component_names, dependency_names, file_path):
    # Open a file to write
    with open(file_path, mode='w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)

        # Write header row (dependency names)
        header = ['Component'] + list(dependency_names)
        writer.writerow(header)

        # Write each component and its dependency vector
        for name, row in zip(component_names, dependency_matrix):
            writer.writerow([name] + list(row))

# Main function to load data, process it, apply KNN, and export results
def main(file_path, output_file_path):
    data = load_data(file_path)
    print(f"Loaded {len(data)} components")
    dependency_matrix, classes = encode_dependencies(data)
    # print(f"Found matrix of shape {dependency_matrix.shape} with {len(classes)} unique dependencies")
    # dependency_matrix.tolist()
    # print(f" Dependencies: {classes}")
    component_names = [component['name'] for component in data]

    file_path = 'dependency_matrix.csv'  # Path where you want to save the CSV file
    save_dependency_matrix_to_csv(dependency_matrix, component_names, classes, file_path)

    classified_groups = apply_knn(dependency_matrix, component_names, 10)

    export_to_json(classified_groups, output_file_path)
    print(f"Classified groups exported to {output_file_path}")

# Example usage
# Replace 'path_to_your_input_file.json' with the path to your JSON file
# Replace 'path_to_your_output_file.json' with the path where you want to save the results
main('simplified-dependencies.json', 'kkn-output.json')
