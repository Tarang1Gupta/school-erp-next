"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import Topbar from "@/components/layout/Topbar";
import {
  MdSearch, MdDoneAll, MdDownload, MdSave,
  MdCheckCircle, MdCancel, MdSchedule, MdGroups,
  MdChevronLeft, MdChevronRight, MdCalendarMonth,
  MdExpandMore,
} from "react-icons/md";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const STUDENTS = [
  { id: "ST-2023-001", roll: "01", name: "Alex Johnson",  initials: "AJ", colorBg: "bg-blue-100",    colorText: "text-blue-600"    },
  { id: "ST-2023-002", roll: "02", name: "Bella Watson",  initials: "BW", colorBg: "bg-indigo-100",  colorText: "text-indigo-600"  },
  { id: "ST-2023-003", roll: "03", name: "Charlie Davis", initials: "CD", colorBg: "bg-teal-100",    colorText: "text-teal-600"    },
  { id: "ST-2023-004", roll: "04", name: "Dana Alister",  initials: "DA", colorBg: "bg-pink-100",    colorText: "text-pink-600"    },
  { id: "ST-2023-005", roll: "05", name: "Evan Wright",   initials: "EW", colorBg: "bg-amber-100",   colorText: "text-amber-700"   },
  { id: "ST-2023-006", roll: "06", name: "Fiona Clarke",  initials: "FC", colorBg: "bg-emerald-100", colorText: "text-emerald-700" },
  { id: "ST-2023-007", roll: "07", name: "George Harris", initials: "GH", colorBg: "bg-violet-100",  colorText: "text-violet-600"  },
  { id: "ST-2023-008", roll: "08", name: "Hannah Scott",  initials: "HS", colorBg: "bg-rose-100",    colorText: "text-rose-600"    },
  { id: "ST-2023-009", roll: "09", name: "Ivan Thompson", initials: "IT", colorBg: "bg-cyan-100",    colorText: "text-cyan-700"    },
  { id: "ST-2023-010", roll: "10", name: "Julia Adams",   initials: "JA", colorBg: "bg-orange-100",  colorText: "text-orange-600"  },
];

