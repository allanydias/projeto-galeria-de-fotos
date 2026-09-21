// ELEMENTOS
const gM = document.querySelector(".galeria-modal");
const iGM = document.querySelector(".galeria-modal img");
const buscadorInput = document.querySelector("#busca");
const botaoBusca = document.querySelector("#botao-busca");
const mensagem = document.querySelector("#nenhuma-foto");
const galeria = document.getElementById("galeria");

const btnCamera = document.getElementById("btnCamera");
const cameraModal = document.getElementById("cameraModal");
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const btnCapturar = document.getElementById("btnCapturar");
const btnFecharCamera = document.getElementById("btnFecharCamera");

let streamAtual = null;

// INDEXEDDB 
const DB_NAME = "galeriaDB";
const DB_VERSION = 1;
const STORE_NAME = "fotos";

function abrirBanco() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
            }
        };

        request.onsuccess = (event) => resolve(event.target.result);
        request.onerror = (event) => reject(event.target.error);
    });
}

async function salvarFoto(blob) {
    const db = await abrirBanco();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readwrite");
        const store = tx.objectStore(STORE_NAME);
        const request = store.add({ blob, data: new Date().toISOString() });

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

async function listarFotos() {
    const db = await abrirBanco();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readonly");
        const store = tx.objectStore(STORE_NAME);
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

btnCamera.addEventListener("click", abrirCamera);
btnFecharCamera.addEventListener("click", fecharCamera);
btnCapturar.addEventListener("click", capturarFoto);

async function abrirCamera() {
    try {
        streamAtual = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" },
            audio: false
        });
        video.srcObject = streamAtual;
        cameraModal.classList.add("ativo");
    } catch (err) {
        console.error("Erro ao acessar a câmera:", err);
        alert("Não foi possível acessar a câmera. Verifique as permissões do navegador.");
    }
}

function fecharCamera() {
    if (streamAtual) {
        streamAtual.getTracks().forEach(track => track.stop());
        streamAtual = null;
    }
    cameraModal.classList.remove("ativo");
}

function capturarFoto() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(async (blob) => {
        if (!blob) return;
        await salvarFoto(blob);
        adicionarNaGaleria(blob, "Foto tirada agora");
        fecharCamera();
    }, "image/jpeg", 0.9);
}


function adicionarNaGaleria(blob, legenda = "Foto") {
    const url = URL.createObjectURL(blob);

    const div = document.createElement("div");
    div.classList.add("single-galeria");

    const img = document.createElement("img");
    img.src = url;
    img.alt = legenda;
    img.addEventListener("click", () => abrirGaleria(url));

    const p = document.createElement("p");
    p.textContent = legenda;

    div.appendChild(img);
    div.appendChild(p);
    galeria.prepend(div);
}

async function carregarFotosSalvas() {
    const fotos = await listarFotos();
    fotos.reverse().forEach(foto => {
        adicionarNaGaleria(foto.blob, "Foto salva");
    });
}

carregarFotosSalvas();

// MODAL DE VISUALIZAÇÃO 
function fecharGaleria() {
    gM.style.visibility = "hidden";
    iGM.style.transform = "scale(0)";
}

function abrirGaleria(src) {
    gM.style.visibility = "visible";
    iGM.style.transform = "scale(1)";
    iGM.src = src;
}


function filtrar() {
    const value = formatString(buscadorInput.value);
    const itens = document.querySelectorAll(".single-galeria");
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

function formatString(value) {
    return value.toLowerCase().trim();
}

buscadorInput.addEventListener("input", filtrar);
botaoBusca.addEventListener("click", filtrar);

//  SERVICE WORKER 
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("./sw.js")
            .then(reg => console.log("Service Worker registrado com sucesso!", reg))
            .catch(err => console.log("Erro ao registrar o Service Worker:", err));
    });
}