---

name: ravi-html-social-post-rendering
description: Ravi's workflow for social-media post designs as HTML/CSS with mobile preview approval, self-QA, novelty QA, then render to image.
version: 1.2.0
author: Alice
license: MIT
metadata:
hermes:
tags: [ravi, social-media, html, css, design, rendering, telegram, playwright, infographic, visual-differentiation]
-------------------------------------------------------------------------------------------------------------------

# Ravi HTML Social Post Rendering Workflow

Use this skill when Ravi asks for a social-media post, infographic, design, poster, content graphic, or visual asset made with HTML/CSS and rendered into an image.

Ravi reviews from Telegram on mobile, while the agent runs on Ravi's local server. The default flow is:

**brief → concept lock → HTML/CSS design → self-QA screenshot → novelty QA → LAN preview for approval → final render only after Ravi approves**

The main goal is not only to produce a clean design, but also to avoid repetitive visuals. A design is not considered meaningfully different if it only changes colors, fonts, spacing, or card arrangement while keeping the same visual system.

---

# Operating Principles

* Language/tone: Indonesian, casual-professional Alice persona.
* Ravi should not need to run commands. Give him only the preview link and ask for approval/revision.
* Information clarity beats decoration, especially for infographics.
* Visuals must support comprehension, not just look cool.
* More text is allowed only when the chosen format supports density, such as newspaper, manual, dossier, audit slip, or report-style design.
* For mobile-first posts, readability and hierarchy are more important than text quantity.
* Never sacrifice readability for style.
* Never allow clipping, overlap, tiny unreadable text, or text spilling outside boundaries.
* Avoid repeating the same card/poster formula.
* When Ravi asks for a different style, change the actual visual system, not only the layout, colors, or font.
* Do not render a final image until Ravi approves the HTML preview, unless he explicitly asks to render immediately.

---

# Core Workflow

## 1. Clarify only if needed

If the brief is vague, ask only for the minimum needed:

* topic
* audience
* format: WA Status / IG post / general square post
* style direction, if Ravi already has one

If enough context exists, choose practical defaults for Ravi.

Default assumptions when not specified:

* canvas: 1080×1080 square
* language: Indonesian
* tone: clear, practical, slightly premium, not too corporate
* target: readable from Telegram mobile preview
* output: HTML/CSS preview first, final JPG/PNG only after approval

---

## 2. Lock the design concept before coding

Before writing HTML/CSS, define the concept internally.

Do not start coding until the design has a clear visual concept.

Use this internal concept lock:

```text
Concept:
Visual metaphor:
Structural layout:
Information behavior:
Surface styling:
What must NOT be repeated:
Main readability risks:
QA focus:
```

Example:

```text
Concept: AI tool filter machine
Visual metaphor: factory filter pipeline
Structural layout: input → filter chambers → approved output
Information behavior: left-to-right process
Surface styling: industrial UI, labels, gauges, warning stickers
What must NOT be repeated: card grid, generic icon list, plain checklist
Main readability risks: small labels near pipes, overcrowding
QA focus: text contrast, pipeline clarity, title-content match
```

If the concept is weak or generic, revise it before coding.

Weak concepts:

* modern infographic
* clean poster
* premium design
* tech style
* bold layout
* glass card design

Strong concepts:

* AI tool filter machine
* newspaper front-page warning
* RPG inventory for business tools
* audit receipt for bad habits
* blueprint map of a workflow
* detective case board for decision-making
* operating manual for content production
* dashboard cockpit for automation control

---

# Visual Differentiation Protocol

Before coding, define the design system in four separate layers.

## 1. Visual Metaphor

Choose one concrete metaphor, not a generic style.

Examples:

* AI filter machine
* airport control panel
* detective case board
* factory conveyor
* old newspaper clipping
* medical chart
* RPG inventory
* operating manual
* warning label
* city map
* lab report
* receipt audit
* blueprint schematic
* desktop workspace
* passport dossier
* comic strip
* security scan
* trading terminal
* shipping label
* classified document
* vending machine
* tactical mission board

The metaphor must influence the layout, not only the decoration.

Bad:

```text
A blueprint design that is just blue background + cards.
```

Good:

