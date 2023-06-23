import { FC, PropsWithChildren } from "react";
import styles from './Films.module.scss';
import Image from "next/image";
import { TicketCardCounter } from "@/app/components/TicketCard/TicketCard";
import classNames from "classnames";
import { Review } from "@/app/components/Review/Review";


interface FilmsProps extends PropsWithChildren {
    id: number;
}

const Films: FC<FilmsProps> = ({ ... props}) => {

    
    const { id } = props;
    // const data = await fetch() // api надо сделать
    const metadata = {
        title: ,
        description: `Описание фильма "${}"`,
    }
    return (
        <>
            <div className={styles.films}>
                <Image 
                    src={}
                    alt=""
                    className={styles.films__poster}
                />
                <div className={styles.films__info}>
                    <div className={styles.films__header}>
                        <h1 className={styles.films__title}></h1>
                        <TicketCardCounter />
                    </div>
                    <div className={styles.films__text}>
                        {!!genre && <p><strong>Жанр:</strong> {}</p>}
                        {!!year && <p><strong>Год выпуска:</strong> {}</p>}
                        {!!rating &&<p><strong>Рейтинг:</strong> {}</p>}
                        {!!director && <p><strong>Режиссёр:</strong> {}</p>}
                        {!!description && <div className={styles.films__desc}>
                            <p><strong className={classNames(styles.films__desc, styles.films__desc_header)}>Описание</strong></p>
                            <p>{}</p>
                        </div>}

                    </div>
                </div>
            </div>
            {!!reviews && reviews.map(review => {
                return (
                    <div key={review.id}>
                        <Review {...data} />
                    </div>
                )
            })}
        </>
        
    )
}


export default Films;
