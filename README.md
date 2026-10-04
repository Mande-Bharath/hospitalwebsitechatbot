# Hospital Management System

A full-stack hospital management web application built with React, Vite, Express, and MongoDB. It allows patients to browse doctors, book appointments, register/login, and interact with an AI-powered healthcare chatbot.

## Features

- Patient registration and login
- JWT-based authentication
- Doctor listing and profile browsing
- Appointment booking system
- MongoDB database integration
- AI chatbot support using Gemini API
- Responsive modern UI
- Separate frontend and backend architecture

## Tech Stack

- Frontend: React, Vite, React Router, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB with Mongoose
- Authentication: JWT + bcryptjs
- AI Integration: Google Gemini API

## Project Structure

```text
hospital-management/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── package.json
│   ├── seed.js
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── render.yaml
└── README.md
