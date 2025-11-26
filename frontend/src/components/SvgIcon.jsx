// src/components/SvgIcon.jsx

import React from 'react';

// Define os componentes SVG monocromáticos
// NOTA: 'fill="currentColor"' permite que a cor seja definida via prop 'color' ou CSS.

// =======================================================
// ÍCONES DE NAVEGAÇÃO
// =======================================================

// 1. Dashboard (Dashboar - Chart)
const DashboardIcon = (props) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"
    />
  </svg>
);

// 2. Clientes (Manter o NavIcon por enquanto)
const NavIcon = (props) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
    />
  </svg>
);

// 3. Produtos (Package 2)
const ProdutosIcon = (props) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M17 16H7V4h10m1-3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zM7 18h10v2H7z"
    />
  </svg>
);

// 4. Orçamentos (Inbox Text)
const OrcamentosIcon = (props) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10zm-3-9H7v2h10V9z"
    />
  </svg>
);

// 5. Pedidos (Order Approve)
const PedidosIcon = (props) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"
    />
  </svg>
);

// 6. Relatórios (Equalizer)
const RelatoriosIcon = (props) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M10 20h4V4h-4v16zm-6 0h4v-8H4v8zM16 9v11h4V9h-4z"
    />
  </svg>
);

// =======================================================
// ÍCONES DE USO GERAL
// =======================================================

// Ícone de Adicionar (+)
const AddIcon = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" {...props}>
    <path
      fill="currentColor"
      d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"
    />
  </svg>
);

// Ícone de Excluir (Lixeira)
const DeleteIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...props}>
    <path
      fill="currentColor"
      d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14zM15.5 4l-.71-.71c-.18-.18-.44-.29-.71-.29H9.91c-.27 0-.53.11-.71.29L8.5 4H6v2h12V4z"
    />
  </svg>
);

// Ícone de Seta para cima (Aumentar)
const ArrowUpIcon = (props) => (
    <svg viewBox="0 0 24 24" width="16" height="16" {...props}>
        <path fill="currentColor" d="M7 14l5-5 5 5z"/>
    </svg>
);

// Ícone de Seta para baixo (Diminuir)
const ArrowDownIcon = (props) => (
    <svg viewBox="0 0 24 24" width="16" height="16" {...props}>
        <path fill="currentColor" d="M7 10l5 5 5-5z"/>
    </svg>
);

// Ícone de Sair (Logout)
const LogoutIcon = (props) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path fill="currentColor" d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM5 5h7V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h7v-2H5V5z"/>
  </svg>
);


// =======================================================
// MAPA DE ÍCONES (para uso no componente SvgIcon)
// =======================================================
const icons = {
    // Menu (NOVOS ÍCONES)
    dashboard: DashboardIcon, // NOVO
    clientes: NavIcon,        // Mantido (pode ser trocado por GroupIcon, se quiser)
    produtos: ProdutosIcon,    // NOVO
    orcamentos: OrcamentosIcon, // NOVO
    pedidos: PedidosIcon,      // NOVO
    relatorios: RelatoriosIcon,  // NOVO
    
    // Geral
    nav: NavIcon, // Mantido como fallback para a seta, se necessário
    add: AddIcon,
    delete: DeleteIcon,
    arrowUp: ArrowUpIcon,
    arrowDown: ArrowDownIcon,
    logout: LogoutIcon,
};

const SvgIcon = ({ name, color, width = "24", height = "24", style = {} }) => {
  const IconComponent = icons[name];

  if (!IconComponent) {
    console.error(`Ícone não encontrado: ${name}`);
    return null;
  }

  // Define a cor via style, se fornecida, para que o 'currentColor' no SVG funcione
  const finalStyle = { ...style, color: color || style.color };

  // Renderiza o componente SVG, passando props de tamanho e estilo
  return <IconComponent width={width} height={height} style={finalStyle} />;
};

export default SvgIcon;