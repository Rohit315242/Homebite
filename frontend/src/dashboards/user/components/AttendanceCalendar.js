import { useState, useEffect } from "react";
import api from "../../../services/api";

function AttendanceCalendar() {
  const [presentDays, setPresentDays] = useState(new Set());
  const [loading, setLoading]         = useState(true);
  const [marking, setMarking]         = useState(false);
  const [alreadyMarked, setAlreadyMarked] = useState(false);
  const [error, setError]             = useState("");

  const today        = new Date();
  const todayDate    = today.getDate();
  const currentMonth = today.getMonth() + 1;
  const currentYear  = today.getFullYear();
  const totalDays    = new Date(currentYear, currentMonth, 0).getDate();
  const monthName    = today.toLocaleString("default", { month: "long" });

  
  useEffect(() => { loadAttendance(); }, []);

  const loadAttendance = async () => {
    try {
      setLoading(true);

      const todayRes = await api.get("/attendance/today");
      setAlreadyMarked(todayRes.data.marked);

      const history = await api.get("/attendance/my");
      const days = history.data.map((item) => new Date(item.date).getDate());
      setPresentDays(new Set(days));

    } catch (err) {
      console.log(err);
      setError("Unable to load attendance.");
    } finally {
      setLoading(false);
    }
  };

  const markAttendance = async () => {
    if (alreadyMarked || marking) return;

    try {
      setMarking(true);

      const subRes = await api.get("/subscriptions/my");
      if (subRes.data.length === 0) {
        alert("Please subscribe to a mess first.");
        return;
      }

      const messId = subRes.data[0].mess._id;
      await api.post("/attendance/mark", { messId });

      setAlreadyMarked(true);
      setPresentDays((prev) => {
        const next = new Set(prev);
        next.add(todayDate);
        return next;
      });

      alert("Attendance Marked Successfully ✅");

    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Unable to mark attendance.");
    } finally {
      setMarking(false);
    }
  };

  
  const presentCount = presentDays.size;
  const absentCount  = todayDate - presentCount;
  const percentage   = todayDate === 0
    ? 0
    : Math.round((presentCount / todayDate) * 100);


  if (loading) return <div style={s.centerMsg}>Loading Attendance...</div>;
  if (error)   return <div style={{ ...s.centerMsg, color: "#ef4444" }}>{error}</div>;

 
  return (
    <div style={s.wrapper}>

      {/* Header */}
      <div style={s.header}>
        <div>
          <div style={s.title}>📅 Attendance</div>
          <div style={s.month}>{monthName} {currentYear}</div>
        </div>
        <button
          style={alreadyMarked ? s.doneBtn : s.markBtn}
          disabled={alreadyMarked || marking}
          onClick={markAttendance}
        >
          {alreadyMarked ? "✅ Present" : marking ? "Marking..." : "Mark Today"}
        </button>
      </div>

      {/* Calendar Grid */}
      <div style={s.grid}>
        {Array.from({ length: totalDays }, (_, i) => i + 1).map((day) => {
          const present = presentDays.has(day);
          const isToday = day === todayDate;
          const future  = day > todayDate;

          return (
            <div
              key={day}
              style={{
                ...s.day,
                ...(present ? s.present : {}),
                ...(isToday && !present ? s.today : {}),
                ...(future ? s.future : {}),
              }}
              title={
                future  ? "Future"          :
                present ? `Day ${day} — Present` :
                          `Day ${day} — Absent`
              }
            >
              {present ? "✓" : day}
            </div>
          );
        })}
      </div>

      {/* Stats */}
      <div style={s.statsRow}>
        <div style={s.statBox}>
          <div style={{ ...s.statVal, color: "#4ade80" }}>{presentCount}</div>
          <div style={s.statLabel}>Present</div>
        </div>
        <div style={s.statBox}>
          <div style={{ ...s.statVal, color: "#f87171" }}>{absentCount}</div>
          <div style={s.statLabel}>Absent</div>
        </div>
        <div style={s.statBox}>
          <div style={s.statVal}>{percentage}%</div>
          <div style={s.statLabel}>Rate</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={s.progressBg}>
        <div style={{ ...s.progressFill, width: `${percentage}%` }} />
      </div>

    </div>
  );
}


const s = {
  wrapper: {
    padding: "4px 0",
  },
  centerMsg: {
    fontSize: 12,
    color: "#64748b",
    padding: "12px 0",
    textAlign: "center",
  },

  // Header
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  title: {
    fontSize: 13,
    fontWeight: 700,
    color: "#1e293b",
  },
  month: {
    fontSize: 11,
    color: "#64748b",
    marginTop: 2,
  },
  markBtn: {
    padding: "7px 14px",
    background: "#6366f1",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontSize: 12,
    fontWeight: 600,
    cursor: "pointer",
  },
  doneBtn: {
    padding: "7px 14px",
    background: "#dcfce7",
    color: "#16a34a",
    border: "1px solid #bbf7d0",
    borderRadius: 8,
    fontSize: 12,
    fontWeight: 600,
    cursor: "default",
  },

  // Calendar
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: 4,
    marginBottom: 12,
  },
  day: {
    aspectRatio: 1,
    borderRadius: 6,
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 10,
    color: "#94a3b8",
    fontWeight: 500,
    userSelect: "none",
  },
  present: {
    background: "#ede9fe",
    border: "1px solid #c4b5fd",
    color: "#6d28d9",
    fontWeight: 700,
  },
  today: {
    border: "1px solid #f59e0b",
    color: "#d97706",
    fontWeight: 700,
  },
  future: {
    opacity: 0.35,
  },

  // Stats
  statsRow: {
    display: "flex",
    gap: 8,
    marginBottom: 10,
  },
  statBox: {
    flex: 1,
    background: "#f8fafc",
    borderRadius: 10,
    padding: "8px 6px",
    textAlign: "center",
    border: "1px solid #e2e8f0",
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  statVal: {
    fontSize: 18,
    fontWeight: 700,
    color: "#1e293b",
  },
  statLabel: {
    fontSize: 10,
    color: "#94a3b8",
    fontWeight: 500,
  },

  // Progress
  progressBg: {
    height: 6,
    background: "#f1f5f9",
    borderRadius: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, #6366f1, #a78bfa)",
    borderRadius: 10,
    transition: "width 0.4s ease",
  },
};

export default AttendanceCalendar;