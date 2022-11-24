import fs from 'fs';
import { sign } from 'jsonwebtoken';
import TokenPayload from '../classes/TokenPayload';

const SECRET = fs.readFileSync('jwt.evaluation.key', 'utf8');
// esta é a palavra secreta que é usada para "assinar" o token. Normalmente ela estaria num dotenv ou um arquivo de text mais seguro

export const createToken = (payload: TokenPayload) => {
const token = sign(payload, SECRET, {
    algorithm: 'HS256',
    expiresIn: '1d',
    });

    return token;
};
