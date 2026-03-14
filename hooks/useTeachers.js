import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { teacherService } from "@/services/teacher.service"
import toast from "react-hot-toast"

export const useTeachers = (params) =>
  useQuery({ queryKey: ["teachers", params], queryFn: () => teacherService.getAll(params) })

export const useTeacher = (id) =>
  useQuery({ queryKey: ["teachers", id], queryFn: () => teacherService.getById(id), enabled: !!id })

export const useCreateTeacher = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: teacherService.create,
    onSuccess: () => { qc.invalidateQueries(["teachers"]); toast.success("Teacher added!") },
    onError: (e) => toast.error(e?.response?.data?.message || "Failed"),
  })
}

export const useUpdateTeacher = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, body }) => teacherService.update(id, body),
    onSuccess: () => { qc.invalidateQueries(["teachers"]); toast.success("Updated!") },
    onError: (e) => toast.error(e?.response?.data?.message || "Failed"),
  })
}
