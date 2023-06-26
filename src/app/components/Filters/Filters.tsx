'use client'

import styles from './Filters.module.scss'
import { Input } from '../Input/Input'
import {
  ChangeEvent,
  FocusEventHandler,
  ForwardedRef,
  MouseEventHandler,
  Ref,
  forwardRef,
  useEffect,
  useState,
} from 'react'
import { film } from '../Films/Films'
import classNames from 'classnames'
import { genres } from '@/app/utils/consts'
import { createPortal } from 'react-dom'

export const filter = (
  data: film[],
  filter: 'title' | 'genre',
  query: string
): film[] => {
  if (!query) return data
  const res: film[] = []
  data.forEach((dataItem: film) => {
    if (dataItem[filter].toLowerCase().includes(query.toLowerCase()))
      res.push(dataItem)
  })
  return res
}

export const filterByCinema = (data: film[], query: string[]): film[] => {
  const res: film[] = []
  data.forEach((dataItem: film) => {
    if (query.includes(dataItem.id)) res.push(dataItem)
  })
  return res || data
}

export interface NameFilterProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const NameFilter = forwardRef<HTMLInputElement, NameFilterProps>(
  function NameFilter(props: NameFilterProps, ref: Ref<HTMLInputElement>) {
    return (
      <Input
        ref={ref}
        label={'Название'}
        placeholder={'Введите название'}
        onChange={props.onChange}
      />
    )
  }
)

export interface GenreFilterProps {
  isOpenGenre: boolean
  genreQuery: string
  // genreCoords: number[]
  makeQuery: MouseEventHandler
  makeEmptyQuery: MouseEventHandler
  toggleVisibility: MouseEventHandler
  turnOff: FocusEventHandler
  turnOn: FocusEventHandler
}

export const GenreFilter = forwardRef<HTMLInputElement, GenreFilterProps>(
  function GenreFilter(
    props: GenreFilterProps,
    ref: ForwardedRef<HTMLInputElement>
  ) {
    const {
      turnOn,
      turnOff,
      toggleVisibility,
      isOpenGenre,
      genreQuery,
      makeQuery,
      makeEmptyQuery,
    } = props
    const [genreCoords, setGenreCoords] = useState<number[]>([])
    useEffect(() => {
      if (ref != null && typeof ref !== 'function') {
        let rect = ref.current?.getBoundingClientRect()
        if (!!rect && !!genreCoords)
          setGenreCoords([rect.bottom, rect.left, rect.top, rect.right])
      }
    }, [ref])

    return (
      <>
        {isOpenGenre &&
          !!genreCoords &&
          createPortal(
            <div
              onBlur={turnOff}
              className={styles.portal_container}
              style={{
                top: genreCoords[2] - (genreCoords[0] - genreCoords[2]) - 12,
                left: genreCoords[1] - 24,
              }}>
              <Input
                onButtonClick={toggleVisibility}
                select={true}
                ref={ref}
                label={'Жанр'}
                placeholder={genreQuery ? genres[genreQuery] : 'Выберите жанр'}
              />
              <div className={styles.select__flyout}>
                <button
                  className={classNames(styles.select__item, 'not-active')}
                  onClick={makeEmptyQuery}>
                  Не выбран
                </button>
                {Object.keys(genres).map((g, index) => {
                  return (
                    <button
                      key={g + index}
                      id={g}
                      className={classNames(styles.select__item, 'not-active')}
                      onClick={makeQuery}>
                      {genres[g]}
                    </button>
                  )
                })}
              </div>
            </div>,
            document.body
          )}
        {!isOpenGenre && (
          <Input
            onButtonClick={toggleVisibility}
            onFocus={turnOn}
            select={true}
            ref={ref}
            label={'Жанр'}
            placeholder={genreQuery ? genres[genreQuery] : 'Выберите жанр'}
          />
        )}
      </>
    )
  }
)

export interface CinemaFilterProps {
  isOpenCinema: boolean
  cinemaQuery: string
  makeQuery: MouseEventHandler
  makeEmptyQuery: MouseEventHandler
  toggleVisibility: MouseEventHandler
  turnOff: FocusEventHandler
  turnOn: FocusEventHandler
}

export const CinemaFilter = forwardRef<HTMLInputElement, CinemaFilterProps>(
  function GenreFilter(
    props: CinemaFilterProps,
    ref: ForwardedRef<HTMLInputElement>
  ) {
    const {
      turnOn,
      turnOff,
      toggleVisibility,
      isOpenCinema,
      cinemaQuery,
      makeQuery,
      makeEmptyQuery,
    } = props
    const [cinemaCoords, setCinemaCoords] = useState<number[]>([])
    const cinemas = [
      {
        id: 'CTfrB5PGEJHBwxCNlU4uo',
        name: 'Синема сад',
      },
      {
        id: '2a2976KdjBek0e2ZR_07V',
        name: '4 с половиной звезды',
      },
      {
        id: '4gJr8UOYvT7UuprciZ4iL',
        name: 'Дружба',
      },
    ]
    useEffect(() => {
      if (ref != null && typeof ref !== 'function') {
        let rect = ref.current?.getBoundingClientRect()
        if (!!rect && !!cinemaCoords)
          setCinemaCoords([rect.bottom, rect.left, rect.top, rect.right])
      }
    }, [ref])

    return (
      <>
        {isOpenCinema &&
          !!cinemaCoords &&
          createPortal(
            <div
              onBlur={turnOff}
              className={styles.portal_container}
              style={{
                top: cinemaCoords[2] - (cinemaCoords[0] - cinemaCoords[2]) - 12,
                left: cinemaCoords[1] - 24,
              }}>
              <Input
                onButtonClick={toggleVisibility}
                select={true}
                ref={ref}
                label={'Кинотеатр'}
                placeholder={cinemaQuery || 'Выберите кинотеатр'}
              />
              <div className={styles.select__flyout}>
                <button
                  className={styles.select__item}
                  onClick={makeEmptyQuery}>
                  Не выбран
                </button>
                {cinemas.map(cinema => {
                  return (
                    <button
                      key={cinema.id}
                      id={cinema.id}
                      className={styles.select__item}
                      onClick={makeQuery}>
                      {cinema.name}
                    </button>
                  )
                })}
              </div>
            </div>,
            document.body
          )}
        {!isOpenCinema && (
          <Input
            onFocus={turnOn}
            onButtonClick={toggleVisibility}
            select={true}
            ref={ref}
            label={'Кинотеатр'}
            placeholder={cinemaQuery || 'Выберите кинотеатр'}
          />
        )}
      </>
    )
  }
)
