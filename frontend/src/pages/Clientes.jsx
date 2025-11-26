// src/pages/Clientes.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Clientes.css';

// Simulação dos dados de clientes (em um ambiente real, viriam de uma API)
const mockClientes = [
  { id: 1, nome: 'Cliente X Indústria', cnpj: '01.234.567/0001-89', cidade: 'São Paulo', uf: 'SP', status: 'Ativo', potencial: 'Alto', ultimaCompra: '2025-10-15' },
  { id: 2, nome: 'Distribuidora Alpha Ltda.', cnpj: '02.987.654/0001-12', cidade: 'Rio de Janeiro', uf: 'RJ', status: 'Ativo', potencial: 'Médio', ultimaCompra: '2025-08-20' },
  { id: 3, nome: 'Mecânica Beta S.A.', cnpj: '03.111.222/0001-33', cidade: 'Belo Horizonte', uf: 'MG', status: 'Inativo', potencial: 'Baixo', ultimaCompra: '2024-12-01' },
  { id: 4, nome: 'Comércio Z', cnpj: '04.444.555/0001-66', cidade: 'Porto Alegre', uf: 'RS', status: 'Ativo', potencial: 'Alto', ultimaCompra: '2025-11-20' },
  { id: 5, nome: 'Indústria Omega', cnpj: '05.789.012/0001-99', cidade: 'Curitiba', uf: 'PR', status: 'Inativo', potencial: 'Alto', ultimaCompra: '2025-05-10' },
];

const getDiasDesdeUltimaCompra = (dataString) => {
  const dataCompra = new Date(dataString);
  const hoje = new Date();
  const diffTime = Math.abs(hoje - dataCompra);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

function Clientes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Todos');
  const [filterPotencial, setFilterPotencial] = useState('Todos');
  const navigate = useNavigate();

  // Função para simular o início de um novo orçamento
  const handleNewOrcamento = (clienteId) => {
    // Em um sistema real, você navegaria para a tela de orçamento com o ID do cliente
    alert(`Iniciando novo orçamento para o Cliente ID: ${clienteId}`);
    // Exemplo de navegação:
    // navigate(`/orcamentos/novo?clienteId=${clienteId}`);
  };

  // Lógica de Filtragem e Busca
  const clientesFiltrados = mockClientes
    .filter(cliente => {
      // 1. Filtro por termo de busca (Nome, CNPJ ou Cidade)
      const term = searchTerm.toLowerCase();
      const matchesSearch = cliente.nome.toLowerCase().includes(term) ||
                            cliente.cnpj.includes(term) ||
                            cliente.cidade.toLowerCase().includes(term);
      
      // 2. Filtro por Status
      const matchesStatus = filterStatus === 'Todos' || cliente.status === filterStatus;

      // 3. Filtro por Potencial
      const matchesPotencial = filterPotencial === 'Todos' || cliente.potencial === filterPotencial;

      return matchesSearch && matchesStatus && matchesPotencial;
    });

  return (
    <div className="clientes-container dashboard-content-area">
      <header className="clientes-header">
        <h1>👤 Cadastro de Clientes</h1>
        <button className="add-button" onClick={() => alert('Abrir modal de Novo Cliente')}>
          + Novo Cliente
        </button>
      </header>

      <div className="clientes-toolbar">
        {/* Campo de Busca Rápida */}
        <input
          type="text"
          placeholder="🔍 Buscar por Nome, CNPJ ou Cidade..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        {/* Filtros Inteligentes */}
        <div className="filter-group">
          <label>Status:</label>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="Todos">Todos</option>
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Potencial:</label>
          <select value={filterPotencial} onChange={(e) => setFilterPotencial(e.target.value)}>
            <option value="Todos">Todos</option>
            <option value="Alto">Alto</option>
            <option value="Médio">Médio</option>
            <option value="Baixo">Baixo</option>
          </select>
        </div>
      </div>

      <p className="result-count">{clientesFiltrados.length} clientes encontrados</p>

      {/* Tabela de Clientes */}
      <div className="clientes-table-wrapper">
        <table className="clientes-table">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>CNPJ/CPF</th>
              <th>Local</th>
              <th>Potencial</th>
              <th>Última Compra</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientesFiltrados.map(cliente => {
              const diasInativo = getDiasDesdeUltimaCompra(cliente.ultimaCompra);
              return (
                <tr key={cliente.id} className={cliente.status === 'Inativo' ? 'inativo-row' : ''}>
                  <td>
                    <span className="client-name">{cliente.nome}</span>
                    <span className={`client-status ${cliente.status.toLowerCase()}`}>{cliente.status}</span>
                  </td>
                  <td>{cliente.cnpj}</td>
                  <td>{cliente.cidade} - {cliente.uf}</td>
                  <td><span className={`potencial-tag ${cliente.potencial.toLowerCase()}`}>{cliente.potencial}</span></td>
                  <td>
                    {diasInativo} dias atrás
                    {diasInativo > 60 && <span className="warning-badge">⚠️ Inativo!</span>}
                  </td>
                  <td>
                    <button 
                      className="action-button orcamento-button"
                      onClick={() => handleNewOrcamento(cliente.id)}
                    >
                      Novo Orçamento
                    </button>
                    <button className="action-button detail-button">Detalhes</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {clientesFiltrados.length === 0 && <p className="no-results">Nenhum cliente encontrado com os filtros aplicados.</p>}
    </div>
  );
}

export default Clientes;