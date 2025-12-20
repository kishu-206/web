# IEEE VIT Vellore – Web Project

A modern, responsive static website built using **HTML, CSS, and Vanilla JavaScript**.  
This project demonstrates clean UI design, modular JavaScript, and beginner-friendly but production-style architecture.

---

## 🚀 Live Hosting
This project is hosted on https://ieee-demo-10kh.onrender.com and can be hosted easily using **Render** or **GitHub Pages**.

---

## 📁 Project Structure
```text
web/
├── index.html
├── about.html
├── activities.html
├── events.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── README.md
```
---

## 🎨 Design Philosophy

- Dark-theme UI with glassmorphism effects
- CSS Variables for a scalable design system
- Fully responsive layout using **Flexbox & CSS Grid**
- Accessibility-aware (ARIA attributes, keyboard handling)

---

## 🧠 Features Overview

### 🌐 Navigation
- Active page highlighting
- Mobile-friendly hamburger menu
- Sticky header with blur effect

### 🏠 Homepage Interactions
- Auto-updating footer year
- Interactive buttons (Hello message, Random facts)
- Learning focus tips based on selected domain

### 📅 Events Page
- Event cards with dynamic filtering
- Modal popup with event details
- Graceful empty-state handling

### 📩 Contact Form
- Client-side validation
- Error and success feedback
- LocalStorage demo persistence
- Reload last saved message

---

## ⚙️ JavaScript Architecture

The JavaScript is written in a **modular and defensive style**:

- Each feature has its own setup function
- DOM queries are guarded to avoid runtime errors
- Event delegation is used where appropriate
- No external libraries or frameworks

Main setup functions:
- `setYear()`
- `setActiveNavLink()`
- `setupMobileNav()`
- `setupHelloButton()`
- `setupFactButton()`
- `setupFocusTip()`
- `setupEventsFilter()`
- `setupEventModal()`
- `setupContactForm()`

---

## 🛠️ Technologies Used

- **HTML5** – Semantic structure
- **CSS3** – Grid, Flexbox, Variables, Media Queries
- **JavaScript (ES5)** – DOM manipulation & events
- **LocalStorage API** – Demo persistence
- **Render / GitHub Pages** – Deployment

---

## 📦 How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/kishu-206/web.git

