import { useState } from 'react';
import { 
    createAuthUserWithEmailAndPassword,
    createUserDocFromAuth
} from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/FormInput';
import Button from '../button/Button';
import './SignUpForm.styles.scss'

const defaultFormValues = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormValues);
    const { displayName, email, password, confirmPassword } = formFields;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value})
    };

    const resetFormFields = () => {
        setFormFields(defaultFormValues);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (password !== confirmPassword ) {
            alert('Please enter matching passwords');
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocFromAuth(user, { displayName });
            resetFormFields();
        } catch (err) {
            if(err.code === 'auth/email-already-in-use') {
                alert('Email already in use');
            } else {
                console.log('Oh no, an error! ', err.message)
            } 
        } 
    };

    return(
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign Up With Your Email and Password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label="Display Name"
                    type="text" 
                    required 
                    onChange={handleChange} 
                    name="displayName" 
                    value={displayName}
                    />
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
                <FormInput 
                    label="Confirm Password"
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="confirmPassword" 
                    value={confirmPassword}
                    />
                <Button type='submit'>Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;