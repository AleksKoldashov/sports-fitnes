import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import { trainersApi } from '@/shared/api';
import { ISportsmen, ITrainer } from '@/shared/api/types';

interface IAdminPanelContextProps {
  list: any[];
}

const DEFAULT_ADMIN_PANEL_CONTEXT = {
  testList: [''],
  trainers: [
    {
      id: 0,
      name: '',
      specialty: '',
      experience: 0,
    },
  ],
  sportsmens: [{}],
  loading: false,
  addTrainer: (data: ITrainer) => {},
  addSportsmen: (data: ISportsmen) => {},
  error: '',
};

export const AdminPanelContex = createContext(DEFAULT_ADMIN_PANEL_CONTEXT);

export const AdminPanelContextProvider: FC<
  PropsWithChildren<IAdminPanelContextProps>
> = ({ children, ...props }) => {
  const { list } = props;
  console.log('props', props.list);
  const testList = list.map((item) => item + '12');
  const [refetch, setRefetch] = useState(false);

  const [data, setData] = useState<{
    trainers: ITrainer[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const load = async () => {
    const [trainers] = await Promise.all([trainersApi.getAll()]);
    // trainersApi
    //   .getAll()
    //   .then(setTrainers)
    //   .catch((err) => setError(err.message));
    setData({
      trainers,
    });
  };
  const addTrainer = async (data: ITrainer) => {
    try {
      await trainersApi.create(data);
      setRefetch((prev) => !prev);
    } catch (error) {
      alert('Ошибка при сохранении');
      setError(error as string);
    }
  };

  useEffect(() => {
    setLoading(true);
    try {
      load();
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  }, [refetch]);

  console.log('data', data);
  if (!data) return null;
  return (
    <AdminPanelContex.Provider
      value={{
        testList,
        trainers: data.trainers,
        loading,
        error,
        addTrainer,
      }}
    >
      {children}
    </AdminPanelContex.Provider>
  );
};
