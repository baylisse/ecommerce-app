import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../button/Button.js';
import CartItem from '../cart-item/CartItem.js';
import { CartContext } from '../../contexts/CartContext.js';

import './CartDropdown.styles.scss';

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate('/checkout');
    }

    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                { cartItems.map((item, index) => <CartItem key={index} cartItem={item} />)}
            </div>
            <Button onClick={goToCheckoutHandler} >GO TO CHECKOUT</Button>
        </div>
    )
}

export default CartDropdown;