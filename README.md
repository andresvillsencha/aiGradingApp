# AI-Driven Grading App

An AI-powered grading application built with **Ext JS**, **Node.js**, **MySQL**, and the **OpenAI API**.

This project demonstrates how AI can be integrated into a traditional web application to evaluate open-ended student responses, provide scores, and generate meaningful feedback.

The application was created as a demonstration project for the webinar:

> **Build an AI-Driven Grading Logic with the JavaScript DataGrid**

---

## 🚀 Overview

Traditional grading systems work well with multiple-choice or predefined answers, but evaluating open-ended responses usually requires manual review.

This application demonstrates how an AI model can be incorporated into the grading process.

The system:

- Manages students and tests.
- Stores open-ended questions and reference answers.
- Records student test attempts and answers.
- Sends an entire test attempt to the OpenAI API for evaluation.
- Uses reference answers and grading criteria to guide the AI.
- Stores the resulting scores and feedback.
- Displays grading results through an Ext JS interface.

The goal of the project is not to replace human evaluation, but to demonstrate how **AI-assisted grading** can be integrated into an existing JavaScript application.

---

## 🛠 Technology Stack

### Frontend

- **Ext JS Classic Toolkit**
- JavaScript
- Ext JS Grid
- Ext JS Forms
- Ext JS Stores
- Ext JS MVC architecture

### Backend

- **Node.js**
- Express
- REST API
- MySQL
- OpenAI API

### Database

- **MySQL**

---

## 🏗 Architecture

The application follows a traditional multi-layer architecture.

```text
┌─────────────────────────────┐
│       Ext JS Frontend       │
│                             │
│  Students / Tests /         │
│  Attempts / Answers         │
└──────────────┬──────────────┘
               │
               │ REST API
               ▼
┌─────────────────────────────┐
│       Node.js / Express     │
│                             │
│  Routes                     │
│  Controllers                │
│  Services                   │
│  Repositories               │
└──────────────┬──────────────┘
               │
        ┌──────┴──────┐
        │             │
        ▼             ▼
┌───────────────┐ ┌───────────────┐
│     MySQL     │ │  OpenAI API   │
│               │ │               │
│ Tests         │ │ AI Grading    │
│ Questions     │ │ Evaluation    │
│ Students      │ │ Feedback      │
│ Attempts      │ │               │
│ Answers       │ │               │
└───────────────┘ └───────────────┘
```

---

## 📁 Repository Structure

```text
grading-app/
│
├── ext-js/
│   └── Ext JS frontend application
│
├── server/
│   └── Node.js REST API
│
├── db/
│   └── Database scripts and sample data
│
├── README.md
└── LICENSE
```

### `ext-js`

Contains the **Ext JS Classic application**.

The frontend provides interfaces for:

- Students
- Tests
- Questions
- Test attempts
- Student answers
- AI grading results

### `server`

Contains the **Node.js / Express backend**.

The backend is responsible for:

- REST API endpoints
- Database communication
- Test and attempt management
- Building the AI grading request
- Communicating with OpenAI
- Processing grading responses
- Saving evaluation results

The backend follows a layered structure similar to:

```text
server/
│
├── routes/
├── controllers/
├── services/
├── repositories/
└── ...
```

### `db`

Contains the MySQL scripts required to create and populate the database.

---

## 🗄 Database Model

The demo intentionally uses a simple database structure consisting of five main tables.

### `students`

Stores the students who can take tests.

Typical information includes:

- Student ID
- Name
- Email
- Active status

### `tests`

Defines the available tests.

Each test contains information such as:

- Title
- Description
- Passing score
- Status

### `questions`

Contains the open-ended questions associated with each test.

Questions can include:

- Question text
- Reference answer
- Grading criteria
- Maximum score
- Sort order

The **reference answer** and **grading criteria** are particularly important because they provide context to the AI grading process.

### `test_attempts`

Represents a student's attempt at completing a test.

It stores information such as:

- Student
- Test
- Status
- Score
- Percentage
- Pass/fail result
- Start date
- Submission date

### `student_answers`

Stores each answer submitted by a student.

After AI evaluation, the record can also contain:

- Score
- Percentage
- Feedback
- Strengths
- Weaknesses

---

## 🤖 AI Grading Process

One of the main objectives of this project is demonstrating how an application can construct useful context before making a request to an AI model.

Instead of sending only the student's answer, the application provides additional information such as:

```text
Question
        │
        ├── Reference Answer
        │
        ├── Grading Criteria
        │
        ├── Maximum Score
        │
        └── Student Answer
                │
                ▼
          AI Evaluation
                │
        ┌───────┼────────┐
        ▼       ▼        ▼
      Score  Feedback  Analysis
```

The backend gathers all questions and answers for a test attempt and sends them together for evaluation.

