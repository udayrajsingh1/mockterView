import { useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom"
import Editor from "@monaco-editor/react"
import api from "../api/axios.js"

export default function DSARound() {
  const { questionId } = useParams()  // reads :questionId from URL
  const editorRef = useRef(null)
  const [language, setLanguage] = useState("javascript")
  const [output, setOutput] = useState(null)
  const [isRunning, setIsRunning] = useState(false)

  // placeholder — real question fetch comes when Question model is built
  const question = {
    title: "LRU Cache",
    description: "Design a data structure that follows LRU cache constraints..."
  }

  const handleMount = (editor) => {
    editorRef.current = editor
  }

  const handleRun = async () => {
    const code = editorRef.current.getValue()
    setIsRunning(true)
    setOutput(null)

    try {
      const res = await api.post("/execute/run", { code, language })
      setOutput(res.data)
    } catch (err) {
      setOutput({ stderr: err.message, status: "Error" })
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", height: "100vh" }}>
      {/* Left — problem */}
      <div style={{ padding: "1.5rem", borderRight: "1px solid #333", overflow: "auto" }}> <h2>{question.title}</h2>
        <p>{question.description}</p>
      </div>

      {/* Right — editor + output */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "8px", display: "flex", gap: "8px" }}>
          {["javascript", "python", "java", "cpp"].map(lang => (
            <button key={lang} onClick={() => setLanguage(lang)}
              style={{ background: language === lang ? "#0e639c" : "#3a3a3a", color: "#fff", border: "none", padding: "4px 10px", borderRadius: "4px", cursor: "pointer" }}>
              {lang}
            </button>
          ))}
          <button onClick={handleRun} disabled={isRunning}
            style={{ marginLeft: "auto", background: "#16825d", color: "#fff", border: "none", padding: "4px 16px", borderRadius: "4px", cursor: "pointer" }}>
            {isRunning ? "Running..." : "Run"}
          </button>
        </div>

        <Editor
          height="60%"
          language={language}
          theme="vs-dark"
          onMount={handleMount}
          options={{ fontSize: 14, minimap: { enabled: false }, automaticLayout: true }}
        />

        <div style={{ flex: 1, padding: "1rem", background: "#1e1e1e", color: "#d4d4d4", fontFamily: "monospace", fontSize: "13px", overflow: "auto" }}>
          {!output && <span style={{ color: "#666" }}>Run your code to see output</span>}
          {output?.stdout && <pre style={{ color: "#4ec9b0" }}>{output.stdout}</pre>}
          {output?.stderr && <pre style={{ color: "#f48771" }}>{output.stderr}</pre>}
          {output?.status && <p style={{ color: "#888" }}>Status: {output.status} · {output.time}s</p>}
        </div>
      </div>
    </div>
  )
}