```text
A blueprint design with grid, measurement lines, labeled components, connector paths, technical notes, and stamped annotations.
```

---

## 2. Structural Layout

Choose a layout structure that matches the metaphor.

Do not use generic cards unless the metaphor explicitly requires cards.

Possible structures:

* map with labeled zones
* timeline path
* comic panels
* exploded diagram
* dashboard gauges
* document scan
* checklist clipboard
* machine pipeline
* comparison table
* annotated object
* center-out diagram
* before-after split
* decision tree
* flowchart
* stack of documents
* inventory grid
* control panel
* receipt breakdown
* newspaper columns
* corkboard notes
* radar scan
* operating manual page

A layout is too generic if the information could be rearranged freely without changing the meaning.

---

## 3. Information Behavior

Decide how the reader should move through the post.

Examples:

* top-to-bottom explanation
* left-to-right process
* center-out diagram
* problem-to-solution
* warning-to-action
* before-after contrast
* question-to-decision
* scan-and-approve
* mistake-to-fix
* input-to-output
* checklist-to-verdict
* diagnosis-to-prescription
* evidence-to-conclusion

The reading path must be visible in the composition.

---

## 4. Surface Styling

Only after the metaphor, structure, and information behavior are chosen, decide:

* colors
* fonts
* textures
* icons
* illustrations
* borders
* shadows
* materials
* background treatment

Surface styling alone does not count as a new design.

A design is considered insufficiently different if only these changed:

* colors
* font pairing
* border radius
* shadows
* icon set
* card position
* gradient direction
* background texture

A design is considered meaningfully different if at least two of these change:

* visual metaphor
* structural layout
* reading path
* illustration system
* typography system
* material/texture system
* hierarchy model
* information framing

---

# Anti-Card Rule

Do not use a card grid as the default composition.

A layout counts as a repetitive card grid if:

* most information is placed inside similar rounded rectangles
* each point has the same icon-title-body structure
* the design could be rearranged without changing the meaning
* the visual metaphor is only decorative and not structural
* the design looks like a normal SaaS landing page section
* the main variation comes only from color, icon, or spacing

If using cards, justify why cards are part of the metaphor.

Allowed card-like cases:

* ID cards in a dossier
* product tags in an inventory
* files on a desktop
* sticky notes on a corkboard
* receipts in an audit stack
* panels in a comic strip
* control modules in a cockpit
* checklist blocks on a clipboard
* newspaper article boxes
* trading terminal widgets

Otherwise, choose a more specific structure:

* diagram
* map
* form
* machine
* document
* comic
* dashboard
* manual
* timeline
* annotated scene
* decision tree
* audit report
* blueprint
* receipt
* operating panel

---

# Visual Metaphor Requirements

Use these requirements when choosing a specific visual direction.

## Newspaper Clipping / Editorial Paper

Must include:

* serif headline or masthead typography
* cream or aged paper background
* column structure
* ink-like rule lines
* caption or pull quote
* printed-style illustration or stamp
* editorial density without overflow

Avoid:

* glass cards
* neon gradients
* modern floating icons
* SaaS-style rounded panels
* excessive shadows

Best for:

* warnings
* opinion-style infographic
* business lessons
* public-service style content
* “things people ignore” topics

---

## Blueprint / Wiring Diagram

Must include:

* grid or technical paper background
* measurement lines
* connector paths
* labeled components
* small technical notes
* schematic-style icons
* stamp or version label

Avoid:

* generic blue cards
* random circuit lines that do not explain content
* decorative grids with no structure

Best for:

* workflows
* systems
* automation
* process breakdowns
* AI agent architecture
* business operations

---

## Receipt / Audit Slip

Must include:

* narrow paper or receipt-like structure
* itemized rows
* totals or verdict section
* stamp, barcode, or transaction detail
* clear “cost / mistake / fix” framing

Avoid:

* hero poster layout
* unrelated big illustrations
* too many decorative panels

Best for:

* mistake audits
* cost breakdowns
* habit reviews
* business efficiency checks
* “what this really costs you” content

---

## RPG Inventory / Toolbox

Must include:

* item slots
* tool labels
* rarity, priority, or category markers
* selected item detail panel
* stat-like descriptions
* inventory or equipment logic

Avoid:

