export interface DocumentNode {
    id: number;
    documentType: string;
    documentTypeCode: string;
}

export interface DocumentsResponse {
    t: DocumentNode[];
    message: string;
    exception: string;
    status: boolean;
}