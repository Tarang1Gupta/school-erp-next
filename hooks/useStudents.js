import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { studentService } from "@/services/student.service"
import toast from "react-hot-toast"

export const useStudents = (params) =>
  useQuery({ queryKey: ["students", params], queryFn: () => studentService.getAll(params) })

export const useStudent = (id) =>
  useQuery({ queryKey: ["students", id], queryFn: () => studentService.getById(id), enabled: !!id })

export const useCreateStudent = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: studentService.create,
    onSuccess: () => { qc.invalidateQueries(["students"]); toast.success("Student added!") },
    onError: (e) => toast.error(e?.response?.data?.message || "Failed"),
  })
}

export const useUpdateStudent = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, body }) => studentService.update(id, body),
    onSuccess: () => { qc.invalidateQueries(["students"]); toast.success("Student updated!") },
    onError: (e) => toast.error(e?.response?.data?.message || "Failed"),
  })
}

export const useDeleteStudent = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: studentService.delete,
    onSuccess: () => { qc.invalidateQueries(["students"]); toast.success("Student deleted!") },
    onError: (e) => toast.error(e?.response?.data?.message || "Failed"),
  })
}
