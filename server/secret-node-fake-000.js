const Module = require('module');
const express = require('express');
const secretListeners = require('./secret-node-listen-000.js');

const fakeAppListenedResponse = {
  current: null,
};

/**
 * Создаем "поддельный" express, который всегда возвращает наш app
 */
function createFakeExpress() {
  // Основная функция express() возвращает наш уже созданный app
  function fakeExpress() {
    console.log('🔄 Перехвачен вызов express() - возвращаем существующий экземпляр');
    return fakeApp;
  }

  // Копируем все статические методы и свойства из настоящего express
  Object.setPrototypeOf(fakeExpress, express);

  /**
   * Дополнительно: перехватываем попытки вызова app.listen()
   */
  fakeApp.listen = function(...args) {
    console.log('⚠️  Перехвачен вызов app.listen() - сервер уже запущен!');

    // Если передан callback, вызываем его (для совместимости)
    const callback = args.find(arg => typeof arg === 'function');
    if (callback) {
      // Вызываем callback асинхронно, имитируя запуск сервера
      setImmediate(() => {
        callback();
      });
    }

    return fakeAppListenedResponse.current;
  };

  return fakeExpress;
}

/**
 * Перехватываем Module.prototype.require
 */
const originalRequire = Module.prototype.require;

Module.prototype.require = function(id) {
  // Если требуется express
  if (id === 'express') {
    console.log('🔄 Перехвачен require("express") - возвращаем поддельный express');

    // Возвращаем поддельный express
    return createFakeExpress();
  }

  // Для всех остальных модулей - обычное поведение
  return originalRequire.call(this, id);
};

/**
 * Также перехватываем глобальный require (на всякий случай)
 */
const originalGlobalRequire = global.require || require;

global.require = function(id) {
  if (id === 'express') {
    console.log('🔄 Перехвачен global require("express")');
    return createFakeExpress();
  }

  return originalGlobalRequire(id);
};

/**
 * Реализация хостинга
 */
const fakeApp = express();

fakeAppListenedResponse.current = secretListeners.listenServer({
  fakeApp,
  express,
});

secretListeners.listenStatic({
  fakeApp,
  express,
});
