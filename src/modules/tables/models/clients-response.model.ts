export interface Client {
    id: number;
    address: string;
    fullName: string;
    documentTypeCode: string;
    document: string;
    dateBirth: string;
    phoneNumber: string;
}

export interface ClientsResponse {
    t: Client[];
    message: string;
    exception: string;
    status: boolean;
}