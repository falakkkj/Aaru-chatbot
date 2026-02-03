document.getElementById('chat-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const messageInput = document.getElementById('user-input');
    const message = messageInput.value.trim();
    if (!message) return;

    addMessage(message, 'user');
    messageInput.value = '';

    const typingId = addTypingIndicator();

    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        });
        const data = await response.json();

        removeMessage(typingId);
        addMessage(data.response, 'bot');
    } catch (error) {
        removeMessage(typingId);
        addMessage("Sorry, I'm having trouble connecting.", 'bot');
    }
});

// Animation Logic for Bot Avatars
function startAvatarAnimation() {
    let frame = 0;
    setInterval(() => {
        frame = (frame + 1) % 3; // Use first 3 frames (Idle)
        const avatars = document.querySelectorAll('.bot-avatar');
        avatars.forEach(avatar => {
            avatar.style.backgroundImage = `url('/static/avatar/frame_${frame}.png')`;
        });
        const sidebarAvatar = document.getElementById('sidebar-bot-avatar');
        if (sidebarAvatar) {
            sidebarAvatar.style.backgroundImage = `url('/static/avatar/frame_${frame}.png')`;
        }
    }, 800);
}

startAvatarAnimation();

function addMessage(text, sender) {
    const container = document.getElementById('chat-container');
    const div = document.createElement('div');
    const isUser = sender === 'user';
    div.className = `flex justify-${isUser ? 'end' : 'start'} animate-fade-in mb-4`;

    let content = '';
    if (isUser) {
        content = `
            <div class="user-msg p-3 rounded-2xl rounded-tr-none max-w-[80%] shadow-lg">
                ${text}
            </div>
        `;
    } else {
        content = `
            <div class="bot-msg glass-panel p-4 rounded-2xl rounded-tl-none max-w-[80%] shadow-lg flex items-center gap-4">
                <div class="bot-avatar flex-shrink-0"></div>
                <div>${text}</div>
            </div>
        `;
    }

    div.innerHTML = content;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
    return div.id;
}

function addTypingIndicator() {
    const container = document.getElementById('chat-container');
    const id = 'typing-' + Date.now();
    const div = document.createElement('div');
    div.id = id;
    div.className = 'flex justify-start animate-fade-in';
    div.innerHTML = `
        <div class="bot-msg glass-panel p-4 rounded-2xl rounded-tl-none shadow-lg flex gap-1 items-center">
            <div class="bot-avatar flex-shrink-0 w-6 h-6 opacity-50 mr-2"></div>
            <div class="w-2 h-2 bg-accent rounded-full animate-bounce"></div>
            <div class="w-2 h-2 bg-accent rounded-full animate-bounce delay-75"></div>
            <div class="w-2 h-2 bg-accent rounded-full animate-bounce delay-150"></div>
        </div>
    `;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
    return id;
}

function removeMessage(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
}
