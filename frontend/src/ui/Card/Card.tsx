import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import styles from './Card.module.scss';

// Расширяем список доступных вариантов
export type CardVariant =
  | 'dark'
  | 'primary'
  | 'teal'
  | 'amber'
  | 'crimson'
  | 'emerald'
  | 'sky'
  | 'slate'
  | 'violet';

/**
 * Пропсы универсального UI-компонента Card
 */
interface CardProps extends DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> {
  /**
   * Вариант цвета заливки из дизайн-системы:
   * - 'dark' / 'slate': нейтральные темные тона
   * - 'primary' / 'violet': фиолетовые акценты
   * - 'crimson': красный (кардио / пульс)
   * - 'emerald': зеленый (питание)
   * - 'sky' / 'teal': сине-голубые (вода / баланс)
   * - 'amber': оранжевый (предупреждения / цели)
   */
  variant?: CardVariant;
  /** Включить ли эффект приподнимания карточки при наведении мыши */
  hoverable?: boolean;
  /** Контент, который будет отрендерен внутри карточки */
  children: React.ReactNode;
}

/**
 * Компонент `Card` — базовый UI-контейнер (обертка) с настраиваемым фоном.
 * Используется для создания карточек, плашек, блоков статистики и баннеров.
 *
 * @example
 * ```tsx
 * <Card variant="emerald" hoverable>
 *   <h3>Дневник питания</h3>
 *   <p>Заполнено: 1,800 / 2,200 ккал</p>
 * </Card>
 * ```
 */
export const Card: React.FC<CardProps> = (props) => {
  const {
    variant = 'dark',
    hoverable = false,
    className,
    children,
    ...otherProps
  } = props;

  // Собираем динамический класс, например: styles.bgEmerald или styles.bgSky
  const cardClasses = [
    styles.card,
    styles[`bg${variant.charAt(0).toUpperCase() + variant.slice(1)}`],
    hoverable && styles.clickable,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cardClasses} {...otherProps}>
      {children}
    </div>
  );
};
