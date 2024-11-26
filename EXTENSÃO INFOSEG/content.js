chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "extractData") {
    console.log("Ação 'extractData' recebida no content script.");
    
    const mainElement = document.getElementById('ul-tab-det-content-p0-SRV_CONDUTORES-0');
    const documentoElement = document.getElementById('tab-p0-SRV_CONDUTORES-0-documentoCondutor');
    const carElement = document.getElementById('p0-SRV_VEICULOS-lista');

    if (mainElement && documentoElement && carElement) {
      console.log("Elementos principais encontrados.");

      function getTextByLabel(element, labelText) {
        const labelElement = Array.from(element.querySelectorAll('label'))
          .find(label => label.textContent.trim() === labelText);
        return labelElement && labelElement.nextElementSibling ? labelElement.nextElementSibling.textContent.trim() : '';
      }

      const pessoaInfo = {
        NNNN: getTextByLabel(mainElement, 'Nome'),
        MMM: getTextByLabel(mainElement, 'Filiação 1'),
        CCC: getTextByLabel(mainElement, 'CPF'),
        D8N: getTextByLabel(mainElement, 'D. N.'),
        PPP: getTextByLabel(mainElement, 'Filiação 2'),
        SSSS: getTextByLabel(mainElement, 'Sexo'),
        N8C: getTextByLabel(mainElement, 'Nacionalidade'),
        N8D: getTextByLabel(mainElement, 'Endereço'),
        R8R: getTextByLabel(documentoElement, 'Documento'),
        O8E: getTextByLabel(documentoElement, 'Órgão Emissor/UF'),
      };

      const veiculosText = carElement.innerText.replace(/\n/g, '-').substring(109);
      const veiculosTextModificado = veiculosText.substring(110);

      const imageElement = mainElement.querySelector('.sinesp-photo-container img');
      const imageBase64 = imageElement ? imageElement.src.split(",")[1] : '';

      console.log("Dados extraídos:", pessoaInfo);
      console.log("Imagem base64 extraída:", imageBase64);
      console.log("Texto de veículos extraído:", veiculosText);

      const txtContent = `NNNN: ${pessoaInfo.NNNN}\nMMM: ${pessoaInfo.MMM}\nCCC: ${pessoaInfo.CCC}\nD8N: ${pessoaInfo.D8N}\nPPP: ${pessoaInfo.PPP}\nSSSS: ${pessoaInfo.SSSS}\nN8C: ${pessoaInfo.N8C}\nN8D: ${pessoaInfo.N8D}\nR8R: ${pessoaInfo.R8R}\nO8E: ${pessoaInfo.O8E}\nV8I: ${veiculosText}\nImagem: ${imageBase64}`;

      chrome.runtime.sendMessage({ action: 'saveData', data: txtContent, image: imageBase64 }, function(response) {
        console.log("Dados enviados para o background script.");
      });
    } else {
      console.log("Elementos principais não encontrados.");
    }
  }
});
