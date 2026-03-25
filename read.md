# Hello Agent Starter

## What this project is
Hello Agent Starter is a small TypeScript command-line project that sends a simple prompt ("Say a short hello") to an AI provider and prints a normalized JSON response.

Right now, it supports:
- Gemini
- Groq

The app loads environment variables from a `.env` file, chooses a provider, calls the API, and returns a consistent output format.

## Why this project is important
This project is important because it teaches the core building blocks behind AI-powered applications in a simple and practical way:

1. Environment and secrets management
You learn how to safely load API keys from environment variables instead of hardcoding secrets in source code.

2. Provider abstraction
Different AI APIs have different request/response shapes. This project normalizes those differences into one output format, which is a key design pattern for scalable apps.

3. Error handling in real APIs
You see real-world API failures (for example schema errors, quota limits, or missing keys) and how to surface helpful messages.

4. Fast local iteration
With `tsx watch`, you can quickly test changes while learning TypeScript and API integration workflows.

5. Foundation for bigger agents
This starter can grow into a chatbot, automation agent, or multi-provider fallback system with only small incremental changes.

## Project structure
- `src/index.ts`: app entry point
- `src/env.ts`: environment loader (`dotenv`)
- `src/providers.ts`: provider-specific API calls and provider selection logic

## How it works
1. Load variables from `.env`.
2. Select provider using `PROVIDER` or available keys.
3. Send one prompt to the selected model.
4. Print output as JSON.

## Example output
```json
{
  "ok": true,
  "provider": "groq",
  "model": "llama-3.1-8b-instant",
  "message": "Hello!"
}
```

## Run locally
Install dependencies and run:

```bash
pnpm install
pnpm run dev
```

## Required environment variables
Depending on the provider you use:

```bash
PROVIDER=gemini
GOOGLE_API_KEY=your_key_here

# or

PROVIDER=groq
GROQ_API_KEY=your_key_here
```

