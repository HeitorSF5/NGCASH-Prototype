import md5 from 'md5';
export const passwordHasher = (password: string) : string => ( md5(password) )
