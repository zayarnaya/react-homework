'use client'

import { FocusEventHandler, ForwardedRef, MouseEventHandler, forwardRef, useEffect, useState } from "react"
import styles from './Select.module.scss'
import { createPortal } from "react-dom"
import { genres } from "@/app/utils/consts"
import { Input } from "../Input/Input"
import classNames from "classnames"

export interface SelectProps {
    isOpen: boolean
    query: string
    label: string
    placeholder: string
    makeQuery: MouseEventHandler
    makeEmptyQuery: MouseEventHandler
    toggleVisibility: MouseEventHandler
    turnOff: FocusEventHandler
    turnOn: FocusEventHandler
}

export const Select = forwardRef<HTMLInputElement, SelectProps>(function Select(props: SelectProps, ref: ForwardedRef<HTMLInputElement>) {
    const {
        turnOn,
        turnOff,
        toggleVisibility,
        isOpen,
        query,
        makeQuery,
        makeEmptyQuery,
        label,
        placeholder
      } = props
      const [coords, setCoords] = useState<number[]>([])
      useEffect(() => {
        if (ref != null && typeof ref !== 'function') {
          let rect = ref.current?.getBoundingClientRect()
          if (!!rect && !!coords)
          setCoords([rect.bottom, rect.left, rect.top, rect.right])
        }
      }, [ref])
  
      return (
        <>
          {isOpen &&
            !!coords &&
            createPortal(
              <div
                onBlur={turnOff}
                className={styles.portal_container}
                style={{
                  top: coords[2] - (coords[0] - coords[2]) - 12,
                  left: coords[1] - 24,
                }}>
                <Input
                  onButtonClick={toggleVisibility}
                  select={true}
                  ref={ref}
                  label={label}
                  placeholder={label === 'Жанр' ? genres[query] || placeholder : query || placeholder}
                  active={isOpen}
                />
                <div className={styles.select__flyout}>
                  <button
                    className={classNames(styles.select__item)}
                    onClick={makeEmptyQuery}>
                    Не выбран
                  </button>
                  {Object.keys(genres).map((g, index) => {
                    return (
                      <button
                        key={g + index}
                        id={g}
                        className={classNames(styles.select__item)}
                        onClick={makeQuery}>
                        {genres[g]}
                      </button>
                    )
                  })}
                </div>
              </div>,
              document.body
            )}
          {!isOpen && (
            <Input
              onButtonClick={toggleVisibility}
              onFocus={turnOn}
              select={true}
              ref={ref}
              label={'Жанр'}
              placeholder={label === 'Жанр' ? genres[query] || placeholder : query || placeholder}
              active={isOpen}
            />
          )}
          {(isOpen && label === 'Жанр') && <div className={styles.placeholder}></div>}
        </>
      )
})
