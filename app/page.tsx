"use client";

import React, { useState, useEffect } from "react";
import useSWR from "swr";
import {
  Code2,
  BriefcaseBusiness,
  Mail,
  Menu,
  X,
  ArrowUpRight,
  Star,
  Zap,
  Rocket,
  ShieldCheck,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  DATA — swap this out for real content whenever it changes          */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { href: "#origin", label: "Origin" },
  { href: "#cases", label: "Case Files" },
  { href: "#arsenal", label: "Arsenal" },
  { href: "#terminal", label: "Console" },
  { href: "#signal", label: "Signal" },
];

const STATS = [
  { value: "7.62", suffix: "", label: "CGPA" },
  { value: "2", suffix: "+", label: "Live Builds" },
  { value: "3", suffix: "", label: "Open Cases" },
];

const POWERS = ["Java", "Spring Boot", "Python", "Docker", "AWS", "React", "Next.js", "MySQL"];

const TIMELINE = [
  {
    year: "2023 — Present",
    title: "Sub-Lead, Tech Club",
    org: "Techno India",
  },
  {
    year: "2023 — Present",
    title: "BCA, Computer Science",
    org: "Techno India Institute Of Technology · Class of 2027",
  },
  {
    year: "2023",
    title: "ISC",
    org: "Pre-university",
  },
];

const CASES = [
  {
    id: "01",
    tag: "Cryptography / Mobile / Post-Quantum",
    title: "PeerDroid",
    subtitle: "Post-Quantum P2P Messenger",
    desc: "An Android messenger that talks peer-to-peer over Wi-Fi Direct and refuses to be cracked by a future quantum computer — ML-KEM-768 key exchange, ML-DSA-65 signatures, AES-256-GCM, and a Double Ratchet keeping every message forward-secret.",
    stack: ["Java / Android", "ML-KEM-768", "ML-DSA-65", "AES-256-GCM", "Wi-Fi Direct"],
    featured: true,
  },
  {
    id: "02",
    tag: "LLM Infrastructure",
    title: "polyllm-gateway",
    subtitle: "Smart routing for LLM providers",
    desc: "A routing layer that decides, per request, whether OpenAI, Anthropic, or a local Ollama model should answer — weighing task type, latency budget, and cost.",
    stack: ["Python", "FastAPI", "Ollama", "OpenRouter"],
  },
  {
    id: "03",
    tag: "Security / Networking",
    title: "NetSheild",
    subtitle: "Malicious IP detection engine",
    desc: "A trie-based prefix-tree engine built for fast CIDR range lookups against live threat-intel feeds — catching bad traffic before it lands.",
    stack: ["Java", "Trie", "CIDR", "Threat Intel"],
  },
];

const ARSENAL = [
  {
    label: "Languages",
    icon: Zap,
    items: ["Java", "Python", "C & C++", "TypeScript", "SQL", "Bash / Shell"],
  },
  {
    label: "Backend & Infra",
    icon: ShieldCheck,
    items: ["Spring Boot", "Next.js / React", "PostgreSQL + Flyway", "MongoDB", "Docker", "Kubernetes"],
  },
  {
    label: "Cloud & DevOps",
    icon: Rocket,
    items: ["AWS", "CI / CD", "Load Balancing", "Nginx"],
  },
  {
    label: "Testing",
    icon: Star,
    items: ["JUnit 5", "Selenium", "Jenkins", "Integration Testing"],
  },
];

/* ------------------------------------------------------------------ */
/*  SMALL BUILDING BLOCKS                                              */
/* ------------------------------------------------------------------ */

function Burst({ className = "", style = {} }) {
  return <div className={`cb-burst ${className}`} style={style} aria-hidden="true" />;
}

const GITHUB_USERNAME = "h4rl3y-q";
const LEETCODE_USERNAME = "Piku1481_Pb";
const fetcher = (url) => fetch(url).then((response) => {
  if (!response.ok) throw new Error("telemetry unavailable");
  return response.json();
});

