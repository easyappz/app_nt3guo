const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs'); // Add fs module

/**
 * Реализация хостинга
 */
const PORT = process.env.PORT;

module.exports = {
  listenServer: ({ fakeApp, express }) => {
    const fakeAppListenedResponse = fakeApp.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

    fakeApp.use(bodyParser.json());

    return fakeAppListenedResponse;
  },
  listenStatic: ({ fakeApp, express }) => {
    /**
     * Запускаем код из server.js
     * Запускаем между хостингов и get('*') чтобы все запросы необрабатываемые api возвращали фронтенд,
     * это нужно для spa.
     */
    require('./server.js');

    // Для поддержки React Router - отдаем index.html на все остальные пути
    // Обработчик для всех необрабатываемых запросов
    fakeApp.get('*', (req, res) => {
      if (req.path.startsWith('/api/')) {
        // Если путь начинается с /api/, возвращаем ошибку 404
        return res.status(404).json({ error: 'Endpoint not found' });
      }

      // Логируем текущую директорию и путь к запрашиваемому файлу
      console.log('Current directory (__dirname):', __dirname);
      const requestedFilePath = '/usr/src/app/server/public/static/css/main.55367930.css';
      console.log('Requested file path:', requestedFilePath);

      // Проверяем, существует ли запрашиваемый файл
      if (fs.existsSync(requestedFilePath) && !fs.lstatSync(requestedFilePath).isDirectory()) {
        console.log('Serving requested file:', requestedFilePath);
        return res.sendFile(requestedFilePath);
      }

      // Если файл не существует, отправляем index.html
      const indexPath = path.join(__dirname, 'public', 'index.html');
      console.log('Falling back to index.html:', indexPath);
      res.sendFile(indexPath);
    });
  },
};
