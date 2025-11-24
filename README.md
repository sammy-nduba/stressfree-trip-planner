# Stress-Free Trip Planner

A modern travel planning platform built with Astro, React, and Supabase. This application allows users to browse destinations, explore travel packages, and submit trip requests. Administrators can manage content and handle customer inquiries through a dedicated admin panel.

## Features

### Public Features (No Authentication Required)
- 🌍 Browse destinations across Kenya, Uganda, Tanzania, and more
- 📦 Explore curated travel packages
- 📝 Interactive trip planner with checklist
- 💬 Request quotes for custom trips
- 📱 Fully responsive design

### Admin Features (Authentication Required)
- ✏️ Manage destinations and packages (CRUD operations)
- 📊 View and manage trip requests
- 📝 Add admin notes to inquiries
- 🔐 Secure admin-only access

## Tech Stack

- **Framework**: Astro 5.x with SSR
- **UI**: React 19 + Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Node.js adapter for standalone mode

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account

### Installation

1. Clone the repository:
```sh
git clone <repository-url>
cd stressfree-trip-planner-master
```

2. Install dependencies:
```sh
npm install
```

3. Configure environment variables:
```sh
cp .env.example .env
```

Edit `.env` and add your credentials:
```env
PUBLIC_SUPABASE_URL=your-supabase-url
PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
ADMIN_EMAIL=your-admin-email@example.com
```

4. Run database migrations:
```sh
# Connect
