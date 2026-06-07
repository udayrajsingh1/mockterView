import ReactDom from 'react-dom'
import Editor from "@monaco-editor/react";
function CodeEditor() {
    return (
        <Editor defaultLanguage="C++" defaultValue="// Write your code here" />
    )
    
}

export default CodeEditor