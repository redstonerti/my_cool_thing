window.onload = function () {
    window.parent.postMessage({
        id: 'footer_iframe',
        height: document.body.getBoundingClientRect().height,
    }, '*');
    console.log("done");
}
