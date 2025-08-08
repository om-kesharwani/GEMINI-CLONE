import { createContext, useState } from "react";

// import dotenv from 'dotenv';
// dotenv.config();
import run from "../config/gemini";

export const  Context=createContext();

const ContextProvider=(props) =>{
  const[input,setInput] =useState("");
  const [recentPrompt ,setRecentPrompt]=useState("");
  const [prevPrompts,setprevPrompts]=useState([]);
  const [showResult,setShowResult]=useState(false);
  const [loading,setLoading] =useState(false);
  const [resultData,setResultData]=useState("");
  const delayPara = (index,nextWord) =>{
     setTimeout(function(){
      setResultData(prev=>prev+nextWord);
     },index*75)
  }
  const newChat=()=>{
    setLoading(false);
    setShowResult(false);
  }
  const onSent= async (prompt) =>{
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response;
    if(prompt!== undefined)
    {
      response = await run(prompt);
      setRecentPrompt(prompt)
    }

    else{
    setprevPrompts(prev =>[...prev,input])
    setRecentPrompt(input);
    response= await run(input);
    }
    
    let responseArray =response.split("**");
    let newArray="" ;
    for(let i=0;i<responseArray.length;i++)
    {
      if(i===0||i%2 !== 1) {
        newArray+=responseArray[i];
      }
      else{
        newArray+="<b>"+responseArray[i]+"</b>"
      }
    }
    let newArray2=newArray.split("*").join("</br>")
    let ResArray=newArray2.split(" ");
    for(let i=0;i<ResArray.length;i++)
    {
      const nextWord=ResArray[i];
      delayPara(i,nextWord+" ");
    }
    setLoading(false);
    setInput("");

  }
  
  const contextValue={
        prevPrompts,
        setprevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,

  }

  return(
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  )


}
export default ContextProvider;