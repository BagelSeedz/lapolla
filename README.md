# FIFA World Cup Prediction Platform
A full‑stack web application for creating, submitting, and ranking World Cup score predictions. Built with Django, React, and PostgreSQL, featuring secure authentication, dynamic score‑sheet workflows, animated UI components, and Excel export functionality.

## Features
- Score Sheet Creation & Submission
- Interactive React UI for entering match scores across all 72 World Cup fixtures.
- Sheets can be submitted, locked, unsubmitted, and viewed at any time.

### Authentication & Security
- Django session‑based authentication with CSRF protection.
- Staff‑only endpoints for updating official match results.

### Ranking
- Admin-locked announcement textbox to display ranking based on official match outcomes.
- Real‑time prize pool calculation based on number of submissions.

### Excel & PDF Export
- Custom Excel template populatation.
- Match‑to‑cell mapping via JSON for precise score placement.
- Downloadable user sheets directly from the frontend.

## Tech Stack
- React
- Python
- CSS
- Django
- PostgreSQL
- Heroku
- Vercel

## Reflection
This project was made just for fun over the summer leading up to the 2026 FIFA World Cup. The point of this platform was to give each and every group stage match the same excitement as a knockout stage match. During every match, my family and I were glued to the TV in hopes that the score outcome matched our predictions. It created a feeling of anticipation that arbitrary matches lacked, which was the original intention. Due to the completion of this goal, this project turned out to be a major success.

No profit was collected by the organizer. The prize pool was given to the first-place winner in full.
