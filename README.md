# Avin Jayasuriya - Interactive Web Portfolio

This is our group project for the Interactive Web Portfolio assignment. We made a portfolio website for a fictional client called Avin Jayasuriya, a creative director from Colombo, Sri Lanka. We used only HTML, CSS and JavaScript.

Group number: [add here]
Website link (GitHub Pages): [add here]

## Pages

- `index.html` - Home page with an intro, about section, selected work and capabilities
- `portfolio.html` - Work page with all projects and filter buttons
- `contact.html` - Contact page with a form

## Project Structure

```
index.html
portfolio.html
contact.html
style.css
app.js
README.md
data/
   projects.json
   avinJ.jpg
```

- `style.css` is the one CSS file used by all pages.
- `app.js` is the one JavaScript file used by all pages.
- `data/projects.json` stores the project details (title, category, year, description, tags).
- `data/avinJ.jpg` is the photo on the home page.

## Features

**HTML**
- Semantic tags like header, nav, main, section, article and footer
- 3 pages: Home, Portfolio and Contact
- A contact form with labels and required fields

**CSS**
- Responsive design for mobile, tablet and desktop
- Flexbox and Grid for the layout
- Same colours and fonts on every page
- Animations and transitions (scroll reveal and hover effects)

**JavaScript**
- Hamburger menu that opens and closes
- Dark mode and light mode button (the choice is saved with localStorage)
- Project cards are loaded from `projects.json` using fetch
- Popup (modal) that shows the project details when a card is clicked
- Filter buttons on the Work page (All, Branding, Digital, Campaign)
- Form validation for name, email, message and the checkbox
- Cursor glow effect and scroll reveal effect

## Colours and Fonts

- Blueberry `#5980E9`
- Sky Blue `#84CEEB`
- Light Blue `#5AB9EA`
- Periwinkle `#C1C8E4`
- Amethyst `#8860D0`

Fonts: DM Sans and Space Grotesk (from Google Fonts)

## Roles and Contributions

We have 7 members, so we joined the two CSS roles into one.

| Project Manager | K.G.W.H.P.N. Navanjana | Made the plan, kept deadlines, managed GitHub |

| HTML Lead | K.D.S.A. Kalhari | Made the 3 HTML pages |

| CSS Layout and Styling Designer | M.K.R.S. Sarathchandra | Made style.css (layout, colours, fonts, responsive design) |

| JavaScript Functionality Developer | M.A.N. Vithanage | Menu, dark mode, modal, filters in app.js |

| JavaScript Validation Developer | W.G.H.M. Bandara | Contact form validation |

| Content Manager | M.V.R.K. Lakshan | Text, images and projects.json |

| Testing and Documentation Lead | S.W.N. Kaveesha | Testing on browsers and screen sizes, README |

## How to Run the Project

The website uses `fetch` to read `projects.json`, so it needs a local server. If you open the HTML file by double clicking it, the projects will not show.

**Option 1: VS Code Live Server**
1. Open the project folder in VS Code.
2. Install the Live Server extension.
3. Right click `index.html` and choose "Open with Live Server".

**Option 2: Python**
1. Open a terminal in the project folder.
2. Run this command:
   ```
   python -m http.server 5500
   ```
3. Open `http://localhost:5500` in your browser.
