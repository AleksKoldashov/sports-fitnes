Отлично! Вот файл с **FSD-архитектурой** и фичами, которые мы обсуждали. Он полностью синхронизирован с вашим бэкенд-проектом.

---

```markdown
# FSD Architecture & Features Map

## Контекст

Этот файл описывает фронтенд-архитектуру проекта на основе **Feature-Sliced Design (FSD)**.  
Проект: Фитнес-экосистема (спортклуб).  
Стек: React + Vite + Zustand + React Query + React Router.

---

## 1. Слои (Layers)

### 1.1. `app/` — Настройка приложения

- `App.tsx`, `main.tsx`
- Провайдеры: React Query, Router, Zustand (глобальный доступ)
- Глобальные стили и темы

### 1.2. `pages/` — Страницы (роутинг)

Каждая страница — это композиция виджетов и фич.

| Страница             | Путь            | Доступ                   |
| :------------------- | :-------------- | :----------------------- |
| `LoginPage`          | `/login`        | Все                      |
| `RegisterPage`       | `/register`     | Все                      |
| `FeedPage`           | `/`             | Все авторизованные       |
| `ProfilePage`        | `/profile`      | Все авторизованные       |
| `TrainersPage`       | `/trainers`     | Все авторизованные       |
| `TrainerProfilePage` | `/trainers/:id` | Все авторизованные       |
| `CalendarPage`       | `/calendar`     | Все авторизованные       |
| `ShopPage`           | `/shop`         | Все авторизованные       |
| `CartPage`           | `/cart`         | Все авторизованные       |
| `AdminPage`          | `/admin`        | Только `HR` / `DIRECTOR` |

### 1.3. `widgets/` — Крупные блоки (бизнес-композиции)

Блоки, которые живут на разных страницах.

| Виджет          | Где используется                     | Описание                                           |
| :-------------- | :----------------------------------- | :------------------------------------------------- |
| `FeedList`      | `FeedPage`, `TrainerProfilePage`     | Лента новостей (посты + события)                   |
| `EventCalendar` | `CalendarPage`, `TrainerProfilePage` | Календарь тренировок                               |
| `TrainerCard`   | `TrainersPage`                       | Карточка тренера с рейтингом и кнопкой записи      |
| `CartIcon`      | `Layout` (глобально)                 | Иконка корзины с количеством товаров               |
| `CartDropdown`  | `Layout`                             | Выпадашка с содержимым корзины                     |
| `AdminPanel`    | `AdminPage`                          | Админ-панель (управление пользователями, товарами) |
| `UserMenu`      | `Layout`                             | Аватар + выпадающее меню (профиль, выход)          |

### 1.4. `features/` — Пользовательские сценарии

Фичи — это самостоятельные куски функциональности.

| Фича                | Сценарий                              | API (бэк)                                                       | Стейт                             |
| :------------------ | :------------------------------------ | :-------------------------------------------------------------- | :-------------------------------- |
| **auth**            | Логин, регистрация, выход             | `POST /auth/login`, `POST /auth/register`                       | Zustand (userStore)               |
| **create-post**     | Создание новости                      | `POST /news`                                                    | React Query                       |
| **create-event**    | Создание тренировки (тренер)          | `POST /events`                                                  | React Query                       |
| **enroll-event**    | Запись на тренировку (1 клик)         | `POST /events/join/:id`                                         | React Query                       |
| **leave-review**    | Оставить отзыв на тренера             | `POST /trainers/:id/reviews`                                    | React Query                       |
| **poll-vote**       | Голосовать в опросе                   | `POST /polls/:id/vote`                                          | React Query                       |
| **add-to-cart**     | Добавить товар в корзину              | `POST /cart/items`                                              | Zustand (cartStore) + React Query |
| **checkout**        | Оформить заказ                        | `POST /orders`                                                  | React Query                       |
| **manage-products** | CRUD товаров (админка)                | `POST /products`, `PATCH /products/:id`, `DELETE /products/:id` | React Query                       |
| **manage-users**    | CRUD сотрудников и тренеров (админка) | `POST /employees`, `POST /trainers`                             | React Query                       |

### 1.5. `entities/` — Бизнес-сущности

Сущности — это модели данных + базовые UI-компоненты для их отображения.

| Сущность        | Поля (типы)                                                                         | UI-компоненты                    |
| :-------------- | :---------------------------------------------------------------------------------- | :------------------------------- |
| **user**        | `id`, `email`, `role`, `name`                                                       | `UserAvatar`, `UserBadge`        |
| **post** (News) | `id`, `title`, `content`, `imageUrl`, `author`, `eventId`                           | `PostCard`, `PostSkeleton`       |
| **event**       | `id`, `title`, `startTime`, `endTime`, `trainer`, `maxParticipants`, `currentCount` | `EventCard`, `EventBadge`        |
| **trainer**     | `id`, `name`, `specialty`, `position`, `rating`                                     | `TrainerCard`, `TrainerRating`   |
| **product**     | `id`, `name`, `price`, `stock`, `imageUrl`                                          | `ProductCard`, `ProductSkeleton` |
| **cart**        | `items: CartItem[]`, `totalPrice`                                                   | `CartItem`                       |
| **order**       | `id`, `status`, `totalPrice`, `createdAt`                                           | `OrderCard`, `OrderStatusBadge`  |
| **poll**        | `id`, `question`, `options`, `expiresAt`                                            | `PollCard`                       |
| **review**      | `id`, `text`, `rating`, `trainerId`, `author`                                       | `ReviewCard`                     |

### 1.6. `shared/` — Переиспользуемое

Базовые компоненты, утилиты, конфиги.

| Папка     | Содержимое                                                                                      |
| :-------- | :---------------------------------------------------------------------------------------------- |
| `api/`    | `apiClient.ts` (Axios с перехватчиками JWT)                                                     |
| `lib/`    | Хелперы: `dateUtils.ts` (форматирование времени), `validation.ts` (схемы Zod), `formatPrice.ts` |
| `ui/`     | Базовые компоненты: `Button`, `Input`, `Modal`, `Spinner`, `Layout`                             |
| `config/` | `env.ts` (переменные окружения)                                                                 |
| `hooks/`  | Общие хуки: `useDebounce`, `useLocalStorage`                                                    |

---

## 2. Матрица доступов (Роли + Страницы + Фичи)

| Роль              | Доступные страницы                                                                | Доступные фичи                                                                                    |
| :---------------- | :-------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------ |
| **CLUB_MEMBER**   | `FeedPage`, `ProfilePage`, `TrainersPage`, `CalendarPage`, `ShopPage`, `CartPage` | `enroll-event`, `leave-review`, `poll-vote`, `add-to-cart`, `checkout`                            |
| **TRAINER**       | Всё, что у `CLUB_MEMBER` + `TrainerProfilePage`                                   | `create-event`, `create-post`, `enroll-event` (только свои), `leave-review` (только как участник) |
| **HR / DIRECTOR** | Всё, что у `TRAINER` + `AdminPage`                                                | `manage-products`, `manage-users`, `create-post`, `create-event`, `poll-vote` (как участник)      |

---

## 3. Стейт-менеджмент (Zustand + React Query)

### Zustand (клиентский стейт)

| Store       | Что хранит                         | Методы                                                 |
| :---------- | :--------------------------------- | :----------------------------------------------------- |
| `userStore` | `user`, `token`, `isAuthenticated` | `login`, `logout`, `setUser`                           |
| `cartStore` | `items`, `totalPrice`, `count`     | `addItem`, `removeItem`, `updateQuantity`, `clearCart` |

### React Query (серверный стейт)

| Query Key                | Что кеширует        | Эндпоинт                    |
| :----------------------- | :------------------ | :-------------------------- |
| `['feed']`               | Лента новостей      | `GET /news`                 |
| `['events']`             | Список тренировок   | `GET /events`               |
| `['trainers']`           | Список тренеров     | `GET /trainers`             |
| `['trainer', id]`        | Карточка тренера    | `GET /trainers/:id`         |
| `['products']`           | Каталог товаров     | `GET /products`             |
| `['cart']`               | Корзина             | `GET /cart`                 |
| `['orders']`             | Заказы пользователя | `GET /orders`               |
| `['polls']`              | Активные опросы     | `GET /polls`                |
| `['reviews', trainerId]` | Отзывы о тренере    | `GET /trainers/:id/reviews` |

---

## 4. Структура папок (скелет)
```

