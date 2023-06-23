import classNames from "classnames";
import { FC, InputHTMLAttributes, PropsWithChildren } from "react";
import styles from './Select.module.scss';
import { createPortal } from "react-dom";

interface SelectProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    placeholder?: string;
    value?: string;
    label?: string;
}

interface SelectFieldProps extends PropsWithChildren {
    className?: string;
}

export const SelectField: FC<SelectFieldProps> = ({...selectProps}) => {
    const {className, children, ...rest} = selectProps;
    return (
        <div className={classNames(styles.select_flyout, className)}>
            {children}
        </div>
    )
}
export const Select: FC<SelectProps> = ({...props}) => {
    const {className, label, ...rest} = props;
    return (
        <>
        
                <div className={styles.input}>
          {!!label && <p className={styles.input__title}>{label}</p>}
          <input
            {...rest}
            className={classNames('input__text', className, styles.input__text)}
            type="text"
          />
          <button type="button" className={classNames(styles.select__button)}></button>
      </div>
      {createPortal(
        <SelectField>
            ылвопр
            выподрывп
            ывпдор
        </SelectField>,
        document.body
      )}
        </>

    )

}

