// src/pages/Parametrizacao.jsx

import React from 'react';
import './Parametrizacao.css'; // Importa um CSS que você deve criar

// Página acessível apenas por Gerentes
function Parametrizacao({ usuario }) {
    
    // Simulação da regra de checagem de acesso feita no App.jsx,
    // apenas para garantir que a página é vista como restrita.
    if (usuario.permissao < 3) {
        return (
            <div className="parametrizacao-container">
                <h1>🛑 Acesso Não Autorizado</h1>
                <p>Você não tem permissão de Gerente para acessar esta área.</p>
            </div>
        );
    }
    
    return (
        <div className="parametrizacao-container dashboard-content-area">
            <h1>⚙️ Parametrização do Sistema</h1>
            <p>Bem-vindo, **{usuario.nome}** (Gerente). Aqui você pode definir regras de negócio, como:</p>
            <ul>
                <li>Limite de Margem de Bloqueio (Red)</li>
                <li>Limite de Margem de Aprovação Automática (Green)</li>
                <li>Hierarquia de aprovação</li>
                <li>Tabelas de Preços, etc.</li>
            </ul>
            <div style={{ marginTop: '20px', padding: '15px', border: '1px dashed #ccc' }}>
                <p>**Esta funcionalidade será implementada em breve.**</p>
            </div>
        </div>
    );
}

export default Parametrizacao;