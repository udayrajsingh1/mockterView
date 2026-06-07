import CodeEditor from "../components/CodeEditor.jsx";


function ProblemPage() {
    return(
        <>
        <div className="border border-solid-black flex h-10">
            <h1>MockterView</h1>
        </div>
        <div className="border border-solid-black flex h-screen w-screen">
            <div className="border border-solid-black flex h-screen w-1/2">
                <h1>Problem Questions</h1>
            </div>
            <div className="border border-solid-black flex w-screen">
                <h1>code editor</h1>
                <CodeEditor />
            </div>
            
        </div>
    
        </>
    )
}

export default ProblemPage;