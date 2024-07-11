import { catalogo } from "./utilidades";
import { adicionarAoCarrinho } from "./menuCarrinho";

export function renderizarCatalogo() {
    for (const produtoCatalogo of catalogo) {
        const cartaoProduto = `
        <div class="border-solid w-48 my-2 mx-2 flex flex-col p-2 justify-between shadow-xl shadow-slate-400 rounded-lg group ${produtoCatalogo.feminino ? 'Feminino' : 'Masculino'}" id="card-produto-${produtoCatalogo.id}">
            <img src="./assets/img/${produtoCatalogo.imagem}.jpg" alt="${produtoCatalogo.nome} da marca ${produtoCatalogo.marca}" class='group-hover:scale-110 duration-300 my-3 rounded-lg'>
            <p class="text-sm">${produtoCatalogo.marca}</p>
            <p class='text-sm'>${produtoCatalogo.nome}</p>
            <p class='text-sm'>$${produtoCatalogo.preco}</p>
            <button id='adicionar-${produtoCatalogo.id}' class='bg-slate-950 text-slate-200 hover:bg-slate-700'><i class="fa-solid fa-cart-plus"></i></button>
        </div>`;

        document.getElementById('container-produto').innerHTML += cartaoProduto;
    }


    for (const produtoCatalogo of catalogo) {
        document.getElementById(`adicionar-${produtoCatalogo.id}`).addEventListener('click', () => adicionarAoCarrinho(produtoCatalogo.id));
    }
}