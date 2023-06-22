import type LoginResponseDTO from "@/DTO/LoginResponseDTO";
import type GetCarsResponseDTO from "@/DTO/GetCarsResponseDTO";
import type GetCarsWithPagesResponseDTO from "@/DTO/GetCarsWithPagesResponseDTO";

export default class APIService {

    private static readonly url = "http://localhost:8080";
    private static _token: string | null = null;


    static set token(value: string | null) {
        this._token = value;
    }

    public static async ApiLogin(username: string, password: string) {
        console.log("Running LOGIN")
        const respone = await fetch(this.url + "/user/login", {
            method: "POST",
            // mode: "no-cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                    username: username,
                    password: password
                }
            )
        });
        if (respone.ok) {
            console.log("Response OK")
            return await respone.json() as LoginResponseDTO; // as unknown as LoginResponseDTO
        } else {
            console.log("I have cancer")
            return;
        }
    }

    public static async getCars(token: string) {
        console.log("Running getCards");
        const response = await fetch(this.url + "/fahrzeuge", {
            method: "GET",
            // mode: "no-cors",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + token,
            }
        });
        if (response.ok) {
            console.log("Response OK");
            return await response.json() as GetCarsResponseDTO[];
        } else {
            console.log("oh uh Stinky")
        }
    }

    public static async getPageWithSize(token: string, pageNr: number, pageSize: number) {
        console.log("Running getPage: page: " + pageNr + " / items: " + pageSize);
        const response = await fetch("http://localhost:8080/fahrzeuge?pagenr=0&pagesize=10", {
        // const response = await fetch(this.url + "/fahrzeuge?pagenr=0&pagesize=10", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + token,
            }
        })
        console.log("ran fetch" + response.status)
        if (response.ok) {
            console.log("Response OK");
            return await response.json() as GetCarsWithPagesResponseDTO;
        } else {
            console.log("oh uh Stinky")
        }
    }

    public static async getCarByName(token: string, name: string) {
        const response = await fetch(this.url + "/fahrzeuge/name/" + name, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + token,
            }
        });
        if (response.ok) {

            return await response.json() as GetCarsWithPagesResponseDTO;
        }
    }

    public static async getJson<T>(url: string) {
        const response = await fetch(url, {
            method: "GET",
            headers: {}
        })

    }
}