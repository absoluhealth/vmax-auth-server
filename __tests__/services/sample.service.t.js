// sampleService.test.js
const {
  getAllSample,
  getSampleById,
  createSample,
  updateSample,
  deleteSample,
} = require("../../src/services/sample.service");
const { Sample } = require("../../src/models");

jest.mock("../../src/models", () => ({
  Sample: {
    findAll: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockResolvedValue(null),
    create: jest.fn().mockResolvedValue({
      /* mock created instance */
    }),
    update: jest.fn().mockResolvedValue([1, []]),
    destroy: jest.fn().mockResolvedValue(1),
  },
}));

describe("Sample Service Tests", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock data after each test
  });

  test("should get all samples", async () => {
    const mockSamples = [
      { id: 1, name: "Sample1" },
      { id: 2, name: "Sample2" },
    ];
    Sample.findAll.mockResolvedValue(mockSamples);

    const result = await getAllSample();
    expect(Sample.findAll).toHaveBeenCalledWith({ limit: 10 });
    expect(result).toEqual(mockSamples);
  });

  test("should get sample by id", async () => {
    const mockSample = { id: 1, name: "Sample1" };
    const sampleId = 1;
    Sample.findOne.mockResolvedValue(mockSample);

    const result = await getSampleById(sampleId);
    expect(Sample.findOne).toHaveBeenCalledWith({
      attributes: ["id", "name"],
      where: { id: sampleId },
    });
    expect(result).toEqual(mockSample);
  });

  test("should create a sample", async () => {
    const newSample = { name: "New Sample" };
    const createdSample = { id: 1, ...newSample };
    Sample.create.mockResolvedValue(createdSample);

    const result = await createSample(newSample);
    expect(Sample.create).toHaveBeenCalledWith(newSample);
    expect(result).toEqual(createdSample);
  });

  test("should update a sample", async () => {
    const sampleId = 1;
    const updatedSample = { name: "Updated Sample" };
    Sample.update.mockResolvedValue([1, [updatedSample]]); // Sequelize returns an array with affected rows and instances

    const result = await updateSample(sampleId, updatedSample);
    expect(Sample.update).toHaveBeenCalledWith(updatedSample, {
      where: { id: sampleId },
    });
    expect(result).toEqual([1, [updatedSample]]);
  });

  test("should delete a sample", async () => {
    const sampleId = 1;
    Sample.destroy.mockResolvedValue(1); // Sequelize returns the number of affected rows

    const result = await deleteSample(sampleId);
    expect(Sample.destroy).toHaveBeenCalledWith({ where: { id: sampleId } });
    expect(result).toEqual(1);
  });
});
