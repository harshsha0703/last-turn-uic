# Last Turn — UIC campus building finder

A React/Vite functional prototype expanding the original Student Center East pilot to a searchable catalog of **28 UIC campus buildings** across East, West and South Campus.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually http://localhost:5173).

## Build and deploy

```bash
npm run build
npm run preview
```

Deploy the generated `dist/` folder to a static host such as Netlify, Vercel or GitHub Pages. Confirm the public link works on a different device before submitting the slides.

## User experience

- Search campus buildings by name and filter East/West Campus.
- Choose a building, starting point and destination.
- In Student Center East, choose from five second-floor landmarks and a third-floor planning preview.
- For other buildings, choose a building entrance, directory, or an optional classroom/office number.
- Follow one instruction at a time, use the recovery button, enlarge text, and confirm arrival.
- Remembers selected building and route in browser localStorage.

## Important scope limitation

**This is a building directory plus an SCE indoor-wayfinding pilot, not a campus-wide indoor map.** Other building routes are deliberately labeled unmapped. Do not present the generic prompts as verified indoor directions. Even SCE landmark instructions require on-site validation. Building names are starter directory entries and should be checked against official UIC listings before deployment for public navigation. No indoor GPS, accessible routing, live occupancy, server, or room-location database is implemented.

## Presentation alignment

Update the slides to say **109 UIC building entries / East, West and South Campus**, with detailed landmark guidance only for Student Center East. In the live demo, search for a building, switch between campus areas, show the SCE landmark route, then demonstrate the unmapped-building disclosure and recovery option. Use a real deployed URL in the demo slide.


## Full UIC building directory
This version contains the 109 building names supplied by the user from the UIC Buildings A–Z directory: 55 East, 44 West, and 10 South. Search and campus filters include all three areas. Building selection is a directory feature; it does **not** imply verified indoor floor plans. Only the Student Center East pilot has landmark-based example guidance, and those directions still require on-site validation.

The dropdowns use light native option colors to avoid unreadable dark gray menus on some operating systems.
