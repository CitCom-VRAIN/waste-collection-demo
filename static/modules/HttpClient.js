export class HttpClient {
    #serverURL = "http://127.0.0.1:5000/";

    async get(endpoint) {
        try {
            const request = await fetch(`${this.#serverURL}${endpoint}`)
            const response = await request.text()
            const data = JSON.parse(response);
            return data;
        } catch (error) {
            return { error: error };
        }
    }
}