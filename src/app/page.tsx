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
import { Films, film } from './components/Films/Films'
import useDebounce from './utils/useDebounce'

export default function Home() {
  const [list, setList] = useState<film[]>()
  const [titleQuery, setTitleQuery] = useState('')
  const [debouncedTitleQuery, setDebouncedTitleQuery] = useState('')
  const [genreQuery, setGenreQuery] = useState('')
  const [cinemaQuery, setCinemaQuery] = useState('')
  const [debouncedCinemaId, setDebouncedCinemaId] = useState('')
  const [cinemaId, setCinemaId] = useState('')
  const [cinemaFilms, setCinemaFilms] = useState([])
  const [isOpenGenre, setIsOpenGenre] = useState(false)
  const [isOpenCinema, setIsOpenCinema] = useState(false)
  const { data, isLoading, error } = useGetMoviesQuery({})

  const titleRef = useRef<HTMLInputElement>(null)
  const genreRef = useRef<HTMLInputElement>(null)
  const cinemaRef = useRef<HTMLInputElement>(null)
  const debouncedQuery = useDebounce(titleQuery, 100)
  const debouncedQueryCinema = useDebounce(cinemaId, 300)
  const cinemaData = useGetCinemaQuery(debouncedCinemaId)

  useEffect(() => {
    setList(data)
  }, [data])
  useEffect(() => {
    if (cinemaData) setCinemaFilms(cinemaData.data)
  }, [cinemaData, cinemaQuery, cinemaId])
  useEffect(() => {
    setDebouncedTitleQuery(debouncedQuery)
  }, [debouncedQuery])
  useEffect(() => {
    setDebouncedCinemaId(debouncedQueryCinema)
  }, [debouncedQueryCinema])

  if (isLoading) {
    return (
      <main>
        <span>Подождем...</span>
      </main>
    )
  }

  let filtered: film[] = []
  if (!!list) {
    filtered = list?.slice()
    if (Boolean(cinemaQuery.length)) filtered = cinemaFilms
    if (Boolean(debouncedTitleQuery.length))
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
            setIsOpenGenre(!isOpenGenre)
          }}
          makeQuery={e => {
            setGenreQuery((e.target as Element).id)
            setIsOpenGenre(!isOpenGenre)
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
            setIsOpenCinema(!isOpenCinema)
          }}
          makeQuery={e => {
            setCinemaQuery((e.target as Element).textContent || '')
            setCinemaId((e.target as Element).id)
            setIsOpenCinema(!isOpenCinema)
          }}
          ref={cinemaRef}
          cinemaQuery={cinemaQuery}
        />
      </div>
      {!!data && <Films films={filtered} />}
    </>
  )
}
