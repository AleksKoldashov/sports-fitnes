import React, { useState } from 'react';
import styles from './Avatar.module.scss';

interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  initials = 'U',
}) => {
  const [isError, setIsError] = useState(false);

  return (
    <div className={styles.avatar}>
      {src && !isError ? (
        <img
          src={src}
          alt={alt}
          className={styles.img}
          onError={() => setIsError(true)}
        />
      ) : (
        <span>{initials.slice(0, 2).toUpperCase()}</span>
      )}
    </div>
  );
};
