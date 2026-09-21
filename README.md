# 📷 Galeria de Fotos PWA

Projeto acadêmico desenvolvido como exercício de faculdade. Uma aplicação web progressiva (PWA) que funciona como uma galeria de fotos: permite tirar fotos pela câmera do dispositivo, salvá-las diretamente no app e visualizá-las em um grid responsivo — podendo ser instalada na tela inicial do celular como um aplicativo nativo.

## ✨ Funcionalidades

- 🖼️ Grid de fotos responsivo, com efeitos visuais ao passar o mouse
- 🔍 Busca por nome/legenda das fotos
- 🔎 Visualização ampliada em modal ao clicar em uma foto
- 📸 Captura de fotos direto pela câmera do dispositivo (`getUserMedia`), sem sair do app
- 💾 Fotos salvas localmente no navegador (IndexedDB) — persistem mesmo após fechar o app
- 📲 PWA instalável: funciona offline (Service Worker) e pode ser adicionada à tela inicial do celular com ícone próprio

## 🛠️ Tecnologias Utilizadas

- **HTML5** – Estrutura da aplicação
- **CSS3** – Estilização, grid, responsividade e efeitos visuais
- **JavaScript** – Lógica da busca, da câmera e do controle dos modais
- **IndexedDB** – Armazenamento local das fotos capturadas
- **Service Worker** – Cache e funcionamento offline
- **Web App Manifest** – Instalação como PWA
- **Font Awesome** – Ícones da interface (lupa da busca, câmera)
- **Unsplash** – Imagens públicas utilizadas como exemplo no grid inicial

## 📸 Como funciona a câmera

1. Toque em **"Tirar Foto"** para abrir a câmera ao vivo em um modal
2. A pré-visualização da câmera aparece em tela cheia
3. Toque no botão de captura para tirar a foto
4. A foto é salva automaticamente no IndexedDB e aparece no topo da galeria, sem precisar recarregar a página

## ▶️ Como rodar a aplicação localmente

1. Faça o download ou clone este repositório
2. Abra a pasta do projeto
3. Abra o arquivo `index.HTML` com um servidor local (ex: extensão **Live Server** do VS Code)

> ⚠️ A câmera (`getUserMedia`) só funciona em contexto seguro (HTTPS ou `localhost`). Abrir o `index.HTML` direto pelo navegador (`file://`) não vai pedir permissão de câmera.

## 📲 Como instalar como PWA no celular

1. Acesse a URL de produção (deploy na Vercel) pelo navegador do celular
2. **No Android (Chrome):** toque no menu (⋮) e selecione "Instalar app" ou "Adicionar à tela inicial"
3. **No iOS (Safari):** toque em Compartilhar e selecione "Adicionar à Tela de Início"
4. O ícone do app aparece na tela inicial e ele pode ser aberto como um aplicativo independente, inclusive offline

## 📁 Estrutura de arquivos

```
projeto-galeria-de-fotos/
├── index.HTML
├── style.css
├── app.js
├── sw.js
├── manifest.json
├── icon-192.png
├── icon-512.png
└── README.md
```
## Autores

<a href="https://github.com/allanydias/projeto-galeria-de-fotos/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=allanydias/projeto-galeria-de-fotos" />
</a>