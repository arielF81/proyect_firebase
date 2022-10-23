import {
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';


const auth = getAuth();

let userData = {
    id: null,
    email: null,

}

if (localStorage.getItem('user') !== null) {
    userData = JSON.parse(localStorage.getItem('user'));
}
onAuthStateChanged(auth, user => {

    if (user) {
        userData = {
            id: user.uid,
            email: user.email,
        }
        localStorage.setItem('user', JSON.stringify(userData));
    } else {
        userData = {
            id: null,
            email: null,
        }
        localStorage.removeItem('user');
    }

    notifyAll();
});


export const AUTH_ERROR_MESSAGES = {
        'auth/wrong-password': 'Password incorrecto',
        'auth/internal-error': 'Complete los datos',
        'auth/invalid-email': 'Email invalido',

    }
    /**
     *  autenticar un usuario 
     *
     * @param email
     * @param password
     * @returns {Promise<UserCredential>}
     */
export function login({ email, password }) {
    return signInWithEmailAndPassword(auth, email, password)
        .then(user => {
            console.log("el usuario es ", user);
        })
}
export function logout() {
    return signOut(auth);
}

// Observers

let observers = [];

export function subscribeToAuthChanges(callback) {

    observers.push(callback);
    notify(callback);
}

function notify(callback) {
    callback({...userData });
}


function notifyAll() {
    observers.forEach(callback => notify(callback));
}