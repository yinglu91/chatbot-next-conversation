'use client'

import { FormEvent, useState } from 'react'
import { Metadata } from 'next'

import styles from './index.module.css'

export const metadata: Metadata = {
    title: 'OpenAI Nextjs 13 Conversation',
    description: 'OpenAI Nextjs 13 Conversation...',
}

export default function Home() {
    const [prompt, setPrompt] = useState('')
    const [result, setResult] = useState('')

    const [error, setError] = useState('')

    const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!prompt) {
            setError('please input your prompt.')
            return
        }

        const bodyObj: PromptType = { prompt }
        try {
            const response = await fetch('/api/get-chat-response', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bodyObj),
            })

            const data = await response.json()
            if (response.status !== 200) {
                throw (
                    data.error ||
                    new Error(`Request failed with status ${response.status}`)
                )
            }

            setResult(data.result)
            setPrompt('')
        } catch (error: any) {
            // Consider implementing your own error handling logic here
            console.error(error)
            setError(error.message)
        }
    }

    return (
        <div>
            <main className={styles.main}>
                <h3>Do you have request / question?</h3>

                {error && <div className={styles.error}>{error}</div>}

                <form onSubmit={handleOnSubmit}>
                    <input
                        type="text"
                        placeholder="Enter an prompt"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    />

                    <input type="submit" value="Send" />
                </form>

                {result && <div className={styles.result}>{result}</div>}
            </main>
        </div>
    )
}