* corporate card layout
* generic checklist style
* icons without system meaning

Best for:

* tools
* AI apps
* creator stack
* business resources
* skill breakdowns

---

## Operating Manual

Must include:

* manual title block
* numbered procedures
* caution/warning notes
* diagrams or part labels
* step-by-step structure
* utilitarian typography

Avoid:

* playful decoration
* random cards
* vague “premium” styling

Best for:

* tutorials
* workflows
* SOPs
* automation guides
* repeatable frameworks

---

## Detective Case Board / Dossier

Must include:

* evidence labels
* document fragments
* string/connector logic or grouped clues
* suspect/problem framing
* stamps, folders, notes, or clipped images
* conclusion/verdict box

Avoid:

* plain sticky-note grid with no investigation logic
* decorative strings that do not connect ideas

Best for:

* analysis posts
* hidden problem explanations
* decision-making
* “why this happens” content
* myth vs fact

---

## Comic Strip

Must include:

* panels
* scene progression
* speech/thought bubbles or caption boxes
* character/object continuity
* visual punchline or final insight

Avoid:

* using comic borders around normal text cards
* too much text per panel
* unclear reading order

Best for:

* simple education
* relatable business situations
* before-after behavior
* myth-busting
* light but useful content

---

## Dashboard / Control Panel

Must include:

* gauges, meters, toggles, alerts, logs, or status modules
* clear system state
* priority indicators
* control-room hierarchy
* data-like visual logic

Avoid:

* random widgets without meaning
* too many equal boxes
* tiny unreadable labels

Best for:

* monitoring systems
* automation
* productivity
* business metrics
* AI workflow control

---

## Warning Label / Safety Poster

Must include:

* bold warning hierarchy
* hazard symbol or alert marker
* concise danger explanation
* action instruction
* high-contrast structure
* official-label feeling

Avoid:

* soft decorative style
* too many paragraphs
* weak title

Best for:

* common mistakes
* scams
* bad habits
* risky tools
* urgent reminders

---

# Infographic Content Rules

For infographic requests, define:

* one clear title promise
* one thesis/context line
* 3–5 useful points, checks, steps, or rules
* one takeaway/rule box
* visual elements that explain the information

Make sure numbers in the title match the content.

Examples:

* “4 cek sebelum pakai tools AI” must show exactly four checks.
* “3 kesalahan konten UMKM” must show exactly three mistakes.
* “5 langkah bikin workflow AI” must show exactly five steps.

Avoid vague points.

Weak:

```text
Gunakan AI dengan bijak.
```

Better:

```text
Cek apakah output AI bisa diverifikasi sebelum dipakai untuk keputusan bisnis.
```

The visual should make the information easier to understand, not just decorate it.

---

# Design Memory Rule

Before choosing a new concept, consider the last accepted or recently used design direction if available.

Avoid repeating the same visual family within three consecutive designs unless Ravi explicitly asks for it.

Track design history internally when possible:

```text
Previous topic:
Previous metaphor:
Previous structure:
Previous surface style:
Previous dominant layout:
Avoid repeating:
New concept direction:
```

Example:

```text
Previous topic: AI tool checklist
Previous metaphor: newspaper clipping
Previous structure: editorial columns
Previous surface style: cream paper, serif, ink lines
Avoid repeating: paper texture, masthead, columns
New concept direction: blueprint workflow map with technical labels
```

When there is no history available, still avoid defaulting to generic card grids.

---

# Draft Self-Contained HTML/CSS

Create a static HTML file, usually under `/tmp/`.

Example:

```text
/tmp/<slug>-social-post.html
```

Default canvas:

```text
1080×1080 square
```

Technical rules:

* Use embedded CSS.
* Avoid remote dependencies unless there is a strong reason.
* Use CSS/SVG illustrations/icons/diagrams when helpful.
* Keep illustrations tied to the content.
* Keep all important text inside safe margins.
* Prefer fixed canvas layout for predictable rendering.
* Use semantic visual hierarchy.
* Use real layout structure, not decoration pretending to be structure.
* Do not rely on external fonts unless already available or safely embedded.
* Do not use tiny text merely to fit too much copy.
* Avoid overly complex CSS that may render unpredictably in Chromium screenshot.

Typography rules:

