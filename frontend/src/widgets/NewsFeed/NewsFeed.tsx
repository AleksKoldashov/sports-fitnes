import { Badge, Flex, Typography } from '@/ui';
import { NotificationBell } from '@/ui/NotificationBell/NotificationBell';
import styles from './NewsFeed.module.scss';

interface NewsArticle {
  id: number;
  title: string;
  category: 'Питание' | 'Событие' | 'Обновление';
  time: string;
}

interface INewsFeed {
  isOpen: boolean;
  setIsOpen?: () => void;
}

export const NewsFeed = ({ isOpen, setIsOpen }: INewsFeed) => {
  // Фейковая спортивная лента новостей
  const newsList: NewsArticle[] = [
    {
      id: 1,
      title: 'Открытие новой зоны кроссфита в центральном зале',
      category: 'Событие',
      time: '10 мин назад',
    },
    {
      id: 2,
      title: 'Топ-5 мифов об углеводах перед утренней тренировкой',
      category: 'Питание',
      time: '1 час назад',
    },
    {
      id: 3,
      title: 'В приложение добавлен новый трекер выпитой воды',
      category: 'Обновление',
      time: '3 часа назад',
    },
    {
      id: 4,
      title: 'Марафон бега "Старт 2026": открыта регистрация для атлетов',
      category: 'Событие',
      time: 'Вчера',
    },
  ];

  // Маппинг цветов для бейджей категорий
  const getBadgeVariant = (category: string) => {
    if (category === 'Питание') return 'success';
    if (category === 'Обновление') return 'primary';
    return 'error'; // Для событий сделаем красный
  };

  const toggleSidebar = () => {
    setIsOpen?.();
  };

  return (
    <aside
      className={`${styles.newsFeedContainer} ${!isOpen ? styles.collapsed : ''}`}
    >
      {/* Кнопка скрытия/раскрытия панели (теперь слева от неё) */}
      <button
        className={styles.toggleBtn}
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        <span className={styles.arrow}></span>
      </button>

      {/* Шапка ленты */}
      <Flex direction="row" justify="between" align="center" max>
        <Typography tag="h3" size="16" style={{ fontWeight: 800 }}>
          ЛЕНТА НОВОСТЕЙ
        </Typography>
        {/* <span style={{ fontSize: '16px', cursor: 'pointer' }}>🔔</span> */}
        <NotificationBell count={newsList.length} />
      </Flex>

      {/* Список новостей со скроллом */}
      <div className={styles.feedList}>
        {newsList.map((article) => (
          <div key={article.id} className={styles.newsItem}>
            <Flex direction="column" align="start" gap="8" max>
              {/* Категория и время */}
              <Flex direction="row" justify="between" align="center" max>
                <Badge variant={getBadgeVariant(article.category)}>
                  {article.category}
                </Badge>
                <Typography tag="span" size="12">
                  {article.time}
                </Typography>
              </Flex>

              {/* Заголовок статьи */}
              <Typography
                tag="p"
                size="14"
                style={{ fontWeight: 600, lineHeight: 1.4 }}
              >
                {article.title}
              </Typography>
            </Flex>
          </div>
        ))}
      </div>
    </aside>
  );
};
