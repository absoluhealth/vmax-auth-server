const e = require("express");
const AppTenantMapping = require("../models").AppTenantMapping;

const getAllMappings = async () => {
  const apps = await AppTenantMapping.findAll({
    limit: 10,
  });

  return apps;
};

const getMappingById = async (id) => {
  const app = await AppTenantMapping.findByPk(id);

  return app;
};

const createMapping = async (app) => {
  const newApp = await AppTenantMapping.create(app);

  return newApp;
};

const updateMapping = async (app) => {
  const updatedApp = await AppTenantMapping.update(app, {
    where: { id: app.id },
  });

  return updatedApp;
};

const deleteMapping = async (id) => {
  const deletedApp = await AppTenantMapping.destroy({
    where: { id: id },
  });

  return deletedApp;
};

module.exports = {
  getAllMappings,
  getMappingById,
  createMapping,
  updateMapping,
  deleteMapping,
};
