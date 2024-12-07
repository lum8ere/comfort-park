import axios from 'axios';

// Создаём экземпляр axios с базовой конфигурацией
const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/', // Задайте URL вашего API
  timeout: 10000, // Таймаут запросов
  headers: {
    'Content-Type': 'application/json', // Установите необходимые заголовки
  },
});

// Интерсептор для обработки запросов
axiosInstance.interceptors.request.use(
  (config) => {
    // Здесь можно добавлять токены или другие данные
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Интерсептор для обработки ответов
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Здесь можно настроить обработку ошибок
    if (error.response && error.response.status === 401) {
      // Например, перенаправление на страницу входа
      console.error('Unauthorized! Redirecting to login...');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
