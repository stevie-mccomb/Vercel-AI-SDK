# Vercel AI SDK Exercise

## Introduction

### What are we building?

We're going to be building a simple AI chat application that will allow our end users to write a text prompt into a web form, send it to our server, and receive back a real-time text response from an LLM [(Large Language Model](https://en.wikipedia.org/wiki/Large_language_model)) of our choice.

### Why are we building it?

Building this project will teach you two major modern web development skills:

1. You'll learn how to use Vercel's AI SDK, which makes it easy to integrate your own projects with any major LLM provider using minimal effort.
2. You'll learn how to stream text content directly from a web server to a web client, taking advantage of real-time streaming functionality built into modern browsers (we'll be using Google Chrome for this particular tutorial).

---

## Prerequisites

While this project will teach you some important concepts, it won't be an exhaustive deep-dive into fundamental concepts. This project will assume you already know some things and already have some software installed. Here are the things that we assume:

### What you should already know

1. Fundamental computer skills.
    1. You should know how to download ZIP files, extract their contents, and open them in an application of your choice.
2. HTML, CSS, and JavaScript.
    1. You should already have a solid grasp of HTML, CSS, and JavaScript fundamentals. We will cover some of the more advanced JavaScript concepts in-depth, but basic JavaScript knowledge will be assumed, and advanced HTML/CSS knowledge will be taken for granted.
3. How to use the terminal.
    1. We will be using the command line (Bash, Terminal, or PowerShell) for running our server-side JavaScript code (via Node & Express).
4. Collecting and safely handling user input.
    1. This project will take user input and use it directly for the sake of simplicity. In a real-world project, it's highly recommended that you sanitize and validate user input, which we will not discuss in this project.
5. How server-side routing works.
    1. We will be creating a simple server-side route in our Express application, but we will not be discussing the complexity of the Node.js runtime environment or advanced usage of the Express server. It's important that you understand server-side routing before tackling that portion of the project.

### What you should already have installed.

1. [Node.js](https://nodejs.org/en)
2. Node Package Manager (NPM); this comes installed with Node.js
3. A command line (these come preinstalled on all major operating systems)
    1. Bash - Linux
    2. Terminal - Mac
    3. PowerShell - Windows
4. A text editor or IDE (integrated development environment). For this project, I will be using Visual Studio Code, you can download for free at https://code.visualstudio.com/.

---

## Project

Here's the process we will follow to take user input, send it to Vercel, and receive back AI responses:

1. Download, extract, and set up the starter project.
    1. Download the project from https://github.com/stevie-mccomb/Vercel-AI-SDK/archive/refs/heads/trunk.zip
    2. Extract/unzip the ZIP file to access the project folder.
    3. Using the command line (Bash, Terminal, or PowerShell), move into the extracted folder and install the project's dependencies using NPM: `npm install`.
    4. Rename the `.env.example` file to `.env` . We will be saving our Vercel API key to this file later in step 3.
2. Create a Vercel account.
    1. Create a new account on Vercel by visiting https://vercel.com/signup, or log into your existing account if you have one.
3. Generate an AI Gateway API key.
    1. Once logged in, visit `AI Gateway > API Keys` and click “Create Key” to create a new key.
    2. Give your key a name you can easily identify later like “Vercel AI SDK Example Project Key” and click “Create Key”.
    3. Once your get is generated, it will be shown on the screen temporarily. Make sure to copy this key and paste it into your `.env` file. When you're done, your `.env` file should look like the following:
        
        ```jsx
        PORT=3000
        AI_GATEWAY_API_KEY=vck_... <-- Your key goes here
        ```
        
4. Add credit card info to Vercel account.
    1. Before making API requests to generate LLM output, you'll need to enter credit card info into your Vercel account, otherwise you will receive an error when attempting to send requests to their API.
5. Install Vercel's AI SDK to your project.
    1. Using your command line, install Vercel's AI SDK using `npm install ai`.
6. Start our local development server using the built-in script:
    1. `npm run dev`
7. Collect user input and send it to our custom Express route.
    1. In `/public/js/app.js`, you will find a JavaScript function that has been defined for you. The contents of the function are blank. This is where you will write your client-side (front-end) code.
    2. Take the user input that has been placed in the function signature as `prompt`, and send it to our server using JavaScript's built-in `fetch()` functionality.
8. Generate streamable AI output from Express route.
    1. In `/routes/prompt.js`, you will find an empty JavaScript function that has been defined for you that should handle our usage of the Vercel AI SDK.
    2. Define a route using `app.post('/prompt', (request, response) => {});` .
    3. Inside that route, use the Vercel AI SDK's `streamText()` function to send our user's input to Vercel's LLM API and store the response stream into a variable.
9. Pipe streamable AI output to the client.
    1. Take your Vercel API response variable, and pipe it to the client using the `response` object.
10. Ingest stream on client.
    1. Back in our client-side `app.js` file, receive the `ReadableStream` response from our server and decode it using a `TextDecoder`.
    2. Generate HTML elements to display our text and, for each chunk of streaming data received, insert the decoded chunk's text into those HTML elements.