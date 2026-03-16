// ─── Admission: Basic Details Fields ──────────────────────────────────
export const basicDetailsFields = [
  // ── Row 1: Identifiers ──
  {
    name: "registrationNo",
    label: "Registration No.",
    type: "text",
    placeholder: "Enter Registration No.",
  },
  {
    name: "srNo",
    label: "S.R. No.",
    type: "text",
    placeholder: "Enter S.R. No.",
  },
  {
    name: "admissionNo",
    label: "Admission No.",
    type: "text",
    placeholder: "Enter Admission No.",
  },

  // ── Row 2: Basic Info ──
  {
    name: "rollNo",
    label: "Roll No.",
    type: "text",
    placeholder: "Enter Roll No.",
  },
  {
    name: "fullName",
    label: "Student Name",
    type: "text",
    placeholder: "Enter student's full name",
    required: true,
  },
  {
    name: "dob",
    label: "Date of Birth",
    type: "date",
    required: true,
  },

  // ── Row 3: Academic Placement ──
  {
    name: "grade",
    label: "Class",
    type: "select",
    placeholder: "Select Class",
    required: true,
    options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((g) => ({
      value: String(g),
      label: `Grade ${g}`,
    })),
  },
  {
    name: "section",
    label: "Section",
    type: "text",
    placeholder: "e.g. A",
  },
  {
    name: "gender",
    label: "Gender",
    type: "select",
    placeholder: "Select Gender",
    required: true,
    options: [
      { value: "Male",   label: "Male" },
      { value: "Female", label: "Female" },
      { value: "Other",  label: "Other" },
    ],
  },

  // ── Row 4: Personal Details ──
  {
    name: "bloodGroup",
    label: "Blood Group",
    type: "select",
    placeholder: "Select",
    options: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((b) => ({
      value: b,
      label: b,
    })),
  },
  {
    name: "aadhaar",
    label: "Aadhaar No.",
    type: "text",
    placeholder: "12-digit Aadhaar number",
    maxLength: 12,
  },
  {
    name: "penNo",
    label: "PEN No.",
    type: "text",
    placeholder: "Enter PEN No.",
  },

  // ── Row 5: Contact & Demographics ──
  {
    name: "mobileNo",
    label: "Mobile No.",
    type: "tel",
    placeholder: "Enter Mobile No.",
  },
  {
    name: "religion",
    label: "Religion",
    type: "select",
    placeholder: "Select",
    options: [
      { value: "Hindu",    label: "Hindu" },
      { value: "Muslim",   label: "Muslim" },
      { value: "Christian",label: "Christian" },
      { value: "Sikh",     label: "Sikh" },
      { value: "Other",    label: "Other" },
    ],
  },
  {
    name: "nationality",
    label: "Nationality",
    type: "text",
    placeholder: "Indian",
    defaultValue: "Indian",
  },

  // ── Row 6: Categories ──
  {
    name: "category",
    label: "Category",
    type: "select",
    placeholder: "Select",
    options: [
      { value: "General", label: "General" },
      { value: "OBC",     label: "OBC" },
      { value: "SC",      label: "SC" },
      { value: "ST",      label: "ST" },
    ],
  },
  {
    name: "rte",
    label: "Right to Education (RTE)",
    type: "select",
    placeholder: "Select",
    options: [
      { value: "Yes", label: "Yes" },
      { value: "No",  label: "No" },
    ],
  },
  {
    name: "bplStudent",
    label: "BPL Student",
    type: "select",
    placeholder: "Select",
    options: [
      { value: "Yes", label: "Yes" },
      { value: "No",  label: "No" },
    ],
  },

  // ── Row 7: Social Status ──
  {
    name: "bplCardNo",
    label: "BPL Card No.",
    type: "text",
    placeholder: "Enter Card No.",
  },
  {
    name: "pwd",
    label: "Person with Disability (PwD)",
    type: "select",
    placeholder: "Select",
    options: [
      { value: "No",  label: "No" },
      { value: "Yes", label: "Yes" },
    ],
  },
  {
    name: "identificationMark",
    label: "Identification Mark",
    type: "text",
    placeholder: "e.g. Mole on right hand",
  },

  // ── Row 8: Physical Stats ──
  {
    name: "weight",
    label: "Weight (kg)",
    type: "number",
    placeholder: "0.0",
    step: "0.1",
  },
  {
    name: "height",
    label: "Height (cm)",
    type: "number",
    placeholder: "0",
  },
  {
    name: "bmi",
    label: "Body Mass Index (BMI)",
    type: "text",
    placeholder: "Auto-calculated",
    readOnly: true,
  },

  // ── Row 9: Health ──
  {
    name: "covidVaccination",
    label: "COVID Vaccination",
    type: "select",
    placeholder: "Select Status",
    colSpan: 3,
    options: [
      { value: "None",        label: "None" },
      { value: "Single Dose", label: "Single Dose" },
      { value: "Both Dose",   label: "Both Dose" },
    ],
  },
]

