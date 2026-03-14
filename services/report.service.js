import api from "./api"
export const reportService = {
  getAttendance: (params) => api.get("/reports/attendance", { params }).then((r) => r.data),
  getFinance: (params) => api.get("/reports/finance", { params }).then((r) => r.data),
  getAcademics: (params) => api.get("/reports/academics", { params }).then((r) => r.data),
  getAuditLogs: (params) => api.get("/reports/audit-logs", { params }).then((r) => r.data),
}
