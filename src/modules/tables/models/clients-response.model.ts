import { NgbDate } from "@ng-bootstrap/ng-bootstrap";

export interface Client {
    id: number;
    address: string;
    documentTypeId?: number;
    documentTypeCode: string;
    surname: string,
    firstName: string;
    document: string;
    secondName: string;
    dateBirth: string | NgbDate;
    phoneNumber: string;
    secondSurname: string;
}

export interface ClientsResponse {
    t: Client[];
    message: string;
    exception: string;
    status: boolean;
}