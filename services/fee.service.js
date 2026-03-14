import api from "./api"
export const feeService = {
  getOverview: () => api.get("/fees/overview").then((r) => r.data),
  getStructure: () => api.get("/fees/structure").then((r) => r.data),
  createStructure: (body) => api.post("/fees/structure", body).then((r) => r.data),
  collect: (body) => api.post("/fees/collect", body).then((r) => r.data),
  getPending: (params) => api.get("/fees/pending", { params }).then((r) => r.data),
  getReceipts: (params) => api.get("/fees/receipts", { params }).then((r) => r.data),
  getReceipt: (id) => api.get(`/fees/receipts/${id}`).then((r) => r.data),
  applyConcession: (body) => api.post("/fees/concession", body).then((r) => r.data),
  getOnlinePayments: (params) => api.get("/fees/online-payments", { params }).then((r) => r.data),
}
