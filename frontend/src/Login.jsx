// src/Login.jsx

import React, { useState } from 'react';
import './Login.css'; // Importa os estilos
import logo from './assets/img/logo.png';

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Lógica de Simulação de Autenticação:
    // Em um sistema real, aqui você faria uma chamada para a sua API (backend).
    
    // Credenciais de Teste:
    if (email === 'vendedor@empresa.com' && password === '12345') {
      // Chama a função de sucesso no App.jsx, passando os dados do vendedor
      onLoginSuccess({ 
          nome: 'João Vendedor', 
          empresa: 'TechVendas S/A' 
      });
    } else {
        // Alerta de erro para credenciais inválidas
        alert('Credenciais inválidas. Tente novamente.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img 
      src={logo} 
      alt="Logo Grupo Lukma" 
      className="login-logo"/>
        <h2>Grupo Lukma</h2>
        <p>Portal de Vendas</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">E-mail/Usuário</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Entrar</button>
          <a href="#" className="forgot-password">Esqueceu a senha?</a>
        </form>
      </div>
    </div>
  );
}

export default Login;