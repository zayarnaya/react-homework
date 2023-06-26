'use client'

import styles from '../app/components/Filters/Filters.module.scss'
import { useGetCinemaQuery, useGetMoviesQuery } from './redux/services/services'

import { useEffect, useRef, useState } from 'react'
import {
  CinemaFilter,
  GenreFilter,
  NameFilter,
  filter,
} from './components/Filters/Filters'
import { useDispatch } from 'react-redux'
import { Films, film } from './components/Films/Films'

export default function Home() {
  const [list, setList] = useState<film[]>()
  const [titleQuery, setTitleQuery] = useState('')
  const [genreQuery, setGenreQuery] = useState('')
  const [cinemaQuery, setCinemaQuery] = useState('')
  const [cinemaId, setCinemaId] = useState('')
  const [cinemaFilms, setCinemaFilms] = useState([])
  const [genreCoords, setGenreCoords] = useState<number[]>([])
  const [isOpenGenre, setIsOpenGenre] = useState(false)
  const [isOpenCinema, setIsOpenCinema] = useState(false)
  const { data, isLoading, error } = useGetMoviesQuery({})
  const cinemaData = useGetCinemaQuery(cinemaId)
  const titleRef = useRef<HTMLInputElement>(null)
  const genreRef = useRef<HTMLInputElement>(null)
  const cinemaRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()

  useEffect(() => {
    setList(data)
  }, [data])
  useEffect(() => {
    if (cinemaData) setCinemaFilms(cinemaData.data)
  }, [cinemaData, cinemaQuery, cinemaId])
  if (isLoading) {
    return (
      <main>
        <span>
          Подождем...
        </span>
      </main>
    )
  }

  let filtered: film[] = []
  if (!!list) {
    filtered = list?.slice()
    if (Boolean(cinemaQuery.length)) filtered = cinemaFilms
    if (Boolean(titleQuery.length))
      filtered = filter(filtered, 'title', titleQuery)
    if (Boolean(genreQuery.length))
      filtered = filter(filtered, 'genre', genreQuery)
  }

  return (
    <>
      <div className={styles.filters}>
        <NameFilter
          onChange={e => {
            setTitleQuery(e.target.value)
          }}
          ref={titleRef}
        />
        <GenreFilter
          isOpenGenre={isOpenGenre}
          turnOff={() => setIsOpenGenre(false)}
          turnOn={() => setIsOpenGenre(true)}
          toggleVisibility={e => {
            setIsOpenGenre(!isOpenGenre)
          }}
          makeEmptyQuery={e => {
            setGenreQuery('')
          }}
          makeQuery={e => {
            setGenreQuery((e.target as Element).id)
          }}
          ref={genreRef}
          genreQuery={genreQuery}
        />
        <CinemaFilter
          isOpenCinema={isOpenCinema}
          turnOff={() => setIsOpenCinema(false)}
          turnOn={() => setIsOpenCinema(true)}
          toggleVisibility={e => {
            setIsOpenCinema(!isOpenCinema)
          }}
          makeEmptyQuery={() => {
            setCinemaQuery('')
            setCinemaId('')
          }}
          makeQuery={e => {
            setCinemaQuery((e.target as Element).textContent || '')
            setCinemaId((e.target as Element).id)
          }}
          ref={cinemaRef}
          cinemaQuery={cinemaQuery}
        />
      </div>
      {!!data && <Films films={filtered} />}
    </>
  )
}