// ─── Admission: Father Fields ──────────────────────────────────────────
export const fatherFields = [
  { name: "father.name",          label: "Full Name",                  type: "text",   placeholder: "Father's full name",   required: true },
  { name: "father.mobile",        label: "Mobile Number",              type: "tel",    placeholder: "10-digit mobile",      required: true, maxLength: 10 },
  { name: "father.email",         label: "Email ID",                   type: "email",  placeholder: "Email address" },
  { name: "father.qualification", label: "Educational Qualification",  type: "text",   placeholder: "e.g. Graduate" },
  {
    name: "father.occupation",
    label: "Occupation",
    type: "select",
    placeholder: "Select Occupation",
    options: ["Software Engineer", "Doctor", "Business Owner", "Teacher", "Government Employee", "Homemaker", "Other"].map(
      (o) => ({ value: o, label: o })
    ),
  },
  { name: "father.organization",  label: "Work Organization Name",     type: "text",   placeholder: "Company or Business name" },
  { name: "father.designation",   label: "Designation",                type: "text",   placeholder: "e.g. Manager, Director" },
  { name: "father.income",        label: "Annual Income (₹)",          type: "number", placeholder: "0.00", prefix: "₹" },
]

// ─── Admission: Mother Fields ──────────────────────────────────────────
export const motherFields = [
  { name: "mother.name",          label: "Full Name",                  type: "text",   placeholder: "Mother's full name",   required: true },
  { name: "mother.mobile",        label: "Mobile Number",              type: "tel",    placeholder: "10-digit mobile",      required: true, maxLength: 10 },
  { name: "mother.email",         label: "Email ID",                   type: "email",  placeholder: "Email address" },
  { name: "mother.qualification", label: "Educational Qualification",  type: "text",   placeholder: "e.g. Post Graduate" },
  {
    name: "mother.occupation",
    label: "Occupation",
    type: "select",
    placeholder: "Select Occupation",
    options: ["Software Engineer", "Doctor", "Business Owner", "Teacher", "Government Employee", "Homemaker", "Other"].map(
      (o) => ({ value: o, label: o })
    ),
  },
  { name: "mother.organization",  label: "Work Organization Name",     type: "text",   placeholder: "Company or Business name" },
  { name: "mother.designation",   label: "Designation",                type: "text",   placeholder: "e.g. Manager, Director" },
  { name: "mother.income",        label: "Annual Income (₹)",          type: "number", placeholder: "0.00", prefix: "₹" },
]

// ─── Admission: Guardian Fields ────────────────────────────────────────
export const guardianFields = [
  { name: "guardian.name",          label: "Full Name",                 type: "text",   placeholder: "Guardian's full name" },
  { name: "guardian.mobile",        label: "Mobile Number",             type: "tel",    placeholder: "10-digit mobile",     maxLength: 10 },
  { name: "guardian.email",         label: "Email ID",                  type: "email",  placeholder: "Email address" },
  { name: "guardian.qualification", label: "Educational Qualification", type: "text",   placeholder: "e.g. Graduate" },
  {
    name: "guardian.occupation",
    label: "Occupation",
    type: "select",
    placeholder: "Select Occupation",
    options: ["Software Engineer", "Doctor", "Business Owner", "Teacher", "Government Employee", "Homemaker", "Other"].map(
      (o) => ({ value: o, label: o })
    ),
  },
  { name: "guardian.organization",  label: "Work Organization Name",    type: "text",   placeholder: "Company or Business name" },
  { name: "guardian.designation",   label: "Designation",               type: "text",   placeholder: "e.g. Manager, Director" },
  { name: "guardian.income",        label: "Annual Income (₹)",         type: "number", placeholder: "0.00", prefix: "₹" },
]

