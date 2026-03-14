import api from "./api"
export const smsService = {
  sendBulk: (body) => api.post("/sms/send", body).then((r) => r.data),
  getHistory: (params) => api.get("/sms/history", { params }).then((r) => r.data),
}
