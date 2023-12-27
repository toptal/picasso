import plotly.graph_objects as go
import networkx as nx
import json
import matplotlib.pyplot as plt

# Load the final enhanced JSON file
file_path = 'enhanced_groups_with_metrics_final.json'
with open(file_path, 'r') as file:
    groups_data = json.load(file)

# Create a graph
G = nx.DiGraph()

# # Adding nodes and edges to the graph
# for group in groups_data:
#     group_name = group['group_name']
#     G.add_node(group_name)  # Add each group as a node
#     for dependency in group['group_dependencies']:
#         # Extracting the group name from the dependency path
#         dependency_name = dependency.split('/')[-2].replace('_', ' ').title()
#         if dependency_name != group_name and dependency_name in G:
#             G.add_edge(dependency_name, group_name)  # Add an edge from the dependency to the group


# # Assuming 'G' is your NetworkX graph
# pos = nx.spring_layout(G)  # Get positions of nodes in G

# # For nodes
# node_x = []
# node_y = []
# node_text = []  # List to hold the labels for the nodes
# for node in G.nodes():
#     x, y = pos[node]
#     node_x.append(x)
#     node_y.append(y)
#     node_text.append(node)  # Add the group name (or node label)

# node_trace = go.Scatter(
#     x=node_x, y=node_y,
#     mode='markers+text',  # Include text mode
#     hoverinfo='text',
#     text=node_text,  # Assign the labels to the text attribute
#     marker=dict(showscale=True))

# # For edges
# edge_x = []
# edge_y = []
# for edge in G.edges():
#     x0, y0 = pos[edge[0]]
#     x1, y1 = pos[edge[1]]
#     edge_x.extend([x0, x1, None])
#     edge_y.extend([y0, y1, None])

# edge_trace = go.Scatter(
#     x=edge_x, y=edge_y,
#     line=dict(width=0.5, color='#888'),
#     hoverinfo='none',
#     mode='lines')

# # Create figure
# fig = go.Figure(data=[edge_trace, node_trace],
#              layout=go.Layout(
#                 title='Network graph',
#                 showlegend=False,
#                 hovermode='closest'))

# fig.show()





# Assuming 'groups_data' is your data loaded from the JSON file
# groups_instability = [(group['group_name'], group['accumulative_instability']) for group in groups_data]
# # Sorting by accumulative instability
# groups_instability_sorted = sorted(groups_instability, key=lambda x: x[1])

# group_names_sorted_instability = [item[0] for item in groups_instability_sorted]
# accumulative_instability_sorted = [item[1] for item in groups_instability_sorted]

# plt.figure(figsize=(10, 6))
# plt.bar(group_names_sorted_instability, accumulative_instability_sorted, color='blue')
# plt.xlabel('Groups')
# plt.ylabel('Accumulative Instability')
# plt.title('Accumulative Instability of Each Group (Sorted)')
# plt.xticks(rotation=90)
# plt.tight_layout()
# plt.show()




groups_responsibility = [(group['group_name'], group['accumulative_responsibility']) for group in groups_data]
# Sorting by accumulative responsibility
groups_responsibility_sorted = sorted(groups_responsibility, key=lambda x: x[1])

group_names_sorted_responsibility = [item[0] for item in groups_responsibility_sorted]
accumulative_responsibility_sorted = [item[1] for item in groups_responsibility_sorted]

plt.figure(figsize=(10, 6))
plt.bar(group_names_sorted_responsibility, accumulative_responsibility_sorted, color='green')
plt.xlabel('Groups')
plt.ylabel('Accumulative Responsibility')
plt.title('Accumulative Responsibility of Each Group (Sorted)')
plt.xticks(rotation=90)
plt.tight_layout()
plt.show()
