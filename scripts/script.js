window.addEventListener('message', function (event) {
    const iframe = document.getElementById(event.data.id);
    iframe.style.height = event.data.height + 'px';
});