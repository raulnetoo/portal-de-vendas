const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// 1. Middlewares
app.use(cors()); // Permite requisições de origens diferentes (seu frontend React)
app.use(express.json()); // Permite que o servidor entenda JSON

// =========================================================================
// 2. ROTA DE AUTENTICAÇÃO (LOGIN)
// =========================================================================
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (email === 'vendedor@empresa.com' && password === '12345') {
        return res.status(200).json({
            success: true,
            user: {
                nome: 'João Vendedor',
                empresa: 'TechVendas S/A'
            }
        });
    }

    res.status(401).json({
        success: false,
        message: 'Credenciais inválidas.'
    });
});

// =========================================================================
// 3. ROTA DE DADOS DO CATÁLOGO DE PRODUTOS
// =========================================================================

// Dados simulados de 30 produtos (Catálogo Industrial/Comercial)
const mockProdutosAPI = [
    { id: 1, nome: 'Peça Injetora Modelo B', codigo: 'PI-001B', preco: 1550.00, estoque: 150, categoria: 'Injeção', imagemUrl: 'https://picsum.photos/id/167/200/200', custoBase: 1085.00 },
    { id: 2, nome: 'Sensor de Pressão Digital', codigo: 'SPD-450', preco: 450.90, estoque: 85, categoria: 'Eletrônicos', imagemUrl: 'https://picsum.photos/id/15/200/200', custoBase: 315.63 },
    { id: 3, nome: 'Óleo Sintético 5W-30 (20L)', codigo: 'OS-5W30', preco: 89.90, estoque: 4500, categoria: 'Lubrificantes', imagemUrl: 'https://picsum.photos/id/101/200/200', custoBase: 62.93 },
    { id: 4, nome: 'Conector de Fibra Óptica', codigo: 'CFO-100', preco: 21.50, estoque: 1200, categoria: 'Comunicação', imagemUrl: 'https://picsum.photos/id/136/200/200', custoBase: 15.05 },
    { id: 5, nome: 'Válvula Reguladora de Fluxo', codigo: 'VRF-007', preco: 780.00, estoque: 20, categoria: 'Hidráulica', imagemUrl: 'https://picsum.photos/id/1016/200/200', custoBase: 546.00 },
    { id: 6, nome: 'Filtro de Ar Industrial', codigo: 'FAI-99A', preco: 125.00, estoque: 0, categoria: 'Filtragem', imagemUrl: 'https://picsum.photos/id/1025/200/200', custoBase: 87.50 },
    { id: 7, nome: 'Atuador Pneumático Duplo', codigo: 'APD-120', preco: 2100.00, estoque: 45, categoria: 'Pneumática', imagemUrl: 'https://picsum.photos/id/1039/200/200', custoBase: 1470.00 },
    { id: 8, nome: 'Caixa de Junção IP68', codigo: 'CJ-10x10', preco: 95.00, estoque: 850, categoria: 'Elétrica', imagemUrl: 'https://picsum.photos/id/1050/200/200', custoBase: 66.50 },
    { id: 9, nome: 'Compressor de Alta Vazão', codigo: 'CAV-300', preco: 15000.00, estoque: 5, categoria: 'Máquinas', imagemUrl: 'https://picsum.photos/id/106/200/200', custoBase: 10500.00 },
    { id: 10, nome: 'Rele de Segurança Triplo', codigo: 'RST-003', preco: 350.50, estoque: 210, categoria: 'Elétrica', imagemUrl: 'https://picsum.photos/id/1075/200/200', custoBase: 245.35 },
    { id: 11, nome: 'Rolamento Cônico 6205', codigo: 'RC-6205', preco: 55.00, estoque: 1500, categoria: 'Mecânica', imagemUrl: 'https://picsum.photos/id/1077/200/200', custoBase: 38.50 },
    { id: 12, nome: 'Graxa de Lítio (1kg)', codigo: 'GL-001', preco: 45.90, estoque: 800, categoria: 'Lubrificantes', imagemUrl: 'https://picsum.photos/id/1084/200/200', custoBase: 32.13 },
    { id: 13, nome: 'Motor Elétrico Trifásico 5CV', codigo: 'MET-5HP', preco: 3800.00, estoque: 12, categoria: 'Máquinas', imagemUrl: 'https://picsum.photos/id/111/200/200', custoBase: 2660.00 },
    { id: 14, nome: 'Kit Reparo de Bomba', codigo: 'KRB-M10', preco: 120.00, estoque: 300, categoria: 'Hidráulica', imagemUrl: 'https://picsum.photos/id/112/200/200', custoBase: 84.00 },
    { id: 15, nome: 'Termopar Tipo K', codigo: 'TK-1200', preco: 65.00, estoque: 950, categoria: 'Eletrônicos', imagemUrl: 'https://picsum.photos/id/115/200/200', custoBase: 45.50 },
    { id: 16, nome: 'Mangueira de Alta Pressão', codigo: 'MAP-1/2', preco: 25.00, estoque: 2000, categoria: 'Pneumática', imagemUrl: 'https://picsum.photos/id/122/200/200', custoBase: 17.50 },
    { id: 17, nome: 'Chave Seletora 3 Posições', codigo: 'CS-3P', preco: 35.00, estoque: 750, categoria: 'Elétrica', imagemUrl: 'https://picsum.photos/id/123/200/200', custoBase: 24.50 },
    { id: 18, nome: 'Redutor de Velocidade', codigo: 'RV-50x1', preco: 4500.00, estoque: 8, categoria: 'Mecânica', imagemUrl: 'https://picsum.photos/id/129/200/200', custoBase: 3150.00 },
    { id: 19, nome: 'Pistão Hidráulico', codigo: 'PH-100', preco: 950.00, estoque: 60, categoria: 'Hidráulica', imagemUrl: 'https://picsum.photos/id/132/200/200', custoBase: 665.00 },
    { id: 20, nome: 'Ventilador Industrial Axial', codigo: 'VIA-600', preco: 1800.00, estoque: 15, categoria: 'Máquinas', imagemUrl: 'https://picsum.photos/id/133/200/200', custoBase: 1260.00 },
];

app.get('/api/produtos', (req, res) => {
    // Retorna todos os dados simulados
    res.status(200).json({
        success: true,
        produtos: mockProdutosAPI,
    });
});

// =========================================================================
// 4. INICIA O SERVIDOR
// =========================================================================
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`Teste de Login: http://localhost:${PORT}/api/login (vendedor@empresa.com / 12345)`);
    console.log(`Dados de Produtos: http://localhost:${PORT}/api/produtos`);
});

/*
Para rodar:
1. Instale as dependências: npm install express cors
2. Execute o servidor: node server/server.js
*/