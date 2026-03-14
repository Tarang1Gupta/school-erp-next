export const basicDetailsFields = [
  // Row 1
  {
    name: "registrationNo",
    label: "Registration No.",
    type: "text",
    placeholder: "Enter Registration No.",
  },
  {
    name: "studentName",
    label: "Student Name",
    type: "text",
    placeholder: "Enter Name",
    required: true,
  },
  {
    name: "dob",
    label: "DOB",
    type: "date",
    required: true,
  },

  // Row 2
  {
    name: "class",
    label: "Class",
    type: "select",
    required: true,
    options: [1,2,3,4,5,6,7,8,9,10].map((g) => ({
      value: String(g),
      label: `Grade ${g}`,
    })),
  },
  {
    name: "section",
    label: "Section",
    type: "text",
    placeholder: "Section",
  },
  {
    name: "gender",
    label: "Gender",
    type: "select",
    required: true,
    options: [
      { value: "male",   label: "Male" },
      { value: "female", label: "Female" },
      { value: "other",  label: "Other" },
    ],
  },

  // Row 3
  {
    name: "bloodGroup",
    label: "Blood Group",
    type: "select",
    options: ["A+","A-","B+","B-","O+","O-","AB+","AB-"].map((b) => ({
      value: b,
      label: b,
    })),
  },
  {
    name: "aadharNo",
    label: "Aadhar No.",
    type: "text",
    placeholder: "12-digit number",
  },
  {
    name: "penNo",
    label: "PEN No.",
    type: "text",
    placeholder: "Enter PEN No.",
  },

  // Row 4
  {
    name: "mobileNo",
    label: "Mobile No.",
    type: "tel",
    placeholder: "Enter Mobile No.",
  },
  {
    name: "religion",
    label: "Religion",
    type: "text",
  },
  {
    name: "nationality",
    label: "Nationality",
    type: "text",
  },

  // Row 5
  {
    name: "category",
    label: "Category",
    type: "select",
    options: [
      { value: "general", label: "General" },
      { value: "obc",     label: "OBC" },
      { value: "sc",      label: "SC" },
      { value: "st",      label: "ST" },
    ],
  },
  {
    name: "rte",
    label: "Right to Education (Yes/No)",
    type: "select",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no",  label: "No" },
    ],
  },
  {
    name: "bplStudent",
    label: "BPL Student (Yes/No)",
    type: "select",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no",  label: "No" },
    ],
  },

  // Row 6
  {
    name: "bplCardNo",
    label: "BPL Card No.",
    type: "text",
  },
  {
    name: "pwd",
    label: "Person with Disability (PwD)",
    type: "select",
    options: [
      { value: "no",  label: "No" },
      { value: "yes", label: "Yes" },
    ],
  },
  {
    name: "identificationMark",
    label: "Identification Mark",
    type: "text",
  },

  // Row 7
  {
    name: "weight",
    label: "Weight (kg)",
    type: "number",
  },
  {
    name: "height",
    label: "Height (cm)",
    type: "number",
  },
  {
    name: "bmi",
    label: "Body Mass Index (BMI)",
    type: "text",
    placeholder: "Auto-calculated",
    readOnly: true,
  },

  // Row 8
  {
    name: "covidVaccination",
    label: "COVID Vaccination",
    type: "select",
    options: [
      { value: "none",   label: "None" },
      { value: "single", label: "Single Dose" },
      { value: "both",   label: "Both Dose" },
    ],
  },
]

// ── Father Fields ──────────────────────────────────────────────────────────
export const fatherFields = [
  { name: "fatherName",          label: "Father Name",              type: "text",   placeholder: "e.g. Robert Smith",      required: true },
  { name: "fatherMobile",        label: "Mobile No.",               type: "tel",    placeholder: "+91 00000 00000",        required: true },
  { name: "fatherEmail",         label: "Email ID",                 type: "email",  placeholder: "robert@example.com" },
  { name: "fatherQualification", label: "Educational Qualification",type: "text",   placeholder: "e.g. Graduate" },
  { name: "fatherOccupation",    label: "Occupation",               type: "text",   placeholder: "e.g. Engineer" },
  { name: "fatherOrgName",       label: "Organization Name",        type: "text",   placeholder: "Company Name" },
  { name: "fatherDesignation",   label: "Designation",              type: "text",   placeholder: "e.g. Manager" },
  { name: "fatherIncome",        label: "Annual Income (₹)",        type: "number", placeholder: "e.g. 500000" },
]

// ── Mother Fields ──────────────────────────────────────────────────────────
export const motherFields = [
  { name: "motherName",          label: "Mother Name",              type: "text",   placeholder: "e.g. Jane Smith",        required: true },
  { name: "motherMobile",        label: "Mobile No.",               type: "tel",    placeholder: "+91 00000 00000",        required: true },
  { name: "motherEmail",         label: "Email ID",                 type: "email",  placeholder: "jane@example.com" },
  { name: "motherQualification", label: "Educational Qualification",type: "text",   placeholder: "e.g. Post Graduate" },
  { name: "motherOccupation",    label: "Occupation",               type: "text",   placeholder: "e.g. Teacher" },
  { name: "motherOrgName",       label: "Organization Name",        type: "text",   placeholder: "Company Name" },
  { name: "motherDesignation",   label: "Designation",              type: "text",   placeholder: "e.g. Headmistress" },
  { name: "motherIncome",        label: "Annual Income (₹)",        type: "number", placeholder: "e.g. 400000" },
]

