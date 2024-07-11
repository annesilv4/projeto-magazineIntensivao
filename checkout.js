import { desenharProdutoNoCarrinhoSimples, lerLocalStorage, apagaDoLocalStorage, salvarLocalStorage } from "./src/utilidades";

function desenharProdutosCheckout() {
    const idsProdutoCarrinhoComQuantidade = lerLocalStorage('carrinho') ?? {};
    for (const idProduto in idsProdutoCarrinhoComQuantidade) {
        desenharProdutoNoCarrinhoSimples(idProduto, "container-produtos-checkout", idsProdutoCarrinhoComQuantidade[idProduto]);
    }
}
function finalizarCompra(e) {
    e.preventDefault();
    const idsProdutoCarrinhoComQuantidade = lerLocalStorage('carrinho') ?? {};
    if (Object.keys(idsProdutoCarrinhoComQuantidade).length === 0) {
        return;
    }
    const dataAtual = new Date();
    const pedidoFeito = {
        dataPedido: dataAtual,
        pedido: idsProdutoCarrinhoComQuantidade
    }
    const historicoPedidos = lerLocalStorage('historico') ?? [];
    const historicoPedidosAtualizado = [pedidoFeito, ...historicoPedidos];
    salvarLocalStorage('historico', historicoPedidosAtualizado);
    apagaDoLocalStorage('carrinho');
    window.location.href = "./pedidos.html";
}

desenharProdutosCheckout();

document.addEventListener('submit', (evt) => finalizarCompra(evt));