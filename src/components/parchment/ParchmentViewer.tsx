import React, { useState, useMemo } from "react";
import {
  GraduationCap,
  Building2,
  Award,
  ShieldCheck,
  Search,
  Plus,
  Trash2,
  Calculator,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  TrendingUp,
  FileCheck,
  Info,
  Calendar,
  Layers,
  Sparkles,
  RefreshCw,
  ExternalLink,
  ChevronDown
} from "lucide-react";
import {
  ParchmentParsedData,
  ParchmentCourse,
  ParchmentTerm,
} from "../../types/parchment";

interface ParchmentViewerProps {
  data: ParchmentParsedData;
  onUpdateData: (newData: ParchmentParsedData) => void;
  redactPii: boolean;
}

export const ParchmentViewer: React.FC<ParchmentViewerProps> = ({
  data,
  onUpdateData,
  redactPii,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTermFilter, setSelectedTermFilter] = useState("all");
  const [selectedGradeFilter, setSelectedGradeFilter] = useState("all");

  // Target GPA Planner State
  const [targetGpa, setTargetGpa] = useState<number>(3.90);
  const [remainingCredits, setRemainingCredits] = useState<number>(30);

  // New Course Modal / Inline Form State
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [newCourseCode, setNewCourseCode] = useState("");
  const [newCourseTitle, setNewCourseTitle] = useState("");
  const [newCourseCredits, setNewCourseCredits] = useState(4.0);
  const [newCourseGrade, setNewCourseGrade] = useState("A");
  const [newCourseTerm, setNewCourseTerm] = useState(
    data.terms[data.terms.length - 1]?.termName || "Next Semester"
  );
  const [newCourseCategory, setNewCourseCategory] = useState("Major Core");

  // Grade point mapping
  const getGradePoint = (grade: string): number => {
    const clean = grade.trim().toUpperCase();
    if (clean === "A+" || clean === "A") return 4.0;
    if (clean === "A-") return 3.7;
    if (clean === "B+") return 3.3;
    if (clean === "B") return 3.0;
    if (clean === "B-") return 2.7;
    if (clean === "C+") return 2.3;
    if (clean === "C") return 2.0;
    if (clean === "C-") return 1.7;
    if (clean === "D+") return 1.3;
    if (clean === "D") return 1.0;
    if (clean === "F") return 0.0;
    return 4.0; // Default
  };

  // Recompute GPA and statistics dynamically whenever courses change
  const recalculateAndSave = (updatedTerms: ParchmentTerm[]) => {
    let totalQualityPoints = 0;
    let totalGpaCredits = 0;
    let totalCreditsAttempted = 0;
    let totalCreditsEarned = 0;
    let totalWeightedPoints = 0;

    const gradeDist = { A: 0, B: 0, C: 0, D: 0, F: 0, Other: 0 };

    const termsWithUpdatedGPAs = updatedTerms.map((term) => {
      let termQP = 0;
      let termGpaCr = 0;
      let termAttempted = 0;
      let termEarned = 0;

      const processedCourses = term.courses.map((course) => {
        const gp = getGradePoint(course.grade);
        const qualityPts = gp * course.creditsAttempted;
        termAttempted += course.creditsAttempted;

        if (course.grade !== "F") {
          termEarned += course.creditsEarned;
        }

        if (course.isIncludedInGpa) {
          termGpaCr += course.creditsAttempted;
          termQP += qualityPts;
        }

        // Count grade distribution
        const gClean = course.grade.trim().toUpperCase();
        if (gClean.startsWith("A")) gradeDist.A++;
        else if (gClean.startsWith("B")) gradeDist.B++;
        else if (gClean.startsWith("C")) gradeDist.C++;
        else if (gClean.startsWith("D")) gradeDist.D++;
        else if (gClean === "F") gradeDist.F++;
        else gradeDist.Other++;

        return {
          ...course,
          gradePoints: qualityPts,
        };
      });

      const calculatedTermGpa = termGpaCr > 0 ? Number((termQP / termGpaCr).toFixed(2)) : 0;
      totalQualityPoints += termQP;
      totalGpaCredits += termGpaCr;
      totalCreditsAttempted += termAttempted;
      totalCreditsEarned += termEarned;

      return {
        ...term,
        termGpa: calculatedTermGpa,
        termCreditsAttempted: termAttempted,
        termCreditsEarned: termEarned,
        courses: processedCourses,
      };
    });

    const cumulativeGpa = totalGpaCredits > 0 ? Number((totalQualityPoints / totalGpaCredits).toFixed(2)) : 0;

    const updatedData: ParchmentParsedData = {
      ...data,
      terms: termsWithUpdatedGPAs,
      summary: {
        ...data.summary,
        cumulativeGpa,
        unweightedGpa: cumulativeGpa,
        totalCreditsAttempted,
        totalCreditsEarned,
        totalQualityPoints: Number(totalQualityPoints.toFixed(1)),
      },
      academicInsights: {
        ...data.academicInsights,
        creditCompletionRate: totalCreditsAttempted > 0 ? Number(((totalCreditsEarned / totalCreditsAttempted) * 100).toFixed(1)) : 100,
        gradeDistribution: gradeDist,
      },
    };

    onUpdateData(updatedData);
  };

  const handleGradeChange = (courseId: string, newGrade: string) => {
    const updatedTerms = data.terms.map((term) => ({
      ...term,
      courses: term.courses.map((c) => (c.id === courseId ? { ...c, grade: newGrade } : c)),
    }));
    recalculateAndSave(updatedTerms);
  };

  const handleDeleteCourse = (courseId: string) => {
    const updatedTerms = data.terms
      .map((term) => ({
        ...term,
        courses: term.courses.filter((c) => c.id !== courseId),
      }))
      .filter((term) => term.courses.length > 0);
    recalculateAndSave(updatedTerms);
  };

  const handleAddCourseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseCode || !newCourseTitle) return;

    const newCourseObj: ParchmentCourse = {
      id: `course-${Date.now()}`,
      code: newCourseCode.trim().toUpperCase(),
      title: newCourseTitle.trim(),
      creditsAttempted: Number(newCourseCredits),
      creditsEarned: Number(newCourseCredits),
      grade: newCourseGrade,
      gradePoints: getGradePoint(newCourseGrade) * Number(newCourseCredits),
      isIncludedInGpa: true,
      category: newCourseCategory,
      termName: newCourseTerm,
    };

    // Find term or create new one
    let termFound = false;
    let updatedTerms = data.terms.map((t) => {
      if (t.termName.toLowerCase() === newCourseTerm.toLowerCase()) {
        termFound = true;
        return {
          ...t,
          courses: [...t.courses, newCourseObj],
        };
      }
      return t;
    });

    if (!termFound) {
      updatedTerms.push({
        termName: newCourseTerm,
        academicLevel: "Undergraduate",
        courses: [newCourseObj],
      });
    }

    recalculateAndSave(updatedTerms);

    // Reset form
    setNewCourseCode("");
    setNewCourseTitle("");
    setShowAddCourse(false);
  };

  // Flattened courses for filtering
  const allCourses = useMemo(() => {
    const list: ParchmentCourse[] = [];
    data.terms.forEach((t) => {
      t.courses.forEach((c) => {
        list.push({ ...c, termName: t.termName });
      });
    });
    return list;
  }, [data.terms]);

  const filteredCourses = useMemo(() => {
    return allCourses.filter((course) => {
      const matchesSearch =
        course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.termName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (course.category || "").toLowerCase().includes(searchTerm.toLowerCase());

      const matchesTerm =
        selectedTermFilter === "all" || course.termName === selectedTermFilter;

      const matchesGrade =
        selectedGradeFilter === "all" ||
        course.grade.toUpperCase().startsWith(selectedGradeFilter.toUpperCase());

      return matchesSearch && matchesTerm && matchesGrade;
    });
  }, [allCourses, searchTerm, selectedTermFilter, selectedGradeFilter]);

  // Target GPA calculation
  const requiredRemainingGpa = useMemo(() => {
    const currentQp = data.summary.totalQualityPoints || (data.summary.cumulativeGpa * data.summary.totalCreditsEarned);
    const currentCredits = data.summary.totalCreditsEarned || data.summary.totalCreditsAttempted || 1;
    const totalTargetCredits = currentCredits + remainingCredits;
    const requiredTotalQp = targetGpa * totalTargetCredits;
    const neededQpInRemaining = requiredTotalQp - currentQp;
    if (remainingCredits <= 0) return 0;
    const reqGpa = neededQpInRemaining / remainingCredits;
    return Number(reqGpa.toFixed(2));
  }, [data.summary, targetGpa, remainingCredits]);

  // Redaction helpers
  const maskText = (text?: string, fallback: string = "N/A") => {
    if (!text) return fallback;
    if (!redactPii) return text;
    if (text.length <= 4) return "••••";
    return text.slice(0, 2) + "••••••••" + text.slice(-2);
  };

  return (
    <div className="space-y-8">
      {/* Header Profile Card */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-black/10 bg-white shadow-sm space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-black/5">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#ff4d00]/10 text-[#ff4d00] flex items-center justify-center flex-shrink-0 shadow-inner">
              <Building2 className="w-7 h-7" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#00d9ff]/15 text-[#0088a8]">
                  {data.institutionInfo.schoolType || "Accredited University"}
                </span>
                <span className="text-[11px] font-mono text-neutral-500">
                  {data.institutionInfo.accreditation || "Regional Accreditation"}
                </span>
              </div>
              <h2 className="text-2xl font-black text-[#0d0f12] mt-1 tracking-tight">
                {data.institutionInfo.name}
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                {data.institutionInfo.address || "Registrar Office Records"} • {data.institutionInfo.registrarName || "Official Registrar"}
              </p>
            </div>
          </div>

          {/* Parchment DID & Authenticity Badge */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-2 text-xs font-mono">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="font-bold">Parchment DID:</span>
              <span>{maskText(data.authenticity.documentId || data.studentInfo.documentId, "PCH-2026-AUTH")}</span>
            </div>
            <div className="text-[11px] text-neutral-500 flex items-center gap-1">
              <FileCheck className="w-3.5 h-3.5 text-[#ff4d00]" />
              {data.studentInfo.printStatus || "Official Electronic PDF Verified"}
            </div>
          </div>
        </div>

        {/* Student & Degree Metadata Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 text-xs">
          <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/80">
            <span className="text-[10px] font-mono uppercase text-neutral-500 font-bold block">Student Candidate</span>
            <div className="font-bold text-sm text-[#0d0f12] mt-0.5">
              {maskText(data.studentInfo.name, "Student Record")}
            </div>
            <div className="text-[11px] font-mono text-neutral-500 mt-0.5">
              ID: {maskText(data.studentInfo.studentId, "STUD-XXXX")}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/80">
            <span className="text-[10px] font-mono uppercase text-neutral-500 font-bold block">Degree / Diploma Award</span>
            <div className="font-bold text-sm text-[#0d0f12] mt-0.5 truncate">
              {data.degreeInfo.degreeAwarded || "Undergraduate Degree"}
            </div>
            <div className="text-[11px] text-neutral-500 mt-0.5 truncate">
              Major: {data.degreeInfo.major || "General Studies"}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/80">
            <span className="text-[10px] font-mono uppercase text-neutral-500 font-bold block">Academic Honors & Standing</span>
            <div className="font-bold text-sm text-[#ff4d00] mt-0.5 truncate">
              {data.degreeInfo.honors || data.academicInsights.academicStanding || "Good Standing"}
            </div>
            <div className="text-[11px] text-neutral-500 mt-0.5">
              Rank: {data.degreeInfo.classRank || "Top Percentile"}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/80">
            <span className="text-[10px] font-mono uppercase text-neutral-500 font-bold block">Issue / Conferral Date</span>
            <div className="font-bold text-sm text-[#0d0f12] mt-0.5">
              {data.degreeInfo.graduationDate || data.studentInfo.issueDate || "Conferred May 2026"}
            </div>
            <div className="text-[11px] font-mono text-neutral-500 mt-0.5">
              DOB: {maskText(data.studentInfo.birthDate, "YYYY-MM-DD")}
            </div>
          </div>
        </div>
      </div>

      {/* KPI Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Cumulative GPA */}
        <div className="glass-card p-6 rounded-3xl border border-black/10 bg-gradient-to-br from-white to-orange-50/50 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#ff4d00] font-bold mb-2">
            <span>Cumulative GPA</span>
            <TrendingUp className="w-4 h-4" />
          </div>
          <div className="text-4xl font-black text-[#0d0f12] font-mono">
            {data.summary.cumulativeGpa.toFixed(2)}
          </div>
          <p className="text-xs text-neutral-500 mt-1.5">
            Scale: {data.summary.gradingScale?.split("(")[0] || "4.0 Scale"}
          </p>
        </div>

        {/* Metric 2: Total Credits */}
        <div className="glass-card p-6 rounded-3xl border border-black/10 bg-gradient-to-br from-white to-cyan-50/50 shadow-sm">
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#0088a8] font-bold mb-2">
            <span>Credits Earned</span>
            <GraduationCap className="w-4 h-4" />
          </div>
          <div className="text-4xl font-black text-[#0d0f12] font-mono">
            {data.summary.totalCreditsEarned.toFixed(1)}
            <span className="text-sm font-normal text-neutral-400 font-sans ml-1">/ {data.summary.totalCreditsAttempted.toFixed(1)} cr</span>
          </div>
          <p className="text-xs text-neutral-500 mt-1.5">
            Completion Rate: {data.academicInsights.creditCompletionRate || 100}%
          </p>
        </div>

        {/* Metric 3: Weighted / Honors GPA */}
        <div className="glass-card p-6 rounded-3xl border border-black/10 bg-gradient-to-br from-white to-purple-50/50 shadow-sm">
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-purple-700 font-bold mb-2">
            <span>Weighted / Honors</span>
            <Award className="w-4 h-4" />
          </div>
          <div className="text-4xl font-black text-[#0d0f12] font-mono">
            {(data.summary.weightedGpa || data.summary.cumulativeGpa).toFixed(2)}
          </div>
          <p className="text-xs text-neutral-500 mt-1.5">
            Quality Points: {data.summary.totalQualityPoints || (data.summary.cumulativeGpa * data.summary.totalCreditsEarned).toFixed(1)}
          </p>
        </div>

        {/* Metric 4: Dean's List / Terms */}
        <div className="glass-card p-6 rounded-3xl border border-black/10 bg-gradient-to-br from-white to-emerald-50/50 shadow-sm">
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-emerald-700 font-bold mb-2">
            <span>Dean's List Honors</span>
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="text-4xl font-black text-[#0d0f12] font-mono">
            {data.academicInsights.deanListTerms?.length || data.terms.length}
            <span className="text-sm font-normal text-neutral-400 font-sans ml-1">terms</span>
          </div>
          <p className="text-xs text-neutral-500 mt-1.5 truncate">
            {data.academicInsights.deanListTerms?.join(", ") || "All Academic Semesters"}
          </p>
        </div>
      </div>

      {/* Target GPA Planner Simulator */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-black/10 bg-white shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#ff4d00]/10 text-[#ff4d00]">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-[#0d0f12] tracking-tight">
                Target Graduation GPA Simulator
              </h3>
              <p className="text-xs text-neutral-500">
                Calculate the required grade point average needed across your remaining semester credits.
              </p>
            </div>
          </div>

          <div className="text-xs font-mono px-3 py-1.5 rounded-xl bg-neutral-100 text-neutral-700 font-bold">
            Current: {data.summary.cumulativeGpa.toFixed(2)} GPA
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div>
            <label className="block text-xs font-mono font-bold text-neutral-700 mb-1.5">
              Goal Cumulative GPA:
            </label>
            <input
              type="number"
              step="0.01"
              min="2.0"
              max="4.0"
              value={targetGpa}
              onChange={(e) => setTargetGpa(Number(e.target.value))}
              className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 bg-neutral-50 font-mono text-sm font-bold text-[#0d0f12] focus:outline-none focus:border-[#ff4d00]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-neutral-700 mb-1.5">
              Remaining Credits to Complete:
            </label>
            <input
              type="number"
              step="1"
              min="1"
              max="120"
              value={remainingCredits}
              onChange={(e) => setRemainingCredits(Number(e.target.value))}
              className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 bg-neutral-50 font-mono text-sm font-bold text-[#0d0f12] focus:outline-none focus:border-[#ff4d00]"
            />
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-br from-neutral-900 to-[#0d0f12] text-white flex flex-col justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#ff4d00] font-bold">
              Required Future Term GPA
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span
                className={`text-2xl font-mono font-black ${
                  requiredRemainingGpa > 4.0
                    ? "text-red-400"
                    : requiredRemainingGpa <= 0
                    ? "text-emerald-400"
                    : "text-[#00d9ff]"
                }`}
              >
                {requiredRemainingGpa > 4.0
                  ? "> 4.00 (Mathematically Unattainable)"
                  : requiredRemainingGpa <= 0
                  ? "Already Achieved"
                  : `${requiredRemainingGpa.toFixed(2)} GPA`}
              </span>
            </div>
            <span className="text-[10px] text-neutral-400">
              {requiredRemainingGpa > 4.0
                ? "Increase remaining credits or adjust target."
                : `Average grade: ${requiredRemainingGpa >= 3.7 ? "A / A-" : requiredRemainingGpa >= 3.0 ? "B+ / B" : "Passing"}`}
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Course History & Dynamic Table */}
      <div className="glass-card rounded-3xl border border-black/10 bg-white shadow-md overflow-hidden space-y-4">
        {/* Controls Bar */}
        <div className="p-5 border-b border-black/5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 bg-neutral-50/60">
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search code, title, category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-neutral-200 text-xs font-mono text-[#0d0f12] focus:outline-none focus:border-[#ff4d00]"
              />
            </div>

            {/* Term Filter */}
            <select
              value={selectedTermFilter}
              onChange={(e) => setSelectedTermFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-white border border-neutral-200 text-xs font-mono font-semibold text-[#0d0f12] focus:outline-none focus:border-[#ff4d00]"
            >
              <option value="all">All Academic Terms ({data.terms.length})</option>
              {data.terms.map((t, idx) => (
                <option key={idx} value={t.termName}>
                  {t.termName} (GPA: {t.termGpa?.toFixed(2) || "N/A"})
                </option>
              ))}
            </select>

            {/* Grade Filter */}
            <select
              value={selectedGradeFilter}
              onChange={(e) => setSelectedGradeFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-white border border-neutral-200 text-xs font-mono font-semibold text-[#0d0f12] focus:outline-none focus:border-[#ff4d00]"
            >
              <option value="all">All Grades</option>
              <option value="A">A Grades (A+, A, A-)</option>
              <option value="B">B Grades (B+, B, B-)</option>
              <option value="C">C Grades (C+, C, C-)</option>
              <option value="D">D Grades</option>
              <option value="F">F Grades</option>
            </select>
          </div>

          {/* Add Course Trigger */}
          <button
            type="button"
            onClick={() => setShowAddCourse(!showAddCourse)}
            className="px-4 py-2 rounded-xl bg-[#0d0f12] hover:bg-neutral-800 text-white font-mono text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5 text-[#ff4d00]" /> Add Course / Simulate
          </button>
        </div>

        {/* Add Course Form (Collapsible) */}
        {showAddCourse && (
          <form
            onSubmit={handleAddCourseSubmit}
            className="p-5 mx-5 rounded-2xl bg-orange-50/50 border border-[#ff4d00]/30 space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#ff4d00] uppercase tracking-wider">
                Add New Course or Future Term Simulation
              </span>
              <button
                type="button"
                onClick={() => setShowAddCourse(false)}
                className="text-xs text-neutral-500 hover:text-neutral-900"
              >
                Cancel
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
              <div>
                <label className="block text-[11px] font-mono text-neutral-700 font-bold mb-1">Course Code</label>
                <input
                  type="text"
                  placeholder="e.g. EECS 498"
                  value={newCourseCode}
                  onChange={(e) => setNewCourseCode(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl border border-neutral-300 bg-white text-xs font-mono font-bold"
                  required
                />
              </div>

              <div className="lg:col-span-2">
                <label className="block text-[11px] font-mono text-neutral-700 font-bold mb-1">Course Title</label>
                <input
                  type="text"
                  placeholder="e.g. Advanced Deep Learning"
                  value={newCourseTitle}
                  onChange={(e) => setNewCourseTitle(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl border border-neutral-300 bg-white text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-neutral-700 font-bold mb-1">Credits</label>
                <input
                  type="number"
                  step="0.5"
                  min="0.5"
                  max="12"
                  value={newCourseCredits}
                  onChange={(e) => setNewCourseCredits(Number(e.target.value))}
                  className="w-full px-3 py-1.5 rounded-xl border border-neutral-300 bg-white text-xs font-mono font-bold"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-neutral-700 font-bold mb-1">Grade</label>
                <select
                  value={newCourseGrade}
                  onChange={(e) => setNewCourseGrade(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl border border-neutral-300 bg-white text-xs font-mono font-bold"
                >
                  <option value="A+">A+ (4.0)</option>
                  <option value="A">A (4.0)</option>
                  <option value="A-">A- (3.7)</option>
                  <option value="B+">B+ (3.3)</option>
                  <option value="B">B (3.0)</option>
                  <option value="B-">B- (2.7)</option>
                  <option value="C+">C+ (2.3)</option>
                  <option value="C">C (2.0)</option>
                  <option value="D">D (1.0)</option>
                  <option value="F">F (0.0)</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-2 rounded-xl bg-[#ff4d00] hover:bg-[#e04400] text-white font-mono text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" /> Save Course
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-100/80 border-b border-black/5 text-neutral-600 font-mono uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Term</th>
                <th className="py-3 px-4">Course Code</th>
                <th className="py-3 px-4">Course Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4 text-center">Credits</th>
                <th className="py-3 px-4 text-center">Grade (Editable)</th>
                <th className="py-3 px-4 text-center">Quality Pts</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 font-sans">
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <tr key={course.id} className="hover:bg-neutral-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono font-semibold text-neutral-600 whitespace-nowrap">
                      {course.termName}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-[#0d0f12] whitespace-nowrap">
                      {course.code}
                    </td>
                    <td className="py-3 px-4 font-medium text-neutral-800">
                      {course.title}
                    </td>
                    <td className="py-3 px-4 text-neutral-500 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded-md bg-neutral-100 border border-neutral-200 text-[10px] font-mono">
                        {course.category || "General"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center font-mono font-bold text-[#0d0f12]">
                      {course.creditsAttempted.toFixed(1)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <select
                        value={course.grade}
                        onChange={(e) => handleGradeChange(course.id, e.target.value)}
                        className={`px-2 py-1 rounded-lg border font-mono font-bold text-xs focus:outline-none focus:border-[#ff4d00] ${
                          course.grade.startsWith("A")
                            ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                            : course.grade.startsWith("B")
                            ? "bg-blue-50 text-blue-800 border-blue-300"
                            : course.grade.startsWith("C")
                            ? "bg-amber-50 text-amber-800 border-amber-300"
                            : "bg-red-50 text-red-800 border-red-300"
                        }`}
                      >
                        <option value="A+">A+ (4.0)</option>
                        <option value="A">A (4.0)</option>
                        <option value="A-">A- (3.7)</option>
                        <option value="B+">B+ (3.3)</option>
                        <option value="B">B (3.0)</option>
                        <option value="B-">B- (2.7)</option>
                        <option value="C+">C+ (2.3)</option>
                        <option value="C">C (2.0)</option>
                        <option value="C-">C- (1.7)</option>
                        <option value="D">D (1.0)</option>
                        <option value="F">F (0.0)</option>
                        <option value="P">P (Pass)</option>
                        <option value="CR">CR (Credit)</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-center font-mono font-bold text-neutral-600">
                      {(getGradePoint(course.grade) * course.creditsAttempted).toFixed(1)}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleDeleteCourse(course.id)}
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Remove Course"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-neutral-500 font-mono">
                    No courses matching your filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grade Distribution & Insights Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Grade Distribution */}
        <div className="glass-card p-6 rounded-3xl border border-black/10 bg-white shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0d0f12] flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-[#ff4d00]" /> Grade Distribution
            </h4>
            <span className="text-[11px] font-mono text-neutral-500">
              {allCourses.length} Total Courses
            </span>
          </div>

          <div className="space-y-2.5 pt-1">
            {[
              { label: "A Grades (A+, A, A-)", count: data.academicInsights.gradeDistribution.A, color: "bg-emerald-500" },
              { label: "B Grades (B+, B, B-)", count: data.academicInsights.gradeDistribution.B, color: "bg-blue-500" },
              { label: "C Grades (C+, C, C-)", count: data.academicInsights.gradeDistribution.C, color: "bg-amber-500" },
              { label: "D / F Grades", count: (data.academicInsights.gradeDistribution.D || 0) + (data.academicInsights.gradeDistribution.F || 0), color: "bg-red-500" },
            ].map((item, idx) => {
              const pct = allCourses.length > 0 ? (item.count / allCourses.length) * 100 : 0;
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-neutral-700">{item.label}</span>
                    <span className="font-bold text-[#0d0f12]">
                      {item.count} ({pct.toFixed(0)}%)
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-neutral-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.color} transition-all duration-500`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Academic Strengths & Key Findings */}
        <div className="lg:col-span-2 glass-card p-6 rounded-3xl border border-black/10 bg-white shadow-sm space-y-4">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0d0f12] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#ff4d00]" /> Academic Strengths & Transfer Audit
          </h4>

          <div className="space-y-2.5">
            {data.academicInsights.strengths && data.academicInsights.strengths.map((str, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex items-start gap-2.5 text-xs text-neutral-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{str}</span>
              </div>
            ))}

            {data.academicInsights.transferReadyAudit && (
              <div className="p-3.5 rounded-2xl bg-orange-50/60 border border-[#ff4d00]/20 flex items-start gap-2.5 text-xs text-neutral-800">
                <Info className="w-4 h-4 text-[#ff4d00] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold text-[#ff4d00] block mb-0.5">Application Readiness:</strong>
                  <span>{data.academicInsights.transferReadyAudit}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
