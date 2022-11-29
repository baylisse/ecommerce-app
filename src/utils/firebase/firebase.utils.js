import { initializeApp } from 'firebase/app';
import { 
    getAuth,  
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword 
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCtFhGbOXBoXuKxMyD4yJUXhDO2vtWCEWg",
    authDomain: "ecommerce-app-489b6.firebaseapp.com",
    projectId: "ecommerce-app-489b6",
    storageBucket: "ecommerce-app-489b6.appspot.com",
    messagingSenderId: "633275609480",
    appId: "1:633275609480:web:3026cc8d9bd9b0b79a8a3d"
};

initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const db = getFirestore();
export const createUserDocFromAuth = async (userAuth, additionalInfo = {} ) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInfo
            });
        } catch (err) {
            console.log('Oh no an error! ', err.message)
        }
    } 

    return userDocRef;
};
export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    try {
        return await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.log('Oh no an error! ', err.message)
    }
};
export const signInUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (err) {
        console.log('Oh no an error! ', err.message)
    }
};