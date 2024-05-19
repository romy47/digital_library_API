import { IToken, TokenModel, ITokenInput, tokenTypes } from "../models/token";

class TokenRepository {
    async create(token: ITokenInput): Promise<IToken | null> {
        return TokenModel.create(token);
    }

    async getByToken(token: string, type = tokenTypes.REFRESH, valid = true): Promise<IToken | null> {
        return TokenModel.findOne(
            {
                token,
                type,
                valid
            }
        );
    }

    async getBytoken(token: string, type = tokenTypes.REFRESH, valid = true): Promise<IToken | null> {
        return TokenModel.findOne(
            {
                token,
                type,
                valid
            }
        );
    }

    async deleteToken(token: string, type = tokenTypes.REFRESH): Promise<number> {
        const delToken = await TokenModel.deleteOne({
            token,
            type,
        });
        return delToken.deletedCount;
    }

}

export const tokenRepository = new TokenRepository();
