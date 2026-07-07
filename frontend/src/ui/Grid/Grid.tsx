import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import styles from './Grid.module.scss';

export type GridColumns =
  | '1'
  | '2'
  | '3'
  | '4'
  | 'adaptive150'
  | 'adaptive250'
  | 'adaptive300';
export type GridGap = '4' | '8' | '12' | '16' | '24' | '32';

/**
 * Пропсы для управления сеткой компонента Grid
 */
interface GridProps extends DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> {
  /**
   * Конфигурация колонок.
   * Можно указать фиксированное число ('1'-'4') или адаптивный шаблон:
   * - 'adaptive250': колонки будут не меньше 250px и автоматически перенесутся на новый ряд.
   */
  columns?: GridColumns;
  /** Фиксированный отступ между элементами сетки (шаг 4px) */
  gap?: GridGap;
  /** Если true, растягивает контейнер на 100% ширины родителя */
  max?: boolean;
  /** Дочерние элементы (карточки, блоки), которые выстроятся в сетку */
  children: React.ReactNode;
}

/**
 * Компонент `Grid` — универсальный UI-контейнер для построения сеток CSS Grid.
 * Идеально подходит для списков карточек, каталогов или плиточных интерфейсов.
 *
 * @example
 * ```tsx
 * // Адаптивная сетка карточек тренировок (минимальная ширина карточки 250px)
 * <Grid columns="adaptive250" gap="16" max>
 *   <WorkoutCard />
 *   <WorkoutCard />
 *   <WorkoutCard />
 * </Grid>
 * ```
 */
export const Grid: React.FC<GridProps> = (props) => {
  const {
    columns = '1',
    gap = '16',
    max,
    className,
    children,
    ...otherProps
  } = props;

  // Формируем имя класса, например: styles.colsAdaptive250 или styles.cols3
  const formattedColumns = columns.startsWith('adaptive')
    ? `colsAdaptive${columns.replace('adaptive', '')}`
    : `cols${columns}`;

  const gridClasses = [
    styles.grid,
    styles[formattedColumns],
    styles[`gap${gap}`],
    max && styles.max,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={gridClasses} {...otherProps}>
      {children}
    </div>
  );
};
