document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // Máscara para campos do formulário
    const cpfInput = document.getElementById('cpf');
    const rgInput = document.getElementById('rg');
    const telefoneInput = document.getElementById('telefone');
    const whatsappInput = document.getElementById('whatsapp');
    
    if (cpfInput) {
        cpfInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);
            
            if (value.length > 9) {
                value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
            } else if (value.length > 6) {
                value = value.replace(/^(\d{3})(\d{3})(\d{1,3})$/, "$1.$2.$3");
            } else if (value.length > 3) {
                value = value.replace(/^(\d{3})(\d{1,3})$/, "$1.$2");
            }
            
            e.target.value = value;
        });
    }
    
    if (rgInput) {
        rgInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 9) value = value.slice(0, 9);
            
            if (value.length > 7) {
                value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{1})$/, "$1.$2.$3-$4");
            } else if (value.length > 5) {
                value = value.replace(/^(\d{2})(\d{3})(\d{1,3})$/, "$1.$2.$3");
            } else if (value.length > 2) {
                value = value.replace(/^(\d{2})(\d{1,3})$/, "$1.$2");
            }
            
            e.target.value = value;
        });
    }
    
    function formatTelefone(input) {
        if (!input) return;
        
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);
            
            if (value.length > 10) {
                value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
            } else if (value.length > 6) {
                value = value.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3");
            } else if (value.length > 2) {
                value = value.replace(/^(\d{2})(\d{0,5})$/, "($1) $2");
            }
            
            e.target.value = value;
        });
    }
    
    formatTelefone(telefoneInput);
    formatTelefone(whatsappInput);
    
    // Validação e envio do formulário
    const agendamentoForm = document.getElementById('agendamento-form');
    
    if (agendamentoForm) {
        agendamentoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação básica
            const nome = document.getElementById('nome').value.trim();
            const cpf = document.getElementById('cpf').value.trim();
            const rg = document.getElementById('rg').value.trim();
            const idade = document.getElementById('idade').value.trim();
            const telefone = document.getElementById('telefone').value.trim();
            const whatsapp = document.getElementById('whatsapp').value.trim();
            const email = document.getElementById('email').value.trim();
            const data = document.getElementById('data').value;
            const hora = document.getElementById('hora').value;
            
            if (!nome || !cpf || !rg || !idade || !telefone || !whatsapp || !email || !data || !hora) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            // Validação de e-mail
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, insira um e-mail válido.');
                return;
            }
            
            // Preparar dados para envio
            const formData = new FormData(agendamentoForm);
            
            // Enviar dados via fetch API
            fetch('/enviar-agendamento', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao enviar o formulário');
                }
                return response.json();
            })
            .then(data => {
                alert('Agendamento enviado com sucesso! Entraremos em contato para confirmar.');
                agendamentoForm.reset();
            })
            .catch(error => {
                console.error('Erro:', error);
                alert('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente mais tarde.');
            });
        });
    }
    
    // Animação de scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});