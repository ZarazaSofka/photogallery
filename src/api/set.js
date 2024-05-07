export const createSet = async (set) => (await api.post("/set", set)).data;

export const readSet = async (id) => (await api.get(`/set/${id}`)).data;

export const updateSet = async (id, set) =>
  (await api.put(`/set/${id}`, set)).data;

export const deleteSet = async (id) => (await api.delete(`/set/${id}`)).data;

export const addPhotoToSet = async (set_id, photo_id) =>
  (await api.put(`/set/${set_id}/photos/${photo_id}`)).data;

export const deletePhotoFromSet = async (set_id, photo_id) =>
  (await api.delete(`/set/${set_id}/photos/${photo_id}`)).data;

export const getNewSets = async () => (await api.get(`/set/new`)).data;

export const readUserSets = async (userId) =>
  (await api.get(`/set/user/${userId}`)).data;
