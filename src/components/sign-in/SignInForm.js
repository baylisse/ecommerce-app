import { useState, useContext } from "react";
import { 
    signInWithGooglePopup, 
    createUserDocFromAuth,
    signInUserWithEmailAndPassword 
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/FormInput";
import Button from "../button/Button";
import { UserContext } from "../../contexts/UserContext";
import './SignInForm.styles.scss'

const defaultFormValues = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const { setCurrentUser } = useContext(UserContext);
    const [formFields, setFormFields] = useState(defaultFormValues);
    const { email, password } = formFields;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value})
    };

    const resetFormFields = () => {
        setFormFields(defaultFormValues);
    };

    const handleSignIn = async (event) => {
        event.preventDefault();

        try {
            const user = await signInUserWithEmailAndPassword(email, password);
            setCurrentUser(user);
            resetFormFields();
        } catch (err) {
            if(err.code === 'auth/wrong-password') {
                alert('Incorrect password for email');
            } else if(err.code === 'auth/user-not-found'){
                alert('No user found for this email')
            } else {
                console.log('Oh no, an error! ', err.message)
            } 
        }
    }

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocFromAuth(user);
    }

    return (
        <div className='sign-in-container'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <FormInput 
                    label="Email"
                    type="email" 
                    required 
                    onChange={handleChange} 
                    name="email" 
                    value={email}
                    />
                <FormInput 
                    label="Password"
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="password" 
                    value={password}
                    />
            <div className='buttons-container'>
                <Button onClick={handleSignIn} type='submit'>Sign in</Button>
                <Button onClick={logGoogleUser} buttonType='google' type='button'>Google Sign In</Button>
            </div>
        </div>
    )
}

export default SignInForm;