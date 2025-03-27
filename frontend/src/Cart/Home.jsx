import {useDispatch} from 'react-redux';
import {addToCart} from '../../features/cartSlice';
import {useHistory} from "react-router"

const Product = ({product}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleAddToCart = () => {
        dispatch(addToCart(product));
        history.push("/cart");
    }

    return (
        <div className="product">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
    )
}