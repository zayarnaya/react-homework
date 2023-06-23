import classNames from "classnames";
import { FC, InputHTMLAttributes } from "react";
import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    placeholder?: string;
    value?: string;
    label?: string;
}

export const Input: FC<InputProps> = ({...props}) => {
    const {className, label, ...rest} = props;
    return (
        <div className={styles.input}>
          {!!label && <p className={styles.input__title}>{label}</p>}
          <input
            {...rest}
            className={classNames('input__text', className, styles.input__text)}
            type="text"
          />
      </div>
    )

}
