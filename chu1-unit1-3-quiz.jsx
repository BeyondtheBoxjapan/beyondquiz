import { useState, useEffect } from "react";

const ALL_QUESTIONS = [
  // Unit 1 - be動詞
  { unit: "Unit 1", tag: "be動詞", question: "「私はサクラです。」を英語にすると？", options: ["I am Sakura.", "I is Sakura.", "I are Sakura.", "Me am Sakura."], answer: 0, hint: "I のあとは am！" },
  { unit: "Unit 1", tag: "be動詞", question: "「あなたは学生ですか？」を英語にすると？", options: ["Are you a student?", "Do you a student?", "Is you a student?", "You are a student?"], answer: 0, hint: "Are you〜? で疑問文！" },
  { unit: "Unit 1", tag: "be動詞", question: "「私は野球選手ではありません。」を英語にすると？", options: ["I am not a baseball player.", "I do not a baseball player.", "I is not a baseball player.", "I not am a baseball player."], answer: 0, hint: "am のあとに not！" },
  { unit: "Unit 1", tag: "一般動詞", question: "「私はサッカーをします。」を英語にすると？", options: ["I play soccer.", "I am play soccer.", "I plays soccer.", "I do play soccer."], answer: 0, hint: "一般動詞はそのまま使う！" },
  { unit: "Unit 1", tag: "一般動詞", question: "「あなたはテニスをしますか？」を英語にすると？", options: ["Do you play tennis?", "Are you play tennis?", "You play tennis?", "Does you play tennis?"], answer: 0, hint: "Do you〜? で疑問文！" },
  { unit: "Unit 1", tag: "一般動詞", question: "「私は音楽が好きではありません。」を英語にすると？", options: ["I don't like music.", "I am not like music.", "I doesn't like music.", "I not like music."], answer: 0, hint: "don't = do not！" },
  { unit: "Unit 1", tag: "can", question: "「あなたは漢字を書けますか？」を英語にすると？", options: ["Can you write kanji?", "Do you can write kanji?", "Are you write kanji?", "You can write kanji?"], answer: 0, hint: "Can you〜? で疑問文！" },
  { unit: "Unit 1", tag: "can", question: "「私は速く走れます。」を英語にすると？", options: ["I can run fast.", "I am run fast.", "I runs fast.", "I do run fast."], answer: 0, hint: "can のあとは動詞の原形！" },

  // Unit 2 - This is / He is / She is
  { unit: "Unit 2", tag: "This is", question: "「こちらはケンです。」を英語にすると？", options: ["This is Ken.", "He is Ken.", "That Ken is.", "Is this Ken?"], answer: 0, hint: "人を紹介するときは This is〜！" },
  { unit: "Unit 2", tag: "He/She", question: "「彼女は私の友達です。」を英語にすると？", options: ["She is my friend.", "He is my friend.", "This is my friend.", "Her is my friend."], answer: 0, hint: "女性は She！" },
  { unit: "Unit 2", tag: "He/She", question: "「彼は私たちの先生です。」を英語にすると？", options: ["He is our teacher.", "She is our teacher.", "This is our teacher.", "Him is our teacher."], answer: 0, hint: "男性は He！" },
  { unit: "Unit 2", tag: "What is", question: "「これは何ですか？」を英語にすると？", options: ["What is this?", "What are this?", "This is what?", "What this is?"], answer: 0, hint: "What is this? が基本！" },
  { unit: "Unit 2", tag: "What is", question: "「これはペンです。」を英語にすると？", options: ["This is a pen.", "This are a pen.", "It is pen.", "This pen is."], answer: 0, hint: "This is〜. で答える！" },
  { unit: "Unit 2", tag: "He/She", question: "「彼女は親切ですか？」を英語にすると？", options: ["Is she kind?", "Does she kind?", "Are she kind?", "She is kind?"], answer: 0, hint: "Is she〜? で疑問文！" },
  { unit: "Unit 2", tag: "He/She", question: "「彼は野球が好きではありません。」を英語にすると？", options: ["He doesn't like baseball.", "He don't like baseball.", "He isn't like baseball.", "He not like baseball."], answer: 0, hint: "He/She には doesn't を使う！" },

  // Unit 3 - 疑問詞
  { unit: "Unit 3", tag: "Where", question: "「あなたはどこで練習しますか？」を英語にすると？", options: ["Where do you practice?", "What do you practice?", "When do you practice?", "Where are you practice?"], answer: 0, hint: "場所を聞くときは Where！" },
  { unit: "Unit 3", tag: "When", question: "「次のコンサートはいつですか？」を英語にすると？", options: ["When is the next concert?", "Where is the next concert?", "What is the next concert?", "Who is the next concert?"], answer: 0, hint: "時間を聞くときは When！" },
  { unit: "Unit 3", tag: "Who", question: "「あの人は誰ですか？」を英語にすると？", options: ["Who is that?", "What is that?", "Where is that?", "When is that?"], answer: 0, hint: "人を聞くときは Who！" },
  { unit: "Unit 3", tag: "What", question: "「あなたの好きな教科は何ですか？」を英語にすると？", options: ["What is your favorite subject?", "Who is your favorite subject?", "Where is your favorite subject?", "When is your favorite subject?"], answer: 0, hint: "ものを聞くときは What！" },
  { unit: "Unit 3", tag: "Where", question: "「彼はどこに住んでいますか？」を英語にすると？", options: ["Where does he live?", "Where do he live?", "Where is he live?", "Where he lives?"], answer: 0, hint: "He には does を使う！" },
];

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

