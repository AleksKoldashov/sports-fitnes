import React from 'react';
import styles from './MainLayout.module.scss';

interface MainLayoutProps {
  /** Виджет левого навигационного меню (ширина 260px) */
  sidebarLeft: React.ReactNode;
  /** Виджет правой ленты новостей (ширина 320px) */
  sidebarRight: React.ReactNode;
  /** Виджет верхней панели (поиск, уведомления, быстрые действия) */
  header: React.ReactNode;
  /** Виджет нижнего подвала (копирайты, технические ссылки) */
  footer: React.ReactNode;
  /** Основное содержимое конкретной страницы (таблицы, карточки, графики) */
  content: React.ReactNode;

  hiddenRigthContent?: boolean;
}

/**
 * Компонент `MainLayout` — системный каркас интерфейса приложения.
 * Выстраивает Header, Footer, левый и правый Sidebar вокруг центральной контентной зоны.
 */
export const MainLayout: React.FC<MainLayoutProps> = ({
  sidebarLeft,
  sidebarRight,
  header,
  footer,
  content,
  hiddenRigthContent,
}) => {
  return (
    <div className={styles.layoutContainer}>
      {/* Верхний фиксированный хедер */}
      <div className={styles.headerWrapper}>{header}</div>

      {/* Центральный динамический контент страницы */}
      <main
        className={`${styles.mainContent} ${!hiddenRigthContent && styles.notRight}`}
      >
        <>
          {/* Левый фиксированный сайдбар */}
          {sidebarLeft}
          {content}
          {/* Правый фиксированный сайдбар новостей */}
          {sidebarRight}
        </>
      </main>

      {/* Нижний футер */}
      <div className={styles.footerWrapper}>{footer}</div>
    </div>
  );
};
