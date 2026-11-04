# Happen

**Find your next thing to do.**

Happen is an event discovery and registration platform built to make finding and keeping track of events easier. Whether you're interested in music festivals, cultural gatherings, tech meetups or literature festivals, Happen brings different kinds of events together in one place.

Explore upcoming events, find the details that matter, register for the ones you're interested in and manage all your registrations from a single place.

**[Live Demo](https://tryhappen.netlify.app/)**

---

## Tech Stack

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![Lucide](https://img.shields.io/badge/Lucide_React-F56565?style=for-the-badge&logo=lucide&logoColor=white)

## Features

### Event Discovery
- Browse upcoming events across different categories.
- Search events by name.
- Filter events by category and sort listings.
- Explore events through a dedicated discovery page.

### Event Details
- View event descriptions, dates, timings, venues, locations and ticket prices.
- Check the time remaining until an event.
- View organiser and other event-related information.

### Registration Management
- Register for events through an interactive form.
- Form validation for user details and required fields.
- Prevent duplicate registrations for the same event using the same email address.
- View all registered events in the **My Registrations** section.
- Keep track of upcoming and completed events.
- Cancel upcoming registrations.

### User Experience
- Light and dark theme support.
- Responsive layouts for desktop, tablet and mobile.
- Smooth transitions and animations.
- Consistent styling and navigation across pages.

## Tech Stack & Tools

| Technology | Purpose |
|---|---|
| React | Component-based UI development |
| React Router | Client-side navigation |
| Tailwind CSS | Styling and responsive layouts |
| JavaScript | Application logic |
| Lucide React | Icons |
| Vite | Development and build tooling |
| localStorage | Storing registrations and theme preferences |

## Getting Started

Follow these steps to run Happen locally.

**1. Clone the repository**

```bash
git clone https://github.com/SanchitaGupta7/Happen.git
```

**2. Navigate to the project directory**

```bash
cd Happen
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the development server**

```bash
npm run dev
```

Open the local URL displayed in your terminal to access the application.

## Project Structure

```text
Happen/
├── public/
│   └── heroVideo.mp4
├── src/
│   ├── components/
│   ├── data/
│   │   └── events.js
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Events.jsx
│   │   ├── EventDetails.jsx
│   │   └── MyRegistrations.jsx
│   ├── App.jsx
│   └── index.css
├── index.html
└── package.json
```

## Current Implementation

Happen is currently a frontend-focused project.

- Event information is maintained using static data.
- Registrations are stored in the browser using `localStorage`.
- Theme preferences are saved locally.
- Registration data is specific to the browser and device being used.

There is currently no backend, database or user authentication system.

## Future Scope

Some features I'd like to explore and add in future iterations:

- **Backend Integration:** Connect a backend and database to manage events and registration records.
- **User Authentication:** Allow users to create accounts and access their registrations across devices.
- **Event Creation:** Enable organisers to create, edit and manage event listings.
- **Digital Tickets:** Generate tickets with unique booking IDs or QR codes.
- **Payment Integration:** Support online payments for paid events.
- **Email Notifications:** Send registration confirmations, reminders and event updates.
- **Advanced Discovery:** Add location-based search, date filters and personalised recommendations.
- **Admin Dashboard:** Provide a central place to manage events, users and registrations.

## Contributing

Suggestions and improvements are welcome. Feel free to fork the repository, make changes and submit a pull request.

---
