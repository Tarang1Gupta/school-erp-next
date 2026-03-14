import api from "./api"
export const attendanceService = {
  getByClass: (classId, date) => api.get("/attendance", { params: { classId, date } }).then((r) => r.data),
  mark: (body) => api.post("/attendance", body).then((r) => r.data),
  getReport: (params) => api.get("/attendance/report", { params }).then((r) => r.data),
  getLowAttendance: (params) => api.get("/attendance/low", { params }).then((r) => r.data),
}
