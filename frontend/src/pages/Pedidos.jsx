// src/pages/Pedidos.jsx

import React, { useState } from 'react';
import './Pedidos.css';

// Simulação dos dados de pedidos (em um ambiente real, viriam de uma API)
const mockPedidos = [
  { id: 1001, cliente: 'Cliente X Indústria', total: 15500.00, data: '2025-11-20', status: 'Faturado' },
  { id: 1002, cliente: 'Distribuidora Alpha Ltda.', total: 450.90, data: '2025-11-22', status: 'Aguardando Faturamento' },
  { id: 1003, cliente: 'Mecânica Beta S.A.', total: 899.90, data: '2025-11-23', status: 'Em Separação' },
  { id: 1004, cliente: 'Comércio Z', total: 2105.50, data: '2025-11-24', status: 'Cancelado' },
  { id: 1005, cliente: 'Indústria Omega', total: 12000.00, data: '2025-11-24', status: 'Aguardando Faturamento' },
];

const formatCurrency = (value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const formatDate = (dateString) => new Date(dateString).toLocaleDateString('pt-BR');

function Pedidos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Todos');

  // Lógica de Filtragem
  const pedidosFiltrados = mockPedidos
    .filter(pedido => {
      // Filtro por termo de busca (ID ou Cliente)
      const term = searchTerm.toLowerCase();
      const matchesSearch = String(pedido.id).includes(term) ||
                            pedido.cliente.toLowerCase().includes(term);
      
      // Filtro por Status
      const matchesStatus = filterStatus === 'Todos' || pedido.status === filterStatus;

      return matchesSearch && matchesStatus;
    });

  const getStatusClass = (status) => {
    switch (status) {
      case 'Faturado': return 'status-faturado';
      case 'Aguardando Faturamento': return 'status-aguardando';
      case 'Em Separação': return 'status-separacao';
      case 'Cancelado': return 'status-cancelado';
      default: return '';
    }
  };

  return (
    <div className="pedidos-container dashboard-content-area">
      <header className="pedidos-header">
        <h1>🛒 Pedidos de Venda Gerados</h1>
      </header>

      <div className="pedidos-toolbar">
        {/* Campo de Busca Rápida */}
        <input
          type="text"
          placeholder="🔍 Buscar por ID do Pedido ou Cliente..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        {/* Filtro de Status */}
        <div className="filter-group">
          <label>Status:</label>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="Todos">Todos</option>
            <option value="Aguardando Faturamento">Aguardando Faturamento</option>
            <option value="Em Separação">Em Separação</option>
            <option value="Faturado">Faturado</option>
            <option value="Cancelado">Cancelado</option>
          </select>
        </div>
      </div>

      <p className="result-count">{pedidosFiltrados.length} pedidos encontrados</p>

      {/* Tabela de Pedidos */}
      <div className="pedidos-table-wrapper">
        <table className="pedidos-table">
          <thead>
            <tr>
              <th>ID Pedido</th>
              <th>Cliente</th>
              <th>Data</th>
              <th>Status</th>
              <th>Total</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pedidosFiltrados.length > 0 ? (
              pedidosFiltrados.map(pedido => (
                <tr key={pedido.id}>
                  <td data-label="ID Pedido">#{pedido.id}</td>
                  <td data-label="Cliente" className="pedido-cliente">{pedido.cliente}</td>
                  <td data-label="Data">{formatDate(pedido.data)}</td>
                  <td data-label="Status">
                    <span className={`status-tag ${getStatusClass(pedido.status)}`}>
                      {pedido.status}
                    </span>
                  </td>
                  <td data-label="Total" className="pedido-total">{formatCurrency(pedido.total)}</td>
                  <td data-label="Ações">
                    <button className="action-button detail-button" onClick={() => alert(`Detalhes do Pedido #${pedido.id}`)}>
                      Detalhes
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-results">Nenhum pedido encontrado com os filtros aplicados.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Pedidos;