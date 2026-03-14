import api from "./api"
export const timetableService = {
  getByClass: (classId) => api.get(`/timetable/class/${classId}`).then((r) => r.data),
  getByTeacher: (teacherId) => api.get(`/timetable/teacher/${teacherId}`).then((r) => r.data),
  save: (body) => api.post("/timetable", body).then((r) => r.data),
}
