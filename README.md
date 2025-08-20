# Site Profissional - Karyne Santiago Psicóloga

Este é um site profissional moderno e acolhedor para a psicóloga Karyne Santiago, desenvolvido com HTML, CSS e JavaScript, com um backend em Node.js para processamento de formulários de agendamento.

## Características

- Design moderno e acolhedor com as cores da identidade visual: branco, cinza claro, azul claro, lilás/roxo suave e toques de amarelo suave
- Layout totalmente responsivo para todos os dispositivos
- Página inicial com banner de boas-vindas, seção sobre a psicóloga e informações sobre o atendimento
- Página de agendamento com formulário completo
- Botão flutuante "Agendar Agora" em todas as páginas
- Envio de formulário via SMTP para o e-mail configurado

## Estrutura do Projeto

```
/
├── css/
│   └── style.css          # Estilos do site
├── img/
│   ├── psicologa.svg      # Ilustração para o banner
│   └── perfil.svg         # Ilustração para a seção "Sobre"
├── js/
│   └── script.js          # JavaScript para interatividade
├── .env                   # Configurações de ambiente (SMTP)
├── index.html            # Página inicial
├── agendamento.html      # Página de agendamento
├── server.js             # Servidor Node.js
├── package.json          # Dependências do projeto
└── README.md             # Este arquivo
```

## Requisitos

- Node.js 14.x ou superior
- NPM ou Yarn

## Instalação

1. Clone este repositório ou extraia os arquivos para o diretório desejado
2. Abra o terminal na pasta do projeto
3. Instale as dependências:

```bash
npm install
```

## Configuração

1. Edite o arquivo `.env` com suas configurações de SMTP:

```
# Configurações do Servidor
PORT=3000

# Configurações SMTP
SMTP_HOST=seu-servidor-smtp.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=seu-email@exemplo.com
SMTP_PASS=sua-senha-ou-app-password

# E-mail para recebimento dos agendamentos
EMAIL_TO=paludetto12@gmail.com
```

### Notas sobre configuração SMTP:

- Para Gmail, você precisará usar uma "Senha de App" em vez da senha normal da conta
- Para outros provedores, verifique as configurações específicas de SMTP

## Execução

Para iniciar o servidor:

```bash
npm start
```

Para desenvolvimento (com reinício automático):

```bash
npm run dev
```

O site estará disponível em `http://localhost:3000`

## Personalização

### Informações da Psicóloga

Edite os arquivos HTML para incluir as informações corretas da psicóloga:

- Nome completo
- Formação acadêmica
- Áreas de especialização
- Contatos
- Redes sociais

### Cores e Estilo

As cores principais estão definidas como variáveis CSS no início do arquivo `css/style.css`. Você pode ajustá-las conforme necessário para corresponder à identidade visual desejada.

## Licença

Todos os direitos reservados.

---

Desenvolvido com ❤️ para Karyne Santiago