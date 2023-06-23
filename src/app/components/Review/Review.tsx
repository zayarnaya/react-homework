import { FC, PropsWithChildren } from "react";
import styles from './Review.module.scss'
import Image from "next/image";

interface ReviewProps extends PropsWithChildren {
    title: string;
    text: string;
    image: string;
    rating: number;
}

export const Review: FC<ReviewProps> = ({...props}) => {
    const {title, text, image, rating} = props;
    return (
        <div className={styles.review}>
            <Image 
                src={image}
                className={styles.review__image}
                alt={title}
            />
            <div className={styles.review__content}>
                <div className={styles.review__header}>
                    <title className={styles.review__title}>{title}</title>
                    <div className={styles.review__rating}>Оценка: <strong>{rating}</strong></div>
                </div>
                <div className={styles.review_text}>{text}</div>
            </div>
        </div>
    )
}
