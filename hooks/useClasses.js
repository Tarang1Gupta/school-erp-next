import { useQuery } from "@tanstack/react-query"
import { classService } from "@/services/class.service"

export const useClasses = () =>
  useQuery({ queryKey: ["classes"], queryFn: classService.getAll })

export const useClass = (id) =>
  useQuery({ queryKey: ["classes", id], queryFn: () => classService.getById(id), enabled: !!id })
