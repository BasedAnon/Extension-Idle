let settings = {
    idlePrompts: [],
    selectedCategories: ["casual", "philosophical"],
    timers: { global: 300 },
    enableSentiment: true
};

function loadSettings(loadedSettings) {
    const defaults = {
        idlePrompts: [],
        selectedCategories: ["casual", "philosophical"],
        timers: { global: 300 },
        enableSentiment: true
    };
    settings = Object.assign(defaults, loadedSettings);
}

function saveSettings() {
    saveSettingsAPI({
        idlePrompts: settings.idlePrompts,
        selectedCategories: settings.selectedCategories,
        timers: settings.timers,
        enableSentiment: settings.enableSentiment
    });
}

function startIdleTimer() {
    const category = detectCurrentCategory();
    const timerDuration = settings.timers[category] || settings.timers.global || 300;
    clearTimeout(idleTimer);
    idleTimer = setTimeout(sendIdlePrompt, timerDuration * 1000);
}

function detectCurrentCategory() {
    const lastMessage = getLastMessage().toLowerCase();
    if (lastMessage.includes("love") || lastMessage.includes("kiss")) return "romance";
    if (lastMessage.includes("philosophy") || lastMessage.includes("meaning")) return "philosophical";
    return "casual";
}

function detectMood(messages) {
    const combined = messages.slice(-5).join(' ').toLowerCase();

    const positiveWords = ['happy', 'love', 'great', 'wonderful', 'excited', 'fun'];
    const negativeWords = ['sad', 'angry', 'tired', 'upset', 'hate', 'depressed'];

    let score = 0;
    for (const word of combined.split(/\s+/)) {
        if (positiveWords.includes(word)) score++;
        if (negativeWords.includes(word)) score--;
    }

    if (score > 2) return 'positive';
