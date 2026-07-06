import { useState } from 'react';

interface FormUIProps {
  callback: (data: any) => void;
}

export const FormUI = ({ callback }: FormUIProps) => {
  const [forms, setForms] = useState({});

  const handleFormChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    // e.target — это конкретный инпут, в котором прямо сейчас пишут текст
    const { name, value } = e.target;
    console.log(e.target);

    if (name) {
      setForms((prev) => ({
        ...prev,
        [name]: value, // Динамически обновляем поле по его имени
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    callback(forms); // Вызываем переданную функцию и отдаем данные
  };
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Форма добавления спортсменов
        </h2>
      </div>
      <form
        className="space-y-6"
        onSubmit={handleSubmit}
        onChange={handleFormChange}
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Имя *
            </label>
            <input
              type="text"
              placeholder="Иван Петров"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              name="name"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Возраст *
            </label>
            <input
              type="number"
              placeholder="22"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              name="age"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition duration-200 font-medium shadow-lg hover:shadow-xl"
        >
          Сохранить
        </button>
      </form>
    </div>
  );
};
