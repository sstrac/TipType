import './App.css';
import { useEffect, useState } from 'react'
import { TextField, AppBar, Typography } from '@mui/material';

function App() {
  const [enteredText, setEnteredText] = useState("")
  const [percentage, setPercentage] = useState()
  const [start, setStart] = useState()
  const [complete, setComplete] = useState()
  const [startedTyping, setStartedTyping] = useState(false)
  const paragraph = "Before the advent of cheap and widespread artificial refrigeration in the modern era, the curing of " +
  "meat was necessary for its safe long-term preservation. However, both the flavour imparted to the meat " +
   "in doing so and the extended shelf life it offered had become much prized, and although curing is in general " +
    "no longer necessary in the developed world, it continues in wide use"

  useEffect(() => {
    if(enteredText != ""){ setStartedTyping(true) }
  })

  useEffect(() => {
    startTimer()
  }, [startedTyping])
  
  function detectTyping(e){
    if(e.key == "Enter"){
      e.preventDefault()
      
      var correctCount = 0
      spellcheck()
      completeTimer()
      return false
    }
  }
  
  function startTimer(){
    setStart(Date.now())
  }

  function completeTimer(){
    setComplete(((Date.now() - start) / 1000).toFixed(2))
  }

  function spellcheck(){
    const words = enteredText.split(" ")
    const paragraphWords = paragraph.split(" ")
    var correctnessArray = []
    var i = 0
    while(i<words.length){
      correctnessArray.push(words[i]==paragraphWords[i])
      i+=1
    }

    let correctCount = 0    
    for(let i=0; i<correctnessArray.length; i +=1){
      if(correctnessArray[i] == true){
        correctCount += 1
      }
    }
    setPercentage(`${(correctCount / paragraphWords.length) * 100}%`)
  }
  function CompleteParagraph() {
    if(complete != undefined){
      return (<div>
        <h2>{complete} seconds</h2><h2>{percentage}</h2>
        </div>)
    }
    else {
      return (<div></div>)
    }
  }

  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
      <div>
      <AppBar style={{height: "50px"}}>
        <Typography variant="h6" color="inherit" component="div" style={{paddingLeft: "20px", paddingTop: "10px"}}>
        TipType
        </Typography>
      </AppBar>
      </div>
      <div style={{paddingTop: "70px", alignItems: "center", display: "flex", flexDirection: "column"}}>
      <p style={{width: "500px"}}>{paragraph}</p>
      <TextField 
        style={{width: "500px"}} 
        onChange={(e) => setEnteredText(e.target.value)}
        onKeyDown={(e) => detectTyping(e)}
        multiline
        >
      </TextField>
      <br/>
      {CompleteParagraph()}
      </div>
    </div>
  );
}



export default App;