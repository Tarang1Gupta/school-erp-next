import api from "./api"
export const examService = {
  getAll: () => api.get("/exams").then((r) => r.data),
  create: (body) => api.post("/exams", body).then((r) => r.data),
  getMarks: (params) => api.get("/exams/marks", { params }).then((r) => r.data),
  saveMarks: (body) => api.post("/exams/marks", body).then((r) => r.data),
  importMarks: (formData) => api.post("/exams/marks/import", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  }).then((r) => r.data),
  getReportCards: (params) => api.get("/exams/report-cards", { params }).then((r) => r.data),
  getHallTickets: (params) => api.get("/exams/hall-tickets", { params }).then((r) => r.data),
}
