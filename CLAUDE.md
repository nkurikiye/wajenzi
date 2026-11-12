# Wajenzi — website

Static, multi-page marketing site for **Wajenzi**, an African-founded corporate-finance
advisory firm headquartered in Luxembourg. It connects African growth-stage SMEs with
global and diaspora capital through EU-domiciled structures and licensed partners, using
AI to organise information and support investor discovery.

- **Live:** https://wajenzi.fund (GitHub Pages, served from `main`; `CNAME` set)
- **Repo:** `nkurikiye/wajenzi`
- **Stack:** plain HTML + CSS + vanilla JS. No build step, no framework, no bundler.
  Just open the `.html` files; they load `flux.css` and `flux.js` directly.

## Structure

- Top-level `*.html` — English pages (`index`, `model`, `process`, `audiences`,
  `insights`, `about`, plus `example`, `malaika`, and article pages).
- `fr/` — full French mirror of the site. FR pages reference assets with `../`
  (e.g. `../flux.css`, `../logo.svg`, `../img/...`).
- Every page has an EN⇄FR toggle in the nav: a `.lang` link pointing to its counterpart
  (EN `index.html` → `fr/index.html`, and back via `../index.html`).
- `img/` — photos and exported graphics. See `img/README.md` for the expected files and
  specs. Images use a never-broken pattern: a `.photo` element with a `--img` custom
  property and a CSS gradient fallback, so a missing JPG still looks intentional.
- `diagrams/` — standalone, self-contained HTML graphics (e.g. `capital-matching.html`),
  rendered to PNGs in `img/` for embedding. Not linked from the site.

## Design system — "flux"

Defined in `flux.css` (CSS custom properties) with the animated flow-canvas in `flux.js`.

- **Palette:** magenta `#E2276F` (accent) on deep navy `#0A1124`. A teal/cyan is used as a
  secondary accent in diagrams. Keep accents on-brand; don't introduce new hues.
- **Type:** Sora (body + headings), Space Grotesk (display figures), Space Mono (mono
  kickers/labels), all from Google Fonts.
- **Idioms:** `.eyebrow` kickers, `.grad-text` for magenta gradient emphasis in headings,
  `.reveal` for scroll-in animation, `.btn.btn-glow` / `.btn.btn-ghost` buttons,
  `.photo` slots with `--img`. Reuse these rather than inventing new components.
- `flux.css` is append-only in practice — new component styles are added at the end.

## Content & compliance conventions

This is a regulated-adjacent financial site. Keep the established framing:

- Wajenzi is **not a licensed investment firm**. Placement and distribution of securities
  are carried out by **"duly authorised intermediaries"** — never imply Wajenzi places or
  distributes itself.
- AI framing is **human-in-the-loop**: "AI assists the work, people review the decisions";
  AI "does not guarantee funding, replace due diligence or make investment decisions."
- Illustrative content (example raises, figures) must carry a clear
  **"illustrative — not an offer / not a real transaction"** disclaimer.
- Founder credentials ("more than five investment funds", "over €200 million mobilised")
  are the **founder's** experience, always paired with the disclaimer that it is not a
  claim about Wajenzi itself. These figures are confirmed by the owner — don't change them.
- Standard footer disclaimer (advisory-only, not investment advice, risk warning) appears
  on every page.

## Workflow

- **Never commit straight to `main`** — `main` is live. One change = one branch = one PR.
- Open PRs with the REST API (`gh api repos/nkurikiye/wajenzi/pulls ...`); the GraphQL path
  (`gh pr create`) is blocked in this setup and returns 403.
- The owner reviews each PR and says **"merge"**; merge with **squash**.
- When two branches both append to `flux.css`, expect a tail conflict on rebase — keep
  both blocks.

## QA before every PR

Render the changed page(s) headless with Playwright (Chromium is preinstalled) and view the
screenshot. Force reveal animations visible first:
`document.querySelectorAll('.reveal').forEach(e=>{e.classList.add('in');e.style.opacity=1;e.style.transform='none';})`

## Commit attribution

End commit messages with the standard Claude Code co-author trailer
(`Co-Authored-By: Claude <noreply@anthropic.com>`) and end PR descriptions with the
Claude Code "Generated with" footer.