* Title must be readable at mobile preview size.
* Body text must not be too small.
* Important labels must have enough contrast.
* Use line-height generously enough to avoid cramped text.
* Avoid long all-caps paragraphs.
* Use text density only when the chosen metaphor supports it.

Safe margin rules:

* Keep key text away from canvas edges.
* Avoid putting footer too close to border.
* Avoid decorative elements crossing readable text.
* Do not allow labels to collide with diagram lines.
* Do not let shadows or overlays reduce text clarity.

---

# Self-QA Before Showing Ravi

Do not use Ravi as the first QA pass for obvious defects.

Before sending a preview link:

1. Copy the HTML to the preview directory as `index.html`.
2. Render a local screenshot at the target viewport.
3. Inspect the screenshot, preferably with `vision_analyze`.
4. Revise and repeat if issues are found.

Check strictly for:

* text clipping
* text overlap
* content outside canvas
* text crossing borders/rules/cards
* footer/header collisions
* tiny unreadable text on mobile
* low contrast
* stale/repetitive visual approach
* mismatch with requested theme
* title/content mismatch
* numbers in title matching number of points
* visual elements that distract rather than explain
* decorative metaphor that does not affect structure
* too many same-sized elements
* weak reading path
* crowded lower section
* unreadable footer
* accidental empty space imbalance
* important text too close to edge

If anything obvious is wrong, revise the HTML first, render another screenshot, and QA again.

---

# Novelty QA Before Preview

Before showing Ravi the preview, answer these checks internally:

1. Can the visual concept be recognized without reading the small text?
2. Is the main structure different from a normal poster/card layout?
3. Did the metaphor affect placement, hierarchy, and visual elements, or only decoration?
4. Would this design still look different if all colors were removed?
5. Are at least two of these changed from the previous design: structure, metaphor, reading path, illustration system, typography system, texture/material?
6. If Ravi asked for a different theme, did the design system change rather than only the palette and font?
7. Is the design still clear on mobile?
8. Does the visual system help explain the idea?
9. Is there a clear reason this design could not be replaced by generic cards?
10. Does the first 3 seconds communicate the theme?

If the answer is weak, revise the concept before sending the preview.

A design fails Novelty QA if:

* it is basically the same layout with different colors
* it uses the same card rhythm as previous designs
* the metaphor is only background decoration
* the design would still work the same if all visual elements were removed
* the style label sounds different, but the structure is unchanged

---

# Serve Mobile-Friendly LAN Preview

Ravi is on Telegram mobile, so do not rely on local file attachments. Serve the design over HTTP.

Ravi's server LAN IP:

```text
192.168.1.230
```

Preferred preview URL:

```text
http://192.168.1.230:8765/index.html
```

Use a dedicated preview directory and always serve with `--directory` so the wrong `/tmp` directory listing is not exposed.

Example:

```bash
mkdir -p /tmp/ravi-social-preview
cp /tmp/<slug>.html /tmp/ravi-social-preview/index.html
python3 -m http.server 8765 --bind 0.0.0.0 --directory /tmp/ravi-social-preview
```

Start the server with `terminal(background=true)` for a long-lived preview process.

Verify the exact page before sending Ravi the link:

```bash
curl -sS -I http://127.0.0.1:8765/index.html | head -5
curl -sS http://127.0.0.1:8765/index.html | head -3
```

If port `8765` is busy, choose another simple port such as:

```text
8766
8780
8899
```

Then verify it.

If a stale preview server serves the wrong directory, kill it and restart with:

```bash
python3 -m http.server <port> --bind 0.0.0.0 --directory /tmp/ravi-social-preview
```

Never send a preview link before verifying that the served page is the correct `index.html`.

---

# Approval Gate

After sending the preview link:

* stop
* ask Ravi to review on phone
* wait for approval or revision notes

Do not render final JPG/PNG until Ravi approves.

Example message:

```text
Ravi, ini preview-nya:
http://192.168.1.230:8765/index.html

Coba cek dari HP dulu. Kalau sudah cocok, bilang approve, nanti aku render final JPG/PNG-nya.
```

Do not send too many technical details to Ravi unless he asks.

---

# Handle Revisions as QA

Treat Ravi's screenshot/feedback as design QA, not mere taste notes.