This allows the model to evaluate the answers using consistent context and grading criteria.

---

## 🔌 API

Some of the main endpoints used by the demo include:

### Tests

```http
GET /api/tests
```

```http
GET /api/tests/:id/questions
```

### Test Attempts

```http
GET /api/attempts
```

```http
GET /api/attempts/:id
```

```http
GET /api/attempts/:id/answers
```

### AI Evaluation

```http
POST /api/attempts/:id/grade
```

The backend:

1. Retrieves the attempt.
2. Retrieves its questions and answers.
3. Includes the reference answers and grading criteria.
4. Builds the grading request.
5. Sends the request to OpenAI.
6. Processes the structured response.
7. Updates the individual answers.
8. Calculates the final test score.
9. Updates the test attempt.
10. Returns the grading results to the frontend.

---

## ⚙️ Setup

### Prerequisites

Before running the application, make sure you have:

- Node.js
- npm
- MySQL
- Sencha Cmd
- Access to an Ext JS SDK
- An OpenAI API key

---

## 🗄 Database Setup

Create a MySQL database for the application.

Run the scripts contained in:

```text
db/
```

These scripts create the required tables and populate the database with demo information.

---

## 🖥 Backend Setup

Navigate to the server directory:

```bash
cd server
```

Install the dependencies:

```bash
npm install
```

Create a `.env` file inside the `server` directory.

Example:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=grading_app

OPENAI_API_KEY=your_openai_api_key

PORT=3000
```

> **Important:** Never commit your `.env` file or OpenAI API key to GitHub.

Make sure `.env` is included in your `.gitignore`.

Start the Node.js server using the script configured in your `package.json`, for example:

```bash
npm start
```

The API will typically be available at:

```text
http://localhost:3000
```

---

## 🧩 Ext JS Setup

Navigate to the Ext JS directory:

```bash
cd ext-js
```

This repository contains the application source files used by the demo.

Because **Ext JS is commercially licensed software**, the Ext JS SDK itself should not be distributed as part of this repository unless you have the appropriate redistribution rights.

Create a new **Ext JS Classic Toolkit** application using your licensed Ext JS SDK and Sencha Cmd.

For example:

```bash
sencha -sdk /path/to/ext generate app -classic EvalApp ./EvalApp
```

Add the source files from this repository to the generated application as appropriate.

Then navigate to the Ext JS application:

```bash
cd EvalApp
```

Run:

```bash
sencha app watch
```

Sencha Cmd will build the application and start the development server.

---

## 🔐 Environment Variables

Sensitive configuration should be stored using environment variables.

Do **not** commit values such as:

```text
OPENAI_API_KEY
DB_PASSWORD
API secrets
Production credentials
```

A good practice is to provide a `.env.example` file:

```env
DB_HOST=
DB_PORT=3306
DB_USER=
DB_PASSWORD=
DB_NAME=

OPENAI_API_KEY=

PORT=3000
```

Developers can copy it:

```bash
cp .env.example .env
```

and provide their own credentials.

---

## ⚠️ AI Evaluation Disclaimer

AI-generated evaluations can be incorrect, inconsistent, or incomplete.

This project is intended as a **technical demonstration of AI-assisted grading** and should not be considered a production-ready automated academic assessment system.

For high-impact academic or professional decisions, AI-generated results should be reviewed by a qualified human evaluator.

---

## 📚 Educational Purpose

This repository is primarily intended for:

- Webinar attendees
- Ext JS developers
- JavaScript developers
- Developers learning AI integration
- Developers experimenting with structured AI responses
- Developers interested in AI-assisted workflows

Feel free to experiment with the application, modify the prompts, add new tests, or implement different grading strategies.

---

## 📄 License

This project is licensed under the **MIT License**.

You are free to use, modify, and distribute the code according to the terms of the license.

See the [`LICENSE`](LICENSE) file for details.

### Third-Party Software

This license applies to the original source code provided in this repository.

Third-party libraries, frameworks, APIs, and services used by the project remain subject to their respective licenses and terms.

In particular:

- **Ext JS** is a commercially licensed product from Sencha.
- **OpenAI API** usage is subject to OpenAI's applicable terms and policies.
- Other npm packages are subject to their respective licenses.

The Ext JS SDK itself is **not licensed under the MIT License by this repository**.

---

## 👨‍💻 Author

**Andres Villalba**

Built as a demonstration of integrating **Ext JS, Node.js, MySQL, and AI** to create intelligent JavaScript applications.

---

## 💡 About the Demo

The most important concept demonstrated by this project is not simply calling an AI API.

It is showing how a traditional application can combine:

**Application Data + Business Rules + Context + AI**

to create useful AI-assisted functionality while keeping the application responsible for data management, workflow, and presentation.
