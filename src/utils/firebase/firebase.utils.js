import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider 
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

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();
export const createUserDocFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (err) {
            console.log('Oh no an error! ', err.message)
        }
    } 

    return userDocRef;
};