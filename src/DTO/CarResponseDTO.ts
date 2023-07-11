import type CarDTO from "@/DTO/CarDTO";

export default interface CarResponseDTO {
    content: CarDTO[],
    nrOfTotalElements: number,
}