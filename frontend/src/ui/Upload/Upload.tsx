import React, { ChangeEvent, DragEvent, useRef, useState } from 'react';

import { Flex } from '../Flex';
import styles from './Upload.module.scss';

interface UploadProps {
  label?: string;
  placeholder?: string;
  previewUrl?: string;
  onFileSelect: (file: File) => void;
}

export const Upload: React.FC<UploadProps> = ({
  label,
  placeholder = 'Добавить фото',
  previewUrl,
  onFileSelect,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleZoneClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className={styles.uploadWrapper}>
      {label && <span className={styles.label}>{label}</span>}

      <div
        className={`${styles.dropzone} ${isDragOver ? styles.isDragOver : ''}`}
        onClick={handleZoneClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileChange}
        />

        {previewUrl ? (
          <img src={previewUrl} alt="Превью" className={styles.preview} />
        ) : (
          <Flex
            direction="column"
            justify="center"
            align="center"
            gap="12"
            className={styles.content}
          >
            {/* Наш новый геометрический плюс */}
            <div className={styles.plusIcon} />
            <span className={styles.placeholderText}>{placeholder}</span>
          </Flex>
        )}
      </div>
    </div>
  );
};
