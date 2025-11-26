// src/components/Sidebar.jsx

import React from 'react';
import { NavLink } from 'react-router-dom';
import SvgIcon from "./SvgIcon"; 

function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <h2>Portal de Vendas</h2>
            </div>
            <nav className="sidebar-nav">
                {/* Dashboard */}
                <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                    <SvgIcon name="dashboard" /> 
                    <span>Dashboard</span>
                </NavLink>

                {/* Clientes (Mantém o NavIcon por enquanto) */}
                <NavLink to="/clientes" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                    <SvgIcon name="clientes" /> 
                    <span>Clientes</span>
                </NavLink>

                {/* Produtos */}
                <NavLink to="/produtos" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                    <SvgIcon name="produtos" /> 
                    <span>Produtos</span>
                </NavLink>

                {/* Orçamentos */}
                <NavLink to="/orcamentos" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                    <SvgIcon name="orcamentos" /> 
                    <span>Orçamentos</span>
                </NavLink>

                {/* Pedidos */}
                <NavLink to="/pedidos" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                    <SvgIcon name="pedidos" /> 
                    <span>Pedidos</span>
                </NavLink>

                {/* Relatórios */}
                <NavLink to="/relatorios" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                    <SvgIcon name="relatorios" /> 
                    <span>Relatórios</span>
                </NavLink>
                
            </nav>
        </aside>
    );
}

export default Sidebar;