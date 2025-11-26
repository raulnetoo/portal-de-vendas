// src/components/Topbar.jsx

import React from 'react';
import './Topbar.css'; // Estilos para o Topbar

function Topbar({ nomeUsuario, nomeEmpresa, onLogout }) {
  return (
    <header className="topbar">
      <div className="topbar-logo">
        <span className="logo-text">Portal de Vendas</span>
      </div>
      <div className="topbar-info">
        <span className="user-info">
          Olá, **{nomeUsuario}**
        </span>
        <span className="company-info">
          Empresa: **{nomeEmpresa}**
        </span>
        <button onClick={onLogout} className="logout-button">
          Sair
        </button>
      </div>
    </header>
  );
}

export default Topbar;