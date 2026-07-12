import { useEffect, useState } from 'react';
import styles from './NotificationBell.module.scss';

export const NotificationBell = ({ count = 0 }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const displayCount = count > 9 ? '9+' : count;

  // Запускаем анимацию каждый раз, когда count увеличивается
  useEffect(() => {
    if (count > 0) {
      setIsAnimating(true);
    }
  }, [count]);

  // Когда анимация завершается, убираем класс, чтобы можно было запустить её снова
  const handleAnimationEnd = () => {
    setIsAnimating(false);
  };

  return (
    <div
      className={`${styles.bellWrapper} ${isAnimating ? styles.shake : ''}`}
      onAnimationEnd={handleAnimationEnd} // React-событие окончания CSS-анимации
    >
      <svg xmlns="http://w3.org" viewBox="0 0 24 24" className={styles.bellSvg}>
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE07D" />
            <stop offset="50%" stopColor="#F5B041" />
            <stop offset="100%" stopColor="#C0392B" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        <path
          fill="url(#goldGradient)"
          className={styles.bellPath}
          d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1-1.5-1s-1.5.17-1.5 1v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"
        />
      </svg>

      {count > 0 && <div className={styles.badge}>{displayCount}</div>}
    </div>
  );
};
