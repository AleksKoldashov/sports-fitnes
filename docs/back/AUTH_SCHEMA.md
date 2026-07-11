Отличная идея. Давай соберем всё, что мы обсудили про авторизацию и регистрацию, в один четкий файл.

Ниже — готовая структура для твоей документации. Ты можешь скопировать этот блок и сохранить его как отдельный файл (например, `AUTH_SCHEMA.md`) или добавить в существующий `ARCHITECTURE.md`. Я убрал весь лишний код и оставил только логику и схемы данных.

---

````markdown
# Схема авторизации и управления пользователями (ACL)

## 1. Модель данных (Prisma)

### 1.1. Пользователи и профили

```prisma
model User {
  id            Int       @id @default(autoincrement())
  email         String    @unique
  password      String    // Хранить только хеш (bcrypt)
  role          Role      @default(CLUB_MEMBER)

  // Связи с профилями (1:1)
  clubMember    ClubMember?
  trainer       Trainer?
  manager       Manager?
  hr            Hr?
  director      Director?

  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

enum Role {
  CLUB_MEMBER
  TRAINER
  MANAGER
  HR
  DIRECTOR
}
```
````

### 1.2. Профили сотрудников

```prisma
model ClubMember {
  id        Int      @id @default(autoincrement())
  firstName String
  lastName  String
  patronymic String?
  age       Int
  userId    Int      @unique
  user      User     @relation(fields: [userId], references: [id])
}

model Trainer {
  id         Int     @id @default(autoincrement())
  userId     Int     @unique
  user       User    @relation(fields: [userId], references: [id])
  specialty  String
  experience Int
  rating     Float?  @default(0)
  isActive   Boolean @default(true)
}

model Manager {
  id         Int     @id @default(autoincrement())
  userId     Int     @unique
  user       User    @relation(fields: [userId], references: [id])
  department String
  phone      String
}

model Hr {
  id         Int     @id @default(autoincrement())
  userId     Int     @unique
  user       User    @relation(fields: [userId], references: [id])
  phone      String
  isActive   Boolean @default(true)
}

model Director {
  id         Int     @id @default(autoincrement())
  userId     Int     @unique
  user       User    @relation(fields: [userId], references: [id])
}
```

---

### 1.3. Заявки на принятие сотрудников (Workflow)

```prisma
model EmployeeApplication {
  id            Int                 @id @default(autoincrement())
  email         String              // Почта нового сотрудника
  role          Role                // TRAINER, MANAGER, HR
  profileData   Json                // Данные профиля (зависят от роли)
  status        ApplicationStatus   @default(PENDING)
  rejectionReason String?           // Причина отказа (обязательно, если статус REJECTED)

  createdById   Int                 // HR, создавший заявку
  createdBy     User                @relation("CreatedApplications", fields: [createdById], references: [id])

  reviewedById  Int?                // Директор, утвердивший/отклонивший
  reviewedBy    User?               @relation("ReviewedApplications", fields: [reviewedById], references: [id])

  createdAt     DateTime            @default(now())
  updatedAt     DateTime            @updatedAt
}

enum ApplicationStatus {
  PENDING
  APPROVED
  REJECTED
  CANCELLED
}
```

---

### 1.4. Система уведомлений (опционально)

```prisma
model Notification {
  id        Int       @id @default(autoincrement())
  userId    Int       // Кому адресовано
  user      User      @relation(fields: [userId], references: [id])
  type      String    // APPLICATION_APPROVED, APPLICATION_REJECTED, NEW_APPLICATION
  message   String
  isRead    Boolean   @default(false)
  createdAt DateTime  @default(now())
}
```

---

## 2. Матрица доступа (Roles & Permissions)

| Действие                               | CLUB_MEMBER | TRAINER | MANAGER |    HR     | DIRECTOR |
| :------------------------------------- | :---------: | :-----: | :-----: | :-------: | :------: |
| **Публичная регистрация**              |     ✅      |   ❌    |   ❌    |    ❌     |    ❌    |
| **Вход в систему (логин)**             |     ✅      |   ✅    |   ✅    |    ✅     |    ✅    |
| **Создание заявки на сотрудника**      |     ❌      |   ❌    |   ❌    |    ✅     |    ❌    |
| **Отзыв заявки**                       |     ❌      |   ❌    |   ❌    |    ✅     |    ❌    |
| **Просмотр списка заявок (PENDING)**   |     ❌      |   ❌    |   ❌    | ✅ (свои) | ✅ (все) |
| **Просмотр деталей заявки**            |     ❌      |   ❌    |   ❌    |    ✅     |    ✅    |
| **Утверждение заявки**                 |     ❌      |   ❌    |   ❌    |    ❌     |    ✅    |
| **Отклонение заявки (с комментарием)** |     ❌      |   ❌    |   ❌    |    ❌     |    ✅    |
| **Получение уведомлений о решении**    |     ❌      |   ❌    |   ❌    |    ✅     |    ✅    |
| **Управление клубными участниками**    |     ❌      |   ✅    |   ❌    |    ✅     |    ✅    |
| **Создание новостей/постов**           |     ❌      |   ✅    |   ✅    |    ✅     |    ✅    |
| **Создание акций/опросов**             |     ❌      |   ❌    |   ✅    |    ✅     |    ✅    |

---

## 3. Бизнес-процессы (Сценарии)

### Сценарий 1. Регистрация клубного участника

1. Пользователь заполняет публичную форму (`email`, `password`, `firstName`, `lastName`, `age`).
2. Бэкенд создает `User` с ролью `CLUB_MEMBER`.
3. Бэкенд создает профиль `ClubMember`, связанный с этим `User`.
4. Пользователь сразу получает доступ в систему.

### Сценарий 2. Добавление сотрудника (Тренер/Менеджер/HR)

1. **HR** заполняет форму (почта, роль, профильные данные).
2. Система создает заявку (`EmployeeApplication`) со статусом `PENDING`.
3. **Директор** видит новую заявку в списке.
4. **Директор** открывает заявку, видит все детали.
5. **Директор** либо:
   - **Утверждает:** Система создает `User` и профиль (Trainer/Manager/HR). Статус заявки → `APPROVED`. HR получает уведомление.
   - **Отклоняет (с комментарием):** Статус → `REJECTED`. HR получает уведомление с причиной.
6. **HR** может отозвать заявку (только в статусе `PENDING`), статус → `CANCELLED`.

### Сценарий 3. Управление уведомлениями

1. При изменении статуса заявки (APPROVED/REJECTED) создается запись в `Notification` для HR.
2. При создании новой заявки создается запись в `Notification` для директора.
3. Пользователи видят уведомления в интерфейсе (иконка колокольчика).

---

## 4. Связь с другими модулями

- **Календарь / Тренировки:** Тренеры создают события. Участники записываются.
- **Магазин:** Товары создаются менеджерами. Участники покупают.
- **Новости:** Тренеры, менеджеры, HR и директор создают посты. Участники читают.
- **Опросы:** Менеджеры создают опросы. Участники голосуют.
- **Аналитика:** Директор и HR видят дашборды (количество участников, активность тренеров и т.д.).

---

```

---

### Как использовать этот файл

1. Сохрани его как `AUTH_SCHEMA.md` в папке `docs/` твоего проекта.
2. Когда будешь реализовывать код — просто открываешь этот файл и видишь все связи, роли и процессы.
3. Если в будущем захочешь добавить новую роль или изменить workflow — редактируешь только этот файл.

---

**Все зафиксировано.** Теперь у тебя есть полная схема авторизации, которая не потеряется в голове. Можешь сохранять и переходить к следующему этапу. 😊
```
