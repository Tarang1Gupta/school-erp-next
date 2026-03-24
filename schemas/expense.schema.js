// lib/validators/expense.ts
import { z } from "zod"

export const expenseSchema = z.object({
  // Required
  date: z
    .string()
    .min(1, "Date is required"),

  category: z
    .string()
    .min(1, "Please select a category")
    .refine((v) => v !== "", { message: "Please select a category" }),

  amount: z
    .number({ invalid_type_error: "Amount must be a number" })
    .positive("Amount must be greater than 0"),

  paymentMethod: z
    .enum(["transfer", "card", "cash"], {
      errorMap: () => ({ message: "Select a payment method" }),
    })
    .default("transfer"),

  // Optional
  reference: z.string().optional().or(z.literal("")),

  description: z.string().optional().or(z.literal("")),
})

export type ExpenseFormValues = z.infer<typeof expenseSchema>