export default interface LoginResponseDTO {
    token: string;
    type: string;
    id: number;
    username: string;
    roles: string[];
}