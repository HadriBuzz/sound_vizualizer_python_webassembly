async function loadAndRunPython(pyodide) {
    try {
        // Fetch the Python script
        const response = await fetch('script.py');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const pyCode = await response.text();

        // Run the Python code
        await pyodide.runPythonAsync(pyCode);

        // Get the encoded image data from Python
        let img_data = pyodide.globals.get('img_data');

        // Create an image element and set its source to the base64-encoded data
        const img = document.createElement('img');
        img.src = `data:image/png;base64,${img_data}`;

        // Replace the existing image with the new one
        const output = document.getElementById('output');
        output.innerHTML = ''; // Clear previous image
        output.appendChild(img);
    } catch (error) {
        console.error("Error in fetching or running the Python script:", error);
        document.getElementById('output').innerText = "An error occurred: " + error.message;
    }
}

async function main() {
    // Load Pyodide from CDN
    let pyodide = await loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.18.1/full/"
    });

    // Load necessary Python packages
    await pyodide.loadPackage('micropip');
    await pyodide.loadPackage('matplotlib');
    await pyodide.loadPackage('numpy');
    await pyodide.loadPackage('pillow');

    // Load and run the Python script initially
    loadAndRunPython(pyodide);

    // Set an interval to update the plot every second
    setInterval(() => loadAndRunPython(pyodide), 1000);
}

// Load Pyodide script
const script = document.createElement("script");
script.src = "https://cdn.jsdelivr.net/pyodide/v0.18.1/full/pyodide.js";
script.onload = main;
document.head.appendChild(script);