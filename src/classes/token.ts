import jwt from 'jsonwebtoken'

export class Token {

    private static seed: string = 'seed-constructor-backend-node';
    private static expires: string = '30d';

    constructor() { }

    static getJWToken(payload: any): string {



        return jwt.sign(
            {
                user: payload,
            },
            this.seed,
            {
                expiresIn: this.expires
            });
    };

    static compareToken(userToken: string) {

        return new Promise((resolve, reject) => {
            jwt.verify(userToken, this.seed, (error, decoded) => {
                //Si hay un error lo infformo
                error ? reject(error) : resolve(decoded);
            })
        })
    }
}