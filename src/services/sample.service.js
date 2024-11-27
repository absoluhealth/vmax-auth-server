const Sample = require("../models").Sample;

const getAllSample = async () => {
  const samples = await Sample.findAll({
    limit: 10,
  });

  return samples;
};

const getSampleById = async (id) => {
  const sample = await Sample.findOne({
    attributes: ["id", "name"],
    where: {
      id: id,
    },
  });

  // const sample = await Sample.findByPk(id);

  return sample;
};

const createSample = async (sample) => {
  const result = await Sample.create(sample);

  return result;
};

const updateSample = async (id, sample) => {
  const result = await Sample.update(
    sample, // Values to update
    { where: { id: id } }
  );

  return result;
};

const deleteSample = async (id) => {
  const result = await Sample.destroy({
    where: {
      id: id,
    },
  });

  return result;
};

module.exports = {
  getAllSample,
  getSampleById,
  createSample,
  updateSample,
  deleteSample,
};
