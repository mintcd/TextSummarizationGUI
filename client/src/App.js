import React, { useState } from 'react';
import './style.scss';

function App() {
    const [inputText, setInputText] = useState('');
    const [responseText, setResponseText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [method, setMethod] = useState('spacy');

    const handleMethodChange = (event) => {
        setMethod(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const response = await fetch("http://localhost:5000/summarizer", {
            method: 'POST',
            body: JSON.stringify({ inputText, method }),
            headers: { 'Content-Type': 'application/json' }
        });
        const responseData = await response.json();
        setResponseText(responseData);
        setIsLoading(false);
    };

    return (
        <div className="container">
            <h1> Text summarizer GUI </h1>
            <div className="input-container">
                <h2>Input your text</h2>
                <textarea
                    id="inputText"
                    value={inputText}
                    onChange={(event) => setInputText(event.target.value)}
                />
            </div>
            <label>
                <h3> Select summarization method </h3>
                <div className="radio-group">
                    <div className="radio" style={{ display: 'inline-block', marginRight: '10px' }}>
                        <input type="radio" id="spacy" name="method" value="spacy" checked={method === 'spacy'} onChange={handleMethodChange} />
                        Spacy
                    </div>
                    <div className="radio" style={{ display: 'inline-block', marginRight: '10px' }}>
                        <input type="radio" id="sumy" name="method" value="sumy" checked={method === 'sumy'} onChange={handleMethodChange} />
                        Sumy
                    </div>
                </div>
            </label>
            <button type="submit" onClick={handleSubmit}>Summarize</button>

            {isLoading && <div className="loading-spinner"></div>}
            <div className="input-container">
                <h2>Summary</h2>
                <textarea className='output-area' value={responseText} readOnly></textarea>
            </div>

        </div>
    );
}

export default App;