import type { ReactNode } from 'react'

const kit = (id: string) => ({
  Defs: () => <defs><marker id={id} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L8 4L0 8z" className="fill-ok" /></marker></defs>,
  A: (x1: number, y1: number, x2: number, y2: number) => <line x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-ok" strokeWidth="1.5" markerEnd={`url(#${id})`} />,
})
const Box = ({ x, y, w, h = 32, t }: { x: number; y: number; w: number; h?: number; t: string }) => {
  const fs = Math.min(11, (w - 16) / (t.length * 0.6))
  return (
  <g><rect x={x} y={y} width={w} height={h} rx="4" className="fill-panel stroke-ok" /><text x={x + w / 2} y={y + h / 2 + 4} textAnchor="middle" fontSize={fs} className="fill-slate-200 font-mono">{t}</text></g>
  )
}
const Note = ({ x, y, t, mid }: { x: number; y: number; t: string; mid?: boolean }) => <text x={x} y={y} textAnchor={mid ? 'middle' : 'start'} fontSize="10" className="fill-slate-400 font-mono">{t}</text>
const Svg = ({ label, children }: { label: string; children: ReactNode }) => (
  <svg viewBox="0 0 360 170" role="img" aria-label={label} className="w-full rounded-lg border border-line bg-bg p-2">{children}</svg>
)

const t = kit('t'), s = kit('s'), h = kit('h'), i = kit('i')

export const Tickets = () => (
  <Svg label="Ticket workflow: submit, verify email, queue by priority, in progress, resolved, status email">
    <t.Defs />
    <Box x={10} y={15} w={90} t="Submit form" /><Box x={135} y={15} w={90} t="Verify email" /><Box x={260} y={15} w={90} t="Priority queue" />
    {t.A(100, 31, 135, 31)}{t.A(225, 31, 260, 31)}{t.A(305, 47, 305, 85)}
    <Box x={260} y={85} w={90} t="In progress" /><Box x={135} y={85} w={90} t="Resolved" /><Box x={10} y={85} w={90} t="Status email" />
    {t.A(260, 101, 225, 101)}{t.A(135, 101, 100, 101)}
    <Note x={10} y={145} t="duplicate check · rate limit · SLA wait timer" />
  </Svg>
)
export const Schema = () => (
  <Svg label="Illustrative database schema: three tables linked by primary and foreign keys">
    <s.Defs />
    <Box x={10} y={30} w={90} h={50} t="table_a" /><Box x={135} y={30} w={90} h={50} t="table_b" /><Box x={260} y={30} w={90} h={50} t="table_c" />
    {s.A(100, 55, 135, 55)}{s.A(225, 55, 260, 55)}
    <Note x={14} y={100} t="PK id" /><Note x={139} y={100} t="PK id · FK a_id" /><Note x={264} y={100} t="PK id · FK b_id" />
    <Note x={10} y={150} t="Illustrative structure, not the production schema" />
  </Svg>
)
export const Homelab = () => (
  <Svg label="Homelab: domain controller providing AD DS, DNS and DHCP to OUs, a file server and client machines">
    <h.Defs />
    <Box x={90} y={10} w={180} t="Domain Controller · AD DS · DNS" />
    <Box x={10} y={75} w={120} t="OUs · GPO" /><Box x={210} y={75} w={140} t="File server · FSRM" />
    <Box x={90} y={130} w={180} t="Windows clients · DHCP" />
    {h.A(150, 42, 70, 75)}{h.A(210, 42, 280, 75)}{h.A(70, 107, 130, 130)}{h.A(280, 107, 230, 130)}
  </Svg>
)
export const Iot = () => (
  <Svg label="Two infrared sensors a known distance apart feed a microcontroller that computes speed and triggers LEDs, buzzer and a camera">
    <i.Defs />
    <Box x={10} y={10} w={90} t="LED · buzzer" /><Box x={135} y={10} w={90} t="Arduino" /><Box x={260} y={10} w={90} t="ESP32-CAM" />
    {i.A(135, 26, 100, 26)}{i.A(225, 26, 260, 26)}
    <Box x={60} y={70} w={50} h={24} t="IR A" /><Box x={250} y={70} w={50} h={24} t="IR B" />
    {i.A(95, 70, 150, 42)}{i.A(265, 70, 210, 42)}
    <line x1="10" y1="110" x2="350" y2="110" className="stroke-ok" strokeWidth="1" /><rect x="150" y="96" width="40" height="12" rx="2" className="fill-none stroke-acc" />
    <line x1="85" y1="138" x2="275" y2="138" className="stroke-slate-500" /><Note x={180} y={158} mid t="speed = distance / time (IR A to IR B)" />
  </Svg>
)
export const diagrams = { tickets: Tickets, schema: Schema, homelab: Homelab, iot: Iot }
