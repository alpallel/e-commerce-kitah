// REPLACE this URL with the one you found in Phase 2
const BACKEND_URL = 'http://127.0.0.1:8000/api/products/'; 

async function connectToBackend() {
    try {
        console.log("Calling Backend...");
        const response = await fetch(BACKEND_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Backend answered:", data);

        // TODO: Pass 'data' to your function that draws the HTML
        // renderProducts(data); 

    } catch (error) {
        console.error("Connection Failed:", error);
        alert("Cannot connect to Backend. Is the Django server running?");
    }
}

// Run connection
connectToBackend();


async function fetchItems() {
    // 1. Point to your Django JSON endpoint
    // Standard UI pattern often uses '/json/' or '/main/json/'
    const url = "http://127.0.0.1:8000/item_list/"; 

    try {
        const response = await fetch(url);

        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const rawData = await response.json();
        
        // 2. Clean the data (Django returns it nested in "fields")
        // We map over the list to just get the useful stuff
        const items = rawData.map((item) => {
            return {
                id: item.pk,           // The database ID
                ...item.fields         // The actual data (name, price, etc.)
            };
        });

        console.log("Cleaned Item List:", items);
        return items;

    } catch (error) {
        console.error("Error fetching items:", error);
        return []; // Return empty list on error
    }
}

// Usage Example:
// Call this function when you want to use the data
fetchItems().then(items => {
    // You can pass 'items' to your display function here
    // e.g., renderCards(items);
});