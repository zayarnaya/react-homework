import { FC, PropsWithChildren } from "react";
import styles from './Question.module.scss';

interface QuestionProps extends PropsWithChildren {
    title: string;
    opened: boolean;
    className?: string;
}


export const Question: FC<QuestionProps> = ({ opened = false, ...props}) => {
    const { title, className, children, ...rest } = props;
    return (
        <div className={styles.question}>
            <title className={styles.question__title}>{title}</title>
            {!!opened && <div className={styles.answer}>{children}</div>}
        </div>
    )
}
