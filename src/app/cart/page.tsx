'use client'

import { useSelector } from 'react-redux'
import {
  selectCartItemsModule,
  selectCartModule,
  selectTotal,
} from '../redux/features/cart/selector'
import { TicketCard } from '../components/TicketCard/TicketCard'
import { Total } from '../components/Total/Total'
import Link from 'next/link'
import styles from './Cart.module.scss'
import Image from 'next/image'

const CartItems = () => {
  const items = useSelector(state => selectCartModule(state))
  const descs = useSelector(state => selectCartItemsModule(state))
  return (
    <ul className={styles.list}>
      {!!items &&
        Object.keys(items).map(
          item =>
            !!items[item] && (
              <li className={styles.list__item} key={item}>
                <TicketCard cart={true} {...descs[item]} id={item} />
              </li>
            )
        )}
    </ul>
  )
}

const Cart = () => {
  const total = useSelector(state => selectTotal(state))

  return !!total ? (
    <div className={styles.container}>
      <CartItems />
      <div className={styles.total__container}>
        <span>Итого билетов: </span>
        <span>
          <Total />
        </span>
      </div>
    </div>
  ) : (
    <>
      <span>
        Корзина пока пуста! <Link href="/">Продолжите покупки</Link>{' '}
      </span>
      <Image
        src={'/04.gif'}
        width={100}
        height={100}
        alt={'котик'}
        className={styles.catic}
      />
    </>
  )
}

export default Cart
