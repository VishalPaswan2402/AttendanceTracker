# Attendance Tracker

This is an **Attendance Tracker** web application built using these **(MongoDB, Express, EJS, Node.js)** technology. The website is designed to help college students and teachers track and manage attendance. Teachers can mark attendance for their classes, while students can view their attendance for all subjects.

## Features
- **College Login**: Colleges can add teacher IDs for their respective teachers.
- **Student Login**: Students can log in to view their attendance for all subjects.
- **Teacher Login & Signup**: Teachers can log in to mark attendance or create an account for their class to start managing attendance.
- **Student Attendance Details**: Students can check their present attendance status for all subjects.
- **Teacher Attendance Page**: Teachers can mark attendance as "Present" or "Absent" for each student in their class.
- **No Credentials Required for Students**: Students can log in directly to view their attendance without needing to create an account.
- **Responsive Design**: The application is mobile-friendly and works well on both desktop and mobile devices.
- **Real-Time Updates**: Attendance data is updated in real time and can be accessed by both students and teachers.

## Technologies Used
- **MongoDB**: Database to store attendance records and user data (students and teachers).
- **Express.js**: Web framework to handle API routes.
- **EJS**: Frontend framework to build the user interface.
- **Node.js**: JavaScript runtime to run the server-side code.
- **Mongoose**: ODM for MongoDB to interact with the database.
- **Passport.js**: Authentication middleware for handling user login and sign-up.
- **Render**: Hosting platform for deploying the application.

## Live Project Link
[Live Project - Attendance Tracker](https://attendance-tracker-4j6u.onrender.com)

## Website images

### Home page
![Home page](/public/imageFolder/HomePage.png)

### Teacher page
![Teacher page](/public/imageFolder/teacherHome.png)

### College page
![College page](/public/imageFolder/CollegePage.png)

### Attendance page for teacher
![Attendance page for teacher](/public/imageFolder/TeacherPage.png)

### Attendance page for student
![Student page](/public/imageFolder/StudentPage1.png)

## Installation

### Prerequisites

- Node.js installed.
- MongoDB running (locally or using a cloud provider like MongoDB Atlas).
- A code editor like **VS Code** for editing the project files.

### Steps

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/attendance-tracker.git
    cd attendance-tracker
    ```

2. **Install backend dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the backend directory and add your credentials:

    ```bash
    atlasUrl=your_database_url
    secretPass=your_website_secret_pass
    emailPass=your_email_password
    emailUser=your_email_user
    emailHost=your_email_host
    ```

4. **Start the server:**

    ```bash
    node index.js
    ```

10. **Running the server:**
    - The server will be running on `http://localhost:8080`.

## How to Use

1. **Teacher's Signup:**
   - Create account using ID provided by college.

2. **Student Login:**
   - Any student can log in to check their attendance status for all subjects using there roll no.

3. **College Login:**
   - College can login to add there college teacher id name which all teacher to create there account.

4. **Teacher Attendance Page:**
   - After logging in, teachers can add class and mark attendance for their class students by selecting "Present" or "Absent".

5. **College Signup:**
   - College can create account using college name, email and other input values

## Advantages
- **User-Friendly**: Simple interface for students, college and teachers to easily track and mark attendance.
- **Secure Login**: Teachers have their own login credentials to access attendance data.
- **Real-Time Updates**: Attendance is updated in real time, ensuring accurate tracking.
- **No Credentials for Students**: Students can log in easily without creating an account.
- **Cloud-Based**: Data is stored securely in MongoDB, with deployment on Render.
