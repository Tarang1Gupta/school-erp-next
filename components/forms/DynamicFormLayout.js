"use client"
import { useState, useEffect } from "react"

export function     DynamicFormLayout({
  fields,
  register,
  setValue,
  watch,
  errors,
  optionSources = {},
}) {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => setIsClient(true), [])

  const getError = (name) => {
    return name.split(".").reduce((acc, key) => acc?.[key], errors)?.message
  }

  const renderField = (field) => {
    const {
      name, label, type, placeholder,
      required, readOnly, className,
      optionsSource, colSpan,
    } = field

    const value   = watch(name)
    const error   = getError(name)
    const options = (optionsSource && optionSources[optionsSource]) || field.options || []

    // ── Base input class ──────────────────────────────────────────
    const base = [
      "w-full h-11 px-4 rounded-lg text-sm transition-colors",
      "border border-slate-300 dark:border-slate-600",
      "bg-white dark:bg-slate-800",
      "text-slate-900 dark:text-white",
      "placeholder:text-slate-400 dark:placeholder:text-slate-500",
      "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
      readOnly
        ? "bg-slate-100 dark:bg-slate-700 cursor-not-allowed text-slate-500"
        : "",
      error ? "border-red-400 focus:ring-red-400" : "",
      className || "",
    ].join(" ")

    const selectBase = [
      "w-full h-11 px-4 rounded-lg text-sm transition-colors appearance-none",
      "border border-slate-300 dark:border-slate-600",
      "bg-white dark:bg-slate-800",
      "text-slate-900 dark:text-white",
      "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
      readOnly ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
      error ? "border-red-400" : "",
      className || "",
    ].join(" ")

    let input = null

    switch (type) {
      case "text":
      case "email":
      case "tel":
      case "number":
      case "date":
      case "password":
        input = (
          <input
            {...register(name)}
            id={name}
            type={type}
            placeholder={placeholder}
            readOnly={readOnly}
            className={base}
          />
        )
        break

      case "textarea":
        input = (
          <textarea
            {...register(name)}
            id={name}
            placeholder={placeholder}
            readOnly={readOnly}
            rows={3}
            className={`${base} h-auto py-3 resize-none`}
          />
        )
        break

      case "select":
        input = (
          <div className="relative">
            <select
              {...register(name)}
              id={name}
              disabled={readOnly}
              className={selectBase}
            >
              <option value="">{placeholder || `Select ${label}`}</option>
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {/* Arrow icon */}
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        )
        break

      case "radio":
        input = (
          <div className="flex flex-wrap gap-4 mt-1">
            {options.map((opt) => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  {...register(name)}
                  type="radio"
                  value={opt.value}
                  disabled={readOnly}
                  className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  {opt.label}
                </span>
              </label>
            ))}
          </div>
        )
        break

      case "switch":
        const isOn = value === "1" || value === true || value === "true"
        input = (
          <div className="flex items-center gap-3 h-11">
            <button
              type="button"
              disabled={readOnly}
              onClick={() => setValue(name, isOn ? "0" : "1")}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                isOn
                  ? "bg-blue-600"
                  : "bg-slate-200 dark:bg-slate-600"
              } ${readOnly ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                isOn ? "translate-x-5" : "translate-x-0"
              }`} />
            </button>
            <span className={`text-sm font-medium ${
              isOn ? "text-blue-600" : "text-slate-500 dark:text-slate-400"
            }`}>
              {isOn ? "Active" : "Inactive"}
            </span>
          </div>
        )
        break

      default:
        return null
    }

    // colSpan classes
    const colClass =
      colSpan === 2 ? "md:col-span-2" :
      colSpan === 3 ? "md:col-span-3" : ""

    return (
      <div key={name} className={`flex flex-col gap-1.5 ${colClass}`}>
        {label && (
          <label
            htmlFor={name}
            className="text-sm font-bold text-slate-700 dark:text-slate-300"
          >
            {label}
            {required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}

        {/* Skeleton while loading */}
        {!isClient
          ? <div className="h-11 bg-slate-100 dark:bg-slate-700 rounded-lg animate-pulse" />
          : input
        }

        {error && (
          <p className="text-red-500 text-xs mt-0.5">{error}</p>
        )}
      </div>
    )
  }

  return <>{fields.map((f) => renderField(f))}</>
}