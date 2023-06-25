'use client'

import { FC, PropsWithChildren, useEffect } from 'react';
import styles from './Films.module.scss';
import { TicketCard } from '../TicketCard/TicketCard';
import { useSelector } from 'react-redux';
import { selectAllFilters, selectOneFilter } from '@/app/redux/features/filters/selector';
import { filter } from '../Filters/Filters';

export type film = {
    title: string,
    posterUrl: string,
    releaseYear: number,
    description: string,
    genre: string,
    id: string,
    rating: number,
    director: string,
    reviewIds: string[],
}

export interface FilmsProps extends PropsWithChildren {films: film[]};

export const Films: FC<FilmsProps> = ({...props}) => {
    const {films} = props;




    return (
        <ul className='films__list'>
          {films.map(item => (
            <li className='films__list_item' key={item.id}><TicketCard {...item} /></li>
          ))}
        </ul>
    )

}