If Ravi reports:

* clipping
* overlap
* crowding
* text outside lines
* unreadable text
* visual repetition
* theme not strong enough
* “masih mirip”
* “cuma beda warna”
* “layoutnya sama aja”

Then fix the layout/concept first, not only the styling.

For readability problems:

* shorten copy if needed
* adjust type scale
* adjust line-height
* add safe margins
* reduce decorative elements
* split dense sections
* increase contrast
* simplify illustration

For repetition problems:

* change visual metaphor
* change structural layout
* change reading path
* change illustration system
* change typography system
* avoid the previous visual family

If Ravi asks for a different theme, change the visual system, not just colors or layout.

Examples:

* editorial paper → glassmorphism dashboard
* glassmorphism → newspaper clipping
* card grid → diagram/map/manual
* poster → comic/receipt/toolbox
* blueprint → audit receipt
* dashboard → detective dossier
* checklist → operating manual
* modern infographic → warning label

For glassmorphism specifically:

* avoid overlapping readable panels unless explicitly requested
* frosted glass can create depth without blocking text
* keep text panels clear
* do not put important copy over busy background
* avoid repeating the same floating-card layout

After revisions:

1. update HTML/CSS
2. rerender screenshot
3. run self-QA
4. run novelty QA if the feedback was about repetition/style
5. send updated preview link

---

# Render Final After Approval

Preferred renderer: Playwright/Chromium, because it accurately renders modern HTML/CSS.

Default final image:

* JPG `1080×1080`, quality around 94 for Telegram/social preview
* PNG `1080×1080` or `2160×2160` for typography-heavy final when sharpness matters

CLI fallback:

```bash
playwright screenshot --viewport-size=1080,1080 file:///tmp/ravi-social-preview/index.html /tmp/social-post.png
ffmpeg -y -i /tmp/social-post.png -q:v 2 /tmp/social-post.jpg
```

Prefer direct JPEG export with Playwright when available:

```js
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1080, height: 1080 },
    deviceScaleFactor: 1
  });

  await page.goto('file:///tmp/ravi-social-preview/index.html', {
    waitUntil: 'networkidle'
  });

  await page.screenshot({
    path: '/tmp/social-post.jpg',
    type: 'jpeg',
    quality: 94,
    fullPage: false
  });

  await browser.close();
})();
```

For sharper PNG:

```bash
playwright screenshot --viewport-size=1080,1080 file:///tmp/ravi-social-preview/index.html /tmp/social-post.png
```

For 2x export, use a larger viewport or device scale factor if the layout supports it.

---

# Verify and Send Final

Before sending final media:

* confirm file exists
* confirm dimensions
* confirm file size is reasonable
* confirm no clipping occurred in final render
* confirm final image matches approved preview

Use:

```bash
file /tmp/social-post.jpg
identify /tmp/social-post.jpg
```

Or a small script if needed.

Send through Telegram with:

```text
MEDIA:/absolute/path
```

Do not send the final image before approval unless Ravi explicitly asked to render immediately.

---

# Proven Pattern: Information-First Infographic

When Ravi gives freedom on topic/style and asks for an infographic:

1. Pick a practical topic relevant to Ravi, such as AI workflow, tool filtering, UMKM content, local-first AI, automation habits, decision frameworks, or visual production.
2. Define one clear promise in the title.
3. Use a visual metaphor that explains the idea, not just decoration.
4. Structure the design around:

   * strong title
   * short context/warning callout
   * main explanatory visual or diagram
   * 3–5 numbered checks/steps/rules
   * one rule/takeaway box
   * short footer summary
5. Shorten copy aggressively until it fits comfortably.
6. Run strict screenshot QA before giving the preview link.
7. Run Novelty QA before giving the preview link.
8. Only render final after Ravi approves.

Successful example direction:

```text
Title: 4 cek sebelum pakai tools AI
Visual metaphor: AI tool filter machine
Structure: tool input → filter chambers → approved/rejected output
Content: practical checks
Composition: information-first, machine-like, readable on mobile
```

Avoid making every information-first infographic into a card grid.

---

# Proven Pattern: Newspaper Clipping

When Ravi asks for newspaper / potongan koran style:

