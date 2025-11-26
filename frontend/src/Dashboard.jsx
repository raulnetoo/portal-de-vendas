// src/Dashboard.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

// Componentes de Layout
import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';

// Componentes do Dashboard (Widgets)
import GoalWidget from './components/GoalWidget';
import IAAlertWidget from './components/IAAlertWidget';
import PromotionsWidget from './components/PromotionsWidget'; // NOVO WIDGET DE PROMOÇÕES

// Componentes de Páginas (Estrutura src/pages/)
import Produtos from './pages/Produtos'; 
import Clientes from './pages/Clientes'; 
import Orcamentos from './pages/Orcamentos'; 
import Pedidos from './pages/Pedidos'; 
import Relatorios from './pages/Relatorios'; // ÚLTIMA TELA ANALYTICS

// Importa o CSS principal do Layout
import './Dashboard.css';

// =========================================================================
// 1. Componentes de Conteúdo (Telas/Páginas)
// =========================================================================

/**
 * Componente que representa a tela principal do Dashboard (Home).
 */
const HomeDashboard = () => (
    <div className="dashboard-content-area">
        <h1>📊 Resumo da Performance</h1>

        {/* --- 1. NOVO WIDGET: Alerta de Promoções Ativas --- */}
        <PromotionsWidget /> 

        {/* --- 2. Widget de Metas --- */}
        <GoalWidget
            metaTotal={250000} // R$ 250.000,00
            atingido={185450.50} // R$ 185.450,50
        />

        {/* --- 3. Widget de IA de Vendas --- */}
        <IAAlertWidget />

        {/* --- 4. Área para Outros Indicadores --- */}
        <div style={{ marginTop: '30px' }}>
            <h2>🚀 Indicadores Chave</h2>
            <p>Em breve: Total de Pedidos, Ticket Médio, Orçamentos Pendentes.</p>
        </div>
    </div>
);


// =========================================================================
// 2. Componente de Layout Principal (MainLayout)
// =========================================================================

/**
 * Componente de Layout (Container) que define a estrutura fixa (Topbar e Sidebar).
 */
const MainLayout = ({ usuario, onLogout }) => (
  <div className="app-layout">
    {/* Cabeçalho Fixo */}
    <Topbar
        nomeUsuario={usuario.nome}
        nomeEmpresa={usuario.empresa}
        onLogout={onLogout}
    />
    
    <div className="main-area">
      {/* Menu Lateral Fixo */}
      <Sidebar />
      
      {/* Área de Conteúdo Variável */}
      <main className="content-container">
        {/* O Outlet renderiza o componente da rota atual (HomeDashboard, Produtos, etc.) */}
        <Outlet />
      </main>
    </div>
  </div>
);

// =========================================================================
// 3. Componente Principal (Dashboard) - Gerenciamento de Rotas
// =========================================================================

/**
 * Componente principal do sistema, responsável por gerenciar as rotas.
 */
function Dashboard({ usuario, onLogout }) {
  return (
    <Router>
        <Routes>
            {/* Rota base que aplica o MainLayout a todas as sub-rotas */}
            <Route path="/" element={<MainLayout usuario={usuario} onLogout={onLogout} />}>
                
                {/* Rota Index (Home): Exibe o Dashboard */}
                <Route index element={<HomeDashboard />} />
                
                {/* Rotas de Funcionalidades Principais */}
                <Route path="produtos" element={<Produtos />} />
                <Route path="clientes" element={<Clientes />} />
                <Route path="orcamentos" element={<Orcamentos />} />
                <Route path="pedidos" element={<Pedidos />} />
                <Route path="relatorios" element={<Relatorios />} />
                
            </Route>
        </Routes>
    </Router>
  );
}

export default Dashboard;