import React, { useState, useEffect } from 'react';
import './style.scss'

function App() {
  const [text, setText] = useState("");
  const [sum, setSum] = useState("")
  const [type, setType] = useState("SpaCy")
  const [ratio, setRatio] = useState("0.8")

  const handleClick = (event) => {
    event.preventDefault();
    let xml = new XMLHttpRequest();
    xml.open("POST", "http://localhost:5000/summarizer", true)
    xml.setRequestHeader("Content-type", "application/json");
    xml.setRequestHeader("Access-Control-Allow-Origin", "*");
    xml.onreadystatechange = function () {
      if (xml.readyState === 4 && xml.status === 200) {
        console.log(xml.responseText);
      }
    };

    let data = JSON.stringify(
      { text, type, ratio })

    xml.send(data)
  }

  return (
    <div>
      <h1>Summarization Tool</h1>
      <div class="textarea-container">
        <textarea
          value={text}
          name="textarea"
          placeholder='Input you document'
          onChange={(e) => setText(e.target.value)}>
        </textarea>
      </div>

      <div class="container">
        <div class="select-container">
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="SpaCy">SpaCy</option>
            <option value="NLTK">NLTK</option>
            <option value="GenSim">GenSim</option>
            <option value="Summa">Summa</option>
          </select>
        </div>
        <div class="input-container">
          <input type="text" value={ratio} onChange={(e) => setRatio(e.target.value)} />
        </div>
      </div>

      <div class="submit-container">
        <button type="submit" onClick={handleClick}>Summarize</button>
      </div>

      <div class="textarea-container">
        <textarea
          value={text}
          name="textarea"
          placeholder='Your summarization'
          onChange={(e) => setText(e.target.value)}>
        </textarea>
      </div>
    </div>


  )
}

export default App