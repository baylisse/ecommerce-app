import { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { UserContext } from "../../contexts/UserContext";
import './NavBar.styles.scss';

const NavBar = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext);

    const signOutHandler = async () => {
        await signOutUser();
        setCurrentUser(null);
    };

    return (
        <>
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                    <CrwnLogo className='logo' />
                </Link>
                <div className='nav-links-container'>
                    <Link className='nav-link' to='/shop'>
                        SHOP
                    </Link>
                    {console.log(currentUser)}
                    {
                        currentUser ? (
                            <span className='nav-link' onClick={signOutHandler}>LOGOUT</span>
                         ) : (
                            <Link className='nav-link' to='/login'>
                                LOGIN
                            </Link>
                        )
                    }    
                </div>
            </div>
            <Outlet />
        </>
    )
}

export default NavBar;