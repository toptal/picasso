const fs = require('fs');

function simplifyJson(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return;
    }

    // Parse the JSON data
    const originalData = JSON.parse(data);
    const simplifiedData = {};
    const components = [];

    originalData.modules.forEach((tempModule) => {
      // Initialize an empty set for each component to store unique dependencies
      // const dependencies = new Set();

      // detailsList.forEach(detail => {
      //   if (detail.dependencies) {
      //     detail.dependencies.forEach(depDetail => {
      //       if (depDetail.module) {
      //         dependencies.add(depDetail.module);
      //       }
      //     });
      //   }
      // });
      // console.log('tempModule: ', tempModule)

      components.push({
        name: tempModule.source,
        dependencies: tempModule.dependencies.map((dependency) => dependency.resolved),
        dependents: tempModule.dependants || [],
      })

      // Convert the set to an array and assign it to the component
      // simplifiedData[component] = Array.from(dependencies);
    });

    // Output the simplified data
    console.log(JSON.stringify(components));
  });
}

// Usage
// Replace 'path_to_your_file.json' with the path to your JSON file
simplifyJson('packages-dependencies.json');
