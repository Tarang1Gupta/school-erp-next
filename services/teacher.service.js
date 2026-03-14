import api from "./api"
export const teacherService = {
  getAll: (params) => api.get("/teachers", { params }).then((r) => r.data),
  getById: (id) => api.get(`/teachers/${id}`).then((r) => r.data),
  create: (body) => api.post("/teachers", body).then((r) => r.data),
  update: (id, body) => api.put(`/teachers/${id}`, body).then((r) => r.data),
  delete: (id) => api.delete(`/teachers/${id}`).then((r) => r.data),
}
