import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { attendanceService } from "@/services/attendance.service"
import toast from "react-hot-toast"

export const useAttendance = (classId, date) =>
  useQuery({ queryKey: ["attendance", classId, date], queryFn: () => attendanceService.getByClass(classId, date), enabled: !!classId && !!date })

export const useAttendanceReport = (params) =>
  useQuery({ queryKey: ["attendance-report", params], queryFn: () => attendanceService.getReport(params) })

export const useLowAttendance = (params) =>
  useQuery({ queryKey: ["low-attendance", params], queryFn: () => attendanceService.getLowAttendance(params) })

export const useMarkAttendance = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: attendanceService.mark,
    onSuccess: () => { qc.invalidateQueries(["attendance"]); toast.success("Attendance saved!") },
    onError: (e) => toast.error(e?.response?.data?.message || "Failed"),
  })
}
