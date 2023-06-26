'use client'

import { FC, PropsWithChildren } from 'react'
import styles from './Films.module.scss'
import { TicketCard } from '../TicketCard/TicketCard'

export type film = {
  title: string
  posterUrl: string
  releaseYear: number
  description: string
  genre: string
  id: string
  rating: number
  director: string
  reviewIds: string[]
}

export interface FilmsProps extends PropsWithChildren {
  films: film[]
}

export const Films: FC<FilmsProps> = ({ ...props }) => {
  const { films } = props

  return (
    <ul className={styles.films__list}>
      {films.map(item => (
        <li className={styles.films__list_item} key={item.id}>
          <TicketCard {...item} />
        </li>
      ))}
    </ul>
  )
}
