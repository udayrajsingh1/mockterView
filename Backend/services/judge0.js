import axios from 'axios';


const LANGUAGE_IDS = {
  javascript: 63,
  python: 71,
  java: 62,
  cpp: 54,
  c: 50,
}

async function runCode({code, language, stdin = ""}) {
    const languageId = LANGUAGE_IDS[language];
    if(!languageId) throw new Error(`Unsopported Language: ${language}`);

    const headers = {
      "Content-Type": "application/json",
      "x-apihub-key": process.env.ATD_API_KEY,
      "x-apihub-host": process.env.JUDGE0_HOST,
      "x-apihub-endpoint": process.env.JUDGE0_ENDPOINT,
    };

    const response = await axios.post(`${process.env.JUDGE0_URL}/submissions`,
        {
            source_code: code,
            language_id: languageId,
            stdin: stdin
        },
        {
          headers: headers,
          params: { 
            wait: "true",
            base64_encoded: "false"
          },
            
        }

    )

    const { stdout, stderr, compile_output, time, memory, status } = response.data

    return {
        stdout: stdout || '',
        stderr: stderr || compile_output || '',  
        time,           
        memory,         
        status: status.description,             
        passed: status.id === 3,
    }              
    
}

async function runTestCases({ code, language, testCases }) {
  const results = await Promise.all(
    testCases.map(tc => runCode({ code, language, stdin: tc.stdin }))
  )

  return results.map((result, i) => ({
    ...result,
    expectedOutput: testCases[i].expectedOutput,
    passed: result.stdout.trim() === testCases[i].expectedOutput.trim(),
  }))
}


export { runCode, runTestCases };