import { useContext } from "react";
import ProductCard from "../../components/product-card/ProductCard";
import { ProductsContext } from "../../contexts/ProductsContext";
import './Shop.styles.scss'

const Shop = () => {
    const { currentProducts } = useContext(ProductsContext);

    return (
        <div className='products-container'>
            {currentProducts.map((product, index) => {
                return <ProductCard key={index} product={product} />;
            })}
        </div>
    )
}

export default Shop;