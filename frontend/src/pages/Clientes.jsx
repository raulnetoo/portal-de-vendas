// src/pages/Clientes.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SvgIcon from '../components/SvgIcon'; // ⬅️ NOVO: Importa o componente de ícone
import './Clientes.css';

// Simulação dos dados de clientes (em um ambiente real, viriam de uma API)
const mockClientes = [
  { id: 1, nome: 'Cliente X Indústria', cnpj: '01.234.567/0001-89', cidade: 'São Paulo', uf: 'SP', status: 'Ativo', potencial: 'Alto', ultimaCompra: '2025-10-15' },
  { id: 2, nome: 'Distribuidora Alpha Ltda.', cnpj: '02.987.654/0001-12', cidade: 'Rio de Janeiro', uf: 'RJ', status: 'Ativo', potencial: 'Médio', ultimaCompra: '2025-08-20' },
  { id: 3, nome: 'Mecânica Beta S.A.', cnpj: '03.111.222/0001-33', cidade: 'Belo Horizonte', uf: 'MG', status: 'Inativo', potencial: 'Baixo', ultimaCompra: '2024-12-01' },
  { id: 4, nome: 'Comércio Z', cnpj: '04.444.555/0001-66', cidade: 'Porto Alegre', uf: 'RS', status: 'Ativo', potencial: 'Alto', ultimaCompra: '2025-02-10' },
  { id: 5, nome: 'Indústria Omega', cnpj: '05.777.888/0001-99', cidade: 'Curitiba', uf: 'PR', status: 'Ativo', potencial: 'Médio', ultimaCompra: '2025-11-20' },
  { id: 6, nome: 'Eletro Sul', cnpj: '06.333.222/0001-11', cidade: 'Florianópolis', uf: 'SC', status: 'Inativo', potencial: 'Baixo', ultimaCompra: '2025-05-01' },
];

// Funções utilitárias
const getPotencialClass = (potencial) => `potencial-tag ${potencial.toLowerCase()}`;
const getStatusClass = (status) => `client-status ${status.toLowerCase()}`;
const formatCNPJ = (cnpj) => cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');

// Função para calcular dias desde a última compra
const calcularDiasDesdeUltimaCompra = (dataString) => {
  const dataCompra = new Date(dataString);
  const hoje = new Date();
  const diffTime = Math.abs(hoje - dataCompra);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

function Clientes() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');

  // Lógica de Filtragem
  const clientesFiltrados = mockClientes.filter(cliente => {
    const termoMatch = cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       cliente.cnpj.includes(searchTerm);
    const statusMatch = statusFilter === 'Todos' || cliente.status === statusFilter;
    return termoMatch && statusMatch;
  });

  const handleNewOrcamento = (clienteId) => {
    // Em um sistema real, você navegaria para a tela de orçamento, passando o ID do cliente
    alert(`Iniciando novo orçamento para o cliente #${clienteId}`);
    navigate('/orcamentos?clienteId=' + clienteId); 
  };
  
  const handleAddNewClient = () => {
      alert('Implementar modal ou formulário de Adicionar Novo Cliente');
  };

  return (
    <div className="clientes-container">
      <div className="clientes-header">
        <h1>👥 Gerenciamento de Clientes</h1>
        <button className="add-button" onClick={handleAddNewClient}>
            <SvgIcon name="add" color="white" width="20" height="20" />
            <span>Novo Cliente</span>
        </button>
      </div>

      <div className="clientes-toolbar">
        <input
          type="text"
          placeholder="🔍 Buscar por nome ou CNPJ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <div className="filter-group">
          <label htmlFor="status-filter">Status:</label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="Todos">Todos</option>
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
          </select>
        </div>
      </div>
      
      <p className="result-count">{clientesFiltrados.length} clientes encontrados</p>

      {/* Tabela de Clientes */}
      <div className="clientes-table-wrapper">
        <table className="clientes-table">
          <thead>
            <tr>
              <th>Cliente (Nome/Status)</th>
              <th>CNPJ</th>
              <th>Localidade</th>
              <th>Potencial</th>
              <th>Última Compra</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientesFiltrados.map(cliente => {
              const diasInativo = calcularDiasDesdeUltimaCompra(cliente.ultimaCompra);
              return (
                <tr key={cliente.id} className={cliente.status === 'Inativo' ? 'inativo-row' : ''}>
                  <td>
                    <span className="client-name">{cliente.nome}</span>
                    <span className={getStatusClass(cliente.status)}>{cliente.status}</span>
                  </td>
                  <td>{formatCNPJ(cliente.cnpj)}</td>
                  <td>{cliente.cidade} - {cliente.uf}</td>
                  <td><span className={getPotencialClass(cliente.potencial)}>{cliente.potencial}</span></td>
                  <td className="last-purchase-cell">
                    {diasInativo} dias atrás
                    {/* Exibe o aviso se inativo por mais de 60 dias E o status for 'Ativo' (sinalizando risco) */}
                    {diasInativo > 60 && cliente.status === 'Ativo' && <span className="warning-badge">⚠️ Risco!</span>} 
                    {/* Exibe o aviso se inativo por mais de 60 dias E o status for 'Inativo' (reforçando) */}
                    {diasInativo > 60 && cliente.status === 'Inativo' && <span className="warning-badge-inativo">❗ Longo Período</span>}
                  </td>
                  <td>
                    <div className="action-buttons-group">
                        <button 
                            className="action-button orcamento-button"
                            onClick={() => handleNewOrcamento(cliente.id)}
                            title="Criar novo orçamento para este cliente"
                        >
                            <SvgIcon name="add" color="currentColor" width="16" height="16" />
                            Orçamento
                        </button>
                        <button 
                            className="action-button detail-button"
                            title="Ver detalhes, histórico e contatos"
                        >
                            Detalhes
                        </button>
                    </div>
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