function BootSequence({ onComplete }) {
  const [lines, setLines] = useState([]);
  const bootLines = [
    "BIOS :: PORTFOLIO CORE v2.5",
    "mounting /projects ... ok",
    "decrypting /about.md ... ok",
    "checking signal ... stable",
    "system ready — welcome, operator",
  ];

  useEffect(() => {
    const timers = bootLines.map((line, index) => setTimeout(() => setLines((current) => [...current, line]), 280 + index * 310));
    const done = setTimeout(onComplete, 2100);
    return () => [...timers, done].forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="cb-boot" role="status" aria-live="polite">
      <div className="cb-boot-inner">
        <div className="cb-boot-mark">PB<span>_</span></div>
        <div className="cb-boot-lines">
          {lines.map((line) => <div key={line}><span className="cb-prompt">$</span> {line}</div>)}
          <span className="cb-cursor" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

function TerminalSection() {
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState([]);
  const { data: githubUser } = useSWR(`https://api.github.com/users/${GITHUB_USERNAME}`, fetcher, { revalidateOnFocus: false, refreshInterval: 300000 });
  const { data: githubEvents } = useSWR(`https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=30`, fetcher, { revalidateOnFocus: false, refreshInterval: 300000 });
  const repoCount = githubUser?.public_repos ?? "--";
  const recentCommit = githubEvents?.find((event) => event.type === "PushEvent");
  const commitDate = recentCommit ? new Date(recentCommit.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "syncing";

  const runCommand = (event) => {
    event.preventDefault();
    const input = command.trim().toLowerCase();
    if (!input) return;
    const responses = {
      whoami: ["h4rl3y-q — backend developler", "BCA Computer Science · Techno India · class of 2027"],
      "ls projects": ["PeerDroid/   polyllm-gateway/   NetArmor/"],
      "cat about.md": ["I build resilient systems, study system design, and keep learning in public.", "Open to research collaborations and internships."],
      help: ["available: whoami · ls projects · cat about.md · clear"],
    };
    setHistory((current) => input === "clear" ? [] : [...current, { command, output: responses[input] || [`command not found: ${input}`, "try: help"] }]);
    setCommand("");
  };

  return (
    <section id="terminal" className="cb-section cb-terminal-section">
      <div className="cb-wrap">
        <SectionHeading issue="Issue 04" title="Operator Console" />
        <div className="cb-terminal-layout">
          <div className="cb-terminal-window">
            <div className="cb-terminal-bar"><span className="cb-terminal-dot red" /><span className="cb-terminal-dot yellow" /><span className="cb-terminal-dot blue" /><span className="cb-terminal-path">~/h4rl3y-q</span></div>
            <div className="cb-terminal-body">
              <div><span className="cb-prompt">$</span> boot --profile h4rl3y-q</div>
              <div className="cb-terminal-muted">identity loaded. commands accepted.</div>
              {history.map((entry, index) => <div key={`${entry.command}-${index}`} className="cb-terminal-entry"><div><span className="cb-prompt">$</span> {entry.command}</div>{entry.output.map((line) => <div key={line} className="cb-terminal-output">{line}</div>)}</div>)}
              <form onSubmit={runCommand} className="cb-terminal-form"><label htmlFor="terminal-command" className="sr-only">Terminal command</label><span className="cb-prompt">$</span><input id="terminal-command" value={command} onChange={(event) => setCommand(event.target.value)} placeholder="type a command..." autoComplete="off" /></form>
            </div>
          </div>
          <aside className="cb-status-card" aria-label="Live system status">
            <div className="cb-status-heading"><span className="cb-live-dot" /> SYSTEM STATUS <span className="cb-status-live">LIVE</span></div>
            <div className="cb-status-row"><span>uptime</span><strong>99.98%</strong></div>
            <div className="cb-status-row"><span>last deployed</span><strong>online</strong></div>
            <div className="cb-status-row"><span>public repos</span><strong>{repoCount}</strong></div>
            <div className="cb-status-row"><span>last push</span><strong>{commitDate}</strong></div>
            <div className="cb-commit-label">GITHUB STREAK</div>
            <img
              className="cb-streak-card"

              src={`https://github-readme-streak-stats.herokuapp.com/?user=${GITHUB_USERNAME}&theme=dark&hide_border=true`}
              alt={`GitHub contribution streak for ${GITHUB_USERNAME}`}
            />
            <a className="cb-status-link" href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noreferrer">view github telemetry <ArrowUpRight size={14} /></a>
          </aside>
        </div>
        <div className="cb-stats-panel">
          <div className="cb-commit-label">EXTERNAL STATS / OPERATOR PROFILE</div>
          <div className="cb-stats-grid">
            <div className="cb-stat-box cb-stat-box--wide">
              <img src={`https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=${GITHUB_USERNAME}&theme=github_dark`} alt={`GitHub profile details for ${GITHUB_USERNAME}`} />
            </div>
            {/* <div className="cb-stat-box">
              <img src={`https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=${GITHUB_USERNAME}&theme=github_dark`} alt={`Repositories by language for ${GITHUB_USERNAME}`} />
            </div>
            <div className="cb-stat-box">
              <img src={`https://github-profile-summary-cards.vercel.app/api/cards/most-commit-language?username=${GITHUB_USERNAME}&theme=github_dark`} alt={`Most committed languages for ${GITHUB_USERNAME}`} />
            </div> */}
            <div className="cb-stat-box">
              <img src={`https://leetcard.jacoblin.cool/${LEETCODE_USERNAME}?theme=dark&font=Karma&ext=heatmap`} alt={`LeetCode statistics for ${LEETCODE_USERNAME}`} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------- background characters (flat ink silhouettes) -------- */

const INK = "#17161c";
const RED = "#e6394f";
const BLUE = "#1f4fa3";
const YELLOW = "#ffc93c";

function CharCoderHero({ className, style }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 220 240"
      aria-hidden="true"
    >
      {/* Head */}
      <rect
        x="61"
        y="30"
        width="98"
        height="76"
        rx="25"
        fill={INK}
      />

      {/* Brain */}
      <path
        d="M88 86
       Q77 78 84 67
       Q77 56 88 51
       Q87 39 99 42
       Q107 32 114 43
       Q125 34 131 45
       Q145 43 143 56
       Q153 64 143 73
       Q146 84 133 86
       Z"
        fill={YELLOW}
        stroke={INK}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* Brain circuits */}
      <path
        d="M99 53 V64 L94 69
       M116 47 V58 L110 64
       M132 53 V64 L126 69
       M100 77 H110 V70
       M118 82 V70 H128"
        fill="none"
        stroke={BLUE}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Body */}
      <rect
        x="57"
        y="104"
        width="106"
        height="84"
        rx="22"
        fill={BLUE}
        stroke={INK}
        strokeWidth="5"
      />

      {/* Chest power core */}
      <circle
        cx="110"
        cy="145"
        r="19"
        fill={YELLOW}
        stroke={INK}
        strokeWidth="4"
      />

      <circle cx="110" cy="145" r="7" fill={RED} />

      {/* Arms */}
      <rect x="31" y="112" width="25" height="61" rx="12" fill={INK} />
      <rect x="164" y="112" width="25" height="61" rx="12" fill={INK} />

      {/* Feet */}
      <rect x="70" y="181" width="30" height="36" rx="9" fill={INK} />
      <rect x="120" y="181" width="30" height="36" rx="9" fill={INK} />
    </svg>
  );
}
function CharDeskCoder({ className, style }) {
  return (

    <svg
      className={className}
      style={style}
      viewBox="0 0 220 250"
      aria-hidden="true"
    >
      {/* Hat */}
      <path
        d="M63 76 Q110 53 157 76 L145 91 H75 Z"
        fill={RED}
        stroke={INK}
        strokeWidth="5"
        strokeLinejoin="round"
      />

      <path
        d="M78 72 Q84 29 110 19 Q136 29 142 72"
        fill={RED}
        stroke={INK}
        strokeWidth="5"
      />

      {/* Face */}
      <circle cx="110" cy="99" r="28" fill={INK} />

      <circle cx="100" cy="98" r="4" fill={YELLOW} />
      <circle cx="120" cy="98" r="4" fill={YELLOW} />

      {/* Body */}
      <path
        d="M72 127 Q110 111 148 127 L165 211 H55 Z"
        fill={BLUE}
        stroke={INK}
        strokeWidth="5"
      />

      {/* Magic/code symbol */}
      <path
        d="M91 160 L103 170 L91 180
       M115 180 H132"
        fill="none"
        stroke={YELLOW}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Staff */}
      <path
        d="M174 125 V214"
        stroke={INK}
        strokeWidth="7"
        strokeLinecap="round"
      />

      <circle
        cx="174"
        cy="113"
        r="14"
        fill={YELLOW}
        stroke={INK}
        strokeWidth="4"
      />

      {/* Feet */}
      <rect x="72" y="205" width="30" height="28" rx="8" fill={INK} />
      <rect x="118" y="205" width="30" height="28" rx="8" fill={INK} />
    </svg>


  );
}
function CharBot({ className, style }) {
  return (


    <svg
      className={className}
      style={style}
      viewBox="0 0 220 240"
      aria-hidden="true"
    >
      {/* Antenna */}
      <path
        d="M110 40 V22"
        stroke={INK}
        strokeWidth="6"
        strokeLinecap="round"
      />
      <circle cx="110" cy="17" r="7" fill={RED} />

      {/* Head */}
      <rect
        x="65"
        y="38"
        width="90"
        height="62"
        rx="17"
        fill={YELLOW}
        stroke={INK}
        strokeWidth="5"
      />

      {/* Eyes */}
      <circle cx="92" cy="68" r="8" fill={INK} />
      <circle cx="128" cy="68" r="8" fill={INK} />

      <circle cx="92" cy="68" r="3" fill={BLUE} />
      <circle cx="128" cy="68" r="3" fill={BLUE} />

      {/* Body */}
      <rect
        x="53"
        y="101"
        width="114"
        height="87"
        rx="20"
        fill={INK}
      />

      {/* Server panel */}
      <rect
        x="74"
        y="119"
        width="72"
        height="45"
        rx="7"
        fill={BLUE}
      />

      {/* Status lights */}
      <circle cx="87" cy="133" r="5" fill={YELLOW} />
      <circle cx="87" cy="149" r="5" fill={RED} />

      <path
        d="M100 133 H132 M100 149 H124"
        stroke={YELLOW}
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Arms */}
      <rect x="30" y="112" width="25" height="61" rx="12" fill={INK} />
      <rect x="165" y="112" width="25" height="61" rx="12" fill={INK} />

      {/* Feet */}
      <rect x="70" y="180" width="30" height="36" rx="9" fill={INK} />
      <rect x="120" y="180" width="30" height="36" rx="9" fill={INK} />
    </svg>


  );
}

function CharWaving({ className, style }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 220 220"
      aria-hidden="true"
    >
      {/* Antennae */}
      <path
        d="M88 62 L68 39 M132 62 L152 39"
        fill="none"
        stroke={INK}
        strokeWidth="6"
        strokeLinecap="round"
      />

      <circle cx="66" cy="37" r="7" fill={RED} />
      <circle cx="154" cy="37" r="7" fill={RED} />

      {/* Head */}
      <circle cx="110" cy="72" r="32" fill={INK} />

      {/* Eyes */}
      <circle cx="99" cy="70" r="5" fill={YELLOW} />
      <circle cx="121" cy="70" r="5" fill={YELLOW} />

      {/* Body */}
      <ellipse
        cx="110"
        cy="137"
        rx="46"
        ry="57"
        fill={RED}
        stroke={INK}
        strokeWidth="5"
      />

      {/* Body center */}
      <path
        d="M110 84 V190"
        stroke={INK}
        strokeWidth="5"
      />

      {/* Wings */}
      <ellipse
        cx="67"
        cy="134"
        rx="22"
        ry="38"
        fill={BLUE}
        stroke={INK}
        strokeWidth="4"
      />

      <ellipse
        cx="153"
        cy="134"
        rx="22"
        ry="38"
        fill={BLUE}
        stroke={INK}
        strokeWidth="4"
      />

      {/* Legs */}
      <path
        d="M70 145 L43 159 M150 145 L177 159
       M70 164 L43 181 M150 164 L177 181"
        fill="none"
        stroke={INK}
        strokeWidth="7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IssueTag({ children }) {
  return <span className="cb-issue-tag">{children}</span>;
}

function SectionHeading({ issue, title }) {
  return (
    <div className="cb-section-head">
      <IssueTag>{issue}</IssueTag>
      <h2 className="cb-h2">{title}</h2>
    </div>
  );
}


/* ------------------------------------------------------------------ */
/*  MAIN COMPONENT                                                     */
/* ------------------------------------------------------------------ */

export default function ComicPortfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="cb-root">
      {!booted && <BootSequence onComplete={() => setBooted(true)} />}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Archivo:wght@500;700;800;900&family=Space+Mono:wght@400;700&display=swap');

        .cb-root {
          --paper: #efe6d3;
          --paper2: #f8f2e3;
          --ink: #17161c;
          --red: #e6394f;
          --blue: #1f4fa3;
          --yellow: #ffc93c;
          --green: #1f9e63;
          font-family: 'Archivo', sans-serif;
          color: var(--ink);
          background: var(--paper);
          position: relative;
          min-height: 100vh;
          width: 100%;
          max-width: 100%;
          overflow-x: clip;
        }

        .cb-root *, .cb-root *::before, .cb-root *::after {
          box-sizing: border-box;
        }

        .cb-halftone {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image: radial-gradient(rgba(23,22,28,0.14) 1.4px, transparent 1.6px);
          background-size: 14px 14px;
          opacity: 0.55;
          z-index: 0;
        }

        .cb-section {
          position: relative;
          z-index: 1;
        }

        .cb-wrap {
          max-width: 1180px;
          margin: 0 auto;
          padding: 5rem 1.75rem;
          position: relative;
          z-index: 1;
        }

        .cb-char {
          position: absolute;
          z-index: 0;
          pointer-events: none;
          filter: drop-shadow(5px 6px 0 rgba(23,22,28,0.18));
          opacity: 0.96;
          transition: transform 220ms ease, opacity 220ms ease;
        }

        .cb-section:hover > .cb-char { opacity: 1; }
        .cb-hero > .cb-char { opacity: 0.9; }
        .cb-hero > .cb-char::after { content: ''; }

        @media (max-width: 900px) {
          .cb-char { opacity: 0.28 !important; transform: scale(0.78); }
          .cb-hero > .cb-char { left: -42px !important; bottom: -28px !important; }
        }

        @media (max-width: 640px) {
          .cb-char { display: block; opacity: 0.16 !important; transform: scale(0.56); }
          .cb-hero > .cb-char { left: -74px !important; bottom: -70px !important; }
          #origin > .cb-char { right: -72px !important; bottom: -54px !important; }
          #arsenal > .cb-char { left: -42px !important; top: auto !important; bottom: -30px !important; }
          #signal > .cb-char { right: -42px !important; bottom: -45px !important; }
        }

        /* -------- burst / star shapes -------- */
        .cb-burst {
          position: absolute;
          background: var(--yellow);
          clip-path: polygon(50% 0%,61% 32%,93% 21%,76% 50%,93% 79%,61% 68%,50% 100%,39% 68%,7% 79%,24% 50%,7% 21%,39% 32%);
          border: 3px solid var(--ink);
        }

        /* -------- nav -------- */
        .cb-nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.9rem 1.75rem;
          background: var(--paper2);
          border-bottom: 4px solid var(--ink);
        }

        .cb-logo {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          text-decoration: none;
          color: var(--ink);
        }

        .cb-logo-badge {
          width: 42px; height: 42px;
          background: var(--red);
          border: 3px solid var(--ink);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Bangers', cursive;
          font-size: 1.3rem;
          color: var(--paper2);
          letter-spacing: 0.02em;
          transform: rotate(-6deg);
        }

        .cb-logo-word {
          font-family: 'Bangers', cursive;
          font-size: 1.35rem;
          letter-spacing: 0.03em;
        }

        .cb-nav-links {
          display: flex;
          gap: 2rem;
          list-style: none;
        }

        .cb-nav-links a {
          font-family: 'Archivo', sans-serif;
          font-weight: 800;
          font-size: 0.95rem;
          color: var(--ink);
          text-decoration: none;
          position: relative;
        }

        .cb-nav-links a::after {
          content: '';
          position: absolute;
          left: 0; right: 0; bottom: -6px;
          height: 4px;
          background: var(--yellow);
          border: 2px solid var(--ink);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.18s ease;
        }

        .cb-nav-links a:hover::after { transform: scaleX(1); }

        .cb-nav-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
        }

        .cb-menu-btn {
          display: none;
          background: var(--paper2);
          border: 3px solid var(--ink);
          padding: 0.4rem;
          cursor: pointer;
        }

        .cb-mobile-panel {
          display: none;
        }

        /* -------- buttons -------- */
        .cb-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: 'Archivo', sans-serif;
          font-weight: 800;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.02em;
          padding: 0.85rem 1.5rem;
          border: 3px solid var(--ink);
          background: var(--yellow);
          color: var(--ink);
          text-decoration: none;
          box-shadow: 5px 5px 0 var(--ink);
          transition: transform 0.12s ease, box-shadow 0.12s ease;
          cursor: pointer;
        }

        .cb-btn:hover, .cb-btn:focus-visible {
          transform: translate(2px, 2px);
          box-shadow: 3px 3px 0 var(--ink);
        }

        .cb-btn:active {
          transform: translate(5px, 5px);
          box-shadow: 0 0 0 var(--ink);
        }

        .cb-btn--red { background: var(--red); color: var(--paper2); }
        .cb-btn--outline { background: var(--paper2); }

        /* -------- hero -------- */
        .cb-hero {
          padding-top: 8.5rem;
        }

        .cb-hero-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 3.5rem;
          align-items: center;
        }

        .cb-caption {
          position: relative;
          display: inline-block;
          background: var(--paper2);
          border: 3px solid var(--ink);
          padding: 0.55rem 1rem;
          font-family: 'Space Mono', monospace;
          font-size: 0.8rem;
          font-weight: 700;
          margin-bottom: 1.6rem;
        }

        .cb-caption::after {
          content: '';
          position: absolute;
          left: 22px;
          bottom: -12px;
          width: 0; height: 0;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-top: 12px solid var(--ink);
        }
        .cb-caption::before {
          content: '';
          position: absolute;
          left: 24px;
          bottom: -8px;
          width: 0; height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: 10px solid var(--paper2);
          z-index: 1;
        }

        .cb-hero h1 {
          font-family: 'Bangers', cursive;
          font-size: clamp(3.4rem, 7vw, 6rem);
          line-height: 0.92;
          letter-spacing: 0.01em;
          margin-bottom: 1.4rem;
        }

        .cb-hero h1 .cb-stroke {
          -webkit-text-stroke: 3px var(--ink);
          color: var(--yellow);
          paint-order: stroke fill;
        }

        .cb-hero-desc {
          max-width: 460px;
          font-size: 1.05rem;
          line-height: 1.65;
          margin-bottom: 2.2rem;
        }

        .cb-hero-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .cb-pop {
          opacity: 1;
          transform: scale(0.85) rotate(-3deg);
        }

        .cb-pop.cb-mounted {
          animation: cbPop 0.55s cubic-bezier(.2,1.4,.4,1) forwards;
        }

        @keyframes cbPop {
          0% { opacity: 1; transform: scale(0.8) rotate(-4deg); }
          70% { opacity: 1; transform: scale(1.04) rotate(1deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }

        /* -------- hero id card -------- */
        .cb-card-wrap {
          position: relative;
        }

        .cb-card {
          position: relative;
          background: var(--paper2);
          border: 4px solid var(--ink);
          box-shadow: 10px 10px 0 var(--ink);
          padding: 2rem;
          transform: rotate(2deg);
        }

        .cb-card-label {
          font-family: 'Space Mono', monospace;
          font-size: 0.72rem;
          font-weight: 700;
          background: var(--ink);
          color: var(--paper2);
          display: inline-block;
          padding: 0.25rem 0.6rem;
          margin-bottom: 1.4rem;
          transform: rotate(-1deg);
        }

        .cb-avatar {
          width: 100%;
          aspect-ratio: 4 / 3;
          border: 3px solid var(--ink);
          margin-bottom: 1.4rem;
          background:
            radial-gradient(circle at 30% 30%, rgba(255,255,255,0.35), transparent 55%),
            repeating-linear-gradient(135deg, var(--blue) 0 8px, #17408a 8px 16px);
          position: relative;
          overflow: hidden;
        }

        .cb-avatar::after {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(var(--ink) 1.2px, transparent 1.4px);
          background-size: 10px 10px;
          opacity: 0.18;
        }

        .cb-avatar img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .cb-stat-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.9rem;
          margin-bottom: 1.6rem;
        }

        .cb-stat {
          border: 3px solid var(--ink);
          background: var(--paper);
          padding: 0.7rem 0.4rem;
          text-align: center;
        }

        .cb-stat-value {
          font-family: 'Bangers', cursive;
          font-size: 1.65rem;
          line-height: 1;
        }

        .cb-stat-label {
          font-family: 'Space Mono', monospace;
          font-size: 0.62rem;
          text-transform: uppercase;
          margin-top: 0.3rem;
          color: #4a4658;
        }

        .cb-powers {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .cb-power {
          font-family: 'Space Mono', monospace;
          font-size: 0.7rem;
          font-weight: 700;
          border: 2px solid var(--ink);
          background: var(--yellow);
          padding: 0.25rem 0.55rem;
        }

        /* -------- section head -------- */
        .cb-section-head {
          display: flex;
          align-items: baseline;
          gap: 1rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .cb-issue-tag {
          font-family: 'Space Mono', monospace;
          font-size: 0.75rem;
          font-weight: 700;
          border: 2px solid var(--ink);
          background: var(--red);
          color: var(--paper2);
          padding: 0.3rem 0.6rem;
          transform: rotate(-2deg);
          display: inline-block;
        }

        .cb-h2 {
          font-family: 'Bangers', cursive;
          font-size: clamp(2rem, 4vw, 2.8rem);
          letter-spacing: 0.01em;
        }

        /* -------- origin / about -------- */
        #origin { background: var(--paper2); border-top: 4px solid var(--ink); border-bottom: 4px solid var(--ink); }

        .cb-origin-grid {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 3.5rem;
        }

        .cb-origin-text p {
          font-size: 1rem;
          line-height: 1.75;
          margin-bottom: 1.2rem;
        }

        .cb-origin-text strong {
          background: var(--yellow);
          padding: 0 0.2rem;
        }

        .cb-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 1.6rem;
        }

        .cb-chip {
          font-family: 'Space Mono', monospace;
          font-size: 0.72rem;
          border: 2px solid var(--ink);
          padding: 0.3rem 0.65rem;
          background: var(--paper);
        }

        .cb-strip {
          position: relative;
          border-left: 4px solid var(--ink);
          padding-left: 1.8rem;
        }

        .cb-strip-item {
          position: relative;
          padding-bottom: 2rem;
        }

        .cb-strip-item::before {
          content: '';
          position: absolute;
          left: -2.32rem;
          top: 0.2rem;
          width: 14px; height: 14px;
          background: var(--red);
          border: 2px solid var(--ink);
          border-radius: 50%;
        }

        .cb-strip-year {
          font-family: 'Space Mono', monospace;
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--blue);
          margin-bottom: 0.25rem;
        }

        .cb-strip-title {
          font-family: 'Archivo', sans-serif;
          font-weight: 800;
          font-size: 1rem;
        }

        .cb-strip-org {
          font-size: 0.85rem;
          color: #4a4658;
        }

        /* -------- cases / projects -------- */
        .cb-cases-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.6rem;
        }

        .cb-case {
          position: relative;
          background: var(--paper2);
          border: 3px solid var(--ink);
          padding: 1.8rem;
          box-shadow: 7px 7px 0 var(--ink);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }

        .cb-case:hover {
          transform: translate(-2px, -2px);
          box-shadow: 9px 9px 0 var(--ink);
        }

        .cb-case.featured {
          grid-column: span 2;
          background: linear-gradient(135deg, var(--paper2) 55%, #fde9b8 100%);
        }

        .cb-case-num {
          position: absolute;
          top: -14px;
          right: -14px;
          width: 40px; height: 40px;
          background: var(--blue);
          color: var(--paper2);
          border: 3px solid var(--ink);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Bangers', cursive;
          font-size: 1.05rem;
        }

        .cb-case-tag {
          font-family: 'Space Mono', monospace;
          font-size: 0.68rem;
          text-transform: uppercase;
          color: #4a4658;
          margin-bottom: 0.9rem;
        }

        .cb-case-title {
          font-family: 'Bangers', cursive;
          font-size: 1.5rem;
          letter-spacing: 0.01em;
        }

        .cb-case-title-row {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .cb-case-github {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: var(--ink);
          line-height: 1;
          transition: color 150ms ease, transform 150ms ease;
        }

        .cb-case-github:hover,
        .cb-case-github:focus-visible {
          color: var(--red);
          transform: translateY(-2px);
        }

        .cb-case.featured .cb-case-title { font-size: 1.9rem; }

        .cb-case-subtitle {
          font-weight: 800;
          font-size: 0.92rem;
          margin-bottom: 0.8rem;
          color: var(--red);
        }

        .cb-case-desc {
          font-size: 0.88rem;
          line-height: 1.65;
          color: #322f3a;
          margin-bottom: 1.2rem;
        }

        .cb-case-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .cb-case-stack span {
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem;
          border: 2px solid var(--ink);
          padding: 0.2rem 0.5rem;
          background: var(--paper);
        }

        /* -------- arsenal / skills -------- */
        #arsenal { background: var(--paper2); border-top: 4px solid var(--ink); border-bottom: 4px solid var(--ink); }

        .cb-arsenal-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.4rem;
        }

        .cb-locker {
          border: 3px solid var(--ink);
          background: var(--paper);
          padding: 1.4rem;
        }

        .cb-locker-head {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          margin-bottom: 1rem;
          padding-bottom: 0.7rem;
          border-bottom: 3px dashed var(--ink);
        }

        .cb-locker-icon {
          width: 30px; height: 30px;
          border: 2px solid var(--ink);
          background: var(--yellow);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        .cb-locker-label {
          font-family: 'Archivo', sans-serif;
          font-weight: 800;
          font-size: 0.85rem;
          text-transform: uppercase;
        }

        .cb-locker ul {
          list-style: none;
        }

        .cb-locker li {
          font-size: 0.85rem;
          padding: 0.3rem 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #322f3a;
        }

        .cb-locker li::before {
          content: '';
          width: 7px; height: 7px;
          background: var(--red);
          flex-shrink: 0;
          transform: rotate(45deg);
        }

        /* -------- signal / contact -------- */
        #signal { border-top: 4px solid var(--ink); }
        .cb-signal-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3.5rem;
          align-items: center;
        }

        .cb-bubble {
          position: relative;
          background: var(--paper2);
          border: 4px solid var(--ink);
          padding: 2.2rem;
          margin-bottom: 2rem;
        }

        .cb-bubble::after {
          content: '';
          position: absolute;
          left: 60px;
          bottom: -22px;
          width: 0; height: 0;
          border-left: 16px solid transparent;
          border-right: 16px solid transparent;
          border-top: 22px solid var(--ink);
        }
        .cb-bubble::before {
          content: '';
          position: absolute;
          left: 65px;
          bottom: -14px;
          width: 0; height: 0;
          border-left: 11px solid transparent;
          border-right: 11px solid transparent;
          border-top: 15px solid var(--paper2);
          z-index: 1;
        }

        .cb-bubble p {
          font-size: 1.05rem;
          line-height: 1.7;
        }

        .cb-signal-links {
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
        }

        .cb-signal-link {
          display: flex;
          align-items: center;
          gap: 1rem;
          text-decoration: none;
          color: var(--ink);
          background: var(--paper2);
          border: 3px solid var(--ink);
          padding: 0.9rem 1.1rem;
          box-shadow: 5px 5px 0 var(--ink);
          transition: transform 0.12s ease, box-shadow 0.12s ease;
        }

        .cb-signal-link:hover {
          transform: translate(2px, 2px);
          box-shadow: 3px 3px 0 var(--ink);
        }

        .cb-signal-icon {
          width: 38px; height: 38px;
          border: 2px solid var(--ink);
          background: var(--yellow);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        .cb-signal-meta-label {
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem;
          text-transform: uppercase;
          color: #4a4658;
        }

        .cb-signal-meta-value {
          font-weight: 800;
          font-size: 0.92rem;
        }

        .cb-ghost-text {
          font-family: 'Bangers', cursive;
          font-size: clamp(2.6rem, 7vw, 5rem);
          line-height: 0.95;
          text-align: right;
          -webkit-text-stroke: 2px var(--ink);
          color: transparent;
          opacity: 0.5;
        }

        /* -------- footer -------- */
        .cb-footer {
          border-top: 4px solid var(--ink);
          padding: 1.6rem clamp(1.25rem, 4vw, 1.75rem);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          margin: 0 auto;
          font-family: 'Space Mono', monospace;
          font-size: 0.75rem;
          color: #77727d;
        }

        .cb-footer a {
          color: #77727d;
          transition: color 150ms ease, text-decoration-color 150ms ease;
        }

        .cb-footer .cb-credit {
          animation: cb-credit-blink 1.8s ease-in-out infinite;
        }

        @keyframes cb-credit-blink {
          0%, 42%, 100% { color: #77727d; }
          58%, 84% { color: var(--yellow); }
        }

        .cb-footer .cb-credit:hover,
        .cb-footer .cb-credit:focus-visible,
        .cb-back-top:hover,
        .cb-back-top:focus-visible {
          color: var(--yellow);
        }

        .cb-footer .cb-credit:hover,
        .cb-footer .cb-credit:focus-visible {
          animation: none;
        }

        .cb-footer {
          border-top: 4px solid var(--ink);
          width: 100%;
          /* background here if you want one, e.g. background: var(--paper2); */
        }

        .cb-footer-inner {
          max-width: 1180px;
          margin: 0 auto;
          padding: 1.6rem clamp(1.25rem, 4vw, 1.75rem);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          font-family: 'Space Mono', monospace;
          font-size: 0.75rem;
          color: #77727d;
        }

        .cb-back-top {
          text-decoration: none;
          color: #77727d;
          font-weight: 700;
          white-space: nowrap;
        }

        .cb-boot {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: grid;
          place-items: center;
          background: #101116;
          color: #d8f7d8;
          font: 0.8rem/1.8 'Space Mono', monospace;
          animation: cb-boot-out 420ms ease 1.85s forwards;
        }
        .cb-boot-inner { width: min(680px, calc(100% - 2rem)); }
        .cb-boot-mark { color: var(--yellow); font: 3rem/1 'Bangers', cursive; letter-spacing: 0.08em; margin-bottom: 1.5rem; }
        .cb-boot-mark span, .cb-prompt { color: var(--yellow); }
        .cb-boot-lines { min-height: 10rem; }
        .cb-cursor { display: inline-block; width: 0.55rem; height: 1rem; background: var(--yellow); vertical-align: -0.15rem; animation: cb-blink 800ms steps(1) infinite; }
        @keyframes cb-blink { 50% { opacity: 0; } }
        @keyframes cb-boot-out { to { opacity: 0; visibility: hidden; pointer-events: none; } }
        .cb-terminal-section { background: #e9e4d7; color: #13141a; }
        .cb-terminal-section .cb-section-title { color: var(--black); }
        .cb-terminal-layout { display: grid; grid-template-columns: minmax(0, 1.35fr) minmax(260px, 0.65fr); gap: 1.5rem; align-items: stretch; }
        .cb-terminal-window, .cb-status-card { border: 3px solid var(--ink); box-shadow: 8px 8px 0 var(--yellow); }
        .cb-terminal-window { background: #101116; color: #f3d36b; min-width: 0; }
        .cb-terminal-bar { display: flex; align-items: center; gap: 0.45rem; padding: 0.7rem 0.85rem; border-bottom: 2px solid #30313a; color: #8b8b96; font: 0.68rem 'Space Mono', monospace; }
        .cb-terminal-dot { width: 10px; height: 10px; border-radius: 50%; display: block; }.cb-terminal-dot.red { background: var(--red); }.cb-terminal-dot.yellow { background: var(--yellow); }.cb-terminal-dot.blue { background: #65a4ff; }.cb-terminal-path { margin-left: 0.45rem; }
        .cb-terminal-body { min-height: 300px; padding: 1.25rem; font: 0.78rem/1.8 'Space Mono', monospace; overflow: hidden; }
        .cb-terminal-muted, .cb-terminal-output { color: #8fa38f; }.cb-terminal-entry { margin-top: 0.8rem; }.cb-terminal-form { display: flex; align-items: center; gap: 0.5rem; }.cb-terminal-form input { min-width: 0; flex: 1; border: 0; outline: 0; background: transparent; color: #e9e4d7; font: inherit; }
        .cb-status-card { background: var(--paper2); color: var(--ink); padding: 1.2rem; min-width: 0; }.cb-status-heading { display: flex; align-items: center; gap: 0.45rem; font: 700 0.72rem 'Space Mono', monospace; letter-spacing: 0.03em; }.cb-status-live { margin-left: auto; color: var(--green); }.cb-live-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--green); box-shadow: 0 0 0 4px rgba(31,158,99,0.16); }.cb-status-row { display: flex; justify-content: space-between; gap: 0.75rem; border-bottom: 1px solid rgba(23,22,28,0.18); padding: 0.9rem 0; font: 0.72rem 'Space Mono', monospace; }.cb-status-row strong { text-align: right; }.cb-commit-label { margin-top: 1.4rem; font: 0.62rem 'Space Mono', monospace; color: #77727d; }.cb-streak-card { display: block; width: 100%; max-width: 100%; height: auto; margin-top: 0.7rem; }.cb-status-link { display: inline-flex; align-items: center; gap: 0.3rem; margin-top: 1.2rem; color: var(--ink); font: 700 0.7rem 'Space Mono', monospace; }.cb-status-link:hover { color: var(--red); }
        .cb-stats-panel { margin-top: 3rem; }
        .cb-stats-grid { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 1rem; margin-top: 0.7rem; }
        .cb-stat-box { grid-column: span 4; min-width: 0; padding: 0.7rem; background: #101116; border: 3px solid var(--ink); box-shadow: 5px 5px 0 var(--yellow); overflow: hidden; }
        .cb-stat-box--wide { grid-column: span 8; }
        .cb-stat-box--compact { display: flex; align-items: center; justify-content: center; min-height: 92px; }
        .cb-stat-box img { display: block; width: 100%; max-width: 100%; height: auto; }
        .cb-stat-box--compact img { width: auto; max-width: 100%; }

        /* -------- responsive -------- */
        @media (max-width: 900px) {
          .cb-hero-grid, .cb-origin-grid, .cb-signal-grid { grid-template-columns: 1fr; }
          .cb-cases-grid { grid-template-columns: 1fr 1fr; }
          .cb-case.featured { grid-column: span 2; }
          .cb-arsenal-grid { grid-template-columns: 1fr 1fr; }
          .cb-ghost-text { text-align: left; }
        }

        @media (max-width: 640px) {
          .cb-pop {
            opacity: 1;
            transform: none;
            animation: none;
          }

          .cb-nav-links { display: none; }
          .cb-menu-btn { display: inline-flex; }
          .cb-mobile-panel.open {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            position: fixed;
            top: 68px; left: 0; right: 0;
            background: var(--paper2);
            border-bottom: 4px solid var(--ink);
            padding: 1.4rem 1.75rem;
            z-index: 49;
          }
          .cb-mobile-panel a {
            font-weight: 800;
            text-decoration: none;
            color: var(--ink);
            font-size: 1rem;
          }
          .cb-cases-grid { grid-template-columns: minmax(0, 1fr); }
          .cb-case.featured { grid-column: span 1; }
          .cb-arsenal-grid { grid-template-columns: minmax(0, 1fr); }
          .cb-wrap { width: 100%; max-width: 100%; padding: 3.5rem 1rem; }
          .cb-hero-grid, .cb-origin-grid, .cb-signal-grid,
          .cb-cases-grid, .cb-arsenal-grid, .cb-footer { min-width: 0; }
          .cb-hero-copy, .cb-origin-copy, .cb-signal-copy,
          .cb-case, .cb-locker, .cb-signal-link { min-width: 0; max-width: 100%; }
          .cb-display, .cb-ghost-text, .cb-section-title { max-width: 100%; overflow-wrap: anywhere; }
          .cb-case-title, .cb-case-desc, .cb-origin-text p, .cb-bubble p { overflow-wrap: anywhere; }
          .cb-tags { max-width: 100%; flex-wrap: wrap; }
          .cb-footer { flex-wrap: wrap; }
          .cb-footer > * { max-width: 100%; }
          .cb-nav-inner { padding-left: 1rem; padding-right: 1rem; }
          .cb-logo-word { max-width: calc(100vw - 120px); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
          .cb-burst { max-width: 30vw; }
          .cb-terminal-layout { grid-template-columns: minmax(0, 1fr); }
          .cb-terminal-window, .cb-status-card { box-shadow: 4px 4px 0 var(--yellow); }
          .cb-terminal-body { padding: 1rem; font-size: 0.68rem; }
          .cb-status-row { font-size: 0.65rem; }
          .cb-stats-grid { grid-template-columns: minmax(0, 1fr); }
          .cb-stat-box, .cb-stat-box--wide { grid-column: span 1; }
          .cb-signal-link { overflow-wrap: anywhere; }
          .cb-btn { max-width: 100%; }
          .cb-btn span { overflow-wrap: anywhere; }
          svg { max-width: 100%; }
        }

        @media (max-width: 480px) {
          .cb-logo-word { font-size: 1.05rem; }
          .cb-hero h1 { font-size: clamp(2.75rem, 15vw, 4rem); }
          .cb-hero-desc, .cb-bubble p { font-size: 0.92rem; }
          .cb-h2 { font-size: clamp(1.8rem, 10vw, 2.35rem); }
          .cb-case-title { font-size: 1.3rem; }
          .cb-case.featured .cb-case-title { font-size: 1.55rem; }
          .cb-signal-meta-value {
            font-size: clamp(0.48rem, 2.35vw, 0.72rem);
            letter-spacing: -0.035em;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: clip;
          }
          .cb-signal-link { gap: 0.55rem; padding: 0.8rem; }
          .cb-signal-link > span:last-child { min-width: 0; flex: 1; }
          .cb-footer { font-size: 0.62rem; gap: 0.65rem; line-height: 1.45; }
          .cb-footer .cb-credit, .cb-back-top { font-size: 0.62rem; }
        }

        @media (prefers-reduced-motion: reduce) {
          .cb-pop { animation: none !important; opacity: 1; transform: none; }
          .cb-case, .cb-btn, .cb-signal-link { transition: none; }
        }
      `}</style>

      <div className="cb-halftone" />

      {/* NAV */}
      <nav className="cb-nav">
        <a href="#hero" className="cb-logo">
          <span className="cb-logo-badge">PB</span>
          <span className="cb-logo-word">Priyanka B.</span>
        </a>
        <ul className="cb-nav-links">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
        <a
          href="https://github.com/h4rl3y-q"
          target="_blank"
          rel="noreferrer"
          className="cb-btn cb-nav-cta"
        >
          GitHub <ArrowUpRight size={15} />
        </a>
        <button
          className="cb-menu-btn"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
      <div className={`cb-mobile-panel ${menuOpen ? "open" : ""}`}>
        {NAV_LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
            {l.label}
          </a>
        ))}
      </div>

      {/* HERO */}
      <section id="hero" className="cb-section cb-hero">
        <CharCoderHero
          className="cb-char"
          style={{ width: 190, left: -10, bottom: -10, transform: "rotate(-4deg)" }}
        />
        <div className="cb-wrap">
          <div className="cb-hero-grid">
            <div>
              <div className={`cb-pop ${mounted ? "cb-mounted" : ""}`}>
                <span className="cb-caption">Open For New Missions — Internships</span>
                <h1>
                  Priyanka B.
                  <br />
                  <span className="cb-stroke">Backend Dev</span>
                </h1>
                <p className="cb-hero-desc">
                  CSE undergrad at Techno India Institute Of Technology, building
                  backend systems that don't flinch under load. Java and Spring Boot
                  by day, Linux ricing by night.
                </p>
                <div className="cb-hero-actions">
                  <a href="#cases" className="cb-btn cb-btn--red">
                    See The Case Files
                  </a>
                  <a href="#signal" className="cb-btn cb-btn--outline">
                    Send A Signal
                  </a>
                </div>
              </div>
            </div>

            <div className="cb-card-wrap">
              <Burst style={{ width: 90, height: 90, top: -30, right: -20, zIndex: 2 }} />
              <div className="cb-card">
                <span className="cb-card-label">Hero ID // System Profile</span>
                <div className="cb-avatar">
                  <img src="/profile.svg" alt="Priyanka B. profile portrait" />
                </div>
                <div className="cb-stat-grid">
                  {STATS.map((s) => (
                    <div className="cb-stat" key={s.label}>
                      <div className="cb-stat-value">
                        {s.value}
                        {s.suffix}
                      </div>
                      <div className="cb-stat-label">{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="cb-powers">
                  {POWERS.map((p) => (
                    <span className="cb-power" key={p}>
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ORIGIN / ABOUT */}
      <section id="origin" className="cb-section">
        <CharDeskCoder
          className="cb-char"
          style={{ width: 210, right: 20, bottom: 0, opacity: 0.5 }}
        />
        <div className="cb-wrap">
          <SectionHeading issue="Issue 01" title="Origin Story" />
          <div className="cb-origin-grid">
            <div className="cb-origin-text">
              <p>
                I'm a <strong>BCA CSE student</strong> at Techno India Institute Of
                Technology, graduating in 2027. My work lives at the intersection of
                software engineering, backend programming, and full-stack
                development.
              </p>
              <p>
                Right now I'm hunting for <strong>internship opportunities</strong>,
                on-site or remote, where I can keep building scalable backend
                systems in <strong>Java and Spring Boot</strong> — the fundamentals
                are solid, and I want to put them to work.
              </p>
              <p>
                Outside class hours I maintain open-source projects and rice my
                Debian setup until it looks like a sci-fi terminal.
              </p>
              <div className="cb-chips">
                {["Tomcat", "Hibernate", "MVC Architecture", "Java 25 LTS", "PostgreSQL"].map(
                  (c) => (
                    <span className="cb-chip" key={c}>
                      {c}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="cb-strip">
              {TIMELINE.map((t) => (
                <div className="cb-strip-item" key={t.title}>
                  <div className="cb-strip-year">{t.year}</div>
                  <div className="cb-strip-title">{t.title}</div>
                  <div className="cb-strip-org">{t.org}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CASE FILES / PROJECTS */}
      <section id="cases" className="cb-section">
        <div className="cb-wrap">
          <SectionHeading issue="Issue 02" title="Case Files" />
          <div className="cb-cases-grid">
            {CASES.map((c) => (
              <div className={`cb-case ${c.featured ? "featured" : ""}`} key={c.id}>
                <div className="cb-case-num">{c.id}</div>
                <div className="cb-case-tag">{c.tag}</div>
                <div className="cb-case-title-row">
                  <div className="cb-case-title">{c.title}</div>
                  <a
                    className="cb-case-github"
                    href={`https://github.com/${GITHUB_USERNAME}/${c.title}`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open the ${c.title} GitHub repository`}
                    title={`${c.title} on GitHub`}
                  >
                    <Code2 size={17} />
                  </a>
                </div>
                <div className="cb-case-subtitle">{c.subtitle}</div>
                <p className="cb-case-desc">{c.desc}</p>
                <div className="cb-case-stack">
                  {c.stack.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ARSENAL / SKILLS */}
      <section id="arsenal" className="cb-section">
        <CharBot
          className="cb-char"
          style={{ width: 110, left: 16, top: 8, opacity: 0.85 }}
        />
        <div className="cb-wrap">
          <SectionHeading issue="Issue 03" title="The Arsenal" />
          <div className="cb-arsenal-grid">
            {ARSENAL.map((group) => (
              <div className="cb-locker" key={group.label}>
                <div className="cb-locker-head">
                  <span className="cb-locker-icon">
                    <group.icon size={16} />
                  </span>
                  <span className="cb-locker-label">{group.label}</span>
                </div>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TerminalSection />

      {/* SIGNAL / CONTACT */}
      <section id="signal" className="cb-section">
        <CharWaving
          className="cb-char"
          style={{ width: 130, right: 24, bottom: -6 }}
        />
        <div className="cb-wrap">
          <SectionHeading issue="Issue 05" title="Send A Signal" />
          <div className="cb-signal-grid">
            <div>
              <div className="cb-bubble">
                <p>
                  Open to research collaborations, internships, interesting
                  open-source projects, and full-time roles post-2027. If what
                  you're working on is technically deep, I'm listening.
                </p>
              </div>
              <div className="cb-signal-links">
                <a
                  href="https://github.com/h4rl3y-q"
                  target="_blank"
                  rel="noreferrer"
                  className="cb-signal-link"
                >
                  <span className="cb-signal-icon">
                    <Code2 size={17} />
                  </span>
                  <span>
                    <div className="cb-signal-meta-label">GitHub</div>
                    <div className="cb-signal-meta-value">@h4rl3y-q</div>
                  </span>
                </a>
                <a
                  href="https://www.linkedin.com/in/priyanka-bhattacharya-392abb2a8/"
                  target="_blank"
                  rel="noreferrer"
                  className="cb-signal-link"
                >
                  <span className="cb-signal-icon">
                    <BriefcaseBusiness size={17} />
                  </span>
                  <span>
                    <div className="cb-signal-meta-label">LinkedIn</div>
                    <div className="cb-signal-meta-value">Priyanka Bhattacharya</div>
                  </span>
                </a>
                <a
                  href="mailto:bhattacharyapriyanka2005@gmail.com"
                  className="cb-signal-link"
                >
                  <span className="cb-signal-icon">
                    <Mail size={17} />
                  </span>
                  <span>
                    <div className="cb-signal-meta-label">Email</div>
                    <div className="cb-signal-meta-value">
                      bhattacharyapriyanka2005@gmail.com
                    </div>
                  </span>
                </a>
              </div>
            </div>
            <div className="cb-ghost-text" aria-hidden="true">
              SAY
              <br />
              HELLO
              <br />
              WORLD
            </div>
          </div>
        </div>
      </section>

      <footer className="cb-footer">
        <div className="cb-footer-inner">
          <span>
            © 2026 h4rl3y-q — Built by{" "}
            <a href="https://fl4nk3r.vercel.app/" target="_blank" rel="noreferrer" className="cb-credit">
              @fl4nk3r-h
            </a>
          </span>
          <a href="#hero" className="cb-back-top">
            ↑ Back to top
          </a>
        </div>
      </footer>
    </div>
  );
}
