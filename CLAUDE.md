# Styled by Manuela — Project Guide

## What This Is
A marketing website for "Styled by Manuela" — a personal styling & image consulting business. The site is being built collaboratively: Manuela (non-technical) uses a web dashboard to describe changes via AI chat, and Sean manages the infrastructure and code directly via Claude Code.

## Architecture

```
iPad (Safari via Tailscale) → Dashboard (:3000) → Aider + Gemini → edits files
MacBook (Sean) → Claude Code (SSH or direct) → edits files
Both → Vite dev server (:5173) serves live preview
All changes → auto-commit & push to GitHub
```

### Container: webdev (CT 102)
- **OS**: Ubuntu 24.04 LTS on Proxmox LXC
- **Tailscale IP**: 100.122.223.19
- **Local IP**: 192.168.68.54
- **Node**: v22, npm 10
- **Ports**: 3000 (dashboard), 5173 (Vite dev server)

### Key Paths
- `~/mysite/` — The website project (this repo)
- `~/dashboard/` — Dashboard server (Express + WebSocket + Aider bridge)
- `~/dashboard/server.js` — Dashboard backend
- `~/dashboard/public/index.html` — Dashboard UI
- `~/dashboard/start.sh` — Starts both Vite and dashboard

### Services
- **Vite**: `cd ~/mysite && npm run dev -- --host`
- **Dashboard**: `cd ~/dashboard && node server.js`
- **Both**: `bash ~/dashboard/start.sh`

## Tech Stack
- **Vite** (vanilla JS template) — dev server + build tool
- **No framework** — plain HTML, CSS, JS
- **Aider + Gemini 2.5 Flash** — AI coding via dashboard chat
- **Git** — SSH auth to GitHub, auto-commit on each AI edit
- **GitHub**: git@github.com:skvarda/StyledByManuela.git

## Project Structure
```
~/mysite/
├── index.html          ← Main site entry point
├── style.css           ← All styles
├── main.js             ← All JS (scroll, nav, forms, interactions)
├── public/
│   └── assets/         ← Images, logos, resources (synced from Google Drive)
├── CONVENTIONS.md       ← AI builder instructions (Aider reads this)
├── CLAUDE.md            ← This file (Claude Code reads this)
├── vite.config.js       ← Vite config (if created)
├── package.json
└── .gitignore
```

## Design Direction
- **Aesthetic**: Modern, elegant, warm — luxury fashion/beauty editorial
- **Colors**: Warm neutrals, champagne/gold accents, soft creams, tans, deep browns
- **Typography**: Elegant serif for headings (e.g., Playfair Display), clean sans-serif for body (e.g., DM Sans)
- **Layout**: Mobile-first, responsive, smooth scroll between sections
- **Vibe**: Think high-end boutique, not generic template

## Site Sections
1. **Hero** — Full-screen intro, headline, CTA button
2. **About** — Manuela's story and philosophy
3. **Services** — What she offers (cards/grid)
4. **Portfolio/Gallery** — Styled looks, before/after
5. **Testimonials** — Client quotes
6. **Contact** — Email capture, contact form
7. **Navigation** — Sticky nav linking to all sections

## Code Rules
- Keep HTML in `index.html`, CSS in `style.css`, JS in `main.js`
- Use images from `public/assets/` — reference as `/assets/filename.ext`
- Placeholder images: use https://placehold.co/WIDTHxHEIGHT
- Smooth scroll: `html { scroll-behavior: smooth; }` + anchor links
- Mobile-first: design for phone/iPad first, enhance for desktop
- Clean, well-commented code
- When adding sections, update the nav menu
- Forms should have proper validation and accessible labels
- Use CSS custom properties for colors/fonts for easy theming

## Git Workflow
- The dashboard auto-commits and pushes after each Aider edit
- When working in Claude Code, commit meaningfully: `git add -A && git commit -m "description" && git push`
- Branch: `main`

## Common Tasks

### Start the servers
```bash
bash ~/dashboard/start.sh
```

### Fix DNS (if packages/network break)
```bash
echo "nameserver 8.8.8.8" > /etc/resolv.conf
```

### Check what's running
```bash
netstat -tlnp | grep -E '3000|5173'
```

### View recent changes
```bash
git log --oneline -10
```

### Restart just Vite
```bash
pkill -f vite
cd ~/mysite && npm run dev -- --host &
```

## Google Drive
- Shared folder: https://drive.google.com/drive/folders/1AM8t9B39RiSnNnTIPX_rEsbHxuUSgwve
- Resources (photos, copy, branding) go here
- Synced to `~/mysite/public/assets/` (rclone setup pending)
- Manuela can also upload directly via the dashboard UI

## Notes
- DNS on this container breaks after reboot — run the resolv.conf fix
- Tailscale may need `tailscale up` after container restart
- Dashboard streams Aider output in real-time via WebSocket
- Preview iframe auto-refreshes after each AI edit
- Gemini free tier: 250 requests/day on 2.5 Flash — sufficient for iterative building
