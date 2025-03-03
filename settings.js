function loadSettingsUI() {
    document.getElementById('customPrompts').value = JSON.stringify(settings.idlePrompts, null, 2);
    document.getElementById('enableSentiment').checked = settings.enableSentiment;
    document.getElementById('globalTimer').value = settings.timers.global || 300;
}

function saveSettingsUI() {
    try {
        settings.idlePrompts = JSON.parse(document.getElementById('customPrompts').value);
    } catch (err) {
        alert("Invalid JSON in custom prompts! Please check your formatting.");
        return;
    }

    settings.enableSentiment = document.getElementById('enableSentiment').checked;
    settings.timers.global = parseInt(document.getElementById('globalTimer').value, 10) || 300;

    saveSettings();
    alert("Settings saved!");
}
