// server.js

require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env
const express = require('express'); // Importa o Express
const bodyParser = require('body-parser'); // Importa o body-parser
const cors = require('cors'); // Importa o cors para permitir requisições de diferentes origens
const { sendEmail } = require('./email-service'); // Importa a função de envio de e-mail

const app = express(); // Cria uma aplicação Express
const PORT = process.env.PORT || 3000; // Define a porta do servidor

// Middleware
app.use(cors()); // Permite requisições de diferentes origens
app.use(bodyParser.json()); // Para analisar requisições JSON
app.use(bodyParser.urlencoded({ extended: true })); // Para analisar requisições URL-encoded

// Rota para enviar o formulário
app.post('/send', async (req, res) => {
    const { name, email, message } = req.body;

    // Validação básica dos campos
    if (!name || !email || !message) {
        return res.status(400).send('Todos os campos são obrigatórios.');
    }

    try {
        const response = await sendEmail({ name, email, message });
        res.status(200).send(response);
    } catch (error) {
        console.error('Erro ao enviar e-mail: ', error);
        res.status(500).send('Erro ao enviar a mensagem. Tente novamente mais tarde.');
    }
});

// Rota de exemplo para verificar se o servidor está funcionando
app.get('/', (req, res) => {
    res.send('Servidor está funcionando!');
});

// Rota para obter informações do servidor
app.get('/info', (req, res) => {
    res.json({
        status: 'Servidor ativo',
        port: PORT,
        message: 'API para envio de e-mails'
    });
});

// Inicializa o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
