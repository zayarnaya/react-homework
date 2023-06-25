'use client'

import { FC, MouseEvent, PropsWithChildren, useState } from 'react';
import styles from './TicketCard.module.scss';
import Image from 'next/image';
import { Button } from '../Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { selectProductAmount } from '@/app/redux/features/cart/selector';
import { cartActions, totalActions } from '@/app/redux/features/cart';
import { genres } from '@/app/utils/consts';
import Link from 'next/link';

interface TicketCardProps extends PropsWithChildren {
    title: string;
    genre: string;
    id: string;
    posterUrl: string; // или сразу картинка
    amount?: number;
    cart?: boolean;
}

interface TicketCardCounter extends PropsWithChildren {
    id: string;
    cart?: boolean;
}



// export const Amount = ({...props}) => {
//     const amount = useSelector((state) => selectProductAmount(state, props.id));
//     return <span className={styles.ticket_card__amount}>{amount ? amount : 0}</span>;
// }

export const TicketCardCounter: FC<TicketCardCounter> = ({...countProps}) => {
    
    const { id, cart } = countProps;
    const dispatch = useDispatch();
    const amount = useSelector((state) => selectProductAmount(state, id));
    // const [amount, setAmount] = useState(0);
    const [isMinusDisabled, setIsMinusDisabled] = useState(true);
    const [isPlusDisabled, setIsPlusDisabled] = useState(false);
    if (amount === 30 && !isPlusDisabled) {
        setIsPlusDisabled(true);
    } else if (amount < 30 && isPlusDisabled) {
        setIsPlusDisabled(false);
    }
    if (amount === 0 && !isMinusDisabled) {
        setIsMinusDisabled(true);
    } else if (amount > 0 && isMinusDisabled) {
        setIsMinusDisabled(false);
    }
    return (
        <>
            <div className={styles.ticket_card__counter_form}>
                <Button variant='minus' disabled={isMinusDisabled} onClick={(e: MouseEvent) => {
                    e.preventDefault();
                    dispatch(cartActions.minus(id))
                    dispatch(totalActions.minus());
                } }></Button>
                <span className={styles.ticket_card__amount}>{amount ? amount : 0}</span>
                <Button variant='plus' disabled={isPlusDisabled} onClick={(e: MouseEvent) => {
                    e.preventDefault();
                    dispatch(cartActions.plus(id))
                    dispatch(totalActions.plus());
                } }></Button>
            </div>
            {!!cart && <Button variant='reset' type='reset' className={styles.ticket_card__counter_close} onClick={(e: MouseEvent) => {
                    e.preventDefault();
                    dispatch(cartActions.reset(id))
                } }></Button>}
        </>
    )
}

export const TicketCard: FC<TicketCardProps> = ({...props}) => {
    const {title, genre, posterUrl, amount, children, id, cart, ...rest} = props;
    const genreR = genres[genre];
    console.log(props);

    return (
        <div className={styles.ticket_card}>
            <div className={styles.ticket_card__info}>
                <Image 
                    loader={() => posterUrl}
                    src={posterUrl}
                    alt={title}
                    width='300'
                    height='450'
                    className={styles.ticket_card__poster}
                />
                <div className={styles.ticket_card__desc}>
                    <h2 className={styles.ticket_card__title}><Link href={'/film/' + id}>{title}</Link></h2>
                    <p className={styles.ticket_card__text}>{genreR}</p>
                </div>
            </div>
            <div className={styles.ticket_card__counter}>
                <TicketCardCounter id={id} cart={cart || false} /> 
            </div>
        </div>
    )
}
