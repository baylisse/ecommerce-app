import { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

import CartIcon from "../../components/cart-icon/CartIcon";
import CartDropdown from "../../components/cart-dropdown/CartDropdown";

import { UserContext } from "../../contexts/UserContext";
import { CartContext } from "../../contexts/CartContext";
import './NavBar.styles.scss';

const NavBar = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);

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
                    {
                        currentUser ? (
                            <span className='nav-link' onClick={signOutUser}>LOGOUT</span>
                         ) : (
                            <Link className='nav-link' to='/auth'>
                                LOGIN
                            </Link>
                        )
                    }
                    <CartIcon />    
                </div>
                { isCartOpen && <CartDropdown />}
            </div>
            <Outlet />
        </>
    )
}

export default NavBar;