* Use serif headline/masthead typography.
* Use cream/aged paper background.
* Use ink-like borders.
* Use column text.
* Use rule lines.
* Use drop caps if useful.
* Use printed-style illustrations.
* Avoid modern card UI elements.
* Keep newspaper density, but protect safe margins.
* Body text in columns can be dense, but must not collide with footer, borders, or pull quotes.
* Run especially strict QA for lower-page clipping because newspaper layouts easily overflow.

Newspaper design fails if:

* it looks like a modern poster with serif font
* it uses glass cards
* it has no column logic
* it has no editorial hierarchy
* it uses modern gradient SaaS style

---

# Proven Pattern: Blueprint / System Map

When Ravi asks for technical, AI, automation, workflow, or system explanation:

* Use blueprint or schematic visual language when appropriate.
* Show how parts connect.
* Use labels, connector lines, small notes, and technical stamps.
* Make the diagram explain the workflow.
* Avoid turning every step into a separate card.

Good structures:

* input → process → output
* hub-and-spoke system
* layered architecture
* exploded diagram
* wiring diagram
* pipeline with checkpoints

Bad structures:

* four rounded cards on a blue grid
* random circuit background behind text
* icons that do not connect to each other

---

# Proven Pattern: Receipt / Audit Slip

When the topic is mistakes, costs, inefficiency, bad habits, or business leakage:

* Use receipt-like itemization.
* Show each mistake as an item.
* Include cost, risk, or consequence.
* Add a final total/verdict.
* Use stamps, barcode, date, reference number, or cashier/audit details.
* Keep the layout narrow and paper-like if possible.

Example:

```text
Title: Struk Kerugian Konten UMKM
Rows: posting asal, caption lemah, visual tidak konsisten, tidak ada CTA
Total: audience bingung + trust turun
Verdict: rapikan sistem sebelum tambah tools
```

---

# Proven Pattern: RPG Inventory / Toolbox

When the topic is tools, apps, AI stack, creator setup, or skill set:

* Use inventory slots.
* Treat each tool as an item.
* Add category/rarity/priority markers.
* Use one selected item detail panel.
* Use stat-style copy when useful.

Example:

```text
Title: AI Stack untuk UMKM
Slots: riset, copywriting, desain, automation, analytics
Selected item: automation
Stats: speed +3, consistency +2, risk -1 if unchecked
```

Avoid generic corporate cards.

---

# Proven Pattern: Operating Manual

When the topic is a guide, tutorial, SOP, or repeatable workflow:

* Use a manual-like page.
* Include sections such as:

  * purpose
  * tools needed
  * steps
  * warnings
  * expected output
* Add small diagrams or labels.
* Use functional typography.
* Keep instructions concise.

Example:

```text
Title: Manual Singkat Bikin Konten AI
Section 1: input
Section 2: generate
Section 3: verify
Section 4: edit
Warning: jangan publish output mentah
```

---

# Known Environment

* Preview IP: `192.168.1.230`
* Preferred port: `8765`
* Preferred preview path: `/tmp/ravi-social-preview/index.html`
* Playwright CLI exists at `/usr/local/bin/playwright`
* Chromium may already be installed, but if missing run:

```bash
playwright install chromium
```

* Python Playwright module may be missing; use CLI or Node Playwright when needed.
* `ffmpeg` is available and can convert PNG to JPG.
* Telegram may not deliver `.html` attachments reliably; prefer LAN preview links.
* Some upload hosts reject raw `.html`; paste/upload fallback is secondary, not primary.

---

# Linked Session Notes

* `references/session-2026-05-27-glass-social-post.md` captures Ravi's corrections on LAN preview links, text overflow, theme variation, and glassmorphism card overlap.
* `references/session-2026-05-27-infographic-newspaper-self-qa.md` captures the information-first infographic pattern, newspaper clipping theme requirements, and strict pre-preview QA checklist.

---

# Final Rule

A design is successful only if it passes three checks:

1. **Readable:** no clipping, overlap, unreadable text, or weak contrast.
2. **Useful:** the visual structure helps explain the information.
3. **Distinct:** the design is meaningfully different in metaphor, structure, or reading path, not merely different in color, font, or card arrangement.

If any of these fail, revise before showing Ravi.
