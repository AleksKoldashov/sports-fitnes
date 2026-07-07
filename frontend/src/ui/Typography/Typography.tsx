import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import styles from './Typography.module.scss';

export type TypographySize = '12' | '14' | '16' | '20' | '24' | '32';
export type TypographyTag =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span';

/**
 * Пропсы универсального UI-компонента Typography
 */
interface TypographyProps extends DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
> {
  /**
   * Фиксированный размер шрифта в пикселях:
   * - '12': мелкий серый текст (подписи, даты)
   * - '14' / '16': стандартный контентный текст
   * - '20': подзаголовки, названия упражнений в карточках
   * - '24': заголовки блоков (например, "Моя статистика")
   * - '32': огромный главный заголовок страницы (Dashboard)
   */
  size?: TypographySize;
  /** Семантический HTML-тег для корректной разметки сайта */
  tag?: TypographyTag;
  /** Текст или другие строковые элементы */
  children: React.ReactNode;
}

/**
 * Компонент `Typography` — единая точка управления текстовыми стилями и заголовками.
 * Позволяет гибко комбинировать визуальный размер и семантический HTML-тег.
 *
 * @example
 * ```tsx
 * <Typography tag="h1" size="32">Главный экран</Typography>
 * <Typography tag="p" size="14">Обычный текст описания тренировки</Typography>
 * ```
 */
export const Typography: React.FC<TypographyProps> = (props) => {
  const { size = '14', tag = 'p', className, children, ...otherProps } = props;

  // Динамически собираем имя класса, например: styles.size32
  const textClasses = [styles.text, styles[`size${size}`], className]
    .filter(Boolean)
    .join(' ');

  // Магия React: создаем HTML-тег динамически на основе пропса строки
  const Component = tag as any;

  return (
    <Component className={textClasses} {...otherProps}>
      {children}
    </Component>
  );
};
