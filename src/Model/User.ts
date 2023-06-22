import type {Role} from "@/components/models/Role";

export default interface User {
    id: number;
    username: string;
    vorname: string;
    nachname: string;
    roles: Role[]
}