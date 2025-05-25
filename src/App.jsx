import { useCallback, useState , useEffect , useRef } from 'react'

import './App.css'

function App() {

  const[length, setLength] = useState(8);
  const[numberAll,setnumberAll] = useState(false);
  const[charAll,setcharAll] = useState(false);
  const[password,setPassword] = useState("");

  // useRef hook 

  const passwordRef = useRef(null);

  // function to generate password

  const passwordGenerator = useCallback( () => {

    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    
    if(numberAll){
      str += "0123456789";
    }

    if(charAll){
      str += "!@#$%^&*-_+=[]{}~`";
    }

    for(let i=1;i<=length;i++){

      let char = Math.floor( Math.random() * str.length  );
      pass += str.charAt(char);

    }

    setPassword(pass);

  }, [length,charAll,numberAll,setPassword] )


  // useEffect hook to generate new password after changes

  useEffect( () => {
    passwordGenerator();
  } , [length,charAll,numberAll,passwordGenerator] )

  // copying password to clipboard and selecting it 

  const copyPass = () => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  }

  return (
    <>

      <div className="container">

        <h1>Generate a 
        <br/>
        <p id="line2">Random Password</p></h1>

        <div className="displayy">

            <div className="password">

                <input type="text" id="pass" placeholder="Password" value={password} ref={passwordRef}/>
            
                <img onClick={copyPass} id="copy" src="/assets/copy.png" alt="copy"/>

            </div>

            {/* mid bar of variables */}

          <div className= "variables">

                <div className = "length">

                    <input 
                    type="range"
                    min={6}
                    max={80}
                    value={length}
                    onChange={ (e) => {
                      setLength(e.target.value)
                    } 
                  } 
                      />

                    <label id = "lbl">Length: {length}</label>
                </div>

            

            {/* checkboxes */}


            <div className="numbers">
                <input type="checkbox" id='numberAllowed'
                checked={numberAll} 
                onChange={() => {
                  setnumberAll( (prev) => !prev );
                } } />

                <label htmlFor="numberAllowed">Include Numbers</label>
            </div>

            <div className="chars">
                <input type="checkbox" id='charsAllowed' 
                checked={charAll}
                onChange={() => {
                  setcharAll( (prev) => !prev );
                } } />

                <label htmlFor="charsAllowed">Include Spl Characters</label>
            </div>

          </div>
            

        </div>

      </div>

    </>
  )
}

export default App
