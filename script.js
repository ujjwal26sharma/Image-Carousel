const imageContainer = document.querySelector(".image-container");
const leftBtn = document.getElementById("left");
const rightBtn = document.getElementById("right");

const INTERVAL = 3000;
const SPACE_IMAGES_COUNT = 4;

let idx = 0;
let imgs = [];
let interval;
let imageWidth = 0;

async function fetchSpaceImages() {
    try {
        for (let i = 0; i < SPACE_IMAGES_COUNT; i++) {
            const response = await fetch(`https://source.unsplash.com/random/500x500/?space&t=${Date.now()}`);
            const imageUrl = response.url;
            imgs.push(imageUrl);

            const img = new Image(); // Create a new Image object
            img.onload = () => {
                // Update imageWidth when an image is loaded
                if (img.width > imageWidth) {
                    imageWidth = img.width;
                    updateImageContainerWidth();
                }
            };
            img.src = imageUrl;
            imageContainer.appendChild(img);
        }

        document.body.style.backgroundImage = `url('${imgs[idx]}')`;

        resetInterval();
    } catch (error) {
        console.error("Error fetching space images:", error);
    }
}

function updateImageContainerWidth() {
    const totalWidth = imageWidth * imgs.length;
    imageContainer.style.width = `${totalWidth}px`;
}

function changeImage() {
    if (idx >= imgs.length) {
        idx = 0;
    } else if (idx < 0) {
        idx = imgs.length - 1;
    }

    const translateValue = -idx * imageWidth;
    imageContainer.style.transform = `translateX(${translateValue}px)`;
    document.body.style.backgroundImage = `url('${imgs[idx]}')`;
}

function resetInterval() {
    clearInterval(interval);
    interval = setInterval(run, INTERVAL);
}

function clickRight() {
    idx++;
    changeImage();
    resetInterval();
}

function clickLeft() {
    idx--;
    changeImage();
    resetInterval();
}

rightBtn.addEventListener("click", clickRight);
leftBtn.addEventListener("click", clickLeft);

function run() {
    idx++;
    changeImage();
}

fetchSpaceImages();
