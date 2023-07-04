import type {UserReservierungDTO} from "@/DTO/UserReservierungDTO";

export default interface ReservierungResponseDTO {
    content: UserReservierungDTO[],
    nrOfTotalElements: number
}