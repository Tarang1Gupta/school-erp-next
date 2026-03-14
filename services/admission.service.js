import api from "./api"
export const admissionService = {
  getAll: (params) => api.get("/admissions", { params }).then((r) => r.data),
  getById: (id) => api.get(`/admissions/${id}`).then((r) => r.data),
  create: (body) => api.post("/admissions", body).then((r) => r.data),
  update: (id, body) => api.put(`/admissions/${id}`, body).then((r) => r.data),
  convertToStudent: (id) => api.post(`/admissions/${id}/convert`).then((r) => r.data),
  uploadDocument: (id, formData) => api.post(`/admissions/${id}/documents`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  }).then((r) => r.data),
}
