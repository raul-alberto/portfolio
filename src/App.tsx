import { useState, useRef, useEffect, useCallback, type ReactNode, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, Mail, Github, Linkedin, Copy, Check, Download, ChevronDown, X, Menu } from 'lucide-react'
import { profile as P, experience, skills, projects, certs, navLinks } from './data/portfolioData'
import { diagrams } from './Diagrams'

const id = (s: string) => s.toLowerCase()
const navIds = navLinks.map(id)
// Contact items render only once filled in portfolioData.ts
const contacts = ([['Email', P.email, Mail], ['LinkedIn', P.linkedin, Linkedin], ['GitHub', P.github, Github]] as const).filter(([, v]) => v)
type Project = (typeof projects)[number]

function useActive() {
  const [active, setActive] = useState(navIds[0])
  useEffect(() => {
    const o = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-40% 0px -55% 0px' })
    navIds.forEach(n => { const el = document.getElementById(n); if (el) o.observe(el) })
    return () => o.disconnect()
  }, [])
  return active
}

function Copyable({ label, value, icon }: { label: string; value: string; icon: ReactNode }) {
  const [ok, setOk] = useState(false)
  const copy = async () => {
    try { await navigator.clipboard.writeText(value); setOk(true); setTimeout(() => setOk(false), 1500) } catch { window.prompt(label, value) }
  }
  return (
    <button onClick={copy} aria-label={`Copy ${label}`} className="btn-s w-full justify-between">
      <span className="flex min-w-0 items-center gap-2">{icon}<span className="truncate font-mono text-xs">{value}</span></span>
      {ok ? <Check size={16} className="text-ok" /> : <Copy size={16} />}
    </button>
  )
}

const Reveal = ({ children }: { children: ReactNode }) => (
  <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.35 }}>{children}</motion.div>
)
const Section = ({ name, title, children }: { name: string; title: string; children: ReactNode }) => (
  <section id={id(name)} className="mx-auto max-w-6xl px-5 py-14">
    <h2 className="mb-8 font-mono text-sm uppercase tracking-widest text-acc"><span className="text-slate-400">$ </span>{title}</h2>
    <Reveal>{children}</Reveal>
  </section>
)

function ProjectCard({ p, lead }: { p: Project; lead?: boolean }) {
  const [open, setOpen] = useState(false)
  const Diagram = diagrams[p.diagram as keyof typeof diagrams]
  const features = lead || open ? p.features : p.features.slice(0, 3)
  const links = [['Repository', p.repo], ['Live demo', p.demo]].filter(([, u]) => u)
  return (
    <article className={`card p-5 ${lead ? 'border-ok/40 md:col-span-2 md:grid md:grid-cols-2 md:gap-8' : ''}`}>
      <div>
        <p className="font-mono text-xs text-slate-400">PROJECT {p.id}{lead && <span className="text-ok"> · FEATURED</span>}</p>
        <h3 className={`mt-1 font-semibold text-white ${lead ? 'text-xl' : ''}`}>{p.title}</h3>
        <p className="text-sm text-acc">{p.role}</p>
        <p className="mt-3 text-sm">{p.desc}</p>
        <ul className="mt-3 space-y-1 text-sm">{features.map(f => <li key={f} className="flex gap-2"><span className="text-ok">+</span>{f}</li>)}</ul>
        <div className="mt-3 flex flex-wrap gap-1.5">{p.tech.map(x => <span key={x} className="tag">{x}</span>)}</div>
        {links.length > 0 && <div className="mt-3 flex gap-4 text-sm">{links.map(([l, u]) => <a key={l} href={u} target="_blank" rel="noreferrer" className="text-acc hover:underline">{l} ↗</a>)}</div>}
        {!lead && (
          <button onClick={() => setOpen(o => !o)} aria-expanded={open} className="mt-4 flex items-center gap-1 text-sm text-acc hover:underline">
            {open ? 'Show less' : 'Show diagram & all features'}<ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
        )}
      </div>
      {lead
        ? <div className="mt-6 self-center md:mt-0"><Diagram /></div>
        : <AnimatePresence initial={false}>{open && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><div className="pt-4"><Diagram /></div></motion.div>}</AnimatePresence>}
    </article>
  )
}

