import api from "./api"
export const transportService = {
  getRoutes: () => api.get("/transport/routes").then((r) => r.data),
  createRoute: (body) => api.post("/transport/routes", body).then((r) => r.data),
  getDrivers: () => api.get("/transport/drivers").then((r) => r.data),
  assignStudent: (body) => api.post("/transport/assign", body).then((r) => r.data),
}