src/
├── app/
│ ├── App.tsx
│ ├── main.tsx
│ ├── providers/
│ │ ├── QueryProvider.tsx
│ │ ├── RouterProvider.tsx
│ │ └── StoreProvider.tsx (если нужно)
│ └── styles/
│ └── globals.css
│
├── pages/
│ ├── auth/
│ │ ├── LoginPage.tsx
│ │ └── RegisterPage.tsx
│ ├── feed/
│ │ └── FeedPage.tsx
│ ├── profile/
│ │ └── ProfilePage.tsx
│ ├── trainers/
│ │ ├── TrainersPage.tsx
│ │ └── TrainerProfilePage.tsx
│ ├── calendar/
│ │ └── CalendarPage.tsx
│ ├── shop/
│ │ ├── ShopPage.tsx
│ │ └── CartPage.tsx
│ └── admin/
│ └── AdminPage.tsx
│
├── widgets/
│ ├── feed/
│ │ ├── FeedList.tsx
│ │ ├── FeedItem.tsx
│ │ └── CreatePostForm.tsx
│ ├── calendar/
│ │ └── EventCalendar.tsx
│ ├── trainerCard/
│ │ └── TrainerCard.tsx
│ ├── cart/
│ │ ├── CartIcon.tsx
│ │ └── CartDropdown.tsx
│ └── admin/
│ └── AdminPanel.tsx
│
├── features/
│ ├── auth/
│ │ ├── api/
│ │ │ └── authApi.ts
│ │ ├── model/
│ │ │ └── useAuthStore.ts
│ │ └── ui/
│ │ ├── LoginForm.tsx
│ │ └── RegisterForm.tsx
│ │
│ ├── create-post/
│ │ ├── api/
│ │ │ └── createPostApi.ts
│ │ └── ui/
│ │ └── CreatePostModal.tsx
│ │
│ ├── create-event/
│ │ ├── api/
│ │ │ └── createEventApi.ts
│ │ └── ui/
│ │ └── CreateEventForm.tsx
│ │
│ ├── enroll-event/
│ │ ├── api/
│ │ │ └── enrollApi.ts
│ │ └── ui/
│ │ └── EnrollButton.tsx
│ │
│ ├── leave-review/
│ │ ├── api/
│ │ │ └── reviewApi.ts
│ │ └── ui/
│ │ └── ReviewForm.tsx
│ │
│ ├── poll-vote/
│ │ ├── api/
│ │ │ └── pollApi.ts
│ │ └── ui/
│ │ └── PollCard.tsx
│ │
│ ├── add-to-cart/
│ │ ├── api/
│ │ │ └── cartApi.ts
│ │ └── ui/
│ │ └── AddToCartButton.tsx
│ │
│ ├── checkout/
│ │ ├── api/
│ │ │ └── orderApi.ts
│ │ └── ui/
│ │ └── CheckoutForm.tsx
│ │
│ └── manage-products/
│ ├── api/
│ │ └── productApi.ts
│ └── ui/
│ └── ProductForm.tsx
│
├── entities/
│ ├── user/
│ │ ├── model/
│ │ │ ├── userTypes.ts
│ │ │ └── useUserStore.ts
│ │ └── ui/
│ │ └── UserAvatar.tsx
│ │
│ ├── post/
│ │ ├── model/
│ │ │ └── postTypes.ts
│ │ └── ui/
│ │ └── PostCard.tsx
│ │
│ ├── event/
│ │ ├── model/
│ │ │ └── eventTypes.ts
│ │ └── ui/
│ │ └── EventCard.tsx
│ │
│ ├── trainer/
│ │ ├── model/
│ │ │ └── trainerTypes.ts
│ │ └── ui/
│ │ └── TrainerCard.tsx
│ │
│ ├── product/
│ │ ├── model/
│ │ │ └── productTypes.ts
│ │ └── ui/
│ │ └── ProductCard.tsx
│ │
│ ├── cart/
│ │ ├── model/
│ │ │ ├── cartTypes.ts
│ │ │ └── useCartStore.ts
│ │ └── ui/
│ │ └── CartItem.tsx
│ │
│ ├── order/
│ │ ├── model/
│ │ │ └── orderTypes.ts
│ │ └── ui/
│ │ └── OrderCard.tsx
│ │
│ └── poll/
│ ├── model/
│ │ └── pollTypes.ts
│ └── ui/
│ └── PollCard.tsx
│
└── shared/
├── api/
│ └── apiClient.ts
├── lib/
│ ├── dateUtils.ts
│ ├── formatPrice.ts
│ └── validation.ts
├── ui/
│ ├── Button/
│ ├── Input/
│ ├── Modal/
│ ├── Spinner/
│ └── Layout/
├── hooks/
│ ├── useDebounce.ts
│ └── useLocalStorage.ts
└── config/
└── env.ts

