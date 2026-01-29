export function showMessage(message, type = "error", duration = 3000) {
    const msgDiv = document.querySelector("#errorMessage");
    msgDiv.textContent = message;
    msgDiv.className = `error-message ${type} show`;

    
    setTimeout(() => {
        msgDiv.className = "error-message"; 
    }, duration);
}
