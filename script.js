const chatLog = document.getElementById('chat-log');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

const responses = {
    'hello': 'Hello! How can I assist you today?',
    'hi': 'Hi there! How can I help you?',
    'how are you': 'I am just a chatbot, but thanks for asking!',
    'help': 'Sure, I can help with various topics. Just ask me a question.',
    'bye': 'Goodbye! If you have more questions, feel free to come back.',
    'what is your name': 'I am a chatbot, and you can call me Chatty.',
    'tell me a joke': 'Why don’t scientists trust atoms? Because they make up everything!',
    'haha good one' : 'Thank you.',
    'what is the weather today': "I'm sorry, I don't have real-time information. You can check a weather website or app for that.",
    'who is the president of India': 'The President of the India is Droupadi Murmu.',
    'tell me a fun fact': 'Sure! Did you know that honey never spoils? Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible!',
    'do you like pizza': 'I don’t eat, so I don’t have preferences, but many people enjoy pizza!',
    "what's the capital of France": 'The capital of France is Paris.',
    'how does photosynthesis work': 'Photosynthesis is the process by which green plants and some other organisms convert light energy into chemical energy stored in glucose. It involves the absorption of light, carbon dioxide, and the release of oxygen.',
    'tell me a famous quote': "Here’s one from Albert Einstein: \"Imagination is more important than knowledge.\"",
};


function sendMessage() {
    const userMessage = userInput.value;

    if (userMessage) {
        appendMessage(userMessage, 'user-message');

        // Process the user's message and get a response
        const botResponse = getBotResponse(userMessage);

        // Simulate typing animation for the bot's response
        typeBotResponse(botResponse);

        userInput.value = '';
    }
}

function typeBotResponse(response) {
    const responseContainer = document.createElement('div');
    responseContainer.classList.add('chat-message', 'bot-message');

    const iconSpan = document.createElement('span');
    iconSpan.classList.add('material-symbols-outlined', 'botimg');
    iconSpan.textContent = 'robot_2'; // Set the icon content

    chatLog.appendChild(iconSpan);
    chatLog.appendChild(responseContainer);

    const responseText = document.createElement('p');
    responseContainer.appendChild(responseText);

    let currentIndex = 0;
    const typingInterval = setInterval(function () {
        if (currentIndex <= response.length) {
            responseText.textContent = response.substring(0, currentIndex);
            currentIndex++;
            // Automatically scroll to the latest message
            chatLog.scrollTop = chatLog.scrollHeight;
        } else {
            clearInterval(typingInterval);
        }
    },30); // Adjust the delay as needed
}

function appendMessage(message, className) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('chat-message', className);
    messageContainer.innerHTML = `<p>${message}</p>`;
    chatLog.appendChild(messageContainer);

    // Automatically scroll to the latest message
    chatLog.scrollTop = chatLog.scrollHeight;
}

function getBotResponse(userMessage) {
    // Convert the user's message to lowercase for case-insensitive matching
    const lowerCaseUserMessage = userMessage.toLowerCase();

    // Check if the user's message matches any predefined prompts
    for (const prompt in responses) {
        if (lowerCaseUserMessage.includes(prompt)) {
            return responses[prompt];
        }
    }

    // If no matching prompt is found, provide a default response
    return "I'm sorry, I don't understand. Please ask another question or type 'help' for assistance.";
}
const chatContainer = document.getElementById("chat-container");
const chatbotToggler = document.getElementById("chatbot-toggler");

chatbotToggler.addEventListener("click", toggleChat);

function toggleChat() {
    if (chatContainer.style.display === "none" || chatContainer.style.display === "") {
    chatContainer.style.display = "block";
    chatbotToggler.innerHTML = `<span class="material-symbols-outlined close-btn">close</span>`;
    typeBotResponse("hello how may i assit you today?");
    } else {
    chatContainer.style.display = "none";
    chatbotToggler.innerHTML = `<span class="material-symbols-rounded">mode_comment</span>`;
    }
}
