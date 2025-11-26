// src/components/IAAlertWidget.jsx

import React from 'react';
import './IAAlertWidget.css';

const iaData = [
  {
    cliente: 'Cliente X Indústria',
    compraEsperada: 100000,
    compraAtual: 50000,
    produtoFoco: 'Peça Injetora Modelo B',
    sugestao: 'Venda perdida de 50%. A IA detectou baixa compra da Peça Injetora Modelo B, essencial para o período. Contate e reforce o estoque.'
  },
  {
    cliente: 'Distribuidora Alpha',
    compraEsperada: 45000,
    compraAtual: 52000,
    produtoFoco: 'Lançamento Z - Acessório',
    sugestao: 'Parabéns! Meta superada em 7K. Sugestão: Ofereça o Lançamento Z - Acessório, pois este cliente tende a comprar novidades após atingir a meta.'
  },
];

function IAAlertWidget() {
  return (
    <div className="widget ia-alert-widget">
      <h3>🤖 Inteligência de Vendas Proativa</h3>
      <p className="ia-intro">Orientações da IA para alavancar suas vendas e bater a meta.</p>
      <div className="alerts-list">
        {iaData.map((alerta, index) => (
          <div key={index} className="ia-alert-card">
            <span className="alert-icon">💡</span>
            <div className="alert-details">
              <p className="alert-title">Oportunidade no **{alerta.cliente}**</p>
              <p className="alert-text">{alerta.sugestao}</p>
              <p className="alert-metrics">
                <span className="metric-tag">Esp.: {alerta.compraEsperada.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                <span className="metric-tag">Atual: {alerta.compraAtual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
              </p>
            </div>
            <button className="alert-action">Abrir Cliente</button>
          </div>
        ))}
        {iaData.length === 0 && <p>Nenhum alerta de IA no momento. Bom trabalho!</p>}
      </div>
    </div>
  );
}

export default IAAlertWidget;