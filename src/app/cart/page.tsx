'use client'

import { useSelector } from "react-redux";
import { selectCartItemsModule, selectCartModule, selectTotal } from "../redux/features/cart/selector";
import { TicketCard } from "../components/TicketCard/TicketCard";
import { Total } from "../components/Total/Total";
import { useState } from "react";
import Link from "next/link";
import styles from './Cart.module.scss';

const CartItems = () => {
    const items = useSelector((state) => selectCartModule(state));
    const descs = useSelector((state) => selectCartItemsModule(state));
    console.log(items);
    console.log(descs);
    return (
        <ul className={styles.list}>
            {!!items && Object.keys(items).map(item => 
                !!items[item] && <li className={styles.list__item} key={item}>
                    <TicketCard cart={true} {...descs[item]} id={item} />
                </li>)}
        </ul>
    )
}

const Cart = () => {
    const total = useSelector((state) => selectTotal(state));

    return (
        !!total ? <div className={styles.container}><CartItems />
        <div className={styles.total__container}>
        <span>Итого билетов: </span><span><Total /></span>
    </div></div> : <span>Корзина пока пуста! <Link href='/'>Продолжите покупки</Link> </span>
            

        
    )
}

export default Cart;
