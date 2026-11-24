# Домашнее задание к блоку «Redux Saga» — Задача «Список и детали»

Полностековое клиент-серверное приложение для просмотра списка услуг и детальной информации о каждой услуге с управлением асинхронными потоками через Redux-Saga, разработанное на React 19, TypeScript 5, Redux Toolkit и Express.

[![Build Status](https://github.com/ivantr033/ra16-homeworks-saga-main-details/actions/workflows/deploy.yml/badge.svg)](https://github.com/ivantr033/ra16-homeworks-saga-main-details/actions/workflows/deploy.yml)

## 🌐 Ссылка на развертывание (GitHub Pages)

* **Services List & Details (Frontend):** [Открыть приложение](https://ivantr033.github.io/ra16-homeworks-saga-main-details/)

*(Примечание: для загрузки данных требуется запущенный локально backend-сервер на порту `7070`).*

## ⚙️ Реализованные требования и технические характеристики

1. **Асинхронная архитектура на Redux-Saga:** Запросы к REST API (`GET /api/services` и `GET /api/services/:id`) управляются через генераторы и эффекты `call`, `put` и `takeLatest`, предотвращая гонки запросов при быстрой навигации.
2. **Изолированные состояния экранов:** В Redux Store разделены ветки состояния `services.list` и `services.details` со своими независимыми флагами `loading`, `error` и `data`.
3. **Обработка ошибок и повтор запросов:** При сетевых сбоях или статусах `!res.ok` отображается компонент `ErrorView` с кнопкой «Повторить запрос», повторно запускающей соответствующую сагу.
4. **Маршрутизация и UX:** Реализованы маршруты `/` и `/:id/details` на базе React Router (`HashRouter`), индикатор загрузки (`Spinner`) и боковая панель с подсветкой активной услуги на странице деталей.

## 🛠️ Технологический стек

* **Фронтенд:** React 19, TypeScript 5, Redux Toolkit, Redux-Saga (`call`, `put`, `takeLatest`), React Router DOM
* **Бэкенд:** Node.js, Express, CORS, Body-Parser (порт `7070`)
* **Сборщик и CI/CD:** Vite, GitHub Actions (`gh-pages`)

## 🔧 Инструкция по локальному запуску

### 1. Запуск Backend (порт 7070)

```bash
cd backend
npm install
npm start
```

### 2. Запуск Frontend (порт 5173)

```bash
cd frontend
npm install --legacy-peer-deps
npm run dev
```
