import express, { response } from "express"
import { runCode, runTestCases} from "../services/judge0.js"

const router = express.Router();

router.post("/run", async (req, res) => {
    const {code, language, stdin} = req.body
    
    if(!code || !language){
       return res.status(400).json({error: "code and language are required"})
    }

    try {
        const result = await runCode({code, language, stdin})
        res.json(result)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
} )


router.post("/submit", async (req, res) => {
    const { code, language, testCases } = req.body

    if(!code || !language || !testCases){
       return res.status(400).json({error: "code, language and test cases are required"})
    }

    try {
        const results = await runTestCases({code, language, testCases})
        const passed = results.filter(r => r.passed).length
        res.json({
            results,
            summary: {
                passed,
                total: results.length,
                allPassed: passed === results.length,
            }
        })
        
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})


export default router;