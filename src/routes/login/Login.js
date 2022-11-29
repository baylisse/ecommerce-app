import { 
    signInWithGooglePopup, 
    createUserDocFromAuth 
} from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up/SignUpForm";

const Login = () => {

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocFromAuth(user);
    }

    return(
        <div>
            <h1>Login Page</h1>
            <button onClick={logGoogleUser} >Log In With Google Popup</button>
            <SignUpForm />
        </div>
    )
}

export default Login;