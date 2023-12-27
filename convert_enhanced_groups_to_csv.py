import json
import pandas as pd

# Load your JSON file
with open('enhanced_groups_with_metrics.json', 'r') as file:
    groups_data = json.load(file)

# Prepare data for DataFrame
df_data = []
for group_id, group_info in groups_data.items():
    df_data.append({
        "Group_ID": group_id,
        "Group_Name": group_info["group_name"],
        "Instability": group_info["instability"],
        "Responsibility": group_info["responsibility"],
        "Accumulative_Instability": group_info["accumulative_instability"],
        "Accumulative_Responsibility": group_info["accumulative_responsibility"],
        "Layer": "",
        "Dependencies": ", ".join(group_info["group_dependencies"]),
        "Children": ", ".join(group_info["components"])
    })

# Create DataFrame
df = pd.DataFrame(df_data)

# Save DataFrame to CSV
df.to_csv('enhanced_groups_with_metrics.csv', index=False)
