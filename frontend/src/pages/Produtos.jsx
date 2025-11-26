// src/pages/Produtos.jsx (REVERTIDO)

import React, { useState } from 'react';
import ProdutoCard from '../components/ProdutoCard'; // Assumindo que este componente existe
import './Produtos.css';

// Dados simulados
const mockProdutos = [
    { id: 1, nome: 'Peça Injetora Modelo B', codigo: 'PI-001B', preco: 1550.00, estoque: 150, imagem: '/src/assets/produto1.jpg' },
    { id: 2, nome: 'Sensor de Pressão Digital', codigo: 'SPD-450', preco: 450.90, estoque: 85, imagem: '/src/assets/produto2.jpg' },
    { id: 3, nome: 'Óleo Sintético 5W-30 (20L)', codigo: 'OS-5W30', preco: 89.90, estoque: 4500, imagem: '/src/assets/produto3.jpg' },
    { id: 4, nome: 'Conector de Fibra Óptica', codigo: 'CFO-100', preco: 21.50, estoque: 1200, imagem: '/src/assets/produto4.jpg' },
    { id: 5, nome: 'Válvula Reguladora de Fluxo', codigo: 'VRF-007', preco: 780.00, estoque: 20, imagem: '/src/assets/produto5.jpg' },
];

const formatCurrency = (value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });


const ProdutoListView = ({ produtos }) => (
    <div className="produtos-list-wrapper">
        <table className="produtos-list-table">
            <thead>
                <tr>
                    <th className="img-col"></th>
                    <th>Nome do Produto</th>
                    <th>Código</th>
                    <th>Preço</th>
                    <th>Estoque</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {produtos.map(produto => (
                    <tr key={produto.id}>
                        <td className="img-col">
                            <img 
                                src={produto.imagem || '/src/assets/placeholder.jpg'} 
                                alt={produto.nome} 
                                className="produto-miniatura" 
                            />
                        </td>
                        <td>{produto.nome}</td>
                        <td>{produto.codigo}</td>
                        <td>{formatCurrency(produto.preco)}</td>
                        <td>
                            {produto.estoque} un.
                            {produto.estoque < 50 && <span className="estoque-baixo"> (Baixo!)</span>}
                        </td>
                        <td>
                            <button className="add-carrinho-list-btn" onClick={() => alert(`Adicionado: ${produto.nome}`)}>
                                + Carrinho
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);


function Produtos() { // REVERTIDO: Não aceita a prop usuario
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState('grid'); 

    const produtosFiltrados = mockProdutos.filter(produto =>
        produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        produto.codigo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="produtos-container dashboard-content-area">
            <header className="produtos-header">
                <h1>📦 Catálogo de Produtos</h1>
            </header>

            <div className="produtos-toolbar">
                <div className="view-mode-selector">
                    <button 
                        className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                        onClick={() => setViewMode('list')}
                    >
                        📋 Lista (Tabela)
                    </button>
                    <button 
                        className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                        onClick={() => setViewMode('grid')}
                    >
                        🖼️ Biblioteca (Cards)
                    </button>
                </div>
                
                <input
                    type="text"
                    placeholder="🔍 Buscar por nome ou código..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>

            <p className="result-count">{produtosFiltrados.length} produtos encontrados</p>
            
            {viewMode === 'grid' ? (
                <div className="produtos-grid">
                    {produtosFiltrados.map(produto => (
                        <ProdutoCard key={produto.id} produto={produto} />
                    ))}
                </div>
            ) : (
                <ProdutoListView produtos={produtosFiltrados} />
            )}

            {produtosFiltrados.length === 0 && <p className="no-results">Nenhum produto encontrado com os filtros aplicados.</p>}
        </div>
    );
}

export default Produtos;