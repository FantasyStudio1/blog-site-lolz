Чтобы зупустить проект, сначала клонируем его себе

```bash
git clone https://github.com/FantasyStudio1/blog-site-lolz.git
```

Потом настраиваем бэк. Переходим в папку `back` и скачиваем зависимости
```bash
pnpm i
```
В папке `back` создаём файл `.env` и помещаем URL к вашей базе данных postgresql

```bash
DATABASE_URL="postgresql://USER:PASSWORD@localhost:PORT/DB?schema=SCHEMA"
```
Создаём миграцию

```bash
pnpm prisma migrate dev --name init
```
Заполняем бд фейк данными

```bash
pnpm prisma db seed
```
Включаем бэк

```bash
pnpm start:dev
```
После этого бэк долен запуститься на [http://localhost:4000](http://localhost:4000)

Теперь перейдем к фронту. Переходим в папку `front` и тоже скачиваем зависимости

```bash
pnpm i
```
В папке `front` создаём .env.local и вставляем апи юрл

```bash
NEXT_PUBLIC_API_URL=http://localhost:4000
```
Запускаем фронт

```bash
pnpm dev
```
Заходим на [http://localhost:3000](http://localhost:3000) и видим наш сайт
