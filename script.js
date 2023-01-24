let imagensConvertidas = [];

function converterImagens(event) {
    let arquivos;

    // Limpa o histórico de imagens convertidas
    imagensConvertidas = [];
    document.getElementById("converted-images").innerHTML = "";

    // Verifica se foi passado um evento (indicando que a imagem foi solta)
    if (event) {
        // Previne que o navegador saia da página
        event.preventDefault();
        // Pega a lista de arquivos soltos
        arquivos = event.dataTransfer.files;
    } else {
        // Pega a lista de arquivos selecionados
        arquivos = document.getElementById('image-file').files;
    }

    // Percorre a lista de arquivos
    for (let i = 0; i < arquivos.length; i++) {
        let reader = new FileReader();

        // Lê o arquivo como uma URL
        reader.readAsDataURL(arquivos[i]);

        reader.onloadend = function() {
            // Pega a qualidade e as dimensões desejadas
            let quality = document.getElementById('quality').value;
            let width = document.getElementById('width').value;
            let height = document.getElementById('height').value;

            // Cria uma imagem para carregar a imagem original
            let img = new Image();
            img.src = reader.result;

            img.onload = function() {
                // Define as dimensões do canvas
                let canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;

                // Desenha a imagem original no canvas
                let ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                // Converte a imagem para o formato WebP
                let imagemConvertida = canvas.toDataURL('image/webp', quality);

                // Adiciona as imagens convertidas à lista
                imagensConvertidas.push(imagemConvertida);

                // Adiciona as imagens convertidas como miniaturas
                let imagem = document.createElement('img');
                imagem.src = reader.result;
                imagem.style.width = "5%";
                document.getElementById('converted-images').appendChild(imagem);
            }
        }
    }
}

function downloadImagens() {
    // Pede o nome para salvar as imagens
    let nomeImagem = prompt("Insira o nome para salvar as imagens:");
    if (!nomeImagem) {
      return;
    }
  
    // Percorre a lista de imagens convertidas e inicia o download
    for (let i = 0; i < imagensConvertidas.length; i++) {
      let a = document.createElement('a');
      a.href = imagensConvertidas[i];
      a.download = nomeImagem + "_" + i + ".webp";
      a.click();
    }
  }
  