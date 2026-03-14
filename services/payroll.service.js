import api from "./api"
export const payrollService = {
  getOverview: (month, year) => api.get("/payroll", { params: { month, year } }).then((r) => r.data),
  getStructure: (teacherId) => api.get(`/payroll/structure/${teacherId}`).then((r) => r.data),
  saveStructure: (body) => api.post("/payroll/structure", body).then((r) => r.data),
  generate: (body) => api.post("/payroll/generate", body).then((r) => r.data),
  getSlip: (teacherId, month, year) => api.get(`/payroll/slip`, { params: { teacherId, month, year } }).then((r) => r.data),
}
