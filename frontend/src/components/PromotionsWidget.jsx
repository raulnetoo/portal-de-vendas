// src/components/PromotionsWidget.jsx

import React from 'react';
import './PromotionsWidget.css';

// Dados simulados de promoções
const mockPromocoes = [
    { id: 1, nome: 'Liquidação de Fim de Ano', prazo: '15/Dez', produtos: 'PI-001B, SPD-450' },
    { id: 2, nome: 'Frete Grátis Sudeste', prazo: '30/Nov', produtos: 'Todos os produtos' },
    { id: 3, nome: 'Desconto 10% Óleos Sintéticos', prazo: '25/Nov', produtos: 'OS-5W30' },
];

function PromotionsWidget() {
    return (
        <div className="promotions-widget">
            <div className="promo-header">
                <h2>📣 Promoções Ativas ({mockPromocoes.length})</h2>
                <span className="promo-tag">ALERTA!</span>
            </div>
            
            <ul className="promo-list">
                {mockPromocoes.map(promo => (
                    <li key={promo.id} className="promo-item">
                        <div className="promo-details">
                            <span className="promo-nome">{promo.nome}</span>
                            <span className="promo-produtos">Produtos: {promo.produtos}</span>
                        </div>
                        <div className="promo-prazo">
                            Válido até: <strong>{promo.prazo}</strong>
                        </div>
                    </li>
                ))}
            </ul>
            {mockPromocoes.length === 0 && (
                <p className="no-promo-message">Nenhuma promoção ativa no momento.</p>
            )}
        </div>
    );
}

export default PromotionsWidget;