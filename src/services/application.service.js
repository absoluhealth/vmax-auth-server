const e = require("express");
const App = require("../models").Application;

const getAllApps = async () => {
  const apps = await App.findAll({
    limit: 10,
  });

  return apps;
};

const getAppById = async (id) => {
  const app = await App.findByPk(id);

  return app;
};

const createApp = async (app) => {
  const newApp = await App.create(app);

  return newApp;
};

const updateApp = async (app) => {
  const updatedApp = await App.update(app, {
    where: { id: app.id },
  });

  return updatedApp;
};

const deleteApp = async (id) => {
  const deletedApp = await App.destroy({
    where: { id: id },
  });

  return deletedApp;
};

module.exports = {
  getAllApps,
  getAppById,
  createApp,
  updateApp,
  deleteApp,
};
