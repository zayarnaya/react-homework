'use client'

import classNames from "classnames";
import styles from "./Button.module.scss";
import { FC, PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren<{
    className?: string;
    onClick?: (e: React.MouseEvent) => void | Promise<void>;
    disabled?: boolean;
    backgroundOpacity?: boolean;
    type?: 'button' | 'reset' | 'submit';
    variant?: 'yes' | 'no' | 'plus' | 'minus' | 'reset' | 'close';
  }>;

export const Button: FC<ButtonProps> = ({...props}) => {
    const { className, variant, children, ...other } = props; 
    return (
        <button
            {...other}
            className={classNames('button', className, !!variant && styles[variant])}
        >
            {children}
        </button>

    )
}


