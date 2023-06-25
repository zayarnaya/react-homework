'use client'

import { useGetCinemaQuery } from '@/app/redux/services/services';
import styles from './Filters.module.scss';
import { Input } from '../Input/Input';
import { FilmsProps, film } from '../Films/Films';
import { PropsWithChildren, PropsWithRef, forwardRef, use } from 'react';
import { useDispatch } from 'react-redux';
import { filterSliceActions } from '@/app/redux/features/filters';

export const filter = (data: film[], filter: 'title' | 'genre', query: string): film[] => {
    if (!query) return data;
    const res: film[] = [];
        data.forEach((dataItem: film) => {
        if (dataItem[filter].toLowerCase().includes(query.toLowerCase())) res.push(dataItem);
    })
    console.log(res);
    return res;    
}

export const filterByCinema = (data: film[], query: string[]): film[] => {
    const res: film[] = [];
    data.forEach((dataItem: film) => {
        if (query.includes(dataItem.id)) res.push(dataItem);
    })
    return res || data;    
}


export const NameFilter = forwardRef(function NameFilter({props}, ref) {
    const dispatch = useDispatch();
console.log('REFконечная', ref);
    
    return (
        <>
        {/* <h3>Название</h3> */}
        <Input ref={ref} label={'Название'} placeholder={'Введите название'} onChange={(e) => { setTimeout(() => {
            dispatch(filterSliceActions.change({filter: 'title', value: e.target.value}))}, 300)}}/>
        </>
    )
}) 

export const GenreFilter = () => {
    const dispatch = useDispatch();
    return (
        <>
        {/* <h3>Жанр</h3> */}
        <Input label={'Жанр'} placeholder={'Выберите жанр'}/>
        </>
    )
}

export const CinemaFilter = () => {
    const dispatch = useDispatch();
    const cinemas = [
        {
          id: "CTfrB5PGEJHBwxCNlU4uo",
          name: "Синема сад",
        },
        {
          id: "2a2976KdjBek0e2ZR_07V",
          name: "4 с половиной звезды",
        },
        {
          id: "4gJr8UOYvT7UuprciZ4iL",
          name: "Дружба",
        },
      ];
    return (
        <>
        {/* <h3>Кинотеатр</h3> */}
        <Input label={'Кинотеатр'} placeholder={'Выберите кинотеатр'}/>
        </>
    )
}

export interface FiltersProps {
    // data: Record<string, any>[];
    ref: any

}

export const Filters = forwardRef<HTMLInputElement, FiltersProps>(function Filters ({...props}, ref) {
    console.log("КУА привехалп",ref)
    return (
        <div className={styles.filters}>
            <NameFilter ref={ref}/>
            <GenreFilter></GenreFilter>
            <CinemaFilter></CinemaFilter>
        </div>

    )
})
