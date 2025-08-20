const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');

// Carregar variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, '/')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Configuração do multer para processamento de formulários
const upload = multer();

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para página de agendamento
app.get('/agendamento', (req, res) => {
    res.sendFile(path.join(__dirname, 'agendamento.html'));
});

// Rota para processar o envio do formulário
app.post('/enviar-agendamento', upload.none(), async (req, res) => {
    try {
        const { nome, cpf, rg, idade, telefone, whatsapp, email, data, hora, mensagem } = req.body;
        
        // Verificar campos obrigatórios
        if (!nome || !cpf || !rg || !idade || !telefone || !whatsapp || !email || !data || !hora) {
            return res.status(400).json({ success: false, message: 'Todos os campos obrigatórios devem ser preenchidos' });
        }
        
        // Configurar transporte de e-mail
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });
        
        // Formatar data para exibição
        const dataFormatada = new Date(data).toLocaleDateString('pt-BR');
        
        // Configurar e-mail
        const mailOptions = {
            from: `"Site Karyne Santiago" <${process.env.SMTP_USER}>`,
            to: process.env.EMAIL_TO,
            subject: 'Novo Agendamento de Consulta',
            html: `
                <h2>Novo Agendamento de Consulta</h2>
                <p><strong>Nome:</strong> ${nome}</p>
                <p><strong>CPF:</strong> ${cpf}</p>
                <p><strong>RG:</strong> ${rg}</p>
                <p><strong>Idade:</strong> ${idade}</p>
                <p><strong>Telefone:</strong> ${telefone}</p>
                <p><strong>WhatsApp:</strong> ${whatsapp}</p>
                <p><strong>E-mail:</strong> ${email}</p>
                <p><strong>Data Solicitada:</strong> ${dataFormatada}</p>
                <p><strong>Horário Solicitado:</strong> ${hora}</p>
                ${mensagem ? `<p><strong>Mensagem:</strong> ${mensagem}</p>` : ''}
                <p>Este e-mail foi enviado automaticamente pelo formulário de agendamento do site.</p>
            `
        };
        
        // Enviar e-mail
        await transporter.sendMail(mailOptions);
        
        res.status(200).json({ success: true, message: 'Agendamento enviado com sucesso!' });
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
        res.status(500).json({ success: false, message: 'Erro ao processar o agendamento' });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});