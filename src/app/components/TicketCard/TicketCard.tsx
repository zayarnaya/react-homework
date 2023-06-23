import { FC, PropsWithChildren } from 'react';
import styles from './TicketCard.module.scss';
import Image from 'next/image';
import { Button } from '../Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { selectProductAmount } from '@/app/redux/features/cart/selector';
import { cartActions } from '@/app/redux/features/cart';

interface TicketCardProps extends PropsWithChildren {
    title: string;
    text: string;
    id: string;
    posterUrl: string; // или сразу картинка
    amount?: number;
}

interface TicketCardCounter extends PropsWithChildren {
    onClickMinus?: () => void;
    onClickPlus?: () => void;
    amount?: number;
    disabledMinus?: boolean;
    disabledPlus?: boolean;
    id: string;
}

interface AmountProps extends PropsWithChildren {
    id: string;
}


export const Amount = ({...props}) => {
    const amount = useSelector((state) => selectProductAmount(state, props.id));
    return <span className={styles.ticket_card__amount}>{amount ? amount : 0}</span>;
}

export const TicketCardCounter: FC<TicketCardCounter> = ({...countProps}) => {
    const { id, amount, onClickMinus, onClickPlus, disabledMinus, disabledPlus } = countProps;
    const dispatch = useDispatch();
    return (
        <>
            <div className={styles.ticket_card__counter_form}>
                <Button variant='minus' disabled={disabledMinus || true} onClick={() => dispatch(cartActions.minus(id))}></Button>
                <Amount id='123'/>
                <Button variant='plus' disabled={disabledPlus || false} onClick={onClickPlus}></Button>
            </div>
            {!!amount && <Button variant='reset' type='reset' className={styles.ticket_card__counter_close}></Button>}
        </>
    )
}

export const TicketCard: FC<TicketCardProps> = ({...props}) => {
    const {title, text, posterUrl, amount, children, id, ...rest} = props;

    return (
        <div className={styles.ticket_card}>
            <div className={styles.ticket_card__info}>
                <Image 
                    src={posterUrl}
                    alt={title}
                    className={styles.ticket_card__poster}
                />
                <div className={styles.ticket_card__desc}>
                    <title className={styles.ticket_card__title}>{title}</title>
                    <p className={styles.ticket_card__text}>{text}</p>
                </div>
            </div>
            <div className={styles.ticket_card__counter}>
                <TicketCardCounter amount={amount} /> 
            </div>
        </div>
    )
}
