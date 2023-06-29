export type Body = any;
const tokenKey = "token";
export default class APIClient {
    private static _token: string | null = null;
    private static _baseURL = "http://localhost:8080";

    // private static _baseURL = "http://172.31.1.23:8080";

    static get baseURL(): string {
        return this._baseURL;
    }

    static set token(token: string | null) {
        if (token !== null) {
            localStorage.setItem(tokenKey, token);
        } else {
            localStorage.removeItem(tokenKey);
        }
        this._token = token;
    }

    static get token(): string | null {
        if (this._token === null) {
            this._token = localStorage.getItem(tokenKey);
        }
        return this._token;
    }

    private static getAuthHeader() {
        return {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + (this.token),
        }
    }

    private static getEmptyHeader() {
        return {"Content-Type": "application/json"}
    }

    public static async getRequest<TResponse>(endpoint: string, requireAuth: boolean) {
        console.log("Running Get at: " + endpoint)
        const response = await fetch(this.baseURL + endpoint, {
            method: "GET",
            headers: (requireAuth ? this.getAuthHeader() : this.getEmptyHeader()) //todo: make method
        });
        if (response.ok) {
            return await response.json() as TResponse;
        }
        //todo: error handling
        else {
            console.log("Error in getRequest at endpoint: " + endpoint)
            return null;
        }

    }

    public static async postRequest<TBody extends Body, TResponse>(endpoint: string, requireAuth: boolean, body: TBody) {
        const response = await fetch(this.baseURL + endpoint, {
            method: "POST",
            headers: (requireAuth ? this.getAuthHeader() : this.getEmptyHeader()), //todo: make method
            body: JSON.stringify(body), // jsonify body object
        });
        if (response.ok) { // todo: more response cases
            try {
                console.log("Try Returning Json as TResponse");
                return await response.json() as TResponse;
            } catch (e) {
                console.log("Json cant be Converted to TResponse")
            }
        }
        //todo: error handling
        else {
            console.log("Error in postRequest at endpoint: " + endpoint);
        }
    }

    public static async patchRequest<TBody extends Body>(endpoint: string, requireAuth: boolean, body: TBody) {
        const response = await fetch(this.baseURL + endpoint, {
            method: "PATCH",
            headers: (requireAuth ? this.getAuthHeader() : this.getEmptyHeader()), //todo: make method
            body: JSON.stringify(body), // jsonify body object
        });
        return response.ok;
    }
}