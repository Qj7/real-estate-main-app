# Real Estate Mini App Ecosystem

Монорепозиторий для экосистемы недвижимости с Telegram Mini App и Админ-панелью.

## Структура проекта

```
├── apps/
│   ├── miniapp-front/    # Telegram Mini App (Next.js)
│   ├── admin-front/      # Админ-панель (Next.js)
│   ├── api/              # Public API (NestJS + TypeORM + PostgreSQL)
│   └── events-api/       # Events/Analytics API (NestJS + TypeORM + PostgreSQL)
├── packages/             # Общие пакеты и утилиты
├── infrastructure/      # Docker, Nginx, K8s конфиги
├── scripts/              # Утилиты и скрипты
└── .github/              # CI/CD workflows
```

## Технологии

- **Frontend**: React + Next.js
- **Backend**: Node.js + NestJS + TypeORM
- **Database**: PostgreSQL 15
- **Storage**: MinIO (S3-compatible)
- **Cache**: Redis
- **Reverse Proxy**: Nginx
- **Containerization**: Docker + Docker Compose

### Разработка

```bash
# Запуск через Docker
docker compose -f docker-compose.dev.yml up
```

### Миграции базы данных

```bash
# Генерация миграции (в директории apps/api или apps/events-api)
npm run migration:generate -- -n MigrationName

# Применение миграций
npm run migration:run

# Откат миграции
npm run migration:revert
```

## Переменные окружения

Создайте `.env` файл на основе `.env.example` с необходимыми переменными:

```env
# Database
POSTGRES_DB=real_estate
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
DB_HOST=postgres
DB_PORT=5432

# JWT
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret-key
```

## База данных

Проект использует PostgreSQL с TypeORM для работы с данными.

- Все Entity классы находятся в `apps/*/src/entities/`
- Миграции хранятся в `apps/*/migrations/`
- Конфигурация подключения: `apps/*/src/config/database.config.ts`

### Основные таблицы

- `objects` - объекты недвижимости
- `partners` - партнёры
- `developers` - застройщики
- `admin_users` - администраторы
- `miniapp_users` - пользователи MiniApp (псевдонимизированные)
- `events` - события аналитики
- `links` - ссылки и кампании
- `audit_log` - лог действий администраторов
