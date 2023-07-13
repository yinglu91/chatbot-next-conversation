import { draftMode } from 'next/headers'
import { NextResponse } from 'next/server'

import { getChatResponse } from '@/lib/openAIRequest'

// POST http://localhost:3000/api/get-chat-response
export const POST = async (request: Request) => {
    draftMode().enable()

    const data: PromptType = await request.json() // post request body: { prompt: 'what is typescript for?' }
    console.log(data)

    try {
        const responseMessage = await getChatResponse(data.prompt)
        console.log('yyyyy responseMessage=', responseMessage)
        return NextResponse.json({ result: responseMessage })
    } catch (error: any) {
        return NextResponse.json(
            { error: `Failed because of ${error}` },
            { status: 500 },
        )
    }
}
