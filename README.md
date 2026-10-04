# Avin Jayasuriya — Interactive Web Portfolio

A fictional client portfolio built for the university Interactive Web Portfolio assignment.

## Pages
- `index.html` — Home, biography, selected work and shared project modal
- `portfolio.html` — Work gallery, filters and the same project modal
- `contact.html` — Contact details and validated enquiry form

## JavaScript features
- Hamburger navigation on desktop and mobile
- Light/dark mode with localStorage
- Projects loaded from `data/projects.json`
- Home and Work project cards open the same modal component
- Work category filtering
- Cursor-follow glow/ring on desktop
- Scroll reveal animation
- Client-side contact form validation

## Visual direction
Palette:
- `#5980E9` Blueberry
- `#84CEEB` Sky Blue
- `#5AB9EA` Light Blue
- `#C1C8E4` Periwinkle
- `#8860D0` Amethyst

The background decorations are intentionally subtle and use pointer-events:none so they never interfere with the content or controls.

## Run
Use VS Code Live Server or:

```bash
python -m http.server 5500
```

Then open `http://localhost:5500`.
