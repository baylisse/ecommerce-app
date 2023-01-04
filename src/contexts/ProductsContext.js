import { createContext, useState, useEffect } from "react";
import PRODUCTS from '../shopData.json'

export const ProductsContext = createContext({
    currentProducts: [],
    setCurrentProducts: () => null
});

export const ProductsProvider = ({ children }) => {
    const [currentProducts, setCurrentProducts] = useState(PRODUCTS);
    const value = { currentProducts, setCurrentProducts };

    // useEffect(() => {
    //     const unsubscribe = onAuthStateChangedListener((user) => {
    //         if (user) {
    //             createUserDocFromAuth(user);
    //         };
    //         setCurrentUser(user);
    //     });
    //     return unsubscribe;
    // }, [])

    return <ProductsContext.Provider value={value} >{ children }</ProductsContext.Provider>
}