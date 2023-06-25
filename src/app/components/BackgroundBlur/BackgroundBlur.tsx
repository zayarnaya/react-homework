import React, { BaseSyntheticEvent, FC, PropsWithChildren } from 'react';

import styles from './BackgroundBlur.module.scss';

interface PopupProps extends PropsWithChildren {
  onClick: (event: BaseSyntheticEvent) => void;
}

export const BackgroundBlur: FC<PopupProps> = ({ onClick, children }) => {
  return (
    <div className={styles.background__blur} onClick={onClick}>
      {children}
    </div>
  );
};
