// src/components/ProdutoCard.jsx

import React from 'react';
import './ProdutoCard.css';

function ProdutoCard({ produto }) {
    
    const formatCurrency = (value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    const isAvailable = produto.estoque > 0;
    const estoqueClass = isAvailable ? 'estoque-in' : 'estoque-out';
    const estoqueText = isAvailable ? `Estoque: ${produto.estoque}` : 'Em Falta';

    return (
        <div className="produto-card">
            <img src={produto.imagemUrl} alt={produto.nome} className="produto-image" />
            <div className="produto-details">
                <h4 className="produto-name">{produto.nome}</h4>
                <p className="produto-code">Cód: {produto.codigo}</p>
                
                <div className="produto-info">
                    <span className={`produto-estoque ${estoqueClass}`}>{estoqueText}</span>
                    <span className="produto-categoria">{produto.categoria}</span>
                </div>

                <div className="produto-actions">
                    <span className="produto-price">{formatCurrency(produto.preco)}</span>
                    <button 
                        className="add-to-cart-button" 
                        disabled={!isAvailable}
                        title={!isAvailable ? 'Produto indisponível no estoque' : 'Adicionar ao Orçamento'}
                    >
                        + Orçamento
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProdutoCard;