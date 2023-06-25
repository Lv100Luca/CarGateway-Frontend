import type UserResponseDTO from "@/DTO/UserResponseDTO";

export default interface UserDataStoreStare {
    user: UserResponseDTO | null;
}