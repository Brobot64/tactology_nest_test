# University Learning Management System - Backend

## Overview

This backend service, built with **NestJS**, powers a University Learning Management System providing a comprehensive API for managing:

* Courses
* Enrollments
* Assignments
* Submissions
* AI-powered course recommendations and syllabus generation

## Features

✅ **Authentication & Authorization** – JWT-based authentication with role-based access control

✅ **User Management** – Student, lecturer, and admin roles

✅ **Course Management** – Create, update, and manage courses

✅ **Enrollment System** – Students enroll in courses with lecturer approval

✅ **Assignment Management** – Lecturers create and manage assignments 

✅ **Submission Handling** – Students submit assignments and receive grades

✅ **AI Assistant** – Course recommendations and syllabus generation

---

## Prerequisites

* Node.js (v16+)
* npm or yarn
* SQLite (included for development)

---

## Installation

1️⃣ **Clone the repository**:

```bash
git clone <repository-url>
cd excelCRMTest/backend
```

2️⃣ **Install dependencies**:

```bash
npm install
```

> **Tip:**
> If you encounter NestJS dependency conflicts:
>
> * Use `npm install --legacy-peer-deps`
> * Ensure NestJS packages use compatible versions (v10 recommended)

3️⃣ **Set up environment variables**:

Create a `.env` file:

```
JWT_SECRET=your_jwt_secret_key
PORT=3001
```

---

## Database Configuration

Uses **SQLite** by default, configured in `src/app.module.ts`:

```ts
TypeOrmModule.forRoot({
  type: 'sqlite',
  database: 'university.sqlite',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true, // Development only
}),
```

> ⚠️ Use `synchronize: true` **only during development**.

---

## Running the Application

### Development

```bash
npm run start:dev
```

### Production

```bash
npm run build
npm run start:prod
```

---

## API Documentation

Base URL: `http://localhost:3001`

### Authentication

* `POST /auth/register` – Register a user
* `POST /auth/login` – Obtain JWT token

### Courses

* `GET /courses` – List all courses
* `GET /courses/available` – Available for enrollment
* `GET /courses/teaching` – Courses taught by lecturer
* `GET /courses/enrolled` – Courses student enrolled in
* `POST /courses` – Create course (lecturer only)
* `PUT /courses/:id` – Update course (lecturer only)
* `DELETE /courses/:id` – Delete course (lecturer only)

### Enrollments

* `GET /enrollments` – List all (admin)
* `GET /enrollments/pending` – Pending approvals (lecturer)
* `POST /enrollments` – Enroll in course
* `PATCH /enrollments/:id/status` – Approve/reject (lecturer)

### Assignments

* `GET /assignments` – List all (admin)
* `GET /assignments/course/:courseId` – For a course
* `GET /assignments/my` – Student assignments
* `GET /assignments/teaching` – Lecturer assignments
* `POST /assignments` – Create (lecturer)
* `PUT /assignments/:id` – Update (lecturer)
* `DELETE /assignments/:id` – Delete (lecturer)

### Submissions

* `GET /submissions` – List all (admin)
* `GET /submissions/assignment/:assignmentId` – For an assignment
* `POST /submissions` – Submit assignment (student)
* `PATCH /submissions/:id/grade` – Grade submission (lecturer)

### AI Assistant

* `POST /ai/recommend` – Get course recommendations
* `POST /ai/syllabus` – Generate syllabus

---

## Project Structure

```
src/
├── ai/                  # AI assistant module
├── app.module.ts        # Application module
├── assignments/         # Assignment logic
├── auth/                # Auth logic
├── courses/             # Course logic
├── enrollments/         # Enrollment logic
├── main.ts              # Entry point
├── submissions/         # Submission logic
└── users/               # User logic
```

---

## Data Models

### User

* `id`: UUID
* `email`: String
* `password`: Hashed string
* `role`: 'student' | 'lecturer' | 'admin'

### Course

* `id`, `title`, `description`, `credits`, `lecturerId`, `syllabus`

### Enrollment

* `id`, `courseId`, `studentId`, `status`: 'pending' | 'approved' | 'rejected' | 'completed'

### Assignment

* `id`, `courseId`, `title`, `description`, `dueDate`, `weight`

### Submission

* `id`, `assignmentId`, `studentId`, `file`, `textContent`, `grade`, `feedback`

---

## Authentication & Authorization

Uses **JWT** for authentication.

Send in requests:

```
Authorization: Bearer <token>
```

Example usage with guards:

```ts
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('lecturer')
@Post()
create(@Body() dto: CreateCourseDto) {
  // Lecturer-only endpoint
}
```

---

## CORS Configuration

Allows frontend (e.g., Next.js) on `http://localhost:3000`:

```ts
app.enableCors({
  origin: 'http://localhost:3000',
  credentials: true,
});
```

---

## Deployment

1️⃣ **Build:**

```bash
npm run build
```

2️⃣ **Set production environment variables:**

```
NODE_ENV=production
JWT_SECRET=your_secure_jwt_secret
PORT=3001
```

3️⃣ **Start with PM2:**

```bash
npm install -g pm2
pm2 start dist/main.js --name university-lms-backend
```

4️⃣ **Optional: Nginx reverse proxy:**

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## Testing

```bash
npm run test         # Unit tests
npm run test:e2e     # E2E tests
npm run test:cov     # Coverage
```

---

## License

MIT License.

---

## Support
repo:

```
https://github.com/Brobot64/tactology_nest_test.git
```
Branch crmTest
