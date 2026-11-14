import { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const links = [['about', 'About'], ['skills', 'Skills'], ['projects', 'Projects'], ['journey', 'Journey'], ['contact', 'Contact']];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open]);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id); }), { rootMargin: '-30% 0px -60% 0px' });
    links.forEach(([id]) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);
  return <header className="site-header"><div className="nav-inner"><a className="brand" href="#top" aria-label="Back to top"><span className="brand-mark">*</span><span>Phan Duy Bảo<span className="brand-dot">.</span></span></a><nav id="main-navigation" className={open ? 'nav-links is-open' : 'nav-links'} aria-label="Main navigation">{links.map(([id, label]) => <a key={id} href={'#' + id} className={active === id ? 'active' : ''} onClick={() => setOpen(false)}>{label}</a>)}<a className="nav-contact" href="#contact" onClick={() => setOpen(false)}>Let's talk <ArrowUpRight size={14}/></a></nav><button className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button></div></header>;
}

