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
    { id: 1, nome: 'Peça Injetora Modelo B', codigo: 'PI-001B', precos: { '001': 1550.00, '002': 1600.00 }, custoBase: 1085.00, ipi: 0.10, st: 0.05, estoque: 150, imagem: '/src/assets/produto1.jpg', isPromocao: true },
    { id: 2, nome: 'Sensor de Pressão Digital', codigo: 'SPD-450', precos: { '001': 450.90, '002': 470.00 }, custoBase: 315.63, ipi: 0.05, st: 0.0, estoque: 85, imagem: '/src/assets/produto2.jpg', isPromocao: false },
    { id: 3, nome: 'Óleo Sintético 5W-30 (20L)', codigo: 'OS-5W30', precos: { '001': 89.90, '002': 95.00 }, custoBase: 62.93, ipi: 0.05, st: 0.0, estoque: 4500, imagem: '/src/assets/produto3.jpg', isPromocao: true },
    { id: 4, nome: 'Válvula Reguladora', codigo: 'VRF-007', precos: { '001': 780.00, '002': 780.00 }, custoBase: 546.00, ipi: 0.00, st: 0.12, estoque: 20, imagem: '/src/assets/produto4.jpg', isPromocao: false },
    { id: 5, nome: 'Conector de Fibra Óptica', codigo: 'CFO-100', precos: { '001': 21.50, '002': 25.00 }, custoBase: 15.05, ipi: 0.00, st: 0.00, estoque: 1200, imagem: '/src/assets/produto5.jpg', isPromocao: false },
];

const mockTabelas = [{ cod: '001', desc: 'Padrão' }, { cod: '002', desc: 'Atacado' }];

const userCanApplyTotalDiscount = (userId) => userId === 1;

// FUNÇÃO CENTRAL DE CÁLCULO
const calcularItem = (item, isClienteSuframa) => {
    let { precoBase, quantidade, descontoPercentualItem, ipi, st } = item;
    const descontoValorItem = precoBase * (descontoPercentualItem / 100);
    const precoUnitarioLiquido = precoBase - descontoValorItem;
    const totalLiquido = precoUnitarioLiquido * quantidade;
    const ipiEfetivo = isClienteSuframa ? 0 : ipi; 
    const valorIpi = totalLiquido * ipiEfetivo;
    const valorSt = totalLiquido * st;
    const totalGeralItem = totalLiquido + valorIpi + valorSt;

    return {
        ...item,
        precoUnitarioLiquido: precoUnitarioLiquido,
        valorIpi: valorIpi,
        valorSt: valorSt,
        totalLiquido: totalLiquido,
        totalGeralItem: totalGeralItem,
    };
};

// =========================================================================
// COMPONENTE ORÇAMENTOS
// =========================================================================

