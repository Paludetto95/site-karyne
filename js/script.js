document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile toggle - Otimizado
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            nav.classList.toggle('active');
        });
        
        // Fechar menu ao clicar em um link
        nav.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                nav.classList.remove('active');
            }
        });
        
        // Fechar menu ao clicar fora
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && !nav.contains(e.target)) {
                nav.classList.remove('active');
            }
        });
    }
    
    // Máscara para campos do formulário - Otimizado e consolidado
    const maskConfigs = {
        cpf: { maxLength: 11, pattern: /^(\d{3})(\d{3})(\d{3})(\d{2})$|^(\d{3})(\d{3})(\d{1,3})?$|^(\d{3})(\d{1,3})?$/, format: (v) => {
            if (v.length > 9) return v.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
            if (v.length > 6) return v.replace(/^(\d{3})(\d{3})(\d{1,3})$/, "$1.$2.$3");
            if (v.length > 3) return v.replace(/^(\d{3})(\d{1,3})$/, "$1.$2");
            return v;
        }},
        rg: { maxLength: 9, format: (v) => {
            if (v.length > 7) return v.replace(/^(\d{2})(\d{3})(\d{3})(\d{1})$/, "$1.$2.$3-$4");
            if (v.length > 5) return v.replace(/^(\d{2})(\d{3})(\d{1,3})$/, "$1.$2.$3");
            if (v.length > 2) return v.replace(/^(\d{2})(\d{1,3})$/, "$1.$2");
            return v;
        }},
        telefone: { maxLength: 11, format: (v) => {
            if (v.length > 10) return v.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
            if (v.length > 6) return v.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3");
            if (v.length > 2) return v.replace(/^(\d{2})(\d{0,5})$/, "($1) $2");
            return v;
        }}
    };
    
    Object.entries(maskConfigs).forEach(([fieldName, config]) => {
        const input = document.getElementById(fieldName);
        if (input) {
            input.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > config.maxLength) value = value.slice(0, config.maxLength);
                e.target.value = config.format(value);
            });
        }
    });
    
    // WhatsApp com mesma formatação de telefone
    const whatsappInput = document.getElementById('whatsapp');
    if (whatsappInput) {
        whatsappInput.addEventListener('input', function(e) {
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
    
    // Validação e envio do formulário - Otimizado
    const agendamentoForm = document.getElementById('agendamento-form');
    
    if (agendamentoForm) {
        agendamentoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Cache de elementos
            const formFields = {
                nome: document.getElementById('nome'),
                cpf: document.getElementById('cpf'),
                rg: document.getElementById('rg'),
                idade: document.getElementById('idade'),
                telefone: document.getElementById('telefone'),
                whatsapp: document.getElementById('whatsapp'),
                email: document.getElementById('email'),
                data: document.getElementById('data'),
                hora: document.getElementById('hora')
            };
            
            // Validação básica
            const allFilledFields = Object.values(formFields).every(field => field && field.value.trim());
            if (!allFilledFields) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            // Validação de e-mail
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formFields.email.value.trim())) {
                alert('Por favor, insira um e-mail válido.');
                return;
            }
            
            // Preparar e enviar dados
            const formData = new FormData(agendamentoForm);
            
            fetch('/enviar-agendamento', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (!response.ok) throw new Error('Erro ao enviar');
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
    
    // Animação de scroll suave para links internos - Otimizado
    function smoothScroll(targetElement) {
        const headerHeight = document.querySelector('header')?.offsetHeight || 100;
        const targetPosition = targetElement.offsetTop - headerHeight;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(href);
            if (targetElement) {
                smoothScroll(targetElement);
            }
        });
    });
});