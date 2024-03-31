export interface AuthResponse{
    idToken:string;
    email:string;
    refreshToke:string;
    expiresIn:string;
    localId:string;
    registered?:boolean;
}