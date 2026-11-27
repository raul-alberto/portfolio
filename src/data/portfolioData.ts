// ✏️ EDIT HERE: all personal details and content live in this file.
export const profile = {
  name: 'Raul',
  role: 'IT Support & Systems Administration Technician',
  stack: 'Windows Server • Active Directory • Linux • Networking • SQL Server',
  location: 'Ponta Delgada, Azores, Portugal',
  status: 'Open to Remote & On-Site IT Support / Junior SysAdmin Roles',
  pitch: 'Hands-on experience in Windows Server administration, Active Directory, network troubleshooting, SQL databases, and internal Help Desk systems.',
  contactNote: 'Available for remote roles across Portugal/EU and on-site roles in Ponta Delgada, Azores.',
  email: 'raul.b.c.alberto@gmail.com',        // fill in: shown only when set
  linkedin: 'https://www.linkedin.com/in/raul-alberto-7095a4401/',     // fill in: https://www.linkedin.com/in/...
  github: 'https://github.com/raul-alberto',       // fill in: https://github.com/...
  cv: './cv/Raul-CV.pdf',                                  // replace public/cv/Raul-CV.pdf
  summary: [
    ['Location', 'Ponta Delgada, Azores, Portugal'],
    ['Availability', 'Remote (Portugal/EU) & on-site (Azores)'],
    ['Languages', 'Portuguese (Native), English (Fluent)'],
    ['Focus', 'Tier 1/2 Technical Support, Windows/Linux Admin, Networking'],
  ] as [string, string][],
}

export const experience = [
  { title: 'IT & Help Desk Intern', org: 'Lotacor (Serviço de Lotas dos Açores)', period: 'April 2026 – August 2026', points: [
    'Developed and deployed an internal web-based Help Desk ticketing system to streamline support requests, priority queues, and response tracking.',
    'Audited and documented existing Microsoft SQL Server databases using SSMS to improve internal IT documentation and maintainability.',
    'Assisted with day-to-day technical troubleshooting, user support, and systems workflows.'] },
  { title: 'Homelab Infrastructure & Self-Hosted Environments', org: 'Personal lab', period: 'Ongoing', points: [
    'Built and maintained virtualized Windows Server and Linux lab environments to practice Active Directory Domain Services (OUs, Group Policy, user permissions, Roaming Profiles), DHCP/DNS, FSRM disk quotas, and network segmentation.'] },
  { title: 'Level 4 Technical Course in IT Systems, Networks & Programming', org: 'ENTA — Escola de Novas Tecnologias dos Açores', period: 'Completed August 2026', points: [
    '3-year intensive technical program covering systems administration, computer networking, structured cabling, databases, and software development.'] },
]

export type Tag = 'Lotacor' | 'Homelab' | 'ENTA' // where the skill was used; edit freely
export const skills: { area: string; items: [string, Tag][] }[] = [
  { area: 'IT Support & Windows Server', items: [['Windows 10/11 Troubleshooting', 'Lotacor'], ['Help Desk Ticketing Workflows', 'Lotacor'], ['Windows Server Administration', 'Homelab'], ['Active Directory Domain Services (AD DS)', 'Homelab'], ['Organizational Units (OUs) & User Permissions', 'Homelab'], ['Roaming Profiles & FSRM (Disk Quotas)', 'Homelab']] },
  { area: 'Networking & Infrastructure', items: [['TCP/IP Fundamentals', 'Homelab'], ['DNS & DHCP Configuration', 'Homelab'], ['Network Troubleshooting & Diagnostics', 'Homelab'], ['Structured Cabling & CAT6 Cable Testing', 'ENTA']] },
  { area: 'Linux & Scripting', items: [['Linux Administration (Ubuntu/Debian)', 'Homelab'], ['Command-Line Workflows', 'Homelab'], ['Bash & Python Scripting Basics', 'ENTA']] },
  { area: 'Databases & Development', items: [['Microsoft SQL Server & SSMS', 'Lotacor'], ['SQLite & SQL Fundamentals', 'ENTA'], ['HTML, CSS, JavaScript/TypeScript', 'Lotacor']] },
]

export interface Project {
  id: string; title: string; role: string; desc: string
  features: string[]; tech: string[]
  repo: string; demo: string; diagram: string
  release?: { label: string; url: string }
  badges?: string[]
}

