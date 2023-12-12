export class HttpClient {
    #serverURL = "http://127.0.0.1:5000/";

    async get(path, params = undefined) {
        // Build URL
        const url = new URL(this.#serverURL);
        url.pathname = path;

        const searchParams = new URLSearchParams(params);

        try {
            const request = await fetch(url.toString() + '?' + searchParams.toString());
            const response = await request.text();
            const data = JSON.parse(response);
            return data;
        } catch (error) {
            console.error(error)
            return { error: error };
        }
    }
}