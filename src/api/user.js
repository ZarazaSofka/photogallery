export const userAPI = axios.create({
  baseURL: config.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const register = async (user) => {
  const response = await userAPI.post("/register", user);
  return response.data;
};

export const login = async (user) => {
  const response = await userAPI.post("/login", user);
  return response.data;
};

export const updateUser = async (user) => {
  const response = await userAPI.put("/user", user);
  return response.data;
};

export const deleteUser = async () => {
  const response = await userAPI.delete("/user");
  return response.data;
};