export const projects: Project[] = [
  { id: '01', title: 'Internal Help Desk Ticketing System (Lotacor Internship)', role: 'Full-Stack & Systems Intern',
    desc: 'Support ticket management web application built during the Lotacor internship to organize user issues, track resolution waiting times, and prioritize urgent requests.',
    features: ['Ticket lifecycle management', 'Priority & SLA waiting-time tracking', 'Email verification', 'Duplicate submission validation', 'Automated status email updates', 'Rate limiting'],
    tech: ['Web Stack', 'SQL Database', 'Email Verification', 'Rate Limiting'], repo: '', demo: '', diagram: 'tickets' },
  { id: '02', title: 'Clip-Patch — Safe AI Patch Applier (Open Source)', role: 'Author & Maintainer (Open-Source Project)',
    desc: 'Command-line tool written in Go that safely applies AI-generated code patches from the clipboard or standard input. Changes are previewed before being applied. Explicit confirmation is required by default, with an optional --yes flag for automated workflows.',
    features: ['Reads patches from the clipboard or standard input', 'SEARCH/REPLACE and unified diff formats', 'Preview and dry-run mode, with explicit confirmation by default (optional --yes flag for automation)', 'Automatic backups of original files, created and verified before writing', 'Staged writes: temporary files renamed over the originals, then post-write verification', 'Path validation and symlink protection', 'SHA-256 fingerprint re-check after confirmation to detect changed files', 'Automated CI on Windows, Linux and macOS, with platform-specific test coverage'],
    tech: ['Go', 'Command-Line Tool', 'SHA-256', 'CI on Windows · Linux · macOS'],
    badges: ['Open source', 'Public GitHub repo', 'MIT License', 'v0.1.0'],
    repo: 'https://github.com/raul-alberto/clip-patch',
    release: { label: 'Release v0.1.0', url: 'https://github.com/raul-alberto/clip-patch/releases/tag/v0.1.0' },
    demo: '', diagram: 'clippatch' },
  { id: '03', title: 'Enterprise SQL Server Database Documentation', role: 'IT & Database Documentation Intern (Lotacor)',
    desc: 'Schema mapping and technical documentation of an existing production SQL Server environment using SSMS, to support IT operations and onboarding. This was documentation work on an existing company database.',
    features: ['Table/relationship mapping', 'Query documentation', 'Standardized internal reference structure'],
    tech: ['SQL Server', 'SSMS', 'SQL', 'Technical Documentation'], repo: '', demo: '', diagram: 'schema' },
  { id: '04', title: 'Virtualized Windows Server & Active Directory Homelab', role: 'Systems Administrator (Personal Lab)',
    desc: 'Multi-VM enterprise network simulation designed to practice user lifecycle management, storage governance, and network services.',
    features: ['Domain Controller setup', 'OU structure', 'Role-based permissions', 'Automated DHCP scopes', 'Roaming Profiles', 'FSRM file-screening & disk quotas'],
    tech: ['Windows Server', 'Active Directory', 'DHCP', 'FSRM', 'Virtualization'], repo: '', demo: '', diagram: 'homelab' },
  { id: '05', title: 'Smart Traffic Light & Speed Detection Prototype', role: 'Embedded Systems & Hardware Developer (Academic Project)',
    desc: 'Automated traffic control prototype that detects vehicle speed via infrared sensors and triggers visual/audio alerts and camera capture.',
    features: ['Dual-IR speed calculation', 'Automated LED signal logic', 'Buzzer alerts', 'ESP32-CAM integration'],
    tech: ['Arduino', 'ESP32-CAM', 'Infrared Sensors', 'C++/Embedded'], repo: '', demo: '', diagram: 'iot' },
]

export const certs = [
  { title: 'Google Cybersecurity Professional Certificate', note: 'Hands-on Linux, SQL, Python, SIEM & security fundamentals', url: '' },
  { title: 'CNCS / NAU Cybersecurity Certifications', note: 'Portugal National Cybersecurity Center', url: '' },
  { title: 'Level 4 EQF Diploma — IT Systems, Networks & Programming', note: 'ENTA' },
]

export const navLinks = ['About', 'Skills', 'Experience', 'Projects', 'Certifications', 'Contact']
