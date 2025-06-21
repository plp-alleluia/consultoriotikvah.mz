document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const errorMessage = document.createElement("div");
    errorMessage.className = "error-message";
    form.appendChild(errorMessage);

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Impede o envio do formulário até a validação

        // Limpa mensagens de erro anteriores
        errorMessage.textContent = "";
        let valid = true;

        // Validação do nome
        if (nameInput.value.trim() === "") {
            valid = false;
            errorMessage.textContent += "O nome é obrigatório. ";
        }

        // Validação do e-mail
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (emailInput.value.trim() === "") {
            valid = false;
            errorMessage.textContent += "O e-mail é obrigatório. ";
        } else if (!emailPattern.test(emailInput.value.trim())) {
            valid = false;
            errorMessage.textContent += "Por favor, insira um e-mail válido. ";
        }

        // Validação da mensagem
        if (messageInput.value.trim() === "") {
            valid = false;
            errorMessage.textContent += "A mensagem é obrigatória. ";
        }

        // Se todos os campos forem válidos, envie o formulário
        if (valid) {
            alert("Mensagem enviada com sucesso!");
            form.submit(); // Aqui você pode enviar o formulário para o servidor
        }
    });
});
