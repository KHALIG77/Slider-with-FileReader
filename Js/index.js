let counter = 0;
const back = document.querySelector("#back");
const next = document.querySelector("#next");
const slider = document.querySelector("#slider");
const sliderContainer = document.querySelector("#slider-container");
let max = document.querySelectorAll(".slide").length - 1;
const inputBtn = document.querySelector(".input-btn");
const chooseInput = document.querySelector("#file-upload");
const photoShow = document.querySelector(".photo-show");
const modalDiv = document.querySelector(".modal");

function sliderFunc() {
  if (counter < max) {
    counter++;
    slider.style.left = "-" + 800 * counter + "px";
  } else {
    counter = 0;
    slider.style.left = "-" + 800 * counter + "px";
  }
}
let timer = setInterval(sliderFunc, 2000);
sliderContainer.addEventListener("mouseout", function () {
  timer = setInterval(sliderFunc, 2000);
});
sliderContainer.addEventListener("mouseover", function () {
  clearInterval(timer);
});
next.addEventListener("click", sliderFunc);
back.addEventListener("click", function () {
  if (counter >= 0) {
    counter--;
    slider.style.left = "-" + 800 * counter + "px";
  }
});

inputBtn.addEventListener("click", function () {
  chooseInput.click();
});

chooseInput.addEventListener("change", function (e) {
  const { files } = e.target;
  for (let file of files) {
    const fileReader = new FileReader();
    fileReader.addEventListener("loadend", function (e) {
      const { result } = e.target;
      const createImg = document.createElement("div");
      createImg.className = "slide";
      createImg.style.backgroundImage = `url(${result})`;
      slider.appendChild(createImg);
      const createImgShowDiv = document.createElement("div");
      const createImgShowImage = document.createElement("img");
      createImgShowImage.src = result;
      createImgShowDiv.appendChild(createImgShowImage);
      photoShow.appendChild(createImgShowDiv);
      modalDiv.classList.remove("d-none");
      setTimeout(function () {
        modalDiv.classList.add("d-none");
      }, 4000);
    });
    fileReader.readAsDataURL(file);
  }
  max++;
});