````

---

## 5. Импорты (алиасы Vite)

Для удобства импортов используем алиасы в `vite.config.ts`:

```ts
resolve: {
  alias: {
    '@': '/src',
    '@app': '/src/app',
    '@pages': '/src/pages',
    '@widgets': '/src/widgets',
    '@features': '/src/features',
    '@entities': '/src/entities',
    '@shared': '/src/shared',
  }
}
````

Примеры импортов:

```ts
import { PostCard } from "@entities/post/ui/PostCard";
import { useAuthStore } from "@features/auth/model/useAuthStore";
import { Button } from "@shared/ui/Button/Button";
```

---

## 6. Взаимосвязь с бэкендом (API-контракты)

| Фича         | Метод | Эндпоинт                | Тело запроса                                     | Ответ                       |
| :----------- | :---- | :---------------------- | :----------------------------------------------- | :-------------------------- |
| **auth**     | POST  | `/auth/login`           | `{ email, password }`                            | `{ access_token, user }`    |
| **auth**     | POST  | `/auth/register`        | `{ email, password, name, role, ... }`           | `{ user }`                  |
| **feed**     | GET   | `/news`                 | -                                                | `News[]`                    |
| **feed**     | POST  | `/news`                 | `{ title, content, imageUrl?, eventId? }`        | `News`                      |
| **events**   | GET   | `/events`               | -                                                | `Event[]`                   |
| **events**   | POST  | `/events`               | `{ title, startTime, endTime, maxParticipants }` | `Event`                     |
| **enroll**   | POST  | `/events/join/:id`      | -                                                | `{ success, currentCount }` |
| **reviews**  | GET   | `/trainers/:id/reviews` | -                                                | `Review[]`                  |
| **reviews**  | POST  | `/trainers/:id/reviews` | `{ text, rating }`                               | `Review`                    |
| **polls**    | GET   | `/polls`                | -                                                | `Poll[]`                    |
| **polls**    | POST  | `/polls/:id/vote`       | `{ optionId }`                                   | `{ success }`               |
| **products** | GET   | `/products`             | -                                                | `Product[]`                 |
| **products** | POST  | `/products`             | `{ name, price, stock, imageUrl }`               | `Product`                   |
| **cart**     | GET   | `/cart`                 | -                                                | `Cart`                      |
| **cart**     | POST  | `/cart/items`           | `{ productId, quantity }`                        | `Cart`                      |
| **orders**   | POST  | `/orders`               | `{ items }`                                      | `Order`                     |

---

## 7. Договоренности по разработке

- **Именование:**
  - Компоненты: `PascalCase` (например, `FeedList.tsx`)
  - Хуки: `camelCase` c `use` (например, `useAuthStore.ts`)
  - API-функции: `camelCase` (например, `createPostApi.ts`)
- **Типизация:** Все сущности и API-ответы строго типизированы через `types.ts`.
- **Стили:** CSS Modules (или Tailwind — на ваш выбор).
- **Обработка ошибок:** React Query + `ErrorBoundary` на уровне страниц.

---

## 8. История изменений

| Дата       | Изменение                                                        |
| :--------- | :--------------------------------------------------------------- |
| 07.07.2026 | Создан файл. Полное описание FSD-архитектуры для фитнес-проекта. |

```

---

Этот файл полностью синхронизирован с вашим бэкенд-проектом и готов к использованию. Вы можете сохранить его как `FRONTEND_ARCHITECTURE.md` или `FSD_ARCHITECTURE.md` в папке `docs/`.

---

**Что дальше?** Теперь у вас есть:
1. Бэкенд-архитектура (`ARCHITECTURE.md`)
2. Фронтенд-архитектура (FSD, этот файл)

Вы можете либо:
- **Начать реализовывать фронтенд** по FSD-структуре (настраивать React + Vite).
- **Вернуться к бэкенду** и начать писать модуль "Календарь" (Events) или "Магазин".

Куда двигаемся? 😊
```
