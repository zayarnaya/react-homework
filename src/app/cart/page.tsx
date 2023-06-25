'use client'

import { useSelector } from "react-redux";
import { selectCartModule, selectTotal } from "../redux/features/cart/selector";
import { TicketCard } from "../components/TicketCard/TicketCard";
import { Total } from "../components/Total/Total";

const CartItems = () => {
    const items = useSelector((state) => selectCartModule(state));
    console.log(items);
    return (
        <ul>
            {!!items && Object.keys(items).map(item => 
                <li key={item}>
                    Всего {items[item]}
                </li>)}
        </ul>
    )
}

const Cart = () => {

    return (
        <main>
            <CartItems />
            <div>
            <span>Итого билетов: </span><span><Total /></span>
        </div>
        </main>
        
    )
}

export default Cart;
