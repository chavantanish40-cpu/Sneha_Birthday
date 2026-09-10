# Sneha Birthday Gift Website ❤️

A romantic, multi-page birthday website — plain HTML, CSS and JavaScript,
no build step, no server. It works like a little slideshow: one full
page at a time, moved between using the Next / Back buttons on each page.

## Files

- `index.html` — all 7 pages and their content
- `style.css` — design, page transitions and animations
- `script.js` — page navigation, reveal/typewriter/heart animations, letter interaction

## The 9 pages

1. **Welcome** — her name glows, the subtitle types itself out, "Begin" starts the journey.
2. **For You** — a short, honest note.
3. **Reasons** — six cards, each a small reason you love her.
4. **I Love You** — a list of "I love you because..." points.
5. **Our Story** — a timeline with the real dates: met 29 Sept 2024, the talks that followed, friend → best friend → boyfriend, and official on 29 Oct 2024.
6. **Long Distance** — a page just for the long-distance side of the relationship (patience, talking, trust, missing each other).
7. **Wishes** — a handful of birthday wishes.
8. **Letter** — a wax-sealed envelope she taps to open (bursts into little hearts).
9. **Forever** — the closing line, with a "Read it again" button back to page 1.

You move forward with each page's "Next" / "Back" button, or the ← / →
arrow keys on a keyboard. A small counter in the top-right corner shows
where you are (e.g. "3 / 7").

## Personalize it

- **Reasons** — rewrite the six cards inside `#page-reasons` in `index.html`.
- **I Love You** — edit the `<li>` lines inside `#page-loveyou`.
- **Our Story** — edit the five `.timeline-item` blocks inside `#page-timeline`.
  Add or remove entries freely; the layout adjusts automatically.
- **Long Distance** — edit the intro paragraphs and the four cards inside `#page-distance`.
- **Wishes** — edit the `<li>` lines inside `#page-wishes`.
- **The letter** — edit the text inside `#page-letter` → `.letter-content`.
- **Colors** — CSS variables at the top of `style.css` (`--wine`, `--rose`, `--gold`, etc.)
- **Page order / count** — the order lives in the `pageOrder` array at the
  top of `script.js`. If you add or remove a page, update that array, the
  `data-next` targets in `index.html`, and (if you added a page) add it
  to `pageOrder` in the right spot.

## Run

Open `index.html` in VS Code and use Live Server, or simply double-click
`index.html` to open it in a browser.
