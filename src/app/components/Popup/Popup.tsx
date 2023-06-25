import React, { FC, forwardRef, PropsWithChildren, useState } from 'react';
import { Button } from '../Button/Button';
import classNames from 'classnames';
import styles from './Popup.module.scss';
import { createPortal } from 'react-dom';

interface PopupProps extends PropsWithChildren {
  id: string;
  // buttonText: string;
  onClick: () => void;
  close: () => void;
  // title: string;
  // buttonText: string;
  // onClick: () => void;
  // showValidation: boolean;
  // validationText: string;
  // className?: string;
}

export const Popup = forwardRef<HTMLInputElement, PopupProps>(function Popup(
  { id, onClick, close },
  ref,
) {
  return (

<><div ref={ref} className={styles.popup}>
        <div>        <h3>Удаление билета</h3>
        <p>Вы уверены, что хотите удалить билет?</p></div>

        <div className={styles.buttons}>
          <Button variant='yes' onClick={onClick} className={styles.margin}>Да</Button>
          <Button variant='no' onClick={close}>Нет</Button>
        </div>
        <Button variant='close' onClick={close} className={styles.button_close}/>
      </div></>
    // <div ref={ref} className={classNames('popup', className)}>
    //   <h3 className="popup__title">{title}</h3>
    //   {children}
    //   <Button onClick={onClick} className="popup__button">
    //     {buttonText}
    //   </Button>
    //   {showValidation && <p className="popup__validation-text"> {validationText} </p>}
    // </div>
  );
});

// export const Popup: FC<PopupProps> = ({ id, onClick,}) => {
//   const [isPopupOpen, setIsPopupOpen] = useState(true);
//   const close = () => {
//     setIsPopupOpen(false);
//   }
//   return (
//     isPopupOpen && createPortal(
//       <>      
//       <div className={styles.fog}></div>
//       <div className={styles.popup}>
//         <div>        <h3>Удаление билета</h3>
//         <p>Вы уверены, что хотите удалить билет?</p></div>

//         <div className={styles.buttons}>
//           <Button variant='yes' onClick={onClick}>Да</Button>
//           <Button variant='no' onClick={close}>Нет</Button>
//         </div>
//         <Button variant='close' onClick={close} className={styles.button_close}/>
//       </div>
//       </>,
//       document.body
//     )
//   )
// }
