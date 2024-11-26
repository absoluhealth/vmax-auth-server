const sampelModel = require("../services/sample.service");

const getSamples = async (req, res) => {
  try {
    const sample = await sampelModel.getAllSample();
    return res.send(sample);
  } catch (error) {
    //logger.error(error);
    return res.send("Cannot fetch samples.");
  }
};

const getSample = async (req, res) => {
  try {
    const id = req.params.id;
    const sample = await sampelModel.getSampleById(id);
    return res.send(sample);
  } catch (error) {
    //  logger.error(error);
    return res.send("Cannot fetch sample 123.");
  }
};

const createSample = async (req, res) => {
  try {
    const sample = await sampelModel.createSample(req.body);
    return res.send(sample);
  } catch (error) {
    //  logger.error(error);
    return res.send(" Cannot create samples.");
  }
};

// const deleteSample = async (req, res) => {
//   try {
//     const id = req.params.id
//     const sample = await sampelModel.deleteSample(id);
//     return successResponse(req, res, sample)
//   } catch (error) {
//     logger.error(error)
//     return errorResponse(req, res, "Cannot delete samples.");
//   }

// };

// const updateSample = async (req, res) => {
//   try {
//     const id = req.params.id
//     const sample = await sampelModel.updateSample(id, req.body);
//     return successResponse(req, res, sample)
//   } catch (error) {
//     logger.error(error)
//     return errorResponse(req, res, "Cannot update samples.");
//   }

// };

module.exports = { getSamples, createSample, getSample };
