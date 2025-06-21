// main.js

// Garante que o script só execute após o DOM estar completamente carregado
document.addEventListener("DOMContentLoaded", function () {
  /* --- Funcionalidade do Menu de Navegação para Mobile --- */
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector(".main-nav");
  const navLinks = document.querySelectorAll(".main-nav a"); // Seleciona todos os links da navegação

  if (navToggle && mainNav) {
    // Evento para alternar a visibilidade do menu e o ícone de hambúrguer
    navToggle.addEventListener("click", () => {
      const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", !isExpanded); // Alterna o estado ARIA
      mainNav.classList.toggle("active");
      navToggle.classList.toggle("active");
    });

    // Fechar o menu ao clicar em qualquer link de navegação
    // Isso melhora a experiência do usuário em dispositivos móveis
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("active");
        navToggle.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false"); // Reseta o estado ARIA
      });
    });
  }

  /* --- Efeito 'Scrolled' no Cabeçalho (Header Fixo) --- */
  // Adiciona ou remove a classe 'scrolled' ao cabeçalho conforme a posição de rolagem da página
  const header = document.querySelector(".main-header");
  if (header) {
    window.addEventListener("scroll", () => {
      // Adiciona a classe 'scrolled' se a rolagem for maior que 0
      // Remove a classe 'scrolled' se a rolagem for 0
      header.classList.toggle("scrolled", window.scrollY > 0);
    });
  }

  /* --- Funcionalidade de Abas (Tabs) para a Seção 'O Processo' --- */
  // Garante que a primeira aba esteja ativa por padrão ao carregar a página
  // Adicionei este bloco para inicializar a aba correta com ARIA
  const defaultTab = document.getElementById("SaudeMental");
  const defaultTabLink = document.getElementById("tab-saudemental");
  if (defaultTab && defaultTabLink) {
    defaultTab.style.display = "block";
    defaultTab.setAttribute("aria-hidden", "false");
    defaultTabLink.classList.add("active");
    defaultTabLink.setAttribute("aria-selected", "true");
  }

  // Função para alternar entre as abas do processo
  // Esta função foi alterada para ser genérica e reutilizável
  window.openProcess = function (event, processName) {
    // Torna global para ser acessível do HTML inline
    const tabLinks = document.querySelectorAll(".tab-link");
    const tabContents = document.querySelectorAll(".tab-content");

    // Remove a classe 'active' e reseta atributos ARIA de todas as abas e conteúdos
    tabLinks.forEach((link) => {
      link.classList.remove("active");
      link.setAttribute("aria-selected", "false");
    });
    tabContents.forEach((content) => {
      content.style.display = "none";
      content.setAttribute("aria-hidden", "true");
    });

    // Adiciona a classe 'active' e define atributos ARIA para a aba e conteúdo clicados
    event.currentTarget.classList.add("active");
    event.currentTarget.setAttribute("aria-selected", "true");
    const targetContent = document.getElementById(processName);
    if (targetContent) {
      targetContent.style.display = "block";
      targetContent.setAttribute("aria-hidden", "false");
    }
  };

  /* --- Funcionalidade de Acordeão (Accordion) --- */
  // Lida com a abertura e fechamento dos itens do acordeão
  document.querySelectorAll(".accordion-header").forEach((headerButton) => {
    const accordionContent = headerButton.nextElementSibling;

    // Inicializa o estado ARIA (todos fechados por padrão, exceto se houver um estado inicial definido no HTML/CSS)
    headerButton.setAttribute("aria-expanded", "false");
    accordionContent.setAttribute("aria-hidden", "true");
    accordionContent.style.maxHeight = null; // Garante que estejam fechados inicialmente

    headerButton.addEventListener("click", () => {
      const isExpanded =
        headerButton.getAttribute("aria-expanded") === "true" || false;

      // Fecha todos os outros acordeões abertos, exceto o clicado
      document
        .querySelectorAll(
          ".accordion-item .accordion-header[aria-expanded='true']"
        )
        .forEach((otherButton) => {
          if (otherButton !== headerButton) {
            otherButton.setAttribute("aria-expanded", "false");
            const otherContent = otherButton.nextElementSibling;
            otherContent.setAttribute("aria-hidden", "true");
            otherContent.style.maxHeight = null;
          }
        });

      // Alterna o estado do acordeão clicado
      headerButton.setAttribute("aria-expanded", !isExpanded);
      accordionContent.setAttribute("aria-hidden", isExpanded);

      if (isExpanded) {
        accordionContent.style.maxHeight = null; // Fecha o conteúdo
      } else {
        accordionContent.style.maxHeight = accordionContent.scrollHeight + "px"; // Abre o conteúdo
      }
      headerButton.classList.toggle("active", !isExpanded); // Alterna a classe 'active' no cabeçalho
    });
  });

  /* --- Validação do Formulário de Contato --- */
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Impede o envio padrão do formulário

      // Remove mensagens de erro anteriores para uma nova validação
      clearErrorMessages();

      // Recolhe os valores dos campos e remove espaços em branco extras
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const subject = document.getElementById("subject")
        ? document.getElementById("subject").value.trim()
        : ""; // Campo opcional
      const message = document.getElementById("message").value.trim();
      let valid = true; // Flag de validação

      // Validação dos campos obrigatórios
      if (!name) {
        showError("O nome é obrigatório.", "name");
        valid = false;
      }
      if (!email) {
        showError("O e-mail é obrigatório.", "email");
        valid = false;
      } else if (!validateEmail(email)) {
        showError("Por favor, insira um endereço de e-mail válido.", "email");
        valid = false;
      }
      if (!message) {
        showError("A mensagem é obrigatória.", "message");
        valid = false;
      }

      // Se todos os campos forem válidos, simula o envio e limpa o formulário
      if (valid) {
        alert(
          "Sua mensagem foi enviada com sucesso! Em breve entraremos em contato."
        );
        contactForm.reset(); // Limpa todos os campos do formulário
      }
    });
  }

  // Função auxiliar para validar o formato do e-mail
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  // Função para exibir mensagens de erro personalizadas para cada campo
  function showError(message, fieldId) {
    const field = document.getElementById(fieldId);
    if (field) {
      const errorMessageDiv = document.createElement("div");
      errorMessageDiv.className = "error-message";
      errorMessageDiv.innerText = message;
      // Insere a mensagem de erro após o campo problemático
      field.parentNode.insertBefore(errorMessageDiv, field.nextSibling);
      field.classList.add("input-error"); // Adiciona uma classe para estilização de erro no input
    }
  }

  // Função para limpar todas as mensagens de erro e estilos de erro
  function clearErrorMessages() {
    document.querySelectorAll(".error-message").forEach((el) => el.remove());
    document
      .querySelectorAll(".input-error")
      .forEach((el) => el.remove("input-error"));
  }
});
