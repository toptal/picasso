import json

# Load the enhanced JSON data with metrics
with open('enhanced_groups_with_metrics.json', 'r') as file:
    groups_data = json.load(file)

# Function to categorize groups into layers
def categorize_into_layers(groups_data):
    layers = {
        "foundation": [],
        "components": [],
        "patterns": [],
        "templates": [],
        "pages": []
    }

    # Foundation layer criteria
    layers["foundation"].append("Group 10")  # Specifically assign Group 10 to foundation

    # Sorting groups for other layers based on their metrics
    sorted_groups = sorted(groups_data.items(), key=lambda x: (x[1]["accumulative_responsibility"], -x[1]["accumulative_instability"]))

    for group_id, group_info in sorted_groups:
        if group_id == "Group 10":
            continue  # Skip Group 10 as it's already assigned to foundation

        if group_info["accumulative_responsibility"] > group_info["accumulative_instability"]:
            layers["components"].append(group_id)
        else:
            # Additional logic to distinguish between patterns, templates, and pages
            if group_info["accumulative_instability"] > 10:  # Threshold can be adjusted
                layers["pages"].append(group_id)
            elif group_info["accumulative_instability"] > 5:  # Threshold can be adjusted
                layers["templates"].append(group_id)
            else:
                layers["patterns"].append(group_id)

    return layers

# Categorize groupsde
layered_groups = categorize_into_layers(groups_data)

# Save the categorized groups to a new JSON file
with open('layered_groups.json', 'w') as file:
    json.dump(layered_groups, file, indent=4)

print("Groups categorized into layers and saved to 'layered_groups.json'")