const CLASSES  = ["Class 8", "Class 9", "Class 10"];
const SECTIONS = ["Section A", "Section B", "Section C"];
const PAGE_SIZE = 5;
const DAYS   = ["S","M","T","W","T","F","S"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// ─── Style tokens ─────────────────────────────────────────────────────────────
const inputCls  = "border rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:border-primary focus:ring-primary h-11 px-4 text-sm placeholder:text-slate-400 w-full outline-none transition";
const selectCls = "border appearance-none rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary focus:ring-primary h-11 px-4 text-sm w-full outline-none transition";
const labelCls  = "text-sm font-bold text-slate-700 dark:text-slate-300";

// ─── Calendar Popover ─────────────────────────────────────────────────────────
const CalendarPopover = ({ selectedDate, onChange, onClose }) => {
  const [viewDate, setViewDate] = useState(new Date(selectedDate));
  const ref = useRef(null);
  const year        = viewDate.getFullYear();
  const month       = viewDate.getMonth();
  const firstDay    = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const selD        = new Date(selectedDate);
  const todayD      = new Date();
  const isSel   = (d) => d === selD.getDate()   && month === selD.getMonth()   && year === selD.getFullYear();
  const isToday = (d) => d === todayD.getDate() && month === todayD.getMonth() && year === todayD.getFullYear();

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [onClose]);

  const pick = (d) => { onChange(new Date(year, month, d).toISOString().split("T")[0]); onClose(); };

  return (
    <div ref={ref} className="absolute top-full left-0 mt-2 z-50 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg p-5 w-72">
      {/* Month nav */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-bold text-[#0d141b] dark:text-white">{MONTHS[month]} {year}</p>
        <div className="flex gap-1">
          {[MdChevronLeft, MdChevronRight].map((Icon, i) => (
            <button key={i}
              onClick={() => setViewDate(new Date(year, month + (i === 0 ? -1 : 1), 1))}
              className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors">
              <Icon size={18} />
            </button>
          ))}
        </div>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((d, i) => (
          <span key={i} className="text-center text-[11px] font-semibold text-slate-400 py-1">{d}</span>
        ))}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {Array.from({ length: firstDay }).map((_, i) => <span key={`e${i}`} />)}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => (
          <button key={d} onClick={() => pick(d)}
            className={`aspect-square flex items-center justify-center text-xs rounded-lg transition-colors font-medium
              ${isSel(d)
                ? "bg-primary text-white font-bold shadow-sm shadow-primary/30"
                : isToday(d)
                ? "bg-primary/10 text-primary font-bold"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}>
            {d}
          </button>
        ))}
      </div>

      {/* Events */}
      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 flex flex-col gap-2.5">
        {[
          { color: "bg-success", label: "Holiday: Teachers Day" },
          { color: "bg-primary", label: "Exam Week Starts" },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${color} flex-shrink-0`} />
            <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Date Picker Button ───────────────────────────────────────────────────────
const DatePicker = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const fmt = new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  return (
    <div className="relative">
      <button onClick={() => setOpen(p => !p)}
        className={`${inputCls} flex items-center gap-2 cursor-pointer hover:bg-slate-50`}>
        <MdCalendarMonth size={16} className="text-slate-400 flex-shrink-0" />
        <span className="flex-1 text-left text-slate-700 dark:text-white">{fmt}</span>
        <MdExpandMore size={16} className="text-slate-400 flex-shrink-0" />
      </button>
      {open && <CalendarPopover selectedDate={value} onChange={onChange} onClose={() => setOpen(false)} />}
    </div>
  );
};

// ─── Status Toggle ────────────────────────────────────────────────────────────
const StatusToggle = ({ status, onChange }) => {
  const opts = [
    { key: "Present", activeClass: "bg-success text-white font-bold shadow-sm shadow-success/30"    },
    { key: "Absent",  activeClass: "bg-red-500 text-white font-bold shadow-sm shadow-red-200"       },
    { key: "Late",    activeClass: "bg-amber-400 text-white font-bold shadow-sm shadow-amber-200"   },
  ];
  const inactiveCls = "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-medium transition-colors";

  return (
    <div className="inline-flex bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700 gap-0.5">
      {opts.map(({ key, activeClass }) => (
        <button key={key} onClick={() => onChange(key)}
          className={`px-3 py-1.5 rounded-md text-sm transition-all ${status === key ? activeClass : inactiveCls}`}>
          {key}
        </button>
      ))}
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function DailyAttendance() {
  const todayStr = new Date().toISOString().split("T")[0];

  const [cls,     setCls]     = useState("Class 10");
  const [section, setSection] = useState("Section A");
  const [date,    setDate]    = useState(todayStr);
  const [search,  setSearch]  = useState("");
  const [page,    setPage]    = useState(1);
  const [saved,   setSaved]   = useState(false);

  const [statuses, setStatuses] = useState(
    Object.fromEntries(STUDENTS.map(s => [s.id, "Present"]))
  );
  const [remarks, setRemarks] = useState(
    Object.fromEntries(STUDENTS.map(s => [s.id, ""]))
  );

  const setStatus      = (id, v) => setStatuses(p => ({ ...p, [id]: v }));
  const setRemark      = (id, v) => setRemarks(p  => ({ ...p, [id]: v }));
  const markAllPresent = () => setStatuses(Object.fromEntries(STUDENTS.map(s => [s.id, "Present"])));
  const handleSave     = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const filtered = useMemo(() =>
    STUDENTS.filter(s => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q);
    }), [search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const counts = useMemo(() => ({
    total:   STUDENTS.length,
    present: Object.values(statuses).filter(v => v === "Present").length,
    absent:  Object.values(statuses).filter(v => v === "Absent").length,
    late:    Object.values(statuses).filter(v => v === "Late").length,
  }), [statuses]);

  const rowBg = (id) => {
    const s = statuses[id];
    if (s === "Absent") return "bg-red-50 dark:bg-red-900/10";
    if (s === "Late")   return "bg-amber-50 dark:bg-amber-900/10";
    return "";
  };

  const remarkCls = (id) => {
    const s = statuses[id];
    if (s === "Absent") return "border-red-200 dark:border-red-800 group-hover:border-red-300 focus:border-red-400 text-red-600 dark:text-red-400 font-medium";
    if (s === "Late")   return "border-amber-200 dark:border-amber-800 group-hover:border-amber-300 focus:border-amber-400 text-amber-700 dark:text-amber-400 font-medium";
    return "border-transparent group-hover:border-slate-300 dark:group-hover:border-slate-600 focus:border-primary text-slate-700 dark:text-slate-300";
  };

  const SUMMARY = [
    { label: "Total",   value: counts.total,   valCls: "text-[#0d141b] dark:text-white", Icon: MdGroups,      iconBg: "bg-slate-100 dark:bg-slate-800",   iconCls: "text-slate-500 dark:text-slate-400" },
    { label: "Present", value: counts.present, valCls: "text-success",                   Icon: MdCheckCircle, iconBg: "bg-success/10",                    iconCls: "text-success"                       },
    { label: "Absent",  value: counts.absent,  valCls: "text-red-500",                   Icon: MdCancel,      iconBg: "bg-red-50 dark:bg-red-900/20",     iconCls: "text-red-500"                       },
    { label: "Late",    value: counts.late,    valCls: "text-amber-500",                 Icon: MdSchedule,    iconBg: "bg-amber-50 dark:bg-amber-900/20", iconCls: "text-amber-500"                     },
  ];

  return (
    <>
      <Topbar title="Daily Attendance" subtitle="Mark and manage student attendance for the selected class and date." />

      <div className="p-4 md:p-6 space-y-6 bg-slate-50 dark:bg-[#101922] min-h-full">

        {/* Breadcrumb */}
        <div className="flex flex-wrap gap-2">
          <Link href="/" className="text-slate-500 text-sm font-medium hover:text-primary transition-colors">Home</Link>
          <span className="text-slate-400 text-sm font-medium">/</span>
          <Link href="/attendance" className="text-slate-500 text-sm font-medium hover:text-primary transition-colors">Attendance</Link>
          <span className="text-slate-400 text-sm font-medium">/</span>
          <span className="text-primary text-sm font-semibold">Daily Attendance</span>
        </div>

      {/* Filter controls */}
      <div className="bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
        <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-[#0d141b] dark:text-white text-base font-bold">Filter Attendance</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Class */}
          <div className="flex flex-col gap-2">
            <label className={labelCls}>Class</label>
            <div className="relative">
              <select value={cls} onChange={e => setCls(e.target.value)} className={selectCls}>
                {CLASSES.map(c => <option key={c} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">{c}</option>)}
              </select>
              <MdExpandMore className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            </div>
          </div>

          {/* Section */}
          <div className="flex flex-col gap-2">
            <label className={labelCls}>Section</label>
            <div className="relative">
              <select value={section} onChange={e => setSection(e.target.value)} className={selectCls}>
                {SECTIONS.map(s => <option key={s} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">{s}</option>)}
              </select>
              <MdExpandMore className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            </div>
          </div>

          {/* Date */}
          <div className="flex flex-col gap-2">
            <label className={labelCls}>Date</label>
            <DatePicker value={date} onChange={setDate} />
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {SUMMARY.map(({ label, value, valCls, Icon, iconBg, iconCls }) => (
          <div key={label} className="bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm p-4 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${iconBg} flex items-center justify-center flex-shrink-0`}>
              <Icon size={20} className={iconCls} />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 leading-tight uppercase tracking-wide">{label}</p>
              <p className={`text-2xl font-extrabold leading-tight ${valCls}`}>{String(value).padStart(2, "0")}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Attendance Table */}
      <div className="bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">

        {/* Toolbar */}
        <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-[#0d141b] dark:text-white text-base font-bold">
            Student List
            <span className="ml-2 px-2 py-0.5 bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded-full text-xs font-semibold">{filtered.length}</span>
          </h2>
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative">
              <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input type="text" placeholder="Search name or ID…" value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                className="h-9 pl-9 pr-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white text-sm placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-44 lg:w-56 transition"
              />
            </div>
            {/* Mark all */}
            <button onClick={markAllPresent}
              className="flex items-center gap-2 h-9 px-4 rounded-lg bg-success/10 text-success text-sm font-bold hover:bg-success/20 border border-success/20 transition-colors">
              <MdDoneAll size={16} />
              Mark All Present
            </button>
            {/* Export */}
            <button className="flex items-center gap-2 h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
              <MdDownload size={16} />
              <span className="hidden sm:inline">Export</span>
            </button>
            {/* Save */}
            <button onClick={handleSave}
              className={`flex items-center gap-2 h-9 px-4 rounded-lg font-bold text-sm shadow-sm transition-all ${
                saved
                  ? "bg-success text-white shadow-success/20"
                  : "bg-primary text-white hover:bg-primary/90 shadow-primary/20"
              }`}>
              {saved ? <MdCheckCircle size={16} /> : <MdSave size={16} />}
              {saved ? "Saved!" : "Save"}
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                {["Roll No", "Student Name", "Attendance Status", "Remarks"].map(h => (
                  <th key={h} className="px-5 py-3 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-10 text-center text-sm text-slate-400">No students found.</td>
                </tr>
              ) : paginated.map((s, i) => (
                <tr key={s.id}
                  className={`border-b border-slate-100 dark:border-slate-800 transition-colors group hover:bg-slate-50/70 dark:hover:bg-slate-800/30 ${rowBg(s.id)} ${i === paginated.length - 1 ? "border-b-0" : ""}`}>

                  {/* Roll */}
                  <td className="px-5 py-3.5 text-sm font-semibold text-slate-400 dark:text-slate-500">{s.roll}</td>

                  {/* Name */}
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${s.colorBg} ${s.colorText}`}>
                        {s.initials}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#0d141b] dark:text-white">{s.name}</p>
                        <p className="text-xs text-slate-400 dark:text-slate-500">{s.id}</p>
                      </div>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-3.5">
                    <StatusToggle status={statuses[s.id]} onChange={v => setStatus(s.id, v)} />
                  </td>

                  {/* Remark */}
                  <td className="px-5 py-3.5">
                    <input type="text" value={remarks[s.id]}
                      onChange={e => setRemark(s.id, e.target.value)}
                      placeholder="Add note…"
                      className={`w-full max-w-[220px] bg-transparent border-0 border-b focus:ring-0 text-sm transition-colors placeholder:text-slate-300 dark:placeholder:text-slate-600 outline-none ${remarkCls(s.id)}`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 px-6 py-3.5 flex items-center justify-between">
          <p className="text-sm text-slate-400 dark:text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-600 dark:text-slate-300">{filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}</span>
            {" "}–{" "}
            <span className="font-semibold text-slate-600 dark:text-slate-300">{Math.min(page * PAGE_SIZE, filtered.length)}</span>
            {" "}of{" "}
            <span className="font-semibold text-slate-600 dark:text-slate-300">{filtered.length}</span> students
          </p>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 transition-colors flex items-center gap-1">
              <MdChevronLeft size={16} /> Prev
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(pg => (
              <button key={pg} onClick={() => setPage(pg)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-semibold transition-colors ${
                  pg === page
                    ? "bg-primary text-white shadow-sm shadow-primary/30"
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}>
                {pg}
              </button>
            ))}
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 transition-colors flex items-center gap-1">
              Next <MdChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}