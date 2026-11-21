import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';

export default function Navbar(){
  const [open,setOpen]=useState(false);
  const links=[["/","Home"],["/dashboard","Dashboard"],["/languages","Languages"],["/tutorials","Tutorials"],["/editor","Code Editor"],["/practice","Practice"],["/challenge","Daily Challenge"],["/bookmarks","Bookmarks"],["/exams","Exams"]];
  return <header className="navbar">
    <div className="nav-inner">
      <Link className="brand" to="/" aria-label="UDIT home" onClick={()=>setOpen(false)}>
        <span className="brand-mark">U</span><span>UDIT</span>
      </Link>
      <nav className={open?"nav-links open":"nav-links"} aria-label="Primary navigation">
        {links.map(([to,label])=><NavLink key={to} to={to} end={to==="/"} onClick={()=>setOpen(false)}>{label}</NavLink>)}
      </nav>
      <div className="nav-actions">
        <Link className="icon-button" to="/search" aria-label="Search"><Search size={19}/></Link>
        <button className="mobile-toggle" onClick={()=>setOpen(!open)} aria-label="Toggle menu">{open?<X/>:<Menu/>}</button>
      </div>
    </div>
  </header>
}
