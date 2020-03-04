import { auth } from './config';
export const createUser = (email, pwd) => {
    return auth.createUserWithEmailAndPassword(email, pwd)
}
export const loginUser = (email, pwd) => {
    return auth.signInWithEmailAndPassword(email, pwd)
}
export const logoutUser = () => {
    return auth.signOut()
}

