import type UserResponseDTO from "@/DTO/UserResponseDTO";

export default interface UserListResponseDTO {
    content: UserResponseDTO[],
    nrOfTotalElements: number
}