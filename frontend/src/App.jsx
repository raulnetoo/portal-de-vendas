// src/App.jsx

import React, { useState } from 'react';
import Login from './Login';
import Dashboard from './Dashboard'; 
import './App.css'; // Estilos globais (deixe este arquivo com o conteúdo que você preferir, ou apague o conteúdo padrão)

function App() {
  // Onde armazenamos as informações do usuário logado
  // Inicialmente é 'null', mostrando a tela de Login
  const [usuario, setUsuario] = useState(null);

  // Função chamada no sucesso do login
  const handleLogin = (userInfo) => {
    // userInfo será: { nome: 'João Vendedor', empresa: 'TechVendas S/A' }
    setUsuario(userInfo);
  };

  const handleLogout = () => {
    // Ao sair, o usuário volta a ser null
    setUsuario(null);
  }

  // Se o usuário estiver logado, mostra o Dashboard. Se não, mostra o Login.
  return (
    <div className="app">
      {usuario ? (
        <Dashboard usuario={usuario} onLogout={handleLogout} />
      ) : (
        <Login onLoginSuccess={handleLogin} />
      )}
    </div>
  );
}

export default App;