interface ITableUIProps<T> {
  tableList: T[];
}

export const TableUI = <T,>({ tableList }: ITableUIProps<T>) => {
  console.log('tableList', tableList);
  // if (!tableList.length)
  //   return <div className="font-bold">Пока нет данных</div>;
  const headers = Object.keys(tableList[0] as typeof Object) as Array<keyof T>;
  console.log('headers', headers);

  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            {headers.map((header) => (
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                key={String(header)}
              >
                {String(header)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {tableList.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              {headers.map((key) => (
                <>
                  <td
                    key={String(key)}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
                  >
                    {/* Безопасно выводим значение по ключу, приводя к ReactNode */}
                    {(row[key] as React.ReactNode) ?? ''}
                  </td>
                </>
              ))}
              <a href="#" className="text-blue-600 hover:text-blue-900 mr-3">
                Редактировать
              </a>
            </tr>
          ))}
          {/* <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
              Анна Иванова
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
              anna@example.com
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                Админ
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <a href="#" className="text-blue-600 hover:text-blue-900 mr-3">
                Редактировать
              </a>
              <a href="#" className="text-red-600 hover:text-red-900">
                Удалить
              </a>
            </td> */}
          {/* </tr> */}
        </tbody>
      </table>
    </div>
  );
};
