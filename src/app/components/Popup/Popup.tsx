import React, { forwardRef, PropsWithChildren } from 'react'
import { Button } from '../Button/Button'
import styles from './Popup.module.scss'

interface PopupProps extends PropsWithChildren {
  id: string
  onClick: () => void
  close: () => void
}

export const Popup = forwardRef<HTMLInputElement, PopupProps>(function Popup(
  { onClick, close },
  ref
) {
  return (
    <>
      <div ref={ref} className={styles.popup}>
        <div>
          {' '}
          <h3>Удаление билета</h3>
          <p>Вы уверены, что хотите удалить билет?</p>
        </div>

        <div className={styles.buttons}>
          <Button variant="yes" onClick={onClick} className={styles.margin}>
            Да
          </Button>
          <Button variant="no" onClick={close}>
            Нет
          </Button>
        </div>
        <Button
          variant="close"
          onClick={close}
          className={styles.button_close}
        />
      </div>
    </>
  )
})
