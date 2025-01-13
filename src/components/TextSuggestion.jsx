import React, { useState, useRef } from 'react';
import './text.css';

const TextSuggestion = () => {
  const [inputText, setInputText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [cursorPosition, setCursorPosition] = useState({ top: 0, left: 0 });
  const [currentKey, setCurrentKey] = useState(null); // Store the current key (e.g., "delhi", "punjab")
  const textAreaRef = useRef(null);
  const mirrorRef = useRef(null);

  const data = [
    {
      delhi: { name: 'Delhi municipal corporation', value: ['@mcd_delhi', '@pwd_delhi'] },
      punjab: { name: 'Punjab municipal corporation', value: ['@mcd_punjab', '@pwd_punjab'] },
      meghalaya: { name: 'Meghalaya municipal corporation', value: ['@mcd_meghalaya', '@pwd_meghalaya'] },
      karnataka: { name: 'Karnataka municipal corporation', value: ['@mcd_karnataka', '@pwd_karnataka'] },
      kerla: { name: 'Kerla municipal corporation', value: ['@mcd_kerla', '@pwd_kerla'] },
    },
  ];

  const keys = Object.keys(data[0]);

  const checkText = (e) => {
    const text = e.target.value;
    setInputText(text);

    const words = text.trim().split(/\s+/); // Split text by spaces
    const lastWord = words[words.length - 1].toLowerCase(); // Get the last word

    if (keys.includes(lastWord)) {
      setSuggestions(data[0][lastWord].value);
      setCurrentKey(lastWord); // Store the current key (e.g., "delhi" or "punjab")
    } else {
      setSuggestions([]);
      setCurrentKey(null);
    }

    updateCursorPosition();
  };

  const updateCursorPosition = () => {
    if (textAreaRef.current && mirrorRef.current) {
      const textarea = textAreaRef.current;
      const mirror = mirrorRef.current;

      const { selectionStart } = textarea;
      const inputTextUpToCursor = textarea.value.substring(0, selectionStart);
      mirror.textContent = inputTextUpToCursor;

      const span = document.createElement('span');
      span.textContent = '|'; 
      mirror.appendChild(span);

      const spanRect = span.getBoundingClientRect();
      setCursorPosition({
        top: spanRect.top - textarea.getBoundingClientRect().top,
        left: spanRect.left - textarea.getBoundingClientRect().left,
      });

      mirror.removeChild(span); 
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (currentKey) {
      const keyName = data[0][currentKey].name;
      
      const words = inputText.trim().split(/\s+/);
      words.pop(); // Remove the last word

      const updatedText = [...words, `${keyName}-${suggestion}`].join(' ');

      setInputText(updatedText);
      setSuggestions([]); // Clear suggestions after selecting one
    }
  };

  return (
    <>
      <div className="container">
        <textarea
          className="input"
          onChange={checkText}
          value={inputText}
          ref={textAreaRef}
          onKeyUp={updateCursorPosition}
          onClick={updateCursorPosition}
        />
        <div
          className="suggestions-container"
          style={{ top: cursorPosition.top + 20, left: cursorPosition.left }}
        >
          {suggestions.map((suggestion, index) => (
            <span
              className="suggestion"
              key={index}
              onClick={() => handleSuggestionClick(suggestion)} 
            >
              {suggestion}
            </span>
          ))}
        </div>

        {/* Hidden mirror element for cursor calculation */}
        <div className="mirror" ref={mirrorRef}></div>
      </div>
    </>
  );
};

export default TextSuggestion;
