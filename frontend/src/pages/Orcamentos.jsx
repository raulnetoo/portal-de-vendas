// src/pages/Orcamentos.jsx (COMPLETO)

import React, { useState, useEffect } from 'react';
import './Orcamentos.css';
import SvgIcon from '../components/SvgIcon'; 

// =========================================================================
// DADOS SIMULADOS (Mocados)
// =========================================================================
const mockClientes = [
    { id: 1, nome: 'Cliente X Indústria', cnpj: '01.234.567/0001-89', cidade: 'São Paulo', uf: 'SP', isSuframa: true },
    { id: 2, nome: 'Distribuidora Alpha Ltda.', cnpj: '02.987.654/0001-12', cidade: 'Rio de Janeiro', uf: 'RJ', isSuframa: false },
    { id: 3, nome: 'Comércio Beta', cnpj: '99.999.999/0001-99', cidade: 'Manaus', uf: 'AM', isSuframa: false },
];

const mockProdutos = [
    // Margem Inerente (1 - Custo/Preco) é 30% para todos no Preço '001'
    { id: 1, nome: 'Peça Injetora Modelo B', codigo: 'PI-001B', precos: { '001': 1550.00, '002': 1600.00 }, custoBase: 1085.00 },
    { id: 2, nome: 'Sensor de Pressão Digital', codigo: 'SPD-450', precos: { '001': 450.90, '002': 480.00 }, custoBase: 315.63 },
    { id: 3, nome: 'Óleo Sintético 5W-30 (20L)', codigo: 'OS-5W30', precos: { '001': 89.90, '002': 95.00 }, custoBase: 62.93 },
    { id: 4, nome: 'Válvula Reguladora de Fluxo', codigo: 'VRF-007', precos: { '001': 780.00, '002': 800.00 }, custoBase: 546.00 },
];

// =========================================================================
// FUNÇÕES AUXILIARES
// =========================================================================

