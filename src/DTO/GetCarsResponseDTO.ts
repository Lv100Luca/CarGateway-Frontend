import type Standort from "@/DTO/Standort";

export default interface GetCarsResponseDTO {
    id: number;
    name: string;
    standort: Standort;
    // oder

}
