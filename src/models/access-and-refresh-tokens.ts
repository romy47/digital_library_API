import IToken from "./token";

export default interface IAccessAndRefreshTokens {
    accessToken: string;
    refreshToken: string;
}