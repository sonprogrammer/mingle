export interface Token {
    accessToken: string;
    refreshToken: string;
    accessExpiredDate: Date;
    refreshExpiredDate: Date;
}