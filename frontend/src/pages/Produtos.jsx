// src/pages/Produtos.jsx (COMPLETO E ATUALIZADO)

import React, { useState } from 'react';
import ProdutoCard from '../components/ProdutoCard'; 
import SvgIcon from '../components/SvgIcon'; // Necessário para ícones de botões no futuro
import './Produtos.css';

// =========================================================================
// DADOS SIMULADOS
// =========================================================================
const mockProdutos = [
    { id: 1, nome: 'Peça Injetora Modelo B', codigo: 'PI-001B', preco: 1550.00, estoque: 150, categoria: 'Injeção', imagem: 'https://via.placeholder.com/180x180/3b82f6/FFFFFF?text=PI-001B' },
    { id: 2, nome: 'Sensor de Pressão Digital', codigo: 'SPD-450', preco: 450.90, estoque: 85, categoria: 'Sensores', imagem: 'https://via.placeholder.com/180x180/10b981/FFFFFF?text=SPD-450' },
    { id: 3, nome: 'Óleo Sintético 5W-30 (20L)', codigo: 'OS-5W30', preco: 89.90, estoque: 4500, categoria: 'Lubrificantes', imagem: 'https://via.placeholder.com/180x180/f59e0b/FFFFFF?text=OS-5W30' },
    { id: 4, nome: 'Conector de Fibra Óptica', codigo: 'CFO-100', preco: 21.50, estoque: 1200, categoria: 'Conectores', imagem: 'https://via.placeholder.com/180x180/6366f1/FFFFFF?text=CFO-100' },
    { id: 5, nome: 'Válvula Reguladora de Fluxo', codigo: 'VRF-007', preco: 780.00, estoque: 20, categoria: 'Hidráulica', imagem: 'https://via.placeholder.com/180x180/ef4444/FFFFFF?text=VRF-007' },
];

const formatCurrency = (value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

// =========================================================================
// Componente: Lista de Produtos (Tabela) - Foi embutido aqui para simplicidade
// =========================================================================
function ProdutoListView({ produtos }) {
    return (
        <div className="produtos-list-view">
            <table className="produtos-table">
                <thead>
                    <tr>
                        <th className="img-col"></th>
                        <th>Nome</th>
                        <th>Código</th>
                        <th>Preço</th>
                        <th className="center-col">Estoque</th>
                        <th className="action-col">Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map(produto => (
                        <tr key={produto.id}>
                            <td className="img-col">
                                <img src={produto.imagem} alt={produto.nome} className="produto-miniatura" />
                            </td>
                            <td>{produto.nome}</td>
                            <td>{produto.codigo}</td>
                            <td>{formatCurrency(produto.preco)}</td>
                            <td className="center-col">
                                {produto.estoque} 
                                {produto.estoque < 50 && <span className="estoque-baixo"> (Baixo!)</span>}
                            </td>
                            <td className="action-col">
                                <button 
                                    className="add-carrinho-list-btn" 
                                    title="Adicionar ao Orçamento"
                                    disabled={produto.estoque === 0}
                                >
                                    + Orçamento
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}


// =========================================================================
// Componente Principal: Produtos
// =========================================================================
function Produtos() {
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState('grid'); // 'grid' ou 'list'

    // Lógica de filtro (simplificada)
    const produtosFiltrados = mockProdutos.filter(produto => 
        produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        produto.codigo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddProduct = () => {
        alert("Simulação: Abrir modal para adicionar novo produto.");
    };

    return (
        <div className="produtos-container">
            <div className="produtos-header">
                <h1>Catálogo de Produtos</h1>
                <button className="add-button" onClick={handleAddProduct}>
                    <SvgIcon name="add" color="white" width="20" height="20" /> Novo Produto
                </button>
            </div>

            <div className="produtos-toolbar">
                <div className="view-mode-toggle">
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
                        // ProdutoCard deve ser implementado separadamente (já fornecido anteriormente)
                        <ProdutoCard key={produto.id} produto={produto} />
                    ))}
                </div>
            ) : (
                // Aqui renderiza o novo componente de lista embutido
                <ProdutoListView produtos={produtosFiltrados} />
            )}

            {produtosFiltrados.length === 0 && <p className="no-results">Nenhum produto encontrado com os filtros aplicados.</p>}
        </div>
    );
}

export default Produtos;