const USERNAME_LENGTH = 3;
const PASSWORD_FAIL = /^(.{0,7}|[^0-9]*|[^A-Z]*|)$/;
// Regex: Estou usando logica reversa: Se passar em alguma dessas asserções, então não é valido
// .{0, 7} -- entre 0 à 7 caracteres (< 8)
// [^0-9]* -- não contém números
// [^A-Z]* -- não contém caractére maiusculo

export const registerSchema = (username: string, password: string): true | false => {
    if (!PASSWORD_FAIL.test(password) && username.length >= USERNAME_LENGTH) {
        return true;
    }
    return false;
}