function Cli({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [log, setLog] = useState<string[]>(['Type "help" for available commands.'])
  const [val, setVal] = useState('')
  const end = useRef<HTMLDivElement>(null)
  const input = useRef<HTMLInputElement>(null)
  useEffect(() => end.current?.scrollIntoView({ block: 'nearest' }), [log])
  useEffect(() => {
    if (!open) return
    // skip autofocus on touch devices so the keyboard doesn't cover the page
    if (matchMedia('(pointer: fine)').matches) input.current?.focus()
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    addEventListener('keydown', esc)
    return () => removeEventListener('keydown', esc)
  }, [open, onClose])
  const cmds: Record<string, () => string[]> = {
    help: () => ['help whoami skills experience projects certs contact clear'],
    whoami: () => [`${P.name} — ${P.role}`, P.location, P.pitch],
    skills: () => skills.map(s => `${s.area}: ${s.items.map(([n]) => n).join(', ')}`),
    experience: () => experience.map(e => `${e.period} | ${e.title} @ ${e.org}`),
    projects: () => projects.map(p => `${p.id} ${p.title}`),
    certs: () => certs.map(c => c.title),
    contact: () => contacts.length ? contacts.map(([l, v]) => `${l}: ${v}`) : ['Contact details are being updated.'],
  }
  const submit = (e: FormEvent) => {
    e.preventDefault()
    const c = val.trim().toLowerCase(); setVal('')
    if (c === 'clear') return setLog([])
    setLog(l => [...l, `$ ${c}`, ...(cmds[c]?.() ?? [`command not found: ${c}`])])
  }
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} role="dialog" aria-label="Interactive terminal"
          className="fixed inset-x-3 bottom-3 z-50 mx-auto flex max-w-3xl flex-col overflow-hidden rounded-xl border border-ok/40 bg-bg shadow-2xl max-sm:top-20">
          <div className="flex items-center justify-between border-b border-line px-4 py-2 font-mono text-xs text-slate-400">
            <span>raul@portfolio:~</span><button onClick={onClose} aria-label="Close terminal"><X size={16} /></button>
          </div>
          <div className="min-h-40 flex-1 overflow-y-auto p-4 font-mono text-xs leading-relaxed sm:h-60 sm:flex-none">
            {log.map((l, n) => <div key={n} className={l.startsWith('$') ? 'text-ok' : ''}>{l}</div>)}
            <div ref={end} />
          </div>
          <form onSubmit={submit} className="flex items-center gap-2 border-t border-line px-4 py-2 font-mono text-xs">
            <span className="text-ok">$</span>
            <input ref={input} value={val} onChange={e => setVal(e.target.value)} aria-label="Command" spellCheck={false} autoCapitalize="none" className="flex-1 bg-transparent text-slate-100 outline-none" />
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function App() {
  const [cli, setCli] = useState(false)
  const [menu, setMenu] = useState(false)
  const cliBtn = useRef<HTMLButtonElement>(null)
  const active = useActive()
  const closeCli = useCallback(() => { setCli(false); cliBtn.current?.focus() }, [])
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(false)
    addEventListener('keydown', esc)
    return () => removeEventListener('keydown', esc)
  }, [])
  const link = (n: string) => ({ href: `#${id(n)}`, 'aria-current': active === id(n) ? ('location' as const) : undefined })
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:rounded focus:bg-acc focus:px-3 focus:py-2 focus:text-bg">Skip to content</a>
      <header className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3" aria-label="Main">
          <a href="#about" className="font-mono text-sm font-medium text-white">Raul <span className="text-ok">//</span> IT Systems</a>
          <ul className="hidden gap-5 text-sm lg:flex">
            {navLinks.map(n => <li key={n}><a {...link(n)} className="text-slate-400 transition-colors hover:text-white aria-[current=location]:text-acc">{n}</a></li>)}
          </ul>
          <div className="flex gap-2">
            <button ref={cliBtn} onClick={() => setCli(o => !o)} aria-pressed={cli} className="btn-s font-mono text-xs"><Terminal size={14} />CLI</button>
            <a href={P.cv} download className="btn-p"><Download size={14} /><span className="hidden sm:inline">Download CV</span><span className="sm:hidden">CV</span></a>
            <button onClick={() => setMenu(o => !o)} aria-expanded={menu} aria-controls="mobile-nav" aria-label="Menu" className="btn-s px-3 lg:hidden">{menu ? <X size={16} /> : <Menu size={16} />}</button>
          </div>
        </nav>
        {menu && (
          <ul id="mobile-nav" className="border-t border-line px-5 py-2 lg:hidden">
            {navLinks.map(n => <li key={n}><a {...link(n)} onClick={() => setMenu(false)} className="block py-3 text-slate-300 aria-[current=location]:text-acc">{n}</a></li>)}
          </ul>
        )}
      </header>

      <main id="main" tabIndex={-1} className="outline-none">
        <section id="about" className="mx-auto grid max-w-6xl gap-10 px-5 pb-8 pt-16 lg:grid-cols-[1.3fr_1fr] lg:pt-24">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-ok/40 bg-ok/10 px-3 py-1 text-xs text-ok">
              <span className="h-2 w-2 rounded-full bg-ok motion-safe:animate-pulse" />{P.status}
            </span>
            <h1 className="mt-6">
              <span className="block font-mono text-lg text-acc">{P.name}</span>
              <span className="mt-1 block text-3xl font-semibold tracking-tight text-white sm:text-4xl">{P.role}</span>
            </h1>
            <p className="mt-2 font-mono text-xs text-slate-400">{P.stack}</p>
            <p className="mt-5 max-w-xl text-slate-300">{P.pitch}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#experience" className="btn-p">View Experience &amp; Projects</a>
              <a href="#contact" className="btn-s">Contact Me</a>
            </div>
          </motion.div>
          <aside className="card self-start p-5" aria-label="System profile">
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-slate-400">System Profile</p>
            <dl className="space-y-4">
              {P.summary.map(([k, v]) => <div key={k}><dt className="font-mono text-xs text-acc">{k}</dt><dd className="text-sm text-slate-200">{v}</dd></div>)}
            </dl>
          </aside>
        </section>

        <Section name="Experience" title="Experience & Education">
          <ol className="divide-y divide-line border-y border-line">
            {experience.map(e => (
              <li key={e.title} className="grid gap-2 py-6 md:grid-cols-[220px_1fr] md:gap-8">
                <div><p className="font-mono text-xs text-ok">{e.period}</p><p className="mt-1 text-sm text-slate-400">{e.org}</p></div>
                <div>
                  <h3 className="font-semibold text-white">{e.title}</h3>
                  <ul className="mt-3 space-y-1.5 text-sm">{e.points.map(p => <li key={p} className="flex gap-2"><span className="text-ok">+</span>{p}</li>)}</ul>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section name="Projects" title="Featured Projects">
          <div className="grid gap-4 md:grid-cols-2">{projects.map((p, n) => <ProjectCard key={p.id} p={p} lead={n === 0} />)}</div>
        </Section>

        <Section name="Skills" title="Technical Skills">
          <div className="divide-y divide-line border-y border-line">
            {skills.map(s => (
              <div key={s.area} className="grid gap-3 py-5 md:grid-cols-[220px_1fr] md:gap-8">
                <h3 className="font-mono text-sm text-acc">{s.area}</h3>
                <ul className="grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
                  {s.items.map(([name, tag]) => <li key={name} className="flex items-start justify-between gap-3"><span>{name}</span><span className="tag shrink-0">{tag}</span></li>)}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-slate-400">Tags show where each skill was used: the Lotacor internship, my Homelab, or ENTA coursework.</p>
        </Section>

        <Section name="Certifications" title="Certifications & Training">
          <ul className="divide-y divide-line border-y border-line">
            {certs.map(c => (
              <li key={c.title} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4">
                <span className="font-medium text-white">{c.title}</span>
                <span className="text-sm text-slate-400">{c.note}{c.url && <> · <a href={c.url} target="_blank" rel="noreferrer" className="text-acc hover:underline">Credential ↗</a></>}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section name="Contact" title="Get in Touch">
          <div className="card max-w-xl space-y-3 p-5">
            {contacts.length
              ? contacts.map(([label, value, Icon]) => <Copyable key={label} label={label} value={value} icon={<Icon size={16} />} />)
              : <p className="text-sm text-slate-300">Contact details are being updated. Please check back soon.</p>}
            <p className="pt-2 text-sm text-slate-400">{P.contactNote}</p>
          </div>
        </Section>
      </main>

      <footer className="border-t border-line py-6 text-center text-xs text-slate-400">
        {P.name} — IT Support &amp; Systems Administration · © {new Date().getFullYear()}
      </footer>
      <Cli open={cli} onClose={closeCli} />
    </>
  )
}
