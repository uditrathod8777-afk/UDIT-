import { useEffect, useRef, useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-kotlin';
import 'prismjs/components/prism-swift';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-dart';
import 'prismjs/components/prism-r';
import 'prismjs/components/prism-bash';
import { Check, Copy, Bookmark, CheckCircle2 } from 'lucide-react';
import { getBookmarks,getProgress,toggleBookmark,updateProgress } from '../utils/storage';

const prismLanguages={cpp:"cpp",csharp:"csharp",javascript:"javascript",html:"markup",css:"css",typescript:"typescript",sql:"sql",bash:"bash",python:"python",java:"java",php:"php",go:"go",rust:"rust",kotlin:"kotlin",swift:"swift",ruby:"ruby",dart:"dart",r:"r",matlab:"matlab",c:"c"};

export default function CodeBlock({example,language}){
 const [copied,setCopied]=useState(false);
 const [bookmarks,setBookmarks]=useState(getBookmarks());
 const [completed,setCompleted]=useState(false);
 const ref=useRef(null);
 const bookmarkId=`example-${language.slug}-${example.number}`;
 const saved=bookmarks.some(item=>item.id===bookmarkId);
 useEffect(()=>{setCompleted((getProgress().lessons||[]).includes(bookmarkId))},[bookmarkId]);
 useEffect(()=>{ if(ref.current) Prism.highlightElement(ref.current); },[example.code]);
 async function copy(){
  try{await navigator.clipboard.writeText(example.code)}catch{
   const textarea=document.createElement("textarea");textarea.value=example.code;document.body.appendChild(textarea);textarea.select();document.execCommand("copy");textarea.remove();
  }
  setCopied(true); setTimeout(()=>setCopied(false),1800);
 }
 function bookmark(){setBookmarks(toggleBookmark({id:bookmarkId,type:"code example",title:`${language.name}: ${example.title}`,to:`/languages/${language.slug}#example-${example.number}`}))}
 function complete(){updateProgress(progress=>({...progress,lessons:[...new Set([...(progress.lessons||[]),bookmarkId])]}) );setCompleted(true)}
 return <article className="code-card" id={`example-${example.number}`}>
  <div className="code-heading"><div><span className="example-number">{String(example.number).padStart(2,"0")}</span><h3>{example.title}</h3></div><div className="code-actions"><button className={saved?"copy-button saved":"copy-button"} onClick={bookmark} aria-label="Bookmark code example"><Bookmark size={16} fill={saved?"currentColor":"none"}/></button><button className="copy-button" onClick={complete} disabled={completed}><CheckCircle2 size={16}/> {completed?"Completed":"Complete"}</button><button className="copy-button" onClick={copy}>{copied?<Check size={16}/>:<Copy size={16}/>} {copied?"Copied":"Copy code"}</button></div></div>
  <div className="editor">
   <div className="editor-bar"><span></span><span></span><span></span><b>{language.name}.{language.slug==="html"?"html":language.slug==="css"?"css":language.slug}</b></div>
   <pre><code ref={ref} className={`language-${prismLanguages[language.slug]||"plaintext"}`}>{example.code}</code></pre>
  </div>
  <p className="code-explanation">{example.explanation}</p>
  {example.output&&<div className="expected-output"><b>Expected output</b><code>{example.output}</code></div>}
 </article>
}
