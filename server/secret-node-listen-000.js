const path = require('path');
const bodyParser = require('body-parser');

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
      console.log({ path: req.path, });
      
      if (req.path.startsWith('/api/')) {
        // Если путь начинается с /api/, возвращаем ошибку 404
        return res.status(404).json({ error: 'Endpoint not found' });
      }

      // Формируем путь к запрашиваемому файлу
      const requestedFilePath = path.join(__dirname, 'public', req.path);

      // Проверяем, существует ли запрашиваемый файл
      if (fs.existsSync(requestedFilePath) && !fs.lstatSync(requestedFilePath).isDirectory()) {
        // Если файл существует и это не директория, отправляем его
        return res.sendFile(requestedFilePath);
      }
      
      // Для всех остальных запросов отправляем index.html
      res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });
  },
};
