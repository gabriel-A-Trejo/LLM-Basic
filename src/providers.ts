type Provider = "openai" | "gemini" | "groq"

type HelloOutput = {
    ok: true,
    provider: Provider,
    model: string;
    message: string;
}

type GeminiGenerateContent = {
    candidates?: Array<{content?: {parts?: Array<{text: string}>}}>
}

export async function helloGemini(): Promise<HelloOutput>{
    const apiKey = process.env.GOOGLE_API_KEY
    if(!apiKey) { throw new Error("GOOGLE_API_KEY is not set")} 
    const model = "gemini-2.0-flash-lite"
     const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`
     const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            contents: [{
                parts: [{
                    text: "Say a short hello"
                }]
            }]

     })})

     if (!response.ok) {
        throw new Error(`Gemini ${response.status}: ${await response.text()}`)
     }

     const json = (await response.json()) as GeminiGenerateContent;
     const text = json.candidates?.[0]?.content?.parts?.[0]?.text ?? 'Hello as default'

    return {
        ok: true,
        provider: "gemini",
        model,
        message: String(text).trim()
    }
}

type OpenAIChatCompletion = {
    choices?: Array<{message?: {content?: string}}>
}

export  async function hellogroq(): Promise<HelloOutput>
{
    const apiKey = process.env.GROQ_API_KEY
    if(!apiKey) { throw new Error("GROQ api is not set")}
    const model = "llama-3.1-8b-instant"
    const url = `https://api.groq.com/openai/v1/chat/completions`

    const response = await fetch(url, {
        method: "POST",
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model,
            messages: [{
                role: 'user', 
                content: 'Say a short hello'
            }],
            temperature: 0,
        })
    })
    if (!response.ok) {
        throw new Error(`Groq ${response.status}: ${await response.text()}`)
     }

     const json = (await response.json()) as OpenAIChatCompletion;
     const content = json.choices?.[0]?.message?.content ?? 'Hello as default'

    return {
        ok: true,
        provider: "groq",
        model,
        message: String(content).trim()
    }
}

export async function SelectAndHello(): Promise<HelloOutput>  {
    const forced = (process.env.PROVIDER || " ").toLowerCase()
    switch ( forced as Provider) {
        case "gemini":
            return await helloGemini()
        case "groq":
            return await hellogroq()
        default:
            throw new Error(`Unsupported PROVIDER=${forced}, use openAI | gemini | groq`)
    }

    if(process.env.GOOGLE_API_KEY)
    {
        try
        {
            return await helloGemini()
        } catch {}
    }


    if(process.env.GROQ_API_KEY)
    {
        try
        {
            return await hellogroq()
        } catch {}
    }

    throw new Error("No provider configured")
}

