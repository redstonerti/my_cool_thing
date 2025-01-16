window.onload = function () {
    requestAnimationFrame(send_data);
}
function send_data() {
    window.parent.postMessage({
        id: 'footer_iframe',
        height: document.body.getBoundingClientRect().height,
    }, '*');
    requestAnimationFrame(send_data);
}