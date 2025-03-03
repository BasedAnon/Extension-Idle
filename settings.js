function loadSettingsUI() {
    if (!settings.idlePrompts) settings.idlePrompts = [];
    if (!settings.timers) settings.timers = { global: 300 };
    if (typeof settings.enableSentiment === 'undefined') settings.enableSentiment = true;

    document.getElementById('customPrompts').value = JSON.stringify(settings.idlePrompts, null, 2);
    document.getElementById('enableSentiment').checked = settings.enableSentiment;
    document.getElementById('globalTimer').value = settings.timers.global;
}

function saveSettingsUI() {
    try {
        settings.idlePrompts = JSON.parse(document.getElementById('customPrompts').value);
        if (!Array.isArray(settings.idlePrompts)) throw new Error();
    } catch (err) {
        alert("Invalid JSON in custom prompts! Please check the format.\nExample:\n[\n    { \"text\": \"Hello?\", \"category\": \"casual\", \"mood\": \"neutral\" }\n]");
        return;
    }

    settings.enableSentiment = document.getElementById('enableSentiment').checked;
    settings.timers.global = parseInt(document.getElementById('globalTimer').value, 10) || 300;

    saveSettings(settings);
    alert("Settings saved!");
}