// ── Guardian Fields ────────────────────────────────────────────────────────
export const guardianFields = [
  { name: "guardianName",          label: "Guardian's Name",          type: "text",   placeholder: "Full Name" },
  { name: "guardianMobile",        label: "Mobile No.",               type: "tel",    placeholder: "+91 00000 00000" },
  { name: "guardianEmail",         label: "Email ID",                 type: "email",  placeholder: "guardian@example.com" },
  { name: "guardianQualification", label: "Educational Qualification",type: "text" },
  { name: "guardianOccupation",    label: "Occupation",               type: "text" },
  { name: "guardianOrgName",       label: "Organization Name",        type: "text" },
  { name: "guardianDesignation",   label: "Designation",              type: "text" },
  { name: "guardianIncome",        label: "Annual Income (₹)",        type: "number" },
]

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
  "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
  "Uttarakhand", "West Bengal",
].map((s) => ({ value: s, label: s }))

export const presentFields = [
  { name: "presentLine1",   label: "Address Line 1",        type: "text",   placeholder: "Street, building, suite", required: true, colSpan: 2 },
  { name: "presentLine2",   label: "Address Line 2 (Optional)", type: "text", placeholder: "Apartment, unit, floor", colSpan: 2 },
  { name: "presentCity",    label: "City",                  type: "text",   placeholder: "Enter city",              required: true },
  { name: "presentState",   label: "State / Province",      type: "select", placeholder: "Select State",            required: true, options: INDIAN_STATES },
  { name: "presentPincode", label: "Pincode / ZIP",         type: "text",   placeholder: "Enter 6-digit pincode",   required: true },
]

export const getPermanentFields = (disabled) => [
  { name: "permanentLine1",   label: "Address Line 1",        type: "text",   placeholder: "Street, building, suite", colSpan: 2, readOnly: disabled },
  { name: "permanentLine2",   label: "Address Line 2 (Optional)", type: "text", placeholder: "Apartment, unit, floor", colSpan: 2, readOnly: disabled },
  { name: "permanentCity",    label: "City",                  type: "text",   placeholder: "Enter city",   readOnly: disabled },
  { name: "permanentState",   label: "State / Province",      type: "select", placeholder: "Select State", readOnly: disabled, options: INDIAN_STATES },
  { name: "permanentPincode", label: "Pincode / ZIP",         type: "text",   placeholder: "Enter 6-digit pincode", readOnly: disabled },
]

export const previousSchoolFields = [
  {
    name: "schoolName",
    label: "Previous School Name",
    type: "text",
    placeholder: "Enter full school name",
    required: true,
    colSpan: 2,
  },
  {
    name: "schoolAddress",
    label: "School Address",
    type: "text",
    placeholder: "Enter school address",
    colSpan: 2,
  },
  {
    name: "udiseCode",
    label: "UDISE Code",
    type: "text",
    placeholder: "Enter UDISE code",
  },
  {
    name: "board",
    label: "Affiliated Board / University",
    type: "select",
    placeholder: "Select Board",
    required: true,
    options: ["CBSE", "ICSE", "State Board", "IB", "IGCSE", "Other"].map(
      (b) => ({ value: b, label: b })
    ),
  },
  {
    name: "tcNumber",
    label: "T.C. Number",
    type: "text",
    placeholder: "Enter Transfer Certificate Number",
  },
  {
    name: "lastClass",
    label: "Last Class Passed",
    type: "select",
    placeholder: "Select Class",
    required: true,
    options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((g) => ({
      value: `Grade ${g}`,
      label: `Grade ${g}`,
    })),
  },
  {
    name: "yearOfPassing",
    label: "Year of Passing",
    type: "select",
    required: true,
    options: [2026, 2025, 2024, 2023, 2022, 2021, 2020].map((y) => ({
      value: String(y),
      label: String(y),
    })),
  },
  {
    name: "percentage",
    label: "Percentage / Grade Obtained",
    type: "text",
    placeholder: "e.g. 85% or A+",
  },
  {
    name: "medium",
    label: "Medium of Instruction",
    type: "radio",
    required: true,
    colSpan: 2,
    options: ["English", "Hindi", "Regional"].map((m) => ({
      value: m,
      label: m,
    })),
  },
  {
    name: "tcAvailable",
    label: "Is Transfer Certificate (TC) Available?",
    type: "radio",
    colSpan: 2,
    options: [
      { value: "yes", label: "Yes" },
      { value: "no",  label: "No (Pending)" },
    ],
  },
  {
    name: "remarks",
    label: "Remarks / Special Academic History",
    type: "textarea",
    placeholder: "Mention any awards, disciplinary actions, or subjects studied...",
    colSpan: 2,
  },
]

export const rightFields = [
  {
    name: "paymentMode",
    label: "Select Payment Mode",
    type: "select",
    required: true,
    options: [
      { value: "cash",   label: "💵 Cash" },
      { value: "online", label: "💳 Online" },
      { value: "bank",   label: "🏦 Bank Transfer" },
    ],
  },
  {
    name: "transactionId",
    label: "Transaction ID / Ref No.",
    type: "text",
    placeholder: "TXN-99008877",
  },
  {
    name: "receiptDate",
    label: "Receipt Date",
    type: "date",
  },
  {
    name: "paymentRemarks",
    label: "Payment Remarks",
    type: "textarea",
    placeholder: "e.g. Paid in full by parent at the front desk.",
    colSpan: 2,
  },
]