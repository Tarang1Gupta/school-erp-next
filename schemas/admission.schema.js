import { z } from "zod"

// ─── Step 1: Basic Details ─────────────────────────────────────────────
const basicDetailsSchema = z.object({
  registrationNo:     z.string().optional(),
  srNo:               z.string().optional(),
  admissionNo:        z.string().optional(),
  rollNo:             z.string().optional(),
  fullName:           z.string().min(2, "Student name is required"),
  dob:                z.string().min(1, "Date of birth is required"),
  grade:              z.string().min(1, "Class is required"),
  section:            z.string().optional(),
  gender:             z.string().min(1, "Gender is required"),
  bloodGroup:         z.string().optional(),
  aadhaar:            z.string().optional(),
  penNo:              z.string().optional(),
  mobileNo:           z.string().optional(),
  religion:           z.string().optional(),
  nationality:        z.string().optional(),
  category:           z.string().optional(),
  rte:                z.string().optional(),
  bplStudent:         z.string().optional(),
  bplCardNo:          z.string().optional(),
  pwd:                z.string().optional(),
  identificationMark: z.string().optional(),
  weight:             z.string().optional(),
  height:             z.string().optional(),
  bmi:                z.string().optional(),
  covidVaccination:   z.string().optional(),
})

// ─── Step 2: Parent Details ────────────────────────────────────────────
const singleParentSchema = z.object({
  name:          z.string().min(2, "Name is required"),
  mobile:        z.string().min(10, "Valid mobile required"),
  email:         z.string().email("Invalid email").optional().or(z.literal("")),
  qualification: z.string().optional(),
  occupation:    z.string().optional(),
  organization:  z.string().optional(),
  designation:   z.string().optional(),
  income:        z.string().optional(),
})

const parentDetailsSchema = z.object({
  father:   singleParentSchema,
  mother:   singleParentSchema,
  guardian: singleParentSchema.partial(),
})

// ─── Step 3: Address ───────────────────────────────────────────────────
const addressSchema = z.object({
  presentAddress: z.object({
    line1:   z.string().min(1, "Address is required"),
    line2:   z.string().optional(),
    city:    z.string().min(1, "City is required"),
    state:   z.string().min(1, "State is required"),
    pincode: z.string().min(6, "Valid 6-digit pincode required"),
    country: z.string().optional(),
  }),
  permanentAddress: z.object({
    line1:   z.string().optional(),
    line2:   z.string().optional(),
    city:    z.string().optional(),
    state:   z.string().optional(),
    pincode: z.string().optional(),
    country: z.string().optional(),
  }),
})

// ─── Step 4: Previous School ───────────────────────────────────────────
const previousSchoolSchema = z.object({
  school: z.object({
    name:          z.string().min(2, "School name is required"),
    address:       z.string().optional(),
    udiseCode:     z.string().optional(),
    board:         z.string().min(1, "Board is required"),
    tcNumber:      z.string().optional(),
    lastClass:     z.string().min(1, "Last class is required"),
    yearOfPassing: z.string().min(1, "Year of passing is required"),
    result:        z.string().optional(),
    medium:        z.string().optional(),
    tcAvailable:   z.boolean().optional(),
    remarks:       z.string().optional(),
  }),
})

// ─── Step 5: Documents ─────────────────────────────────────────────────
const documentsSchema = z.object({}).passthrough()

// ─── Step 6: Fee Assignment ────────────────────────────────────────────
const feeSchema = z.object({
  fee: z.object({
    template:    z.string().min(1, "Fee template is required"),
    installment: z.string().min(1, "Installment plan is required"),
    discount:    z.string().optional(),
    adjustment:  z.string().optional(),
  }),
})

// ─── Step 7: Review ────────────────────────────────────────────────────
const reviewSchema = z.object({}).passthrough()

// ─── stepSchemas[] — 0-indexed, matches currentStep state ─────────────
export const stepSchemas = [
  basicDetailsSchema,   // currentStep 0
  parentDetailsSchema,  // currentStep 1
  addressSchema,        // currentStep 2
  previousSchoolSchema, // currentStep 3
  documentsSchema,      // currentStep 4
  feeSchema,            // currentStep 5
  reviewSchema,         // currentStep 6
]

// ─── fullSchema — for final submit ────────────────────────────────────
export const fullSchema = z.object({
  // Basic
  registrationNo:     z.string().optional(),
  srNo:               z.string().optional(),
  admissionNo:        z.string().optional(),
  rollNo:             z.string().optional(),
  fullName:           z.string().min(2, "Student name is required"),
  dob:                z.string().min(1, "Date of birth is required"),
  grade:              z.string().min(1, "Class is required"),
  section:            z.string().optional(),
  gender:             z.string().min(1, "Gender is required"),
  bloodGroup:         z.string().optional(),
  aadhaar:            z.string().optional(),
  penNo:              z.string().optional(),
  mobileNo:           z.string().optional(),
  religion:           z.string().optional(),
  nationality:        z.string().optional(),
  category:           z.string().optional(),
  rte:                z.string().optional(),
  bplStudent:         z.string().optional(),
  bplCardNo:          z.string().optional(),
  pwd:                z.string().optional(),
  identificationMark: z.string().optional(),
  weight:             z.string().optional(),
  height:             z.string().optional(),
  bmi:                z.string().optional(),
  covidVaccination:   z.string().optional(),
  // Parents
  father:   singleParentSchema,
  mother:   singleParentSchema,
  guardian: singleParentSchema.partial(),
  // Address
  presentAddress: z.object({
    line1:   z.string().min(1, "Address is required"),
    line2:   z.string().optional(),
    city:    z.string().min(1, "City is required"),
    state:   z.string().min(1, "State is required"),
    pincode: z.string().min(6, "Valid 6-digit pincode required"),
    country: z.string().optional(),
  }),
  permanentAddress: z.object({
    line1:   z.string().optional(),
    line2:   z.string().optional(),
    city:    z.string().optional(),
    state:   z.string().optional(),
    pincode: z.string().optional(),
    country: z.string().optional(),
  }),
  // School
  school: z.object({
    name:          z.string().min(2, "School name is required"),
    address:       z.string().optional(),
    udiseCode:     z.string().optional(),
    board:         z.string().min(1, "Board is required"),
    tcNumber:      z.string().optional(),
    lastClass:     z.string().min(1, "Last class is required"),
    yearOfPassing: z.string().min(1, "Year of passing is required"),
    result:        z.string().optional(),
    medium:        z.string().optional(),
    tcAvailable:   z.boolean().optional(),
    remarks:       z.string().optional(),
  }),
  // Fee
  fee: z.object({
    template:    z.string().min(1, "Fee template is required"),
    installment: z.string().min(1, "Installment plan is required"),
    discount:    z.string().optional(),
    adjustment:  z.string().optional(),
  }),
})