// src/pages/Relatorios.jsx

import React, { useState } from 'react';
import './Relatorios.css';

// Dados simulados para os relatórios
const mockData = {
    metaAnual: 300000,
    vendasAcumuladas: 210500,
    topClientes: [
        { nome: 'Cliente X Indústria', volume: 85000 },
        { nome: 'Distribuidora Alpha', volume: 45000 },
        { nome: 'Comércio Z', volume: 30500 },
        { nome: 'Indústria Omega', volume: 25000 },
        { nome: 'Mecânica Beta', volume: 5000 },
    ],
    vendasMensais: [
        { mes: 'Ago', valor: 25000 },
        { mes: 'Set', valor: 35000 },
        { mes: 'Out', valor: 48000 },
        { mes: 'Nov', valor: 55000 },
        { mes: 'Dez', valor: 47500 },
    ]
};

const formatCurrency = (value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

function Relatorios() {
    const [periodo, setPeriodo] = useState('Mensal');

    // Cálculos
    const percentualMeta = ((mockData.vendasAcumuladas / mockData.metaAnual) * 100).toFixed(1);
    const metaRestante = mockData.metaAnual - mockData.vendasAcumuladas;

    return (
        <div className="relatorios-container dashboard-content-area">
            <header className="relatorios-header">
                <h1>📈 Relatórios e Analytics de Vendas</h1>
                <div className="periodo-selector">
                    <label>Período:</label>
                    <select value={periodo} onChange={(e) => setPeriodo(e.target.value)}>
                        <option value="Mensal">Mês Atual</option>
                        <option value="Trimestral">Último Trimestre</option>
                        <option value="Anual">Acumulado Anual</option>
                    </select>
                </div>
            </header>

            <div className="analytics-grid">
                
                {/* 1. Meta Anual */}
                <div className="card meta-card">
                    <h2>Performance de Meta Anual</h2>
                    <p className="meta-value">{percentualMeta}% Atingido</p>
                    <div className="progress-bar-container">
                        <div 
                            className="progress-bar-fill" 
                            style={{ width: `${percentualMeta}%` }}
                        ></div>
                    </div>
                    <div className="meta-details">
                        <span>Meta: {formatCurrency(mockData.metaAnual)}</span>
                        <span>Faltam: {formatCurrency(metaRestante)}</span>
                    </div>
                </div>

                {/* 2. Vendas Mensais (Gráfico de Linha Simulado) */}
                <div className="card vendas-mes-card">
                    <h2>Evolução das Vendas ({periodo})</h2>
                    <div className="chart-simulado line-chart">
                        {/* Simulação do Gráfico de Linha */}
                        <div className="chart-area">
                            {mockData.vendasMensais.map((item, index) => {
                                // Normalização básica para altura do gráfico
                                const maxValor = Math.max(...mockData.vendasMensais.map(v => v.valor));
                                const altura = (item.valor / maxValor) * 90; 
                                return (
                                    <div key={index} className="bar-wrapper">
                                        <div className="line-point" style={{ height: `${altura}%` }}></div>
                                        <span className="label-mes">{item.mes}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* 3. Top Clientes (Gráfico de Pizza Simulado) */}
                <div className="card top-clientes-card">
                    <h2>Top 5 Clientes em Volume</h2>
                    <div className="chart-simulado pie-chart-legend">
                        <ul>
                            {mockData.topClientes.map((cliente, index) => (
                                <li key={index}>
                                    <span className={`legend-dot dot-${index}`}></span>
                                    {cliente.nome} ({formatCurrency(cliente.volume)})
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default Relatorios;