// ─── Admission: Address Fields ─────────────────────────────────────────
const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
  "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
  "Uttarakhand", "West Bengal",
].map((s) => ({ value: s, label: s }))

export const presentAddressFields = [
  { name: "presentAddress.line1",   label: "Address Line 1",             type: "text",   placeholder: "Street, Building, Flat No.", required: true, colSpan: 2 },
  { name: "presentAddress.line2",   label: "Address Line 2 (Optional)",  type: "text",   placeholder: "Area, Landmark",             colSpan: 2 },
  { name: "presentAddress.city",    label: "City",                       type: "text",   placeholder: "City" },
  { name: "presentAddress.state",   label: "State",                      type: "select", placeholder: "Select State", options: INDIAN_STATES },
  { name: "presentAddress.pincode", label: "Pincode / ZIP",              type: "text",   placeholder: "6-digit pincode", maxLength: 6 },
  { name: "presentAddress.country", label: "Country",                    type: "text",   placeholder: "India", defaultValue: "India" },
]

export const getPermanentAddressFields = (disabled = false) => [
  { name: "permanentAddress.line1",   label: "Address Line 1",             type: "text",   placeholder: "Street, Building, Flat No.", colSpan: 2, readOnly: disabled },
  { name: "permanentAddress.line2",   label: "Address Line 2 (Optional)",  type: "text",   placeholder: "Area, Landmark",             colSpan: 2, readOnly: disabled },
  { name: "permanentAddress.city",    label: "City",                       type: "text",   placeholder: "City",          readOnly: disabled },
  { name: "permanentAddress.state",   label: "State",                      type: "select", placeholder: "Select State",  options: INDIAN_STATES, readOnly: disabled },
  { name: "permanentAddress.pincode", label: "Pincode / ZIP",              type: "text",   placeholder: "6-digit pincode", maxLength: 6, readOnly: disabled },
  { name: "permanentAddress.country", label: "Country",                    type: "text",   placeholder: "India", defaultValue: "India", readOnly: disabled },
]

// ─── Admission: Previous School Fields ────────────────────────────────
export const previousSchoolFields = [
  {
    name: "school.name",
    label: "Previous School Name",
    type: "text",
    placeholder: "Name of the previous school",
    required: true,
    colSpan: 2,
  },
  {
    name: "school.address",
    label: "School Address",
    type: "text",
    placeholder: "Enter school address",
    colSpan: 2,
  },
  {
    name: "school.udiseCode",
    label: "UDISE Code",
    type: "text",
    placeholder: "Enter UDISE code",
  },
  {
    name: "school.board",
    label: "Board",
    type: "select",
    placeholder: "Select Board",
    required: true,
    options: ["CBSE", "ICSE", "State Board", "IB", "Cambridge (IGCSE)", "NIOS", "Other"].map(
      (b) => ({ value: b, label: b })
    ),
  },
  {
    name: "school.tcNumber",
    label: "T.C. Number",
    type: "text",
    placeholder: "Enter TC number",
  },
  {
    name: "school.lastClass",
    label: "Last Class Passed",
    type: "select",
    placeholder: "Select Class",
    required: true,
    options: ["Nursery", "KG", ...Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`)].map(
      (c) => ({ value: c, label: c })
    ),
  },
  {
    name: "school.yearOfPassing",
    label: "Year of Passing",
    type: "select",
    placeholder: "Select Year",
    options: Array.from({ length: 10 }, (_, i) => String(2024 - i)).map(
      (y) => ({ value: y, label: y })
    ),
  },
  {
    name: "school.result",
    label: "Percentage / Grade",
    type: "text",
    placeholder: "e.g. 85% or A1",
  },
  {
    name: "school.medium",
    label: "Medium of Instruction",
    type: "radio",
    required: true,
    colSpan: 2,
    options: [
      { value: "English",  label: "English" },
      { value: "Hindi",    label: "Hindi" },
      { value: "Regional", label: "Regional" },
    ],
  },
  {
    name: "school.remarks",
    label: "Remarks / Special Academic History",
    type: "textarea",
    placeholder: "Any special notes about academic history...",
    colSpan: 2,
    rows: 3,
  },
]