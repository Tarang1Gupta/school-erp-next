import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { examService } from "@/services/exam.service"
import toast from "react-hot-toast"

export const useExams = () =>
  useQuery({ queryKey: ["exams"], queryFn: examService.getAll })

export const useExamMarks = (params) =>
  useQuery({ queryKey: ["exam-marks", params], queryFn: () => examService.getMarks(params), enabled: !!params?.examId })

export const useSaveMarks = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: examService.saveMarks,
    onSuccess: () => { qc.invalidateQueries(["exam-marks"]); toast.success("Marks saved!") },
    onError: (e) => toast.error(e?.response?.data?.message || "Failed"),
  })
}
