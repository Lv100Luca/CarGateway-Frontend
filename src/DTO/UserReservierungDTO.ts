import type OMSendHelpDTO from "@/DTO/OMSendHelpDTO";

export interface UserReservierungDTO {
    fahrzeugDTO: OMSendHelpDTO,
    reservierungsId: number,
    startZeitpunkt: number,
    endZeitpunkt: number,
}