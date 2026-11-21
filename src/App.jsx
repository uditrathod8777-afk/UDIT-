import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Languages from './pages/Languages';
import LanguageDetails from './pages/LanguageDetails';
import Tutorials from './pages/Tutorials';
import Practice from './pages/Practice';
import Exams from './pages/Exams';
import ExamPage from './pages/ExamPage';
import About from './pages/About';
import SearchPage from './pages/SearchPage';
import NotFound from './pages/NotFound';
import CodeEditor from './pages/CodeEditor';
import Dashboard from './pages/Dashboard';
import DailyChallenge from './pages/DailyChallenge';
import Bookmarks from './pages/Bookmarks';
import './styles/global.css';
import './styles/components.css';
import './styles/pages.css';

export default function App(){
 return <BrowserRouter><Navbar/><Routes>
  <Route path="/" element={<Home/>}/>
  <Route path="/languages" element={<Languages/>}/>
  <Route path="/languages/:slug" element={<LanguageDetails/>}/>
  <Route path="/tutorials" element={<Tutorials/>}/>
  <Route path="/tutorials/:slug" element={<Tutorials/>}/>
  <Route path="/practice" element={<Practice/>}/>
  <Route path="/exams" element={<Exams/>}/>
  <Route path="/exams/:slug" element={<ExamPage/>}/>
  <Route path="/about" element={<About/>}/>
  <Route path="/search" element={<SearchPage/>}/>
  <Route path="/editor" element={<CodeEditor/>}/>
  <Route path="/dashboard" element={<Dashboard/>}/>
  <Route path="/challenge" element={<DailyChallenge/>}/>
  <Route path="/bookmarks" element={<Bookmarks/>}/>
  <Route path="*" element={<NotFound/>}/>
 </Routes><Footer/></BrowserRouter>
}
