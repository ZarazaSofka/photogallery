export const userAPI = axios.create({
  baseURL: config.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const readUser = async (userId) =>
  userAPI.get(`/user/${userId}`).then((res) => res.data);

export const register = async (user) =>
  userAPI.post("/register", user).then((res) => res.data);

export const login = async (user) =>
  userAPI.post("/login", user).then((res) => res.data);

export const updateUser = (user) =>
  userAPI.put("/user", user).then((res) => res.data);

export const deleteUser = userAPI.delete("/user");
