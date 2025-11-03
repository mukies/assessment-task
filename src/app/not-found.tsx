import React from 'react';
import Link from 'next/link';
import styles from './notFound.module.css';

const NotFound: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>404</h1>
      <p className={styles.message}>Oops! The page you are looking for does not exist.</p>
      <Link href="/" className={styles.button}>
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
