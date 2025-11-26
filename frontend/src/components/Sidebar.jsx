// src/components/Sidebar.jsx

import React from 'react';
import { NavLink } from 'react-router-dom';
import SvgIcon from "./SvgIcon"; // Importação relativa (na mesma pasta)

function Sidebar() {
    return (
        <aside className="sidebar">
            <nav className="sidebar-nav">
                <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                    <SvgIcon name="nav" color="white" /> 
                    <span>Dashboard</span>
                </NavLink>
                <NavLink to="/clientes" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                    <SvgIcon name="nav" color="white" /> 
                    <span>Clientes</span>
                </NavLink>
                <NavLink to="/produtos" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                    <SvgIcon name="nav" color="white" /> 
                    <span>Produtos</span>
                </NavLink>
                <NavLink to="/orcamentos" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                    <SvgIcon name="nav" color="white" /> 
                    <span>Orçamentos</span>
                </NavLink>
                <NavLink to="/pedidos" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                    <SvgIcon name="nav" color="white" /> 
                    <span>Pedidos</span>
                </NavLink>
                <NavLink to="/relatorios" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                    <SvgIcon name="nav" color="white" /> 
                    <span>Relatórios</span>
                </NavLink>
                {/* O link de Parametrização foi removido para voltar ao estado anterior */}
            </nav>
        </aside>
    );
}

export default Sidebar;