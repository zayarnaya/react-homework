'use client'

import { FC, PropsWithChildren } from "react";
import styles from './Reviews.module.scss'
import Image from "next/image";
import { useGetSingleFilmReviewsQuery } from "@/app/redux/services/services";


interface ReviewProps extends PropsWithChildren {
    id: string;
    name: string;
    rating: number;
    text: string;
}

interface ReviewsProps extends PropsWithChildren {
    id: string;
}

const DefaultImage = () => {
    return (
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="100" height="100" rx="8" fill="#E0E0E0"/>
<path d="M61 39H39C38.4696 39 37.9609 39.2107 37.5858 39.5858C37.2107 39.9609 37 40.4696 37 41V59C37 59.5304 37.2107 60.0391 37.5858 60.4142C37.9609 60.7893 38.4696 61 39 61H61C61.5304 61 62.0391 60.7893 62.4142 60.4142C62.7893 60.0391 63 59.5304 63 59V41C63 40.4696 62.7893 39.9609 62.4142 39.5858C62.0391 39.2107 61.5304 39 61 39ZM61 41V53.8438L57.7412 50.5863C57.5555 50.4005 57.335 50.2531 57.0923 50.1526C56.8497 50.052 56.5896 50.0003 56.3269 50.0003C56.0642 50.0003 55.8041 50.052 55.5614 50.1526C55.3187 50.2531 55.0982 50.4005 54.9125 50.5863L52.4125 53.0863L46.9125 47.5863C46.5375 47.2115 46.029 47.0009 45.4987 47.0009C44.9685 47.0009 44.46 47.2115 44.085 47.5863L39 52.6712V41H61ZM39 55.5L45.5 49L55.5 59H39V55.5ZM61 59H58.3288L53.8288 54.5L56.3288 52L61 56.6725V59ZM52 46.5C52 46.2033 52.088 45.9133 52.2528 45.6666C52.4176 45.42 52.6519 45.2277 52.926 45.1142C53.2001 45.0006 53.5017 44.9709 53.7926 45.0288C54.0836 45.0867 54.3509 45.2296 54.5607 45.4393C54.7704 45.6491 54.9133 45.9164 54.9712 46.2074C55.0291 46.4983 54.9993 46.7999 54.8858 47.074C54.7723 47.3481 54.58 47.5824 54.3334 47.7472C54.0867 47.912 53.7967 48 53.5 48C53.1022 48 52.7206 47.842 52.4393 47.5607C52.158 47.2794 52 46.8978 52 46.5Z" fill="#828282"/>
</svg>

    )
}

const Review: FC<ReviewProps> = ({...props}) => {
    const { name, rating, text  } = props;
    const src = '../../../../public/review.png';
    return (
        <div className={styles.review}>
<DefaultImage />
                    <div className={styles.review__content}>
                        <div className={styles.review__header}>
                            <h3 className={styles.review__title}>{name}</h3>
                            <div className={styles.review__rating}>Оценка: <strong>{rating}</strong></div>
                        </div>
                        <div className={styles.review_text}>{text}</div>
                    </div>

        </div>
    )
}

export const Reviews = ({...props}) => {
    const { id } = props;
    const { data, isLoading, error } = useGetSingleFilmReviewsQuery(id);
    return (
        <ul className={styles.reviews__list}>{!!data && data.map((review: ReviewProps) => 
        <li key={review.id} className={styles.reviews__list_item}><Review {...review}/></li>)}</ul>
        
    )

}
