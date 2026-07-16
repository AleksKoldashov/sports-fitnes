import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import styles from './Flex.module.scss';

// Типизируем возможные значения пропсов
export type FlexDirection = 'row' | 'column';
export type FlexJustify = 'start' | 'center' | 'end' | 'between';
export type FlexAlign = 'start' | 'center' | 'end';
export type FlexGap = '4' | '8' | '12' | '16' | '24' | '32';
export type FlexPadding = '10x5';

// Наследуем стандартные атрибуты обычного div (чтобы работали onClick, id и т.д.)
interface FlexProps extends DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> {
  direction?: FlexDirection;
  justify?: FlexJustify;
  align?: FlexAlign;
  gap?: FlexGap;
  max?: boolean; // Растянуть ли блок на 100% ширины
  padding?: FlexPadding;
  children: React.ReactNode;
}

/**
 * Компонент `Flex` — универсальный UI-контейнер для построения флексбокс-сеток.
 * Помогает быстро верстать строки и колонки без написания лишнего CSS.
 *
 * @example
 * ```tsx
 * <Flex direction="row" justify="between" gap="16" max>
 *   <div>Элемент 1</div>
 *   <div>Элемент 2</div>
 * </Flex>
 * ```
 */

export const Flex: React.FC<FlexProps> = (props) => {
  const {
    direction = 'row',
    justify = 'start',
    align = 'center',
    gap,
    max,
    padding,
    className,
    children,
    ...otherProps
  } = props;

  // Маппинг пропсов на классы из scss-модуля
  const flexClasses = [
    styles.flex,
    styles[
      `direction${direction.charAt(0).toUpperCase() + direction.slice(1)}`
    ],
    styles[`justify${justify.charAt(0).toUpperCase() + justify.slice(1)}`],
    styles[`align${align.charAt(0).toUpperCase() + align.slice(1)}`],
    styles[`pad${padding}`],
    gap && styles[`gap${gap}`],
    max && styles.max,
    className, // Возможность передать кастомный класс снаружи
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={flexClasses} {...otherProps}>
      {children}
    </div>
  );
};
