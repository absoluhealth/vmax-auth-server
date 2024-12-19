jest.useFakeTimers();
const {
  createUser,
  getAllUser,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
} = require("../../src/services/user.service");

const { User } = require("../../src/models");

jest.mock("../../src/models", () => {
  const originalModule = jest.requireActual("../../src/models");
  return {
    ...originalModule,
    User: {
      findAll: jest.fn().mockResolvedValue([]),
      findByPk: jest.fn().mockResolvedValue(null),
      findOne: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockResolvedValue({
        /* mock created instance */
      }),
      update: jest.fn().mockResolvedValue({}),
      destroy: jest.fn().mockResolvedValue(1),
    },
  };
});

describe("User Functions", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock data after each test
  });

  test("should get all User", async () => {
    const mockUser = [
      {
        id: 1,
        first_name: "Sample1",
        last_name: "User1",
        email: "rv@gmail.com",
        phone: "1234567890",
        user_name: "rv",
        identity_id: "123",
        invalid_login_attempts: 0,
        is_locked: false,
        is_deleted: false,
        last_login: "2021-08-20T14:20:00.000Z",
      },
      {
        id: 2,
        first_name: "Sample2",
        last_name: "User2",
        email: "mano@gmail.com",
        phone: "1234567890",
        user_name: "mano",
        identity_id: "1234",
        invalid_login_attempts: 0,
        is_locked: false,
        is_deleted: false,
        last_login: "2021-08-20T14:20:00.000Z",
      },
    ];
    User.findAll.mockResolvedValue(mockUser);

    const users = await getAllUser();
    expect(User.findAll).toHaveBeenCalledWith({ limit: 10 });
    expect(users).toEqual(mockUser);
  });

  test("should get user by id", async () => {
    const mockUser = {
      id: 1,
      first_name: "Sample1",
      last_name: "User1",
      email: "rv@gmail.com",
      phone: "1234567890",
      user_name: "mano",
      identity_id: "1234",
      invalid_login_attempts: 0,
      is_locked: false,
      is_deleted: false,
      last_login: "2021-08-20T14:20:00.000Z",
    };
    User.findByPk.mockResolvedValue(mockUser);
    const userId = 1;
    const result = await getUserById(userId);
    expect(User.findByPk).toHaveBeenCalledWith(userId);
    expect(result).toEqual(mockUser);
  });

  test("should get user by email", async () => {
    const mockUser = {
      id: 1,
      first_name: "Sample1",
      last_name: "User1",
      email: "rv@gmail.com",
      phone: "1234567890",
      user_name: "mano",
      identity_id: "1234",
      invalid_login_attempts: 0,
      is_locked: false,
      is_deleted: false,
      last_login: "2021-08-20T14:20:00.000Z",
    };

    User.findOne.mockResolvedValue(mockUser);

    const email = "rv@gmail.com";
    const result = await getUserByEmail(email);
    expect(User.findOne).toHaveBeenCalledWith({
      attributes: [
        "id",
        "first_name",
        "last_name",
        "email",
        "phone",
        "user_name",
        "identity_id",
        "invalid_login_attempts",
        "is_locked",
        "tenant_id",
      ],
      where: {
        email: email,
      },
    });

    expect(result).toEqual(mockUser);
  });

  test("should create a user", async () => {
    const mockUser = {
      first_name: "Sample1",
      last_name: "User1",
      email: "rv@gmail.com",
      phone: "1234567890",
      user_name: "mano",
      identity_id: "1234",
      last_login: "2021-08-20T14:20:00.000Z",
      app_map_ids: [],
    };
    User.create.mockResolvedValue(mockUser);

    const result = await createUser(mockUser);
    expect(User.create).toHaveBeenCalledWith(mockUser);
    expect(result).toEqual(mockUser);
  });

  test("should update a user", async () => {
    const mockUser = {
      id: 1,
      first_name: "Sample1",
      last_name: "User1",
      email: "rv@gmail.com",
      phone: "1234567890",
      user_name: "mano",
      identity_id: "1234",
      last_login: "2021-08-20T14:20:00.000Z",
      app_map_ids: [],
    };
    User.update.mockResolvedValue([1, [mockUser]]);
    const userId = 1;
    const result = await updateUser(userId, mockUser);
    expect(User.update).toHaveBeenCalledWith(mockUser, {
      where: { id: userId },
    });
    expect(result).toEqual([1, [mockUser]]);
  });

  test("should delete a user", async () => {
    const userId = 1;
    User.destroy.mockResolvedValue(1); // Sequelize returns the number of affected rows

    const result = await deleteUser(userId);
    expect(User.destroy).toHaveBeenCalledWith({ where: { id: userId } });
    expect(result).toEqual(1);
  });
});
