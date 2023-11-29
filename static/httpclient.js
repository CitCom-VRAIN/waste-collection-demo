const serverURL = "http://127.0.0.1:5000/";

async function get(endpoint) {
    try {
        const request = await fetch(`${serverURL}${endpoint}`)
        const response = await request.text()
        const data = JSON.parse(response);
        return data;
    } catch (error) {
        return { error: error };
    }
}