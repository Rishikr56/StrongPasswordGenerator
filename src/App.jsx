import React from 'react'
import { useRef } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react'

const App = () => {

  const [len, seTlen] = useState(15);
  const [numAllowed, setnumAllowed] = useState(false)
  const [charAllowed, setcharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordGenrator = useCallback(
    ()=>{
      let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      if(numAllowed){ str += "0123456789"};
      if(charAllowed){ str += "!@#$%^&*()_+~"};
      let n = str.length;
      let pass = "";
      for(let i=0;i<len;i++){
        pass += str.charAt(Math.floor(Math.random()*n +1));
      } 
      setPassword(pass);
      console.log(n);
      console.log(charAllowed);
    },
    [len,numAllowed,charAllowed],
  )
  
  const copyClip = ()=>{
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }

  const passRef = useRef(null);
  

  useEffect(() => {
    passwordGenrator();
  }, [len,numAllowed,charAllowed]); 
  
  return (
    <div className='pt-1  w-full flex justify-center'>
      <div style={{backgroundColor:'rgb(11, 11, 60)'}} className=' px-48 py-10 rounded-lg shadow-2xl'>
        <h1 className='mb-2 font-bold text-2xl'>Password Generator</h1>
        <div className='flex  '>
          <input className=' rounded-tl-lg  rounded-bl-lg text-emerald-400 w-96 bg-transparent outline-none border-2 border-gray-500  px-3 py-1' type="text"
          ref={passRef}
          value={password}/>
          <button onClick={copyClip} className=' rounded-tr-lg rounded-br-lg bg-blue-600 hover:bg-blue-500  px-3 py-1 font-bold active:scale-95 transition duration-100  transform'>Copy</button>
        </div>
        <div className="flex item-center mt-2 gap-3 font-bold">
          <div className=''>Length : {len}</div>
          <input type="range"min={5} max={100}
          value={len} onChange={(e)=>(seTlen(e.target.value))} className='cursor-pointer'/>
          <div className="flex gap-1 mr-2">
              <label htmlFor="">Number</label>
              <input defaultChecked={numAllowed} onChange={()=>{setnumAllowed((prev)=>!prev)}} type="checkbox" name="" id="" />
          </div>
          <div className="flex gap-1">
              <label htmlFor="">Special Character</label>
              <input 
              onChange={()=>{setcharAllowed((prev)=>!prev)}}
              type="checkbox" name="" id="" />
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default App
