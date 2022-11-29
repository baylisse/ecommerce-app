import { useState } from 'react';
import SignUpForm from "../../components/sign-up/SignUpForm";
import SignInForm from "../../components/sign-in/SignInForm";
import './Authentication.styles.scss'

const defaultFormValues = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const Authentication = () => {
    const [formFields, setFormFields] = useState(defaultFormValues);
    const { displayName, email, password, confirmPassword } = formFields;

    

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value})
    };

    const resetFormFields = () => {
        setFormFields(defaultFormValues);
    };

    return(
        <div className='authentication-container'>
            <SignInForm 
                handleChange={handleChange}
                resetFormFields={resetFormFields} 
                email={email} 
                password={password} 
                />
            <SignUpForm 
                handleChange={handleChange} 
                resetFormFields={resetFormFields}
                email={email}
                displayName={displayName}
                password={password}
                confirmPassword={confirmPassword} 
                />
        </div>
    )
}

export default Authentication;