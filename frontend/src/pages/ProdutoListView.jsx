// src/pages/ProdutoListView.jsx

import React from 'react';
import { NavLink } from 'react-router-dom';

// Função para formatar moeda
const formatCurrency = (value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

// Componente de Visualização em Lista (Tabela)
function ProdutoListView({ produtos }) {
    
    // Função utilitária para obter a URL da imagem (apenas simulação)
    const getImageUrl = (imagePath) => {
        // Em um ambiente real, você trataria o caminho da imagem aqui.
        return imagePath || 'https://via.placeholder.com/40x40?text=S/I';
    };

    return (
        <div className="produtos-list-container">
            <table className="produtos-table">
                <thead>
                    <tr>
                        <th>Produto</th>
                        <th>Código</th>
                        <th className="text-right">Preço</th>
                        <th className="text-center">Estoque</th>
                        <th className="text-center">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map(produto => {
                        const isAvailable = produto.estoque > 0;
                        const estoqueClass = !isAvailable ? 'estoque-baixo' : '';

                        return (
                            <tr key={produto.id}>
                                <td>
                                    <img 
                                        src={getImageUrl(produto.imagem)} 
                                        alt={produto.nome} 
                                        className="produto-miniatura" 
                                    />
                                    {produto.nome}
                                </td>
                                <td>{produto.codigo}</td>
                                <td className="text-right">{formatCurrency(produto.preco)}</td>
                                <td className={`text-center ${estoqueClass}`}>
                                    {produto.estoque}
                                    {!isAvailable && <span className="estoque-baixo">BAIXO</span>}
                                </td>
                                <td className="text-center">
                                    <button 
                                        className="add-carrinho-list-btn"
                                        disabled={!isAvailable}
                                        title={!isAvailable ? 'Produto indisponível no estoque' : 'Adicionar ao Orçamento'}
                                    >
                                        + Orçamento
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ProdutoListView;