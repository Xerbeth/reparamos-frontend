interface LoginData {
    access: boolean;
    roleCode: string;
}

export interface LoginResponse {
    t: LoginData;
    message: string;
    exception: string;
    status: boolean;
}