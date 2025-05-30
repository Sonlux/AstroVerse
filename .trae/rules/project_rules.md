# Project Rules for AstroVerse

project_name: "AstroVerse"
goal: "To build a real-time, interactive astronomy web platform"
target_users: ["space enthusiasts", "students", "educators", "researchers"]

frontend_stack:

- framework: "Next.js"
- components: ["React", "Tailwind CSS", "Framer Motion"]
- 3d_library: "Three.js with React-Three-Fiber"
- state_management: "Zustand"

backend_stack:

- language: "Node.js"
- framework: "Express + Apollo Server"
- database: "PostgreSQL"
- real_time: "Supabase (realtime sync, auth)"
- caching: "Redis"
- integrations: ["NASA API", "SpaceX API", "Launch Library 2"]

devops:

- deployment: "Vercel for frontend, Railway/Render for backend"
- ci_cd: "GitHub Actions"
- monitoring: "Sentry + Vercel Analytics"
- version_control: "Git + GitHub"

ui_guidelines:

- theme: "Dark cosmic UI with glassmorphism"
- accessibility: "WCAG 2.1 AA compliance"
- interaction: "Hover transitions, zoomable 3D, scroll-based timeline"

content_rules:

- show object details on hover
- dynamic filtering of object types
- user can bookmark and track celestial events

preferred_file_structure:

- `/src/components`
- `/src/pages`
- `/src/api`
- `/src/hooks`
- `/public/assets/models`
