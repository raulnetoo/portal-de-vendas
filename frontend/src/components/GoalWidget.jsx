// src/components/GoalWidget.jsx

import React from 'react';
import './GoalWidget.css';

function GoalWidget({ metaTotal, atingido }) {
  // Cálculo de progresso
  const percentual = Math.min(100, (atingido / metaTotal) * 100).toFixed(1);
  const restante = metaTotal - atingido;

  // Formatação em moeda (simples)
  const formatCurrency = (value) => `R$ ${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;

  return (
    <div className="widget goal-widget">
      <h3>🎯 Meta de Vendas - Mês Atual</h3>
      <div className="goal-summary">
        <div className="goal-item">
          <span className="label">Meta Total:</span>
          <span className="value primary">{formatCurrency(metaTotal)}</span>
        </div>
        <div className="goal-item">
          <span className="label">Atingido:</span>
          <span className="value success">{formatCurrency(atingido)}</span>
        </div>
        <div className="goal-item">
          <span className="label">Faltando:</span>
          <span className="value danger">{formatCurrency(restante > 0 ? restante : 0)}</span>
        </div>
      </div>

      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${percentual}%` }}></div>
      </div>
      <p className="progress-text">{percentual}% da meta alcançada</p>
    </div>
  );
}

export default GoalWidget;