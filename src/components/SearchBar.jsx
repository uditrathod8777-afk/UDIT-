import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function SearchBar({compact=false}){
 const [query,setQuery]=useState('');
 const navigate=useNavigate();
 function submit(e){e.preventDefault(); navigate(`/search?q=${encodeURIComponent(query.trim())}`)}
 return <form className={compact?"search-bar compact":"search-bar"} onSubmit={submit}>
  <Search size={20}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search languages, tutorials, topics, or code examples..." aria-label="Search UDIT"/>
  <button type="submit">Search</button>
 </form>
}
