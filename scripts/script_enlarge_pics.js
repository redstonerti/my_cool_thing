const popup = document.getElementById('popup');
const closeBtn = document.getElementById('close');
const popupImg = document.getElementById('popup-img');

const openImgs = document.querySelectorAll('.open-img');


for (let img of openImgs) {
    img.onclick = function () {
        popupImg.src = img.src;
        popup.style.display = 'flex';
    };
}

closeBtn.onclick = function () {
    popup.style.display = 'none';
}
