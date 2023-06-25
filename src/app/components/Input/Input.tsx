'use client'

import classNames from "classnames";
import { FC, InputHTMLAttributes, forwardRef } from "react";
import styles from './Input.module.scss';
import './Input.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    placeholder?: string;
    value?: string;
    label?: string;
    select?: boolean;
    onButtonClick?: () => void;
    // ref?: any;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(props: InputProps, ref: any) {
  const {className, label, onButtonClick, select, ...rest} = props;
  // console.log(ref);
    return (
        <div className={styles.input}>
          {!!label && <p className={styles.input__title}>{label}</p>}
          <input

            {...rest}
            ref={ref}
            className={classNames('input__text', className, styles.input__text)}
            type="text"
          />
          {!!select && <button className={styles.input__select_button} onClick={onButtonClick}></button>}
      </div>
    )
})

// export const Input: FC<InputProps> = ({...props}) => {
//     const {className, label, ...rest} = props;
//     return (
//         <div className={styles.input}>
//           {!!label && <p className={styles.input__title}>{label}</p>}
//           <input
//             {...rest}
//             className={classNames('input__text', className, styles.input__text)}
//             type="text"
//           />
//       </div>
//     )

// }
