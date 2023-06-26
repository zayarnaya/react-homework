'use client'

import classNames from 'classnames'
import { InputHTMLAttributes, MouseEvent, forwardRef } from 'react'
import styles from './Input.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  placeholder?: string
  value?: string
  label?: string
  select?: boolean
  onButtonClick?: (e: MouseEvent) => void
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  props: InputProps,
  ref: any
) {
  const { className, label, onButtonClick, select, ...rest } = props
  return (
    <div className={styles.input}>
      {!!label && <p className={styles.input__title}>{label}</p>}
      <input
        {...rest}
        ref={ref}
        className={classNames('input__text', className, styles.input__text)}
        type="text"
      />
      {!!select && (
        <button
          className={classNames(styles.input__select_button, 'turning')}
          onClick={onButtonClick}></button>
      )}
    </div>
  )
})
