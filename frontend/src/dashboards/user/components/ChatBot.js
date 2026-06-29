import { useState } from "react";
import api from "../../../services/api";

function ChatBot() {
  const [msg, setMsg] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!msg.trim()) return;
    try {
      setLoading(true);
      setReply("");
      const res = await api.post("/ai/chat", { message: msg.trim() });
      console.log("Gemini Response:", res.data);
      let aiReply = "";
      if (typeof res.data.reply === "string") {
        aiReply = res.data.reply;
      } else if (typeof res.data.reply === "object") {
        aiReply = JSON.stringify(res.data.reply, null, 2);
      } else {
        aiReply = "No response received.";
      }
      setReply(aiReply);
      setMsg("");
    } catch (err) {
      console.error(err);
      setReply(err.response?.data?.message || "Unable to connect with AI.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes blink {
          0%,100% { opacity: 1; } 50% { opacity: 0; }
        }

        .cb-input::placeholder { color: #4A4A6A; }
        .cb-input:focus {
          outline: none;
          border-color: #FF6B35 !important;
          box-shadow: 0 0 0 3px rgba(255,107,53,0.12) !important;
        }
        .cb-ask-btn:hover:not(:disabled) {
          background: #e85d28 !important;
          transform: translateY(-1px);
        }
        .cb-ask-btn:active:not(:disabled) { transform: translateY(0); }
        .cb-ask-btn:disabled { opacity: 0.55; cursor: not-allowed; }

        .cb-reply-box {
          animation: fadeSlideIn 0.25s ease both;
        }
        .cb-reply-scroll::-webkit-scrollbar { width: 3px; }
        .cb-reply-scroll::-webkit-scrollbar-track { background: transparent; }
        .cb-reply-scroll::-webkit-scrollbar-thumb { background: #2A2A45; border-radius: 4px; }

        .cb-clear:hover { background: #1C1C34 !important; color: #FF6B35 !important; border-color: #FF6B35 !important; }
      `}</style>

      <div style={s.wrap}>

        {/* ── Header ── */}
        <div style={s.header}>
          <div style={s.avatarWrap}>
            <div style={s.avatar}>🤖</div>
            <div style={s.onlineDot} />
          </div>
          <div>
            <div style={s.aiName}>HomeBite Nutrition AI</div>
            <div style={s.aiSub}>Powered by Gemini · Ask anything</div>
          </div>
        </div>

        <div style={s.divider} />

        {/* ── Hint ── */}
        {!reply && !loading && (
          <div style={s.hint}>
            <div style={s.hintTitle}>Try asking about:</div>
            <div style={s.hintTags}>
              {["🍗 Chicken", "🧀 Paneer", "🍚 Rice", "🥚 Egg", "🍌 Banana"].map(f => (
                <span
                  key={f}
                  style={s.hintTag}
                  onClick={() => setMsg(f.split(" ")[1])}
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ── Loading state ── */}
        {loading && (
          <div style={s.loadingWrap}>
            <div style={s.spinner} />
            <div style={s.loadingText}>
              Analyzing nutrition
              <span style={{ animation: "blink 1s infinite" }}>...</span>
            </div>
          </div>
        )}

        {/* ── Reply box ── */}
        {reply && !loading && (
          <div style={s.replyOuter} className="cb-reply-box">
            <div style={s.replyHeader}>
              <div style={s.replyLabel}>🥗 Nutrition Info</div>
              <button
                onClick={() => setReply("")}
                style={s.clearBtn}
                className="cb-clear"
              >
                ✕
              </button>
            </div>
            <div style={s.replyScroll} className="cb-reply-scroll">
              {reply}
            </div>
          </div>
        )}

        {/* ── Input area ── */}
        <div style={s.inputArea}>
          <input
            style={s.input}
            className="cb-input"
            placeholder="Enter food name..."
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") askAI(); }}
          />
          <button
            style={s.askBtn}
            className="cb-ask-btn"
            disabled={loading}
            onClick={askAI}
          >
            {loading ? <div style={s.btnSpinner} /> : "Ask AI ✦"}
          </button>
        </div>

      </div>
    </>
  );
}

const T = {
  bg:     "#0F0F1A",
  card:   "#16162A",
  card2:  "#1C1C34",
  bdr:    "#2A2A45",
  orange: "#FF6B35",
  teal:   "#4ECDC4",
  text:   "#F0F0F0",
  muted:  "#8888AA",
  faint:  "#3A3A5C",
  green:  "#22C55E",
  disp:   "'Space Grotesk', sans-serif",
  body:   "'Inter', sans-serif",
};

const s = {
  wrap: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    gap: 12,
    fontFamily: T.body,
    color: T.text,
  },

  /* Header */
  header: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    flexShrink: 0,
  },
  avatarWrap: { position: "relative", flexShrink: 0 },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: "50%",
    background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
  },
  onlineDot: {
    position: "absolute",
    bottom: 1, right: 1,
    width: 9, height: 9,
    borderRadius: "50%",
    background: T.green,
    border: `2px solid ${T.card}`,
  },
  aiName: {
    fontSize: 13,
    fontWeight: 700,
    color: T.text,
    fontFamily: T.disp,
  },
  aiSub: {
    fontSize: 10,
    color: T.muted,
    marginTop: 1,
  },

  divider: {
    height: 1,
    background: T.bdr,
    flexShrink: 0,
  },

  /* Hint tags */
  hint: {
    flexShrink: 0,
  },
  hintTitle: {
    fontSize: 10,
    fontWeight: 600,
    color: T.muted,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginBottom: 7,
    fontFamily: T.disp,
  },
  hintTags: {
    display: "flex",
    flexWrap: "wrap",
    gap: 5,
  },
  hintTag: {
    padding: "4px 10px",
    background: T.card2,
    border: `1px solid ${T.bdr}`,
    borderRadius: 20,
    fontSize: 11,
    color: T.muted,
    cursor: "pointer",
    fontFamily: T.disp,
    fontWeight: 500,
    transition: "all 0.15s",
  },

  /* Loading */
  loadingWrap: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  spinner: {
    width: 28,
    height: 28,
    borderRadius: "50%",
    border: `3px solid ${T.faint}`,
    borderTopColor: T.orange,
    animation: "spin 0.7s linear infinite",
  },
  loadingText: {
    fontSize: 12,
    color: T.muted,
    fontFamily: T.disp,
  },

  /* Reply */
  replyOuter: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    background: T.card2,
    border: `1px solid ${T.bdr}`,
    borderRadius: 12,
    overflow: "hidden",
    minHeight: 0,
  },
  replyHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px 12px",
    borderBottom: `1px solid ${T.bdr}`,
    flexShrink: 0,
  },
  replyLabel: {
    fontSize: 11,
    fontWeight: 700,
    color: T.orange,
    letterSpacing: "0.06em",
    fontFamily: T.disp,
  },
  clearBtn: {
    background: "transparent",
    border: `1px solid ${T.bdr}`,
    color: T.muted,
    fontSize: 11,
    width: 22,
    height: 22,
    borderRadius: 6,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    transition: "all 0.15s",
    fontFamily: T.body,
  },
  replyScroll: {
    flex: 1,
    overflowY: "auto",
    padding: "12px 14px",
    fontSize: 13,
    lineHeight: 1.75,
    color: T.text,
    whiteSpace: "pre-wrap",
  },

  /* Input area */
  inputArea: {
    display: "flex",
    gap: 8,
    flexShrink: 0,
  },
  input: {
    flex: 1,
    background: T.card2,
    border: `1px solid ${T.bdr}`,
    borderRadius: 10,
    padding: "10px 14px",
    fontSize: 13,
    color: T.text,
    fontFamily: T.body,
    transition: "border-color 0.15s, box-shadow 0.15s",
  },
  askBtn: {
    padding: "10px 16px",
    background: T.orange,
    color: "#fff",
    border: "none",
    borderRadius: 10,
    fontSize: 12,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: T.disp,
    transition: "background 0.15s, transform 0.1s",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
  btnSpinner: {
    width: 14,
    height: 14,
    borderRadius: "50%",
    border: "2px solid rgba(255,255,255,0.3)",
    borderTopColor: "#fff",
    animation: "spin 0.7s linear infinite",
  },
};

export default ChatBot;