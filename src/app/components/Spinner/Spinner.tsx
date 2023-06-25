import React from 'react';

import styles from './Spinner.module.scss';

export const Spinner = () => {
  return (
    <div className={styles.spinner}>
      <span className={styles.spinner__dot}>
        <i className={styles.spinner__item} />
        <i className={styles.spinner__item} />
        <i className={styles.spinner__item} />
        <i className={styles.spinner__item} />
      </span>
    </div>
  );
};