function Orcamentos({ userId = 1 }) {

    // HARDCODED para Sinaleiro (Até a tela de Parametrização ser implementada)
    // ALTERAÇÃO: 25.00% torna os preços base (30%) APROVADOS
    const margemMinBloqueio = 10.00;
    const margemMinPendente = 10.01;
    const margemMinAprovacao = 25.00; 

    // Estados
    const [clienteId, setClienteId] = useState(mockClientes[0]?.id || null);
    const [itens, setItens] = useState([]);
    const [produtoBusca, setProdutoBusca] = useState('');
    const [descontoTotalPercentual, setDescontoTotalPercentual] = useState(0);
    const [observacoes, setObservacoes] = useState('');
    const [tabelaPadrao, setTabelaPadrao] = useState('001');

    const clienteAtual = mockClientes.find(c => c.id === clienteId);
    const podeDarDescontoTotal = userCanApplyTotalDiscount(userId);

    // EFEITO: Recalcula IPI/ST de todos os itens APENAS se o Cliente mudar (regra Suframa).
    useEffect(() => {
        if (itens.length > 0 && clienteAtual) {
            const isSuframa = clienteAtual.isSuframa;
            setItens(prevItens => prevItens.map(item => calcularItem(item, isSuframa)));
        }
    }, [clienteAtual, clienteId]); 


    // Lógica de Adição (Adiciona ou incrementa um produto)
    const handleAddProduto = (produtoSimulado, tabela = tabelaPadrao) => {
        const itemExistente = itens.find(item => item.id === produtoSimulado.id);
        const precoBase = produtoSimulado.precos[tabela];
        const isSuframa = clienteAtual ? clienteAtual.isSuframa : false;
        
        if (itemExistente) {
            handleUpdateItem(itemExistente.id, 'quantidade', itemExistente.quantidade + 1);
        } else {
            const novoItemBase = {
                id: produtoSimulado.id,
                nome: produtoSimulado.nome,
                codigo: produtoSimulado.codigo,
                imagem: produtoSimulado.imagem,
                precoBase: precoBase,
                tabelaPreco: tabela,
                quantidade: 1,
                descontoPercentualItem: 0,
                ipi: produtoSimulado.ipi,
                st: produtoSimulado.st,
            };
            const novoItemCalculado = calcularItem(novoItemBase, isSuframa);
            setItens(prevItens => [...prevItens, novoItemCalculado]);
        }
    };

    // Altera o preço base, desconto percentual ou quantidade
    const handleUpdateItem = (id, field, newValue) => {
        const isSuframa = clienteAtual ? clienteAtual.isSuframa : false;

        setItens(prevItens => prevItens.map(item => {
            if (item.id !== id) return item;

            let updatedItem = { ...item };
            const produtoOriginal = mockProdutos.find(p => p.id === item.id);
            const precoTabelaAtual = produtoOriginal.precos[item.tabelaPreco];
            const parseValue = (val, isInt = false) => isInt ? parseInt(val) || 0 : parseFloat(val) || 0;

            // --- Lógica de Modificação ---
            if (field === 'quantidade') {
                updatedItem.quantidade = parseValue(newValue, true);
            } else if (field === 'descontoPercentualItem') {
                updatedItem.descontoPercentualItem = Math.min(parseValue(newValue), 100);
            } else if (field === 'precoManual') {
                const precoManual = parseValue(newValue);
                
                if (precoManual < precoTabelaAtual) {
                    const novoDesconto = ((precoTabelaAtual - precoManual) / precoTabelaAtual) * 100;
                    updatedItem.descontoPercentualItem = Math.min(novoDesconto, 100);
                    updatedItem.precoBase = precoTabelaAtual;
                } else {
                    updatedItem.precoBase = precoManual; 
                    updatedItem.descontoPercentualItem = 0; 
                }
            } else if (field === 'tabelaPreco') {
                updatedItem.tabelaPreco = newValue;
                updatedItem.precoBase = produtoOriginal.precos[newValue];
                updatedItem.descontoPercentualItem = 0;
            }
            
            // --- CÁLCULO IMEDIATO APÓS A MUDANÇA ---
            return calcularItem(updatedItem, isSuframa); 
            
        }).filter(item => item.quantidade > 0)); 
    };
    
    // Remove um item do carrinho
    const handleRemoveItem = (id) => {
        setItens(prevItens => prevItens.filter(item => item.id !== id));
    };

    // Lógica de Busca e Filtro (Mantida)
    const produtosEncontrados = mockProdutos.filter(produto => {
        const term = produtoBusca.toLowerCase();
        const regex = new RegExp(term, 'i'); 
        return regex.test(produto.nome) || regex.test(produto.codigo);
    });

    const produtosPreview = produtosEncontrados.slice(0, 5);


    // Cálculos de Totais (Mantidos)
    const subTotalLiquido = itens.reduce((acc, item) => acc + item.totalLiquido, 0);
    const totalIPI = itens.reduce((acc, item) => acc + (item.valorIpi || 0), 0);
    const totalST = itens.reduce((acc, item) => acc + (item.valorSt || 0), 0);

    const descontoTotalValor = subTotalLiquido * (descontoTotalPercentual / 100);
    
    const totalProdutosAposDesconto = subTotalLiquido - descontoTotalValor;
    const totalGeralComImpostos = totalProdutosAposDesconto + totalIPI + totalST;


    // =========================================================================
    // LÓGICA DE MARGEM E SINALEIRO
    // =========================================================================

    // 1. Calcular Custo Total do Pedido
    const custoTotalPedido = itens.reduce((acc, item) => {
        const produtoOriginal = mockProdutos.find(p => p.id === item.id);
        // O custoBase do produto Original deve ser usado
        const custoBase = produtoOriginal ? produtoOriginal.custoBase : 0; 
        return acc + (custoBase * item.quantidade);
    }, 0);

    // 2. Calcular Lucro e Margem
    const vendaTotalLiquida = subTotalLiquido - descontoTotalValor;
    const lucroBruto = vendaTotalLiquida - custoTotalPedido;
    const margemLucroPercentual = vendaTotalLiquida > 0 ? (lucroBruto / vendaTotalLiquida) * 100 : 0;

    // 3. Função Sinaleiro de Margem
    const getSinaleiroStatus = (margem) => {
        if (margem <= margemMinBloqueio) {
            return { cor: 'red', texto: 'BLOQUEADO', bloqueado: true, pendente: false };
        } else if (margem > margemMinBloqueio && margem < margemMinAprovacao) {
            // Regra corrigida para ser mais inclusiva: > 10.00% E < 25.00%
            return { cor: 'yellow', texto: 'PENDENTE', bloqueado: false, pendente: true };
        } else {
            // >= 25.00% (Aprovado)
            return { cor: 'green', texto: 'APROVADO', bloqueado: false, pendente: false };
        }
    };

    const statusSinaleiro = getSinaleiroStatus(margemLucroPercentual);

    // Funções de Formato
    const formatCurrency = (value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const formatPercent = (value) => `${value.toFixed(2)}%`;

    // Ação Salvar 
    const handleSalvar = () => {
        if (!clienteAtual) {
            alert("Selecione um cliente para salvar o orçamento.");
            return;
        }
        if (itens.length === 0) {
            alert("Adicione produtos antes de salvar.");
            return;
        }
        alert(`Orçamento salvo! Cliente: ${clienteAtual.nome}, Total Geral: R$ ${totalGeralComImpostos.toFixed(2)}`);
    };


    // =========================================================================
    // Renderização com Ícones SVG
    // =========================================================================
    return (
        <div className="orcamentos-container dashboard-content-area">
            <h1>📝 Orçamento e Catálogo Rápido</h1>
            
            {/* BLOCO DE CLIENTE */}
            <div className="orcamento-cliente-info">
                <div className="cliente-selector-group">
                    <label htmlFor="cliente-select">Cliente:</label>
                    <select
                        id="cliente-select"
                        value={clienteId || ''}
                        onChange={(e) => setClienteId(parseInt(e.target.value))} 
                        className="cliente-select-dropdown"
                    >
                        {mockClientes.map(cliente => (
                            <option key={cliente.id} value={cliente.id}>
                                {cliente.nome} ({cliente.cnpj})
                            </option>
                        ))}
                    </select>
                </div>

                {clienteAtual && (
                    <>
                        <p>Local: **{clienteAtual.cidade} - {clienteAtual.uf}**</p>
                        <span className={`suframa-badge ${clienteAtual.isSuframa ? 'suframa-on' : 'suframa-off'}`}>
                            Suframa: **{clienteAtual.isSuframa ? 'SIM' : 'NÃO'}**
                        </span>
                    </>
                )}
                {!clienteAtual && <p>Nenhum cliente selecionado.</p>}
            </div>


            {/* LAYOUT PRINCIPAL: Catálogo (Esquerda) e Carrinho (Direita) */}
            <div className="orcamento-main-grid">

                {/* COLUNA ESQUERDA: Catálogo e Busca */}
                <div className="orcamento-catalog-col">
                    <h4 className="col-title">Catálogo de Produtos</h4>
                    
                    <div className="catalog-toolbar">
                        <input
                            type="text"
                            placeholder="Buscar por código ou nome (Top 5)..."
                            value={produtoBusca}
                            onChange={(e) => setProdutoBusca(e.target.value)}
                            className="search-input"
                        />
                        <div className="tabela-padrao-selector">
                            <label>Tabela Padrão:</label>
                            <select value={tabelaPadrao} onChange={(e) => setTabelaPadrao(e.target.value)}>
                                {mockTabelas.map(t => <option key={t.cod} value={t.cod}>{t.cod}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="catalog-preview-grid">
                        {produtoBusca.length > 0 && produtosPreview.length > 0 ? (
                            produtosPreview.map(produto => (
                                <div key={produto.id} className="catalog-product-card">
                                    <img 
                                        src={produto.imagem || '/src/assets/placeholder.jpg'} 
                                        alt={produto.nome} 
                                        className="product-miniatura" 
                                    />
                                    <div className="product-details">
                                        <span className="product-code">{produto.codigo}</span>
                                        <span className="product-name">**{produto.nome}**</span>
                                        <span className="product-price">R$ {produto.precos[tabelaPadrao].toFixed(2)}</span>
                                    </div>
                                    <div className="product-actions">
                                        {produto.isPromocao && <span className="promo-tag">PROMO!</span>}
                                        <button 
                                            className="add-carrinho-btn" 
                                            onClick={() => handleAddProduto(produto, tabelaPadrao)}
                                            disabled={!clienteAtual}
                                        >
                                            {/* ÍCONE DE ADICIONAR - VERDE */}
                                            <SvgIcon name="add" color="#10b981" /> 
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            produtoBusca.length > 0 && <p className="no-results">Nenhum produto encontrado.</p>
                        )}
                        {produtoBusca.length === 0 && <p className="no-results">Digite no campo acima para buscar produtos.</p>}
                    </div>
                </div>

                {/* COLUNA DIREITA: Carrinho e Resumo */}
                <div className="orcamento-carrinho-col">
                    <h4 className="col-title">Itens do Orçamento ({itens.length})</h4>
                    
                    <div className="carrinho-itens-list">
                        {itens.length === 0 && <p className="carrinho-vazio">Adicione itens do catálogo ao lado. 👈</p>}

                        {itens.map(item => {
                            const produtoOriginal = mockProdutos.find(p => p.id === item.id);
                            const precoTabelaAtual = produtoOriginal.precos[item.tabelaPreco];
                            const precoManualInput = item.precoBase * (1 - (item.descontoPercentualItem / 100));

                            return (
                                <div key={item.id} className="carrinho-item">
                                    <img src={item.imagem || '/src/assets/placeholder.jpg'} alt={item.nome} className="item-foto" />
                                    
                                    <div className="item-info">
                                        <div className="item-name-row">
                                            <span className="item-code">[{item.tabelaPreco}] {item.codigo}</span>
                                            <span className="item-name">**{item.nome}**</span>
                                        </div>
                                        
                                        <div className="item-tax-row">
                                            <span className="tax-info">IPI: {item.ipi * 100}%</span>
                                            <span className="tax-info">ST: {item.st * 100}%</span>
                                            {clienteAtual?.isSuframa && <span className="suframa-isento-tag">SUFRAMA ISENTO</span>}
                                        </div>
                                    </div>

                                    <div className="item-controls">
                                        {/* 1. Controle de Quantidade */}
                                        <div className="qty-control">
                                            {/* ÍCONE DE DIMINUIR - AZUL */}
                                            <button onClick={() => handleUpdateItem(item.id, 'quantidade', item.quantidade - 1)}>
                                                <SvgIcon name="arrowdown" color="#3b82f6" /> 
                                            </button>
                                            <input 
                                                type="number" 
                                                min="1" 
                                                value={item.quantidade} 
                                                onChange={(e) => handleUpdateItem(item.id, 'quantidade', e.target.value)}
                                            />
                                            {/* ÍCONE DE AUMENTAR - AZUL */}
                                            <button onClick={() => handleUpdateItem(item.id, 'quantidade', item.quantidade + 1)}>
                                                <SvgIcon name="arrowup" color="#3b82f6" /> 
                                            </button>
                                        </div>

                                        <div className="price-discount-row">
                                            <div className="discount-input-group">
                                                <label>Desc %</label>
                                                <input 
                                                    type="number" 
                                                    min="0"
                                                    max="100"
                                                    value={item.descontoPercentualItem.toFixed(1)}
                                                    onChange={(e) => handleUpdateItem(item.id, 'descontoPercentualItem', e.target.value)}
                                                />
                                            </div>

                                            <div className="price-input-group">
                                                <label>R$ Líq</label>
                                                <input 
                                                    type="number" 
                                                    min="0" 
                                                    step="0.01"
                                                    value={precoManualInput.toFixed(2)}
                                                    onChange={(e) => handleUpdateItem(item.id, 'precoManual', e.target.value)}
                                                />
                                            </div>
                                            
                                        </div>
                                        
                                        <div className="item-total-price">
                                            Total: **{formatCurrency(item.totalGeralItem || 0)}**
                                            <span className="item-preco-tabela">Tabela: {formatCurrency(precoTabelaAtual)}</span>
                                        </div>

                                        {/* 4. Botão de Excluir */}
                                        <button className="remove-item-btn" onClick={() => handleRemoveItem(item.id)}>
                                            {/* ÍCONE DE EXCLUIR - VERMELHO */}
                                            <SvgIcon name="delete" color="#ef4444" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    
                    <div className="carrinho-resumo-final">
                        <div className="totais-fiscais">
                            <span className="fiscal-total">IPI: R$ {totalIPI.toFixed(2)}</span>
                            <span className="fiscal-total">ST: R$ {totalST.toFixed(2)}</span>
                        </div>
                        
                        {/* SINALEIRO DE MARGEM */}
                        <div className={`sinaleiro-margem status-${statusSinaleiro.cor}`}>
                            <span>Margem Lucro: **{formatPercent(margemLucroPercentual)}**</span>
                            <span className="sinaleiro-texto">{statusSinaleiro.texto}</span>
                        </div>

                        {podeDarDescontoTotal && (
                            <div className="total-discount-row">
                                <span>Desconto Pedido (%)</span>
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    step="0.01"
                                    value={descontoTotalPercentual}
                                    onChange={(e) => setDescontoTotalPercentual(parseFloat(e.target.value) || 0)}
                                    className="desconto-total-input"
                                />
                                <span className="value-desconto">R$ {descontoTotalValor.toFixed(2)}</span>
                            </div>
                        )}
                        
                        <div className="total-geral-final">
                            <span>TOTAL GERAL:</span>
                            <span className="final-value">{formatCurrency(totalGeralComImpostos)}</span>
                        </div>
                        
                        <div className="observacoes-area">
                            <label>Observações:</label>
                            <textarea
                                rows="3"
                                value={observacoes}
                                onChange={(e) => setObservacoes(e.target.value)}
                                placeholder="Notas para faturamento/logística..."
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