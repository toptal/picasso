import json

# Load the enhanced JSON data
with open('enhanced_groups.json', 'r') as file:
    groups_data = json.load(file)

# Initialize metrics
instability = {group_id: 0 for group_id in groups_data}
responsibility = {group_id: 0 for group_id in groups_data}

# Calculate instability (count of unique external dependencies)
for group_id, group_info in groups_data.items():
    external_dependencies = set(group_info["group_dependencies"]) - set(group_info["components"])
    instability[group_id] = len(external_dependencies)

# Calculate responsibility (count of how many times a group's components are dependencies for other groups)
for group_id, group_info in groups_data.items():
    for dep in group_info["group_dependencies"]:
        for other_group_id, other_group_info in groups_data.items():
            if other_group_id != group_id and dep in other_group_info["components"]:
                responsibility[other_group_id] += 1

# Add metrics to the groups data
for group_id in groups_data:
    groups_data[group_id]["instability"] = instability[group_id]
    groups_data[group_id]["responsibility"] = responsibility[group_id]

# Calculate accumulative instability and responsibility
def calculate_accumulative_metrics(groups_data):
    for group_id, group_info in groups_data.items():
        # Accumulative instability: group's own instability + instability of its dependencies
        accumulative_instability = group_info["instability"]
        for dependency in group_info["group_dependencies"]:
            dep_group_id = next((gid for gid, ginfo in groups_data.items() if dependency in ginfo["components"]), None)
            if dep_group_id:
                accumulative_instability += groups_data[dep_group_id]["instability"]

        # Accumulative responsibility: group's own responsibility + responsibility of its dependencies
        accumulative_responsibility = group_info["responsibility"]
        for child in group_info["components"]:
            for other_group_id, other_group_info in groups_data.items():
                if other_group_id != group_id and child in other_group_info["group_dependencies"]:
                    accumulative_responsibility += other_group_info["responsibility"]

        group_info["accumulative_instability"] = accumulative_instability
        group_info["accumulative_responsibility"] = accumulative_responsibility

calculate_accumulative_metrics(groups_data)

# Save the updated data back to JSON
with open('enhanced_groups_with_metrics.json', 'w') as file:
    json.dump(groups_data, file, indent=4)

print("Updated JSON with metrics saved to 'enhanced_groups_with_metrics.json'")
