import api from "./api"
export const noticeService = {
  getAll: (params) => api.get("/notices", { params }).then((r) => r.data),
  create: (body) => api.post("/notices", body).then((r) => r.data),
  delete: (id) => api.delete(`/notices/${id}`).then((r) => r.data),
}
