// src/components/SvgIcon.jsx

import React from 'react';

// Define os componentes SVG monocromáticos
// NOTA: 'fill="currentColor"' permite que a cor seja definida via prop 'color' ou CSS.

// Ícone de Link/Navegação (Seta)
const NavIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...props}>
    <path
      fill="currentColor"
      d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
    />
  </svg>
);

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


/**
 * Componente centralizado para renderizar ícones SVG com cor dinâmica.
 * @param {string} name - Nome do ícone (ex: 'nav', 'add', 'delete').
 * @param {string} color - Cor para o 'fill' do SVG (padrão é branco).
 */
const SvgIcon = ({ name, color = 'white', ...rest }) => {
  const icons = {
    nav: NavIcon,
    add: AddIcon,
    delete: DeleteIcon,
    arrowup: ArrowUpIcon,
    arrowdown: ArrowDownIcon,
    // (Poderia adicionar mais ícones aqui)
  };

  const IconComponent = icons[name.toLowerCase()];

  if (!IconComponent) {
    return null; // Ícone não encontrado
  }
  
  // Aplica a cor via propriedade 'color' que é lida pelo 'currentColor' no SVG
  return <IconComponent style={{ color: color }} {...rest} />;
};

export default SvgIcon;