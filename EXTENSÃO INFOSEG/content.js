function checkAndClickToast() {
    const toast = document.querySelector('#toast-container .toast');
    if (toast && toast.style.display !== 'none') {
        console.log('Aviso de sessão encontrado! Clicando para renovar a sessão.');
        toast.click();
    } else {
        console.log('Aviso de sessão não encontrado.');
    }
}
setInterval(checkAndClickToast, 60000);
