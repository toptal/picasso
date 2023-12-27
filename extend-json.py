import json

# Function to load JSON data from a file
def load_json(file_path):
    with open(file_path, 'r') as file:
        return json.load(file)
    
# Export results to a JSON file
def export_to_json(data, output_file_path):
    with open(output_file_path, 'w') as file:
        json.dump(data, file, indent=4)


# Load the data
packages_data = load_json('simplified-dependencies.json')  # Replace with your actual file path
groups_data = load_json('saved-communities.json')     # Replace with your actual file path

# Convert packages data to a dictionary for easy access
packages_dict = {pkg['name']: pkg for pkg in packages_data}

# Enhanced JSON structure
enhanced_json = {}

for group_id, components in groups_data.items():
    # Group name
    group_name = f"Group {group_id}"

    # Group dependencies
    group_dependencies = set()
    for component in components:
        group_dependencies.update(packages_dict[component]['dependencies'])

    # Add to enhanced JSON structure
    enhanced_json[group_id] = {
        "group_name": group_name,
        "group_dependencies": list(group_dependencies),
        "components": components,
    }

# Save the enhanced JSON to a file
with open('enhanced_groups.json', 'w') as file:
    json.dump(enhanced_json, file, indent=4)

print("Enhanced JSON saved to 'enhanced_groups.json'")
