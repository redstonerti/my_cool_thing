window.onload = function () {
    window.parent.postMessage({
        id: 'navbar_iframe',
        height: document.body.getBoundingClientRect().height,
    }, '*');
}