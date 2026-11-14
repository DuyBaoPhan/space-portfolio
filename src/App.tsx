import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import { About, Skills, Projects, Journey, Contact } from './components/Sections';
import './styles/global.css';
import './styles/sections.css';
export default function App() { return <><a className="skip-link" href="#main">Skip to content</a><Navbar/><main id="main"><Hero/><About/><Skills/><Projects/><Journey/><Contact/></main><Footer/></> }

