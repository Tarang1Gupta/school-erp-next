import { z } from "zod"

export const loginSchema = z.object({
  email:    z.string().email("Valid email required"),
  password: z.string().min(6, "Min 6 characters"),
})

export const studentSchema = z.object({
  name:          z.string().min(2, "Name required"),
  rollNumber:    z.string().min(1, "Roll number required"),
  classId:       z.string().min(1, "Class required"),
  section:       z.string().min(1, "Section required"),
  dob:           z.string().min(1, "DOB required"),
  gender:        z.enum(["male", "female", "other"]),
  phone:         z.string().length(10, "10 digit number"),
  parentName:    z.string().min(2, "Parent name required"),
  parentPhone:   z.string().length(10, "10 digit number"),
  address:       z.string().optional(),
  session:       z.string().min(1, "Session required"),
})

export const teacherSchema = z.object({
  name:       z.string().min(2, "Name required"),
  email:      z.string().email("Valid email required"),
  phone:      z.string().length(10, "10 digit number"),
  subjects:   z.array(z.string()).min(1, "Select at least one subject"),
  gender:     z.enum(["male", "female", "other"]),
  joiningDate:z.string().min(1, "Joining date required"),
})

export const feeSchema = z.object({
  studentId:  z.string().min(1, "Student required"),
  feeHead:    z.string().min(1, "Fee head required"),
  amount:     z.number().positive("Amount must be positive"),
  paymentMode:z.enum(["cash", "online", "cheque", "dd"]),
  remarks:    z.string().optional(),
})
