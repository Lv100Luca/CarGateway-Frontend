import type GetCarsResponseDTO from "@/DTO/GetCarsResponseDTO";

export default interface GetCarsWithPagesResponseDTO {
    content: GetCarsResponseDTO[],
    nrOfTotalElements: number,

}