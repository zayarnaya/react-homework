'use client'

import { FC, MouseEvent, PropsWithChildren, useRef, useState } from 'react'
import styles from './TicketCard.module.scss'
import Image from 'next/image'
import { Button } from '../Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { selectProductAmount } from '@/app/redux/features/cart/selector'
import {
  cartActions,
  cartItemsActions,
  totalActions,
} from '@/app/redux/features/cart'
import { genres } from '@/app/utils/consts'
import Link from 'next/link'
import { Popup } from '../Popup/Popup'
import { createPortal } from 'react-dom'
import { BackgroundBlur } from '../BackgroundBlur/BackgroundBlur'

interface TicketCardProps extends PropsWithChildren {
  title: string
  genre: string
  id: string
  posterUrl: string 
  amount?: number
  cart?: boolean
  remove?: () => void
}

interface TicketCardCounter extends PropsWithChildren {
  id: string
  title: string
  genre: string
  posterUrl: string
  cart?: boolean
}

export const CloseSign = ({ size }: { size?: number }) => {
  return (
    <svg
      width={size || 32}
      height={size || 32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M25.7074 24.2924C25.8004 24.3854 25.8741 24.4957 25.9243 24.6171C25.9746 24.7384 26.0005 24.8686 26.0005 24.9999C26.0005 25.1313 25.9746 25.2614 25.9243 25.3828C25.8741 25.5042 25.8004 25.6145 25.7074 25.7074C25.6145 25.8004 25.5042 25.8741 25.3828 25.9243C25.2614 25.9746 25.1313 26.0005 24.9999 26.0005C24.8686 26.0005 24.7384 25.9746 24.6171 25.9243C24.4957 25.8741 24.3854 25.8004 24.2924 25.7074L15.9999 17.4137L7.70745 25.7074C7.5198 25.8951 7.26531 26.0005 6.99995 26.0005C6.73458 26.0005 6.48009 25.8951 6.29245 25.7074C6.1048 25.5198 5.99939 25.2653 5.99939 24.9999C5.99939 24.7346 6.10481 24.4801 6.29245 24.2924L14.5862 15.9999L6.29245 7.70745C6.1048 7.5198 5.99939 7.26531 5.99939 6.99995C5.99939 6.73458 6.1048 6.48009 6.29245 6.29245C6.48009 6.1048 6.73458 5.99939 6.99995 5.99939C7.26531 5.99939 7.5198 6.1048 7.70745 6.29245L15.9999 14.5862L24.2924 6.29245C24.4801 6.10481 24.7346 5.99939 24.9999 5.99939C25.2653 5.99939 25.5198 6.1048 25.7074 6.29245C25.8951 6.48009 26.0005 6.73458 26.0005 6.99995C26.0005 7.26531 25.8951 7.5198 25.7074 7.70745L17.4137 15.9999L25.7074 24.2924Z"
        fill="#333333"
      />
    </svg>
  )
}

export const TicketCardCounter: FC<TicketCardCounter> = ({ ...countProps }) => {
  const { id, cart, title, genre, posterUrl } = countProps
  const dispatch = useDispatch()
  const amount = useSelector(state => selectProductAmount(state, id))
  const [isMinusDisabled, setIsMinusDisabled] = useState(true)
  const [isPlusDisabled, setIsPlusDisabled] = useState(false)
  if (amount === 30 && !isPlusDisabled) {
    setIsPlusDisabled(true)
  } else if (amount < 30 && isPlusDisabled) {
    setIsPlusDisabled(false)
  }
  if (amount === 0 && !isMinusDisabled) {
    setIsMinusDisabled(true)
  } else if (amount > 0 && isMinusDisabled) {
    setIsMinusDisabled(false)
  }

  const [isMemorized, setIsMemorized] = useState(false)

  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const popupElement = useRef(null)

  const close = () => {
    setIsPopupOpen(false)
  }

  const handleYesButton = () => {
    dispatch(totalActions.remove(amount))
    dispatch(cartActions.reset(id))
  }

  return (
    <>
      <div className={styles.ticket_card__counter_form}>
        <Button
          variant="minus"
          disabled={isMinusDisabled}
          onClick={(e: MouseEvent) => {
            e.preventDefault()
            if (amount === 1) {
              setIsPopupOpen(true)
            } else {
              dispatch(cartActions.minus(id))
              dispatch(totalActions.minus())
            }
          }}></Button>
        <span className={styles.ticket_card__amount}>
          {amount ? amount : 0}
        </span>
        <Button
          variant="plus"
          disabled={isPlusDisabled}
          onClick={(e: MouseEvent) => {
            e.preventDefault()
            dispatch(cartActions.plus(id))
            dispatch(totalActions.plus())
            if (!isMemorized) {
              dispatch(
                cartItemsActions.add({
                  id,
                  genre: genre,
                  title,
                  posterUrl,
                })
              )
              setIsMemorized(true)
            }
          }}></Button>
      </div>
      {!!cart && (
        <Button
          variant="reset"
          type="reset"
          className={styles.ticket_card__counter_close}
          onClick={(e: MouseEvent) => {
            e.preventDefault()
            setIsPopupOpen(true)
          }}></Button>
      )}
      {!!isPopupOpen &&
        createPortal(
          <>
            <BackgroundBlur onClick={close} />
            <Popup
              id={id}
              onClick={handleYesButton}
              close={close}
              ref={popupElement}
            />
          </>,
          document.body
        )}
    </>
  )
}

export const TicketCard: FC<TicketCardProps> = ({ ...props }) => {
  const { title, genre, posterUrl, amount, children, id, cart, ...rest } = props
  const genreR = genres[genre]

  return (
    <div className={styles.ticket_card}>
      <div className={styles.ticket_card__info}>
        <Image
          loader={() => posterUrl}
          src={posterUrl}
          alt={title}
          width="300"
          height="450"
          className={styles.ticket_card__poster}
        />
        <div className={styles.ticket_card__desc}>
          <h2 className={styles.ticket_card__title}>
            <Link href={'/film/' + id}>{title}</Link>
          </h2>
          <p className={styles.ticket_card__text}>{genreR || genre}</p>
        </div>
      </div>
      <div className={styles.ticket_card__counter}>
        <TicketCardCounter
          id={id}
          cart={cart || false}
          genre={genreR || genre}
          title={title}
          posterUrl={posterUrl}
        />
      </div>
    </div>
  )
}
