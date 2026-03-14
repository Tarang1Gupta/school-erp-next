import api from "./api"
export const classService = {
  getAll: () => api.get("/classes").then((r) => r.data),
  getById: (id) => api.get(`/classes/${id}`).then((r) => r.data),
  create: (body) => api.post("/classes", body).then((r) => r.data),
  update: (id, body) => api.put(`/classes/${id}`, body).then((r) => r.data),
}
