discovr, temporary landing page (PWA)

Host this folder as-is at the root of any static host (Netlify, Vercel, GitHub Pages, S3, cPanel).
It must be served over HTTPS for the service worker and install prompt to work.

Before going live
1. The domain (https://www.discovr.in) is already set in index.html.
2. Serve manifest.webmanifest with the content type application/manifest+json (most hosts already do).

When you change anything later
Bump VERSION in sw.js (discovr-v1 to discovr-v2) so returning visitors get the new files.

Fonts: Instrument Sans, self-hosted Latin subset, SIL Open Font License (fonts/OFL.txt).
