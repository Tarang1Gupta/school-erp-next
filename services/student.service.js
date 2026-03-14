import api from "./api"

export const studentService = {
  getAll: (params) => api.get("/students", { params }).then((r) => r.data),
  getById: (id) => api.get(`/students/${id}`).then((r) => r.data),
  create: (body) => api.post("/students", body).then((r) => r.data),
  update: (id, body) => api.put(`/students/${id}`, body).then((r) => r.data),
  delete: (id) => api.delete(`/students/${id}`).then((r) => r.data),
  bulkImport: (formData) => api.post("/students/bulk-import", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  }).then((r) => r.data),
  promote: (body) => api.post("/students/promote", body).then((r) => r.data),
  generateIdCards: (ids) => api.post("/students/id-cards", { ids }).then((r) => r.data),
  generateCertificate: (id, type) => api.get(`/students/${id}/certificate/${type}`).then((r) => r.data),
}
