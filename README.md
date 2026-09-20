# Hibiscus to Airport — hibiscustoairport.co.nz

Marketing site for the Hibiscus Coast → Auckland Airport shuttle service.

React + Vite frontend only. There is **no backend in this repo**: `/api/*` is
proxied by `vercel.json` to the shared Book A Ride platform
(`Book-A-Ride-Gap-Digital/BookARide`), and the booking + payment pages are
copied verbatim from that repo. See `CLAUDE.md` for the rules.

```
cd frontend
npm install
npm run dev        # local dev, /api proxied to the live platform
npm run build      # fails if the booking mirror has drifted
```
