export interface RegisterUserPayload {
    name: string;
    email: string;
    password: string;
    profilePhoto?: string;
}

export interface ILoginUserPayload {
    email: string;
    password: string;
}