// Formatação monetária (Moeda BRL)
const formatCurrency = (value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

// Análise do Sinaleiro de Margem
const analisarMargem = (margemPercentual) => {
    // Regras de Negócio Simuladas:
    const MARGEM_BLOQUEIO = 15; // Abaixo de 15% bloqueia o pedido
    const MARGEM_ALERTA = 25;   // Entre 15% e 25% exige aprovação (Pendência)

    if (margemPercentual < MARGEM_BLOQUEIO) {
        return { 
            cor: 'red', 
            texto: 'Margem Crítica', 
            bloqueado: true,
            pendente: false
        };
    } else if (margemPercentual < MARGEM_ALERTA) {
        return { 
            cor: 'yellow', 
            texto: 'Pend. Supervisor', 
            bloqueado: false,
            pendente: true
        };
    } else {
        return { 
            cor: 'green', 
            texto: 'Aprovado', 
            bloqueado: false,
            pendente: false
        };
    }
};


// =========================================================================
// COMPONENTE PRINCIPAL: ORCAMENTOS
// =========================================================================

function Orcamentos() {
    // Simulação: Começamos com o Cliente X (ID 1)
    const [clienteId, setClienteId] = useState(1);
    // Simulação: Itens no orçamento
    const [itens, setItens] = useState([
        { produtoId: 1, quantidade: 2, precoTabela: 1550.00, custoBase: 1085.00, precoFinal: 1550.00, precoBase: '001' },
        { produtoId: 2, quantidade: 5, precoTabela: 450.90, custoBase: 315.63, precoFinal: 430.00, precoBase: '001' },
    ]);
    const [descontoGlobal, setDescontoGlobal] = useState(0); // Desconto em R$
    const [frete, setFrete] = useState(150.00); 

    // Cliente atualmente selecionado
    const clienteSelecionado = mockClientes.find(c => c.id === clienteId);

    // =========================================================================
    // CÁLCULOS PRINCIPAIS
    // =========================================================================

    // 1. Cálculo do Subtotal
    const subTotal = itens.reduce((acc, item) => 
        acc + (item.precoFinal * item.quantidade), 0
    );

    // 2. Cálculo do Custo Total
    const custoTotal = itens.reduce((acc, item) => 
        acc + (item.custoBase * item.quantidade), 0
    );

    // 3. Cálculo do Total Geral (Bruto)
    const totalGeralBruto = subTotal + frete;

    // 4. Cálculo do Total Final (Líquido)
    const totalFinal = Math.max(0, totalGeralBruto - descontoGlobal);

    // 5. Cálculo do Lucro e Margem
    const lucroBruto = totalFinal - custoTotal;
    const margemPercentual = totalFinal > 0 ? (lucroBruto / totalFinal) * 100 : 0;
    
    // Análise da margem para o sinaleiro
    const statusSinaleiro = analisarMargem(margemPercentual);

    // =========================================================================
    // HANDLERS (Funções de Ação)
    // =========================================================================

    // Handler para alterar a quantidade de um item
    const handleUpdateQuantidade = (produtoId, delta) => {
        setItens(prevItens => 
            prevItens.map(item => 
                item.produtoId === produtoId ? { ...item, quantidade: Math.max(1, item.quantidade + delta) } : item
            )
        );
    };

    // Handler para remover um item
    const handleRemoveItem = (produtoId) => {
        setItens(prevItens => prevItens.filter(item => item.produtoId !== produtoId));
    };

    // Handler para alterar o preço final (permitir negociação/desconto no item)
    const handleUpdatePrecoFinal = (produtoId, novoPreco) => {
        // Validação básica para evitar valores negativos
        const preco = parseFloat(novoPreco) > 0 ? parseFloat(novoPreco) : 0;
        
        setItens(prevItens => 
            prevItens.map(item => 
                item.produtoId === produtoId ? { ...item, precoFinal: preco } : item
            )
        );
    };
    
    const handleSalvar = () => {
        alert("Simulação: Orçamento salvo com sucesso!");
    };
    
    // Simulação de adicionar produto (pode ser integrado com a página Produtos)
    const handleAddProduto = () => {
        const novoProdutoId = 4; // Válvula Reguladora de Fluxo
        const produtoInfo = mockProdutos.find(p => p.id === novoProdutoId);
        
        if (!itens.find(i => i.produtoId === novoProdutoId) && produtoInfo) {
            setItens(prevItens => [...prevItens, { 
                produtoId: novoProdutoId,
                quantidade: 1,
                precoTabela: produtoInfo.precos['001'],
                custoBase: produtoInfo.custoBase,
                precoFinal: produtoInfo.precos['001'],
                precoBase: '001',
            }]);
        } else {
            alert("Válvula Reguladora de Fluxo já está no orçamento. Tente alterar a quantidade.");
        }
    };


    // =========================================================================
    // RENDERIZAÇÃO
    // =========================================================================

    return (
        <div className="orcamentos-container">
            <h1>📝 Novo Orçamento de Vendas</h1>

            {/* ------------------------------------------- */}
            {/* --- 1. Informações do Cliente --- */}
            {/* ------------------------------------------- */}
            <div className="orcamento-cliente-info">
                <SvgIcon name="client" color="#3b82f6" width="30" height="30" />
                <div className="client-details">
                    <p className="client-name">Cliente: <strong>{clienteSelecionado.nome}</strong></p>
                    <p className="client-cnpj">CNPJ: {clienteSelecionado.cnpj}</p>
                    <p className="client-local">Local: {clienteSelecionado.cidade} - {clienteSelecionado.uf}</p>
                </div>
                {clienteSelecionado.isSuframa && (
                    <span className="suframa-tag">ZFM - SUFRAMA</span>
                )}
            </div>

            {/* ------------------------------------------- */}
            {/* --- 2. Itens do Orçamento --- */}
            {/* ------------------------------------------- */}
            <div className="orcamento-itens-area">
                <div className="itens-header">
                    <h2>Itens ({itens.length})</h2>
                    <button className="add-item-button" onClick={handleAddProduto}>
                        + Adicionar Produto (Simulado)
                    </button>
                </div>
                
                <table className="itens-table">
                    <thead>
                        <tr>
                            <th>Produto</th>
                            <th className="center-col">Preço Tabela (R$)</th>
                            <th className="center-col">Preço Negociado (R$)</th>
                            <th className="center-col">Qtde</th>
                            <th className="right-col">Subtotal (R$)</th>
                            <th className="action-col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itens.map(item => {
                            const produtoInfo = mockProdutos.find(p => p.id === item.produtoId);
                            const produtoNome = produtoInfo ? produtoInfo.nome : 'Produto Desconhecido';
                            
                            // Calcula o valor total deste item (Preço Negociado * Quantidade)
                            const itemSubtotal = item.precoFinal * item.quantidade;
                            
                            // Calcula o percentual de desconto aplicado no item
                            const descontoItem = 1 - (item.precoFinal / item.precoTabela);
                            const descontoText = descontoItem > 0 ? `(-${(descontoItem * 100).toFixed(1)}%)` : '';
                            
                            return (
                                <tr key={item.produtoId}>
                                    <td className="item-name-cell">{produtoNome}</td>
                                    
                                    <td className="center-col">
                                        <span className="preco-tabela">{formatCurrency(item.precoTabela)}</span>
                                    </td>
                                    
                                    <td className="center-col price-edit-cell">
                                        <input
                                            type="number"
                                            value={item.precoFinal.toFixed(2)}
                                            onChange={(e) => handleUpdatePrecoFinal(item.produtoId, e.target.value)}
                                            step="0.01"
                                            min="0.01"
                                            className="preco-input"
                                        />
                                        <span className="desconto-tag">{descontoText}</span>
                                    </td>
                                    
                                    <td className="center-col quantity-cell">
                                        <div className="quantity-controls">
                                            <button onClick={() => handleUpdateQuantidade(item.produtoId, -1)} disabled={item.quantidade === 1}>
                                                <SvgIcon name="arrowDown" color="#333" width="16" height="16" />
                                            </button>
                                            <span className="quantity-value">{item.quantidade}</span>
                                            <button onClick={() => handleUpdateQuantidade(item.produtoId, 1)}>
                                                <SvgIcon name="arrowUp" color="#333" width="16" height="16" />
                                            </button>
                                        </div>
                                    </td>
                                    
                                    <td className="right-col total-item">{formatCurrency(itemSubtotal)}</td>
                                    
                                    <td className="action-col">
                                        <button className="remove-item-button" onClick={() => handleRemoveItem(item.produtoId)}>
                                            <SvgIcon name="delete" color="white" width="18" height="18" />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* ------------------------------------------- */}
            {/* --- 3. Resumo e Fechamento --- */}
            {/* ------------------------------------------- */}
            <div className="orcamento-resumo-fechamento">
                
                {/* 3.1. Totais */}
                <div className="totais-area">
                    <div className="resumo-linha">
                        <span>Subtotal Produtos:</span>
                        <span className="valor">{formatCurrency(subTotal)}</span>
                    </div>
                    <div className="resumo-linha">
                        <span>Frete:</span>
                        <input
                            type="number"
                            value={frete.toFixed(2)}
                            onChange={(e) => setFrete(parseFloat(e.target.value) || 0)}
                            step="0.01"
                            min="0"
                            className="frete-input"
                        />
                    </div>
                    <div className="resumo-linha total-bruto">
                        <span>Total Bruto:</span>
                        <span className="valor">{formatCurrency(totalGeralBruto)}</span>
                    </div>
                    
                    <div className="resumo-linha desconto-line">
                        <span>Desconto Global (R$):</span>
                        <input
                            type="number"
                            value={descontoGlobal.toFixed(2)}
                            onChange={(e) => setDescontoGlobal(parseFloat(e.target.value) || 0)}
                            step="0.01"
                            min="0"
                            className="desconto-input"
                        />
                    </div>

                    <div className="resumo-linha total-final">
                        <span>TOTAL FINAL:</span>
                        <span className="valor">{formatCurrency(totalFinal)}</span>
                    </div>
                </div>

                {/* 3.2. Sinaleiro e Ações */}
                <div className="fechamento-area">
                    
                    {/* Sinaleiro de Margem */}
                    <div className={`sinaleiro-margem status-${statusSinaleiro.cor}`}>
                        <span>Margem de Lucro:</span>
                        <span>{margemPercentual.toFixed(1)}%</span>
                    </div>
                    
                    <div className="lucro-info">
                        <span>Lucro Bruto (R$):</span>
                        <span className="valor">{formatCurrency(lucroBruto)}</span>
                    </div>
                    
                    <div className="action-buttons-group">
                        <div className="observacoes-field">
                            <label htmlFor="obs">Observações (Internas):</label>
                            <textarea
                                id="obs"
                                placeholder="Condições de pagamento, prazo de entrega, etc."
                                rows="3"
                                className="observacoes-textarea"
                            />
                        </div>
                        
                        <div className="action-buttons-final">
                            <button className="salvar-button" onClick={handleSalvar}>
                                💾 Salvar Orçamento
                            </button>
                            <button 
                                className={`pedido-button status-${statusSinaleiro.cor}`} 
                                onClick={() => {
                                    if (statusSinaleiro.bloqueado) {
                                        alert('🛑 Não é possível efetivar: Margem de lucro abaixo do limite de bloqueio.');
                                    } else if (statusSinaleiro.pendente) {
                                        alert('⚠️ Pedido enviado para autorização do Supervisor. Status: PENDENTE.');
                                    } else {
                                        alert('✅ Pedido Aprovado e Efetivado com sucesso!');
                                    }
                                }}
                                disabled={itens.length === 0 || statusSinaleiro.bloqueado}
                            >
                                🚀 Gerar Pedido ({statusSinaleiro.texto})
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Orcamentos;