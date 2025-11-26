// src/components/Topbar.jsx

import React from 'react';
import Logo from '../assets/img/logo.png';
import SvgIcon from './SvgIcon'; // ⬅️ NOVO: Importa SvgIcon
import './Topbar.css'; // Estilos para o Topbar

function Topbar({ nomeUsuario, nomeEmpresa, onLogout }) {
  return (
    <header className="topbar">
      <div className="topbar-logo">
        <img 
          src={Logo} 
          alt="Portal de Vendas Logo" 
          className="topbar-logo-img" 
        />
      </div>
      <div className="topbar-info">
        <span className="user-info">
          Olá, **{nomeUsuario}**
        </span>
        <span className="company-info">
          Empresa: **{nomeEmpresa}**
        </span>
        {/* ⬅️ ALTERADO: Botão de Sair com Ícone */}
        <button onClick={onLogout} className="logout-button" title="Sair">
          <SvgIcon name="logout" width="20" height="20" color="white" />
        </button>
      </div>
    </header>
  );
}

export default Topbar;