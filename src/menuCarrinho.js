// import { document } from "postcss"; recurso tirado por ter dado problema na página
import { catalogo, salvarLocalStorage, lerLocalStorage } from "./utilidades";

const idsProdutoCarrinhoComQuantidade = lerLocalStorage('carrinho') ?? {};

function abrirCarrinho() {
    document.getElementById('carrinho').classList.add('right-[0px]');
    document.getElementById('carrinho').classList.remove('right-[-360px]');
}

function fecharCarrinho() {
    document.getElementById('carrinho').classList.remove('right-[0px]');
    document.getElementById('carrinho').classList.add('right-[-360px]');
}

function irParaCheckout() {
    if (Object.keys(idsProdutoCarrinhoComQuantidade).length === 0) {
        return;
    }
    window.location.href = "./checkout.html";
}

export function iniciarlizarCarrinho() {
    const closedCart = document.getElementById('fechar-carrinho');
    const openCart = document.getElementById('abrir-carrinho');
    const botaoFinalizarCompra = document.getElementById('finalizar-compra');

    closedCart.addEventListener('click', fecharCarrinho);
    openCart.addEventListener('click', abrirCarrinho);
    botaoFinalizarCompra.addEventListener('click', irParaCheckout);
}

function removerDoCarrinho(idProduto) {
    delete idsProdutoCarrinhoComQuantidade[idProduto];
    salvarLocalStorage('carrinho', idsProdutoCarrinhoComQuantidade);
    atualizarPrecoCarrinho();
    renderizarProdutosCarrinho();
}

function incrementarQuantidadeProduto(idProduto) {
    idsProdutoCarrinhoComQuantidade[idProduto]++;
    salvarLocalStorage('carrinho', idsProdutoCarrinhoComQuantidade);
    atualizarPrecoCarrinho();
    atualizarInformacaoQuantidade(idProduto);
}

function decrementarQuantidadeProduto(idProduto) {
    if (idsProdutoCarrinhoComQuantidade[idProduto] === 1) {
        removerDoCarrinho(idProduto);
        return;
    }
    idsProdutoCarrinhoComQuantidade[idProduto]--;
    salvarLocalStorage('carrinho', idsProdutoCarrinhoComQuantidade);
    atualizarPrecoCarrinho();
    atualizarInformacaoQuantidade(idProduto);
}

function atualizarInformacaoQuantidade(idProduto) {
    document.getElementById(`quantidade-${idProduto}`).innerText =
        idsProdutoCarrinhoComQuantidade[idProduto];
}

function desenharProdutoNoCarrinho(idProduto) {
    const produto = catalogo.find((p) => p.id === idProduto);
    const containerPordutosCarrinho = document.getElementById('produtos-carrinho');
    const elementoArticle = document.createElement('article'); //<article></article>
    const articleClasses = ["flex", "bg-slate-100", "border", "rounded-lg", "p-1", "relative"];

    for (const articleClass of articleClasses) {
        elementoArticle.classList.add(articleClass);
    }


    const cartaoProdutoCarrinho = `<button id='remover-item-${produto.id}'>
        <i class="fa-regular fa-rectangle-xmark text-slate-500 absolute top-1 right-2 hover:text-slate-800"></i>
    </button>
    <img src="./assets/img/${produto.imagem}.jpg" alt="${produto.nome}" class="h-24 rounded-lg">
    <div id="info-produto" class="flex flex-col py-2 justify-between">
        <p class="text-slate-900 text-sm">${produto.nome}</p>
        <p class="text-slate-400 text-xs">Tamanho: M</p>
        <p class="text-green-700 text-lg">$${produto.preco}</p>
    </div>
    <div class='text-slate-900 flex items-end absolute bottom-0 right-2 text-lg'>
        <button id='decrementar-produto-${produto.id}' class='hover:text-slate-400'><i class="fa-regular fa-square-minus"></i></button>
        <p id='quantidade-${produto.id}' class='ml-2'>${idsProdutoCarrinhoComQuantidade[produto.id]}</p>
        <button id='incrementar-produto-${produto.id}' class='hover:text-slate-400 ml-2'><i class="fa-regular fa-square-plus"></i></button>
    </div>`;

    elementoArticle.innerHTML = cartaoProdutoCarrinho;
    containerPordutosCarrinho.appendChild(elementoArticle);

    document.getElementById(`decrementar-produto-${produto.id}`).addEventListener('click', () => decrementarQuantidadeProduto(produto.id));
    document.getElementById(`incrementar-produto-${produto.id}`).addEventListener('click', () => incrementarQuantidadeProduto(produto.id));
    document.getElementById(`remover-item-${produto.id}`).addEventListener('click', () => removerDoCarrinho(produto.id));
}

export function renderizarProdutosCarrinho() {
    const containerPordutosCarrinho = document.getElementById("produtos-carrinho");
    containerPordutosCarrinho.innerHTML = '';

    for (const idProduto in idsProdutoCarrinhoComQuantidade) {
        desenharProdutoNoCarrinho(idProduto);
    }
}

export function adicionarAoCarrinho(idProduto) {
    if (idProduto in idsProdutoCarrinhoComQuantidade) {
        incrementarQuantidadeProduto(idProduto);
        return;
    }
    idsProdutoCarrinhoComQuantidade[idProduto] = 1;
    salvarLocalStorage('carrinho', idsProdutoCarrinhoComQuantidade);
    desenharProdutoNoCarrinho(idProduto);
    atualizarPrecoCarrinho();
}

export function atualizarPrecoCarrinho() {
    const precoCarrinho = document.getElementById('preco-total');
    let precoTotalCarrinho = 0;
    for (const idProdutoNoCarrinho in idsProdutoCarrinhoComQuantidade) {
        precoTotalCarrinho += catalogo.find((p) => p.id === idProdutoNoCarrinho).preco * idsProdutoCarrinhoComQuantidade[idProdutoNoCarrinho];
    }

    precoCarrinho.innerText = `Total: $${precoTotalCarrinho}`;
}
