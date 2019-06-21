const fs = require('fs')
const readline = require('readline')
const stream = require('stream')

const testDir = 'files_to_test/'
const sampleDir = 'phrases_rated/'
const highRisk = 'high_risk_phrases.txt' 
const lowRisk = 'low_risk_phrases.txt'

const readFileToTest = (filename: string) => 
  fs.readFileSync(filename, 'utf8')

const getTestWordsArray = (filename: string) => 
  fs.readFileSync(filename, 'utf8').split('\n')

const getScore = (wordType: string, file: string) => {
  const testWords = getTestWordsArray(sampleDir + wordType)
  const testSentence = readFileToTest(testDir + file)

  let matches = 0
  testWords.map((word: string) => {
    testSentence.includes(word) && matches++
    return matches
  })
  
  return matches
}

const calculateScore = (high: number, low: number, file: string) => {
  const score = (high * 2) + low
  const data = `${file} : ${score}\n`
  generateOutputFile(data, file)
}

const generateOutputFile = (data: string, file: string) => {
  fs.appendFile('output.txt', data, (err: Error) => {
    if (err) console.log({ err: 'there was an error creating output file'})
    console.log(`output.txt successfully generated for filename: ${file}`)
  })
}

async function getRiskScores () {
  fs.readdir(testDir, 'utf8', (err: Error, files: Array<string>) => {
    try {
      files.map(async (file) => {
        const highRiskWords = await getScore(highRisk, file)
        const lowRiskWords = await getScore(lowRisk, file)
        calculateScore(highRiskWords, lowRiskWords, file)
      })
    } catch(err){
        console.log({err: 'error calculating scores'})
    }
  })
}

getRiskScores()



