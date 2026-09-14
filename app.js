const gM = document.querySelector(".galeria-modal");
const iGM = document.querySelector(".galeria-modal img");
const buscadorInput = document.querySelector("#busca");
const botaoBusca = document.querySelector("#botao-busca");
const itens = document.querySelectorAll(".single-galeria");
const mensagem = document.querySelector("#nenhuma-foto");

function fecharGaleria (){
    gM.style.visibility = "hidden";
    iGM.style.transform = "scale(0)";
}

function abrirGaleria (src){
    gM.style.visibility = "visible";
    iGM.style.transform = "scale(1)";
    iGM.src = src;
}

function filtrar(){
    const value = formatString(buscadorInput.value);
    let encontrou = false;

    itens.forEach(item => {
        if (formatString(item.textContent).includes(value)) {
            item.style.display = "flex";
            encontrou = true;
        } else {
            item.style.display = "none";
        }
    });

    mensagem.style.display = encontrou ? "none" : "block";
}

buscadorInput.addEventListener("input", filtrar);
botaoBusca.addEventListener("click", filtrar);

function formatString(value){
    return value.toLowerCase().trim();
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('Service Worker registrado com sucesso!', reg))
            .catch(err => console.log('Erro ao registrar o Service Worker:', err));
    });
}
