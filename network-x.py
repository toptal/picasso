import json
import networkx as nx
import community as community_louvain

# Load the JSON file
def load_data(file_path):
    with open(file_path, 'r') as file:
        return json.load(file)

# Create a graph from the data
def create_graph(data):
    G = nx.Graph()
    for component in data:
        G.add_node(component['name'])
        for dependency in component['dependencies']:
            G.add_edge(component['name'], dependency)
    return G

# Apply community detection
def detect_communities(G, resolution=1.0):
    # The Louvain method for community detection
    partition = community_louvain.best_partition(G, resolution=resolution)
    return partition


# Export results to a JSON file
def export_to_json(data, output_file_path):
    with open(output_file_path, 'w') as file:
        json.dump(data, file, indent=4)

# Main function to process the file and detect communities
def main(file_path):
    data = load_data(file_path)
    G = create_graph(data)
    communities = detect_communities(G, resolution=20)

    # Organizing components by community
    community_dict = {}
    for component, community_id in communities.items():
        if community_id not in community_dict:
            community_dict[community_id] = []
        community_dict[community_id].append(component)

    export_to_json(community_dict, 'communities.json')

    return community_dict

# Example usage
# Replace 'path_to_your_file.json' with the path to your JSON file
community_dict = main('simplified-dependencies.json')
for community_id, components in community_dict.items():
    print(f"Community {community_id}: {components}")
