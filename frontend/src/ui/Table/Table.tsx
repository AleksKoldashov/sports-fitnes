import React from 'react';
import styles from './Table.module.scss';

export interface TableColumn<T> {
  /** Уникальный ключ колонки */
  key: string;
  /** Заголовок, который отобразится в шапке */
  title: string;
  /** Кастомный рендерер, если в ячейку нужно положить кнопку или иконку (опционально) */
  render?: (value: any, record: T) => React.ReactNode;
}

interface TableProps<T> {
  /** Конфигурация колонок таблицы */
  columns: TableColumn<T>[];
  /** Массив объектов с данными */
  data: T[];
  /** Функция, возвращающая уникальный ключ для каждой строки (например, id) */
  rowKey: (record: T) => string | number;
}

/**
 * Компонент `Table` — универсальная дата-таблица.
 * Автоматически генерирует строки на основе переданных данных и поддерживает горизонтальный скролл на мобилках.
 *
 * @example
 * ```tsx
 * <Table
 *   columns={myColumns}
 *   data={workoutHistory}
 *   rowKey={(row) => row.id}
 * />
 * ```
 */
export const Table = <T extends Record<string, any>>({
  columns,
  data,
  rowKey,
}: TableProps<T>) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            {columns.map((col) => (
              <th key={col.key} className={styles.th}>
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className={styles.td}
                style={{ textAlign: 'center', color: '#9ca3af' }}
              >
                Данные не найдены
              </td>
            </tr>
          ) : (
            data.map((record) => (
              <tr key={rowKey(record)} className={styles.tr}>
                {columns.map((col) => (
                  <td key={col.key} className={styles.td}>
                    {col.render
                      ? col.render(record[col.key], record)
                      : record[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
