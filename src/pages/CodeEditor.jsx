import { useEffect, useRef, useState } from 'react';
import EditorModule from 'react-simple-code-editor';
import Prism from 'prismjs';
import { Copy, Play, RotateCcw, Trash2, Check } from 'lucide-react';

const Editor = EditorModule.default || EditorModule;

const starters = {
 javascript:'// JavaScript\nconst name = "UDIT";\nconsole.log(`Welcome to ${name}!`);',
 python:'# Python\nname = "UDIT"\nprint(f"Welcome to {name}!")',
 html:'<!doctype html>\n<html>\n  <body><h1>Welcome to UDIT</h1></body>\n</html>',
 css:'h1 {\n  color: #111111;\n  font-family: Inter, sans-serif;\n}',
 typescript:'const name: string = "UDIT";\nconsole.log(`Welcome to ${name}!`);',
 java:'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Welcome to UDIT");\n  }\n}',
 c:'#include <stdio.h>\nint main(void) {\n  printf("Welcome to UDIT\\n");\n  return 0;\n}',
 cpp:'#include <iostream>\nint main() {\n  std::cout << "Welcome to UDIT" << std::endl;\n}',
 php:'<?php\necho "Welcome to UDIT";',
 sql:'SELECT \'Welcome to UDIT\' AS message;',
 csharp:'Console.WriteLine("Welcome to UDIT");',
 go:'package main\nimport "fmt"\nfunc main() { fmt.Println("Welcome to UDIT") }',
 rust:'fn main() { println!("Welcome to UDIT"); }',
 kotlin:'fun main() { println("Welcome to UDIT") }',
 swift:'print("Welcome to UDIT")',
 ruby:'puts "Welcome to UDIT"',
 dart:'void main() { print("Welcome to UDIT"); }',
 r:'print("Welcome to UDIT")',
 matlab:'disp(\'Welcome to UDIT\')',
 bash:'#!/usr/bin/env bash\necho "Welcome to UDIT"'
};

const names = {javascript:"JavaScript",python:"Python",html:"HTML",css:"CSS",typescript:"TypeScript",java:"Java",c:"C",cpp:"C++",php:"PHP",sql:"SQL",csharp:"C#",go:"Go",rust:"Rust",kotlin:"Kotlin",swift:"Swift",ruby:"Ruby",dart:"Dart",r:"R",matlab:"MATLAB",bash:"Bash"};

export default function CodeEditor(){
 const [language,setLanguage]=useState("javascript");
 const [code,setCode]=useState(starters.javascript);
 const [output,setOutput]=useState("");
 const [error,setError]=useState("");
 const [running,setRunning]=useState(false);
 const [copied,setCopied]=useState(false);
 const iframeRef=useRef(null);

 useEffect(()=>{
  const listener=event=>{
   if(event.data?.source==="udit-js-run"){setOutput(event.data.output);setError(event.data.error||"");setRunning(false)}
  };
  window.addEventListener("message",listener);
  return ()=>window.removeEventListener("message",listener);
 },[]);

 function changeLanguage(slug){setLanguage(slug);setCode(starters[slug]);setOutput("");setError("")}
 async function run(){
  setRunning(true);setOutput("");setError("");
  if(language==="javascript"){
   const iframe=iframeRef.current;
   const src=`<!doctype html><script>
    const send=(output,error="")=>parent.postMessage({source:"udit-js-run",output,error},"*");
    const logs=[];
    console.log=(...args)=>{logs.push(args.map(v=>typeof v==="object"?JSON.stringify(v):String(v)).join(" "));};
    console.error=(...args)=>{logs.push(args.join(" "));};
    try { (async()=>{ eval(${JSON.stringify(code)}); send(logs.join("\\n")); })().catch(e=>send("",e.message)); }
    catch(e){ send("",e.message); }
   <\/script>`;
   iframe.srcdoc=src;
  } else if(language==="python"){
   if(!window.loadPyodide){
    setOutput("Loading official Pyodide runtime...");
    const script=document.createElement("script");
    script.src="https://cdn.jsdelivr.net/pyodide/v0.27.7/full/pyodide.js";
    script.onload=()=>runPython();
    script.onerror=()=>{setError("Could not load Pyodide. Check your internet connection.");setRunning(false)};
    document.head.appendChild(script);
   } else runPython();
  } else {
   setRunning(false);
   setError(`Browser execution is not available for ${names[language]}. This language needs a local compiler or execution environment.`);
  }
 }
 async function runPython(){
  try{
   const pyodide=await window.loadPyodide({indexURL:"https://cdn.jsdelivr.net/pyodide/v0.27.7/full/"});
   pyodide.runPython("import sys\nfrom io import StringIO\nsys.stdout=StringIO()");
   pyodide.runPython(code);
   setOutput(pyodide.runPython("sys.stdout.getvalue()"));
  }catch(e){setError(e.message)}
  setRunning(false);
 }
 async function copy(){await navigator.clipboard.writeText(code);setCopied(true);setTimeout(()=>setCopied(false),1500)}

 return <main className="page editor-page"><div className="container">
  <header className="page-header"><span className="section-kicker">Code workspace</span><h1>Online code editor</h1><p>Write, run, copy, and reset code in a focused browser workspace.</p></header>
  <div className="editor-toolbar"><label>Language<select value={language} onChange={e=>changeLanguage(e.target.value)}>{Object.entries(names).map(([slug,name])=><option key={slug} value={slug}>{name}</option>)}</select></label><div><button className="button secondary" onClick={()=>setCode("")} title="Clear code"><Trash2 size={16}/> Clear</button><button className="button secondary" onClick={()=>setCode(starters[language])} title="Reset code"><RotateCcw size={16}/> Reset</button><button className="button secondary" onClick={copy}>{copied?<Check size={16}/>:<Copy size={16}/>} {copied?"Copied":"Copy"}</button><button className="button primary" onClick={run} disabled={running}><Play size={16}/> {running?"Running":"Run code"}</button></div></div>
  <div className="online-editor-grid"><div className="editor-input"><div className="editor-bar"><span/><span/><span/><b>{names[language]}</b></div><Editor value={code} onValueChange={setCode} highlight={value=>{if(language==="javascript"||language==="typescript")return Prism.highlight(value,Prism.languages.javascript,"javascript");if(language==="python")return Prism.highlight(value,Prism.languages.python,"python");if(language==="html")return Prism.highlight(value,Prism.languages.markup,"markup");if(language==="css")return Prism.highlight(value,Prism.languages.css,"css");if(language==="sql")return Prism.highlight(value,Prism.languages.sql,"sql");if(language==="java")return Prism.highlight(value,Prism.languages.java,"java");if(language==="c")return Prism.highlight(value,Prism.languages.c,"c");if(language==="cpp")return Prism.highlight(value,Prism.languages.cpp,"cpp");return value.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}} padding={20} textareaId="udit-code-editor" style={{fontFamily:'"JetBrains Mono", monospace',fontSize:14,minHeight:420,lineHeight:1.7}}/></div><aside className="console"><div className="console-heading"><b>Console</b><span>{running?"Running":"Ready"}</span></div><pre>{output||"Output will appear here."}</pre>{error&&<div className="console-error"><b>Error</b><p>{error}</p></div>}</aside></div>
  <iframe ref={iframeRef} title="JavaScript sandbox" sandbox="allow-scripts" className="js-sandbox"/>
 </div></main>
}
