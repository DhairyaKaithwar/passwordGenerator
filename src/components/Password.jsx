import React, { useCallback } from "react";
import { useState, useEffect,useRef } from "react";
import "./password.css";
function Password() {
  const [length, setLength] = useState(8);
  const [isChar, setIsChar] = useState(false);
  const [isNum, setIsNum] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef=useRef(null);

  const setter = useCallback(() => {
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (isChar) {
      str += "@#$&_+=-/?<>`~";
    }
    if (isNum) {
      str += "1234567890";
    }
    let pass="";
    for (let i = 0; i < length; i++) {
      pass += str[Math.floor(Math.random() * str.length)];
    }
    setPassword(pass);

  }, [length,isChar,isNum]);


  useEffect(()=>{
    setter()
  },[length,isChar,isNum])

  console.log(password);

  function copyToClipboard(){
    navigator.clipboard.writeText(password)
    passwordRef.current.select()
    alert("Password copied to clipboard");
  }
  

  return (
    <>
      <div className="outer">
        <h1>Password Generator</h1>
        <div className="pass">
          <div className="search">
            <input
              type="text"
              className="inp"
              readOnly
              ref={passwordRef}
              value={password}
              placeholder="Password here"
            />
            <button className="bttn"  onClick={copyToClipboard}>copy</button>
          </div>
          <div className="rangeInp">
            <div className="subRange">
            <input
              type="range"
              className="range"
              value={length}
              min={8}
              max={20}
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <p>
              <span>{length}</span>
            </p>
            </div>
            <div className="check">
              <input
                type="checkbox"
                defaultChecked={isNum}
                onChange={() => setIsNum(!isNum)}
              />
              <p>Numbers</p>
              <input
                type="checkbox"
                defaultChecked={isChar}
                onChange={() => setIsChar(!isChar)}
              />
              <p>Characters</p>
            </div>
          </div>
        </div>
      </div>

      {/* <TextSuggestion/> */}
    </>
  );
}

export default Password;
