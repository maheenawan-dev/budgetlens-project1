# BudgetLens — Expense Tracker Dashboard

A responsive, mobile-first expense tracking dashboard built with vanilla HTML, CSS, and JavaScript — no frameworks.

Built as **Project 1** for the Full Stack Development track at Decode Labs.

## 🔗 Live Demo
*https://maheenawan-dev.github.io/budgetlens-project1/*

## 📋 Overview

BudgetLens lets users log daily expenses, set a monthly budget, and track spending across categories — all through a clean, dashboard-style interface. Data is stored locally in the browser, so no backend or sign-up is required.

## ✨ Features

- Log expenses with date, category, amount, and optional notes
- Real-time dashboard stats: total spent this month, transaction count, top spending category, remaining budget
- Custom monthly budget with a visual progress bar
- Category-wise spending breakdown with percentage bars
- Delete individual transactions
- Empty state handling for a clean first-use experience
- Fully responsive layout — mobile, tablet, and desktop
- Data persistence via `localStorage`

## 🛠️ Built With

- **HTML5** — semantic markup (`header`, `nav`, `main`, `aside`, `footer`)
- **CSS3** — Grid for page layout, Flexbox for components, mobile-first media queries, fluid typography with `clamp()`
- **Vanilla JavaScript** — DOM manipulation, form handling, dynamic rendering, `localStorage` for persistence

## 📱 Responsive Breakpoints

| Breakpoint | Width | Layout |
|---|---|---|
| Mobile | < 768px | Single column, hamburger nav |
| Tablet | ≥ 768px | Two-column layout, horizontal nav |
| Desktop | ≥ 1024px | Refined spacing and sizing |

## 🚀 Getting Started

1. Clone the repository
```bash
   git clone https://github.com/maheenawan-dev/budgetlens-project1
```
2. Open `index.html` in your browser — no build steps or dependencies required

## 📂 Project Structure

```text
budgetlens-project1/
├── index.html
├── style.css
├── script.js
└── README.md
```

## 📖 What I Learned

This project strengthened my understanding of:
- Structuring layouts with CSS Grid vs. Flexbox
- Writing mobile-first responsive CSS
- Managing application state and data persistence without a backend
- Building accessible, semantic HTML structures

## 👤 Author

**Maheen Irfan**
BS Information Technology, University of Management and Technology (UMT)

---
*Part of the Decode Labs Full Stack Development Internship — Project 1*