const UNIT_COLORS = {
  "Unit 1": { main: "#FF6B6B", light: "rgba(255,107,107,0.15)", border: "rgba(255,107,107,0.4)" },
  "Unit 2": { main: "#4ECDC4", light: "rgba(78,205,196,0.15)", border: "rgba(78,205,196,0.4)" },
  "Unit 3": { main: "#FFE66D", light: "rgba(255,230,109,0.15)", border: "rgba(255,230,109,0.4)" },
};

export default function App() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [screen, setScreen] = useState("title");
  const [showHint, setShowHint] = useState(false);
  const [perResult, setPerResult] = useState([]);

  useEffect(() => {
    setQuestions(shuffle(ALL_QUESTIONS).slice(0, 20).map(q => ({ ...q, options: shuffle(q.options.map((o, i) => ({ text: o, correct: i === q.answer }))).map(o => o.text), answer: 0, _correct: q.options[q.answer] })));
  }, []);

  const q = questions[current];

  const handleSelect = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = q.options[idx] === q._correct;
    if (correct) setScore(s => s + 1);
    setPerResult(prev => [...prev, { unit: q.unit, correct }]);
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(c => c + 1);
      setSelected(null);
      setShowHint(false);
    } else {
      setScreen("result");
    }
  };

  const restart = () => {
    setQuestions(shuffle(ALL_QUESTIONS).slice(0, 20).map(q => ({ ...q, options: shuffle(q.options.map((o, i) => ({ text: o, correct: i === q.answer }))).map(o => o.text), answer: 0, _correct: q.options[q.answer] })));
    setCurrent(0); setSelected(null); setScore(0); setPerResult([]); setShowHint(false); setScreen("title");
  };

  const getGrade = () => {
    const p = score / 20;
    if (p >= 0.9) return { label: "満点チャレンジャー！🏆", color: "#FFD700" };
    if (p >= 0.7) return { label: "よくできました！👏", color: "#4ECDC4" };
    if (p >= 0.5) return { label: "もう少し！💪", color: "#FF8E53" };
    return { label: "復習しよう！📖", color: "#FF6B6B" };
  };

  const unitScore = (unit) => {
    const r = perResult.filter(r => r.unit === unit);
    return r.length ? `${r.filter(r => r.correct).length}/${r.length}` : "-";
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #0f2027, #203a43, #2c5364)",
      fontFamily: "'Hiragino Kaku Gothic ProN', 'Noto Sans JP', sans-serif",
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", padding: "24px 20px",
    }}>
      <div style={{ width: "100%", maxWidth: 420 }}>

        {/* TITLE */}
        {screen === "title" && (
          <div style={{ textAlign: "center", animation: "fadeUp 0.6s ease" }}>
            <div style={{ fontSize: 60, marginBottom: 12, animation: "float 3s ease-in-out infinite" }}>📘</div>
            <div style={{ color: "#4ECDC4", fontSize: 12, letterSpacing: 3, marginBottom: 8 }}>中学1年生 英語</div>
            <h1 style={{
              background: "linear-gradient(90deg, #FF6B6B, #4ECDC4, #FFE66D)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              fontSize: 24, fontWeight: 900, margin: "0 0 12px", lineHeight: 1.3,
            }}>
              New Horizon<br />Unit 1〜3 クイズ
            </h1>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 20 }}>
              {["Unit 1", "Unit 2", "Unit 3"].map(u => (
                <div key={u} style={{
                  background: UNIT_COLORS[u].light, border: `1px solid ${UNIT_COLORS[u].border}`,
                  borderRadius: 50, padding: "4px 12px", color: UNIT_COLORS[u].main, fontSize: 12, fontWeight: 700,
                }}>
                  {u}
                </div>
              ))}
            </div>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 1.8, marginBottom: 32 }}>
              be動詞・一般動詞・This is/<br />He is・疑問詞を全部まとめて<br />
              <span style={{ color: "#FFE66D", fontWeight: 700 }}>20問チャレンジ！</span>
            </p>
            <button onClick={() => setScreen("quiz")} style={btn("#4ECDC4", "#2eadA0", "#1a1a1a")}>
              スタート！→
            </button>
          </div>
        )}

        {/* QUIZ */}
        {screen === "quiz" && q && (
          <div style={{ animation: "fadeUp 0.4s ease" }}>
            {/* Header */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <div style={{ display: "flex", gap: 6 }}>
                  <span style={{
                    background: UNIT_COLORS[q.unit].light, border: `1px solid ${UNIT_COLORS[q.unit].border}`,
                    borderRadius: 50, padding: "2px 10px", color: UNIT_COLORS[q.unit].main, fontSize: 11, fontWeight: 700,
                  }}>{q.unit}</span>
                  <span style={{
                    background: "rgba(255,255,255,0.07)", borderRadius: 50,
                    padding: "2px 10px", color: "rgba(255,255,255,0.5)", fontSize: 11,
                  }}>{q.tag}</span>
                </div>
                <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>{current + 1} / 20　⭐{score}</span>
              </div>
              <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 50, height: 5 }}>
                <div style={{
                  background: `linear-gradient(90deg, ${UNIT_COLORS[q.unit].main}, #60a5fa)`,
                  width: `${((current + 1) / 20) * 100}%`,
                  height: "100%", borderRadius: 50, transition: "width 0.4s ease",
                }} />
              </div>
            </div>

            {/* Question */}
            <div style={{
              background: "rgba(255,255,255,0.07)", borderRadius: 18,
              padding: "20px 18px", marginBottom: 14, 
            }}>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginBottom: 8 }}>日本語→英語にしよう！</div>
              <p style={{ color: "white", fontSize: 16, fontWeight: 700, lineHeight: 1.7, margin: 0 }}>
                {q.question}
              </p>
              <button onClick={() => setShowHint(!showHint)} style={{
                background: "none", border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 50, padding: "4px 12px", color: "rgba(255,255,255,0.5)",
                fontSize: 11, cursor: "pointer", marginTop: 10,
              }}>
                {showHint ? `💡 ${q.hint}` : "💡 ヒント"}
              </button>
            </div>

            {/* Options */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
              {q.options.map((opt, i) => {
                const isSelected = selected === i;
                const isCorrect = opt === q._correct;
                const revealed = selected !== null;
                let bg = "rgba(255,255,255,0.07)";
                let border = "2px solid rgba(255,255,255,0.1)";
                if (revealed && isCorrect) { bg = "rgba(78,205,196,0.2)"; border = "2px solid #4ECDC4"; }
                else if (revealed && isSelected && !isCorrect) { bg = "rgba(255,107,107,0.2)"; border = "2px solid #FF6B6B"; }
                return (
                  <button key={i} onClick={() => handleSelect(i)} style={{
                    background: bg, border, borderRadius: 12,
                    padding: "13px 16px", color: "white", fontSize: 14,
                    fontWeight: 600, cursor: revealed ? "default" : "pointer",
                    textAlign: "left", transition: "all 0.2s", fontFamily: "inherit",
                    display: "flex", alignItems: "center", gap: 10,
                  }}>
                    <span style={{
                      width: 24, height: 24, borderRadius: "50%", flexShrink: 0,
                      background: revealed && isCorrect ? "#4ECDC4" : revealed && isSelected ? "#FF6B6B" : "rgba(255,255,255,0.15)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 12, fontWeight: 900,
                    }}>
                      {revealed ? (isCorrect ? "○" : isSelected ? "×" : "") : ["A","B","C","D"][i]}
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Feedback */}
            {selected !== null && (
              <div style={{
                background: q.options[selected] === q._correct ? "rgba(78,205,196,0.1)" : "rgba(255,107,107,0.1)",
                border: `1px solid ${q.options[selected] === q._correct ? "#4ECDC4" : "#FF6B6B"}44`,
                borderRadius: 12, padding: 12, marginBottom: 12, animation: "fadeUp 0.3s ease",
              }}>
                <div style={{ color: q.options[selected] === q._correct ? "#4ECDC4" : "#FF6B6B", fontWeight: 900, fontSize: 14, marginBottom: 4 }}>
                  {q.options[selected] === q._correct ? "🎉 正解！" : `❌ 不正解　正解は → ${q._correct}`}
                </div>
                <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>{q.hint}</div>
              </div>
            )}

            {selected !== null && (
              <button onClick={handleNext} style={btn("#FFE66D", "#FFC93C", "#1a1a1a")}>
                {current < 19 ? "つぎへ →" : "結果を見る 🏆"}
              </button>
            )}
          </div>
        )}

        {/* RESULT */}
        {screen === "result" && (() => {
          const { label, color } = getGrade();
          return (
            <div style={{ animation: "fadeUp 0.6s ease" }}>
              <div style={{ textAlign: "center", marginBottom: 20 }}>
                <div style={{ fontSize: 64, marginBottom: 12, animation: "float 2s ease-in-out infinite" }}>
                  {score >= 18 ? "🏆" : score >= 14 ? "🥈" : score >= 10 ? "🥉" : "📖"}
                </div>
                <div style={{ color, fontSize: 22, fontWeight: 900, marginBottom: 4 }}>{label}</div>
                <div style={{ color: "white", fontSize: 44, fontWeight: 900 }}>
                  {score}<span style={{ fontSize: 20, color: "rgba(255,255,255,0.5)" }}> / 20問</span>
                </div>
              </div>

              {/* Unit別スコア */}
              <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 16, padding: 16, marginBottom: 20 }}>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginBottom: 12 }}>Unit別せいせき</div>
                {["Unit 1", "Unit 2", "Unit 3"].map(u => (
                  <div key={u} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span style={{ color: UNIT_COLORS[u].main, fontWeight: 700, fontSize: 14 }}>{u}</span>
                    <span style={{ color: "white", fontSize: 16, fontWeight: 700 }}>{unitScore(u)}</span>
                  </div>
                ))}
              </div>

              <button onClick={restart} style={btn("#4ECDC4", "#2eadA0", "#1a1a1a")}>
                もう一度チャレンジ！🔄
              </button>
            </div>
          );
        })()}
      </div>

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-10px); } }
      `}</style>
    </div>
  );
}

function btn(c1, c2, textColor = "white") {
  return {
    background: `linear-gradient(135deg, ${c1}, ${c2})`,
    border: "none", borderRadius: 50, padding: "15px 0",
    color: textColor, fontSize: 16, fontWeight: 900,
    cursor: "pointer", width: "100%",
    boxShadow: `0 8px 20px ${c1}44`, fontFamily: "inherit",
  };
}
