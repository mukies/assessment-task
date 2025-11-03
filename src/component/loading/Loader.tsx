'use client';
import React from 'react';
import styles from './loading.module.css';

interface LoadingSpinnerProps {
  size?: number; 
  color?: string; 
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 40, color = '#0070f3' }) => {
  return (
    <div
      className={styles.spinner}
      style={{
        width: size,
        height: size,
        borderTopColor: color,
      }}
    />
  );
};

export default LoadingSpinner;
