import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { feeService } from "@/services/fee.service"
import toast from "react-hot-toast"

export const useFeeOverview = () =>
  useQuery({ queryKey: ["fee-overview"], queryFn: feeService.getOverview })

export const useFeeStructure = () =>
  useQuery({ queryKey: ["fee-structure"], queryFn: feeService.getStructure })

export const usePendingFees = (params) =>
  useQuery({ queryKey: ["pending-fees", params], queryFn: () => feeService.getPending(params) })

export const useFeeReceipts = (params) =>
  useQuery({ queryKey: ["fee-receipts", params], queryFn: () => feeService.getReceipts(params) })

export const useCollectFee = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: feeService.collect,
    onSuccess: () => { qc.invalidateQueries(["fee-overview"]); qc.invalidateQueries(["pending-fees"]); toast.success("Fee collected!") },
    onError: (e) => toast.error(e?.response?.data?.message || "Failed"),
  })
}
