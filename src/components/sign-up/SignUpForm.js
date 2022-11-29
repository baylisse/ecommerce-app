import { useState } from 'react';
import { 
    createAuthUserWithEmailAndPassword,
    createUserDocFromAuth
} from '../../utils/firebase/firebase.utils';

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
        <div>
            <h1>Sign Up With Your Email and Password</h1>
            <form onSubmit={handleSubmit}>
                <label>Display Name</label>
                <input 
                    type="text" 
                    required 
                    onChange={handleChange} 
                    name="displayName" 
                    value={displayName} 
                    />
                <label>Email</label>
                <input 
                    type="email" 
                    required 
                    onChange={handleChange} 
                    name="email" 
                    value={email} 
                    />
                <label>Password</label>
                <input 
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="password" 
                    value={password} 
                    />
                <label>Confirm Password</label>
                <input 
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="confirmPassword" 
                    value={confirmPassword} 
                    />
                <button type="submit" >Sign Up</button>
            </form>
        </div>
    )
}

export default SignUpForm;