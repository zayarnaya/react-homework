'use client'

import { FC, PropsWithChildren } from "react";
import styles from './Films.module.scss';
import Image from "next/image";
import { TicketCardCounter } from "@/app/components/TicketCard/TicketCard";
import classNames from "classnames";
import { useGetMovieQuery } from "@/app/redux/services/services";
import { Reviews } from "@/app/components/Reviews/Reviews";


interface FilmsProps extends PropsWithChildren {
    id: string;
}

const Films: FC<FilmsProps> = ({ ... props}) => {
    const id = props.id;
    const { data, isLoading, error } = useGetMovieQuery({id});
    console.log(typeof useGetMovieQuery);
    if (error) console.log(error);
    console.log('FILM', data);
    const metadata = {
        title: 'фильм',
        description: `Описание фильма`,
    }
    return (
        <>{!!data && 
            <div className={styles.films}>
            <Image 
                loader ={ () => data.posterUrl}
                src={data.posterUrl}
                alt={data.title}
                width='300'
                height='450'
                className={styles.films__poster}
            />
            <div className={styles.films__info}>
                <div className={styles.films__header}>
                    <h1 className={styles.films__title}></h1>
                    {/* <TicketCardCounter /> */}
                </div>
                <div className={styles.films__text}>
                    {!!data.genre && <p><strong>Жанр:</strong> {data.genre}</p>}
                    {!!data.releaseYear && <p><strong>Год выпуска:</strong> {data.releaseYear}</p>}
                    {!!data.rating &&<p><strong>Рейтинг:</strong> {data.rating}</p>}
                    {!!data.director && <p><strong>Режиссёр:</strong> {data.director}</p>}
                    {!!data.description && <div className={styles.films__desc}>
                        <p><strong className={classNames(styles.films__desc, styles.films__desc_header)}>Описание</strong></p>
                        <p>{data.description}</p>
                    </div>}

                </div>
            </div>
        </div>

        }
        {(!!data && !!data.reviewIds) && <Reviews id={id} />}
                


        </>
        
    )
}

const Film = () => {
    const url = new URL(window.location.href);
    const urlId = url.pathname.replace('/film/', '');
    return (
        <Films id={urlId} />
    )
}

export default Film;
