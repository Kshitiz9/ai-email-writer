# AI Email Writer

An AI-powered email assistant that generates professional email replies based on the email content and selected tone.

## Features

- Generate AI-powered email replies
- Choose the tone of the generated response
- REST API built with Spring Boot
- Integration with Google Gemini API
- React-based frontend
- Chrome extension integration
- Secure API key configuration using environment variables

## Tech Stack

- **Backend:** Java, Spring Boot
- **API:** REST API, Spring WebFlux WebClient
- **AI:** Google Gemini API
- **Frontend:** React, JavaScript
- **Browser Extension:** Chrome Extension
- **Build Tool:** Maven
- **Version Control:** Git, GitHub

## Project Structure

```text
ai-email-writer/
├── email-writer/              # Spring Boot backend
├── email-writer-react/        # React frontend
├── email-writer-extension/    # Chrome extension
└── README.md
```

## How It Works

1. The user enters an email and selects a desired tone.
2. The React frontend sends the request to the Spring Boot backend.
3. The Spring Boot REST API receives the email content and tone.
4. The backend builds a prompt and sends it to the Google Gemini API using WebClient.
5. Gemini generates a professional email reply.
6. The backend extracts the generated response and returns it to the frontend.
7. The generated reply is displayed to the user.

## Setup and Installation

### Prerequisites

- Java 17 or later
- Maven
- Node.js and npm
- Google Gemini API key

### Backend Setup

1. Navigate to the backend directory:

```bash
cd email-writer
```

2. Set the required environment variables:

```text
GEMINI_API_URL=your_gemini_api_url
GEMINI_API_KEY=your_gemini_api_key
```

3. Run the Spring Boot application:

```bash
./mvnw spring-boot:run
```

### Frontend Setup

1. Navigate to the React directory:

```bash
cd email-writer-react
```

2. Install dependencies:

```bash
npm install
```

3. Start the React development server:

```bash
npm run dev
```