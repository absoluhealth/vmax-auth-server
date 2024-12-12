jest.useFakeTimers();
const {
  createApp,
  getAppById,
  updateApp,
  deleteApp,
  getAllApps,
} = require("../../src/services/application.service");

const { Application } = require("../../src/models");

jest.mock("../../src/models", () => ({
  Application: {
    findAll: jest.fn().mockResolvedValue([]),
    findByPk: jest.fn().mockResolvedValue(null),
    create: jest.fn().mockResolvedValue({}),
    update: jest.fn().mockResolvedValue({}),
    destroy: jest.fn().mockResolvedValue(1),
  },
}));

describe("Application Functions", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock data after each test
  });

  test("should get all Application", async () => {
    const mockApp = [
      {
        id: 1,
        name: "Sample1",
        client_id: "123",
        client_secret: "123",
        display_name: "Sample1",
        app_url: "http://localhost:5200",
        status: "active",
      },
      {
        id: 2,
        name: "Sample2",
        client_id: "123",
        client_secret: "123",
        display_name: "Sample2",
        app_url: "http://localhost:5200",
        status: "active",
      },
    ];
    Application.findAll.mockResolvedValue(mockApp);

    const result = await getAllApps();
    expect(Application.findAll).toHaveBeenCalledWith({ limit: 10 });
    expect(result).toEqual(mockApp);
  });

  test("should create a new Application", async () => {
    const mockApp = {
      name: "Sample1",
      client_id: "123",
      client_secret: "123",
      display_name: "Sample1",
      app_url: "http://localhost:5200",
      status: "active",
    };
    Application.create.mockResolvedValue(mockApp);

    const result = await createApp(mockApp);
    expect(Application.create).toHaveBeenCalledWith(mockApp);
    expect(result).toEqual(mockApp);
  });

  test("should return null if Application not found", async () => {
    const mockApp = null;
    Application.findByPk.mockResolvedValue(mockApp);

    const result = await getAppById(1);
    expect(Application.findByPk).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockApp);
  });

  test("should update an Application", async () => {
    const mockApp = {
      id: 1,
      name: "Sample1",
      client_id: "123",
      client_secret: "123",
      display_name: "Sample1",
      app_url: "http://localhost:5200",
      status: "active",
    };
    Application.update.mockResolvedValue([1, [mockApp]]);

    const result = await updateApp(mockApp);
    expect(Application.update).toHaveBeenCalledWith(mockApp, {
      where: { id: mockApp.id },
    });
    expect(result).toEqual([1, [mockApp]]);
  });

  test("should delete an Application", async () => {
    const mockApp = 1;
    Application.destroy.mockResolvedValue(1);

    const result = await deleteApp(1);
    expect(Application.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(result).toEqual(1);
  });

  test("should return 0 if Application not found", async () => {
    const mockApp = 0;
    Application.destroy.mockResolvedValue(mockApp);

    const result = await deleteApp(1);
    expect(Application.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(result).toEqual(0);
  });
});
