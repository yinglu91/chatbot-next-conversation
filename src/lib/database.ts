let existingMessages : Message[] = [] // in memory

export function getRecentMessages(): Message[] {
    const messages: Message[] = []

    getLearnInstruction()

    messages.push(getLearnInstruction())

    if (existingMessages.length < 5) {
        existingMessages.forEach(message => messages.push(message))
    } else {
        for (let i = existingMessages.length - 5; i < existingMessages.length; i++) {
            messages.push(existingMessages[i])
        }
    }

    return messages  
}

// Save messages for retrieval later on
function saveMessages(requestMessage: string, responseMessage: string) {
    const messages = getRecentMessages()
    messages.shift()

    messages.push({role: 'user', content: requestMessage})
    messages.push({role: 'assistant', content: responseMessage})

    existingMessages = messages
}

function removeAllMessages() {
    existingMessages = []
}
    
function getLearnInstruction(): Message {
    const learnInstruction = {"role": "system", 
    "content": "You are a teacher and your name is Rachel, the user is called Shaun. Keep responses under 20 words. "}

    let x = Math.random()
    let extraInstruction = ''
    if (x < 0.5) {
        extraInstruction =  'Your response will have some light humour. '
    } else {
        extraInstruction = 'Your response will recommend another word to learn.'
    }

    learnInstruction.content +=  extraInstruction

    return learnInstruction
}