import { Configuration, OpenAIApi } from 'openai'

import { getRecentMessages } from './database'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export async function getChatResponse(requestMsg: string) {
    const messages = getRecentMessages()
    const userMessage: Message = {
        role: 'user',
        content: requestMsg,
    }
    messages.push(userMessage)

    console.log('yyyyy messages=', messages)

    const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: messages as any,
    })

    const response = completion.data.choices[0].message?.content
    console.log('yyyyy response=', response)
    return response
}
