import { signInWithGooglePopup, createUserDocFromAuth } from "../../utils/firebase/firebase.utils";

const Login = () => {
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocFromAuth(user);
        
    }

    return(
        <div>
            <h1>Login Page</h1>
            <button onClick={logGoogleUser} >
                Log In with Google popup
            </button>
        </div>
    )
}

export default Login;