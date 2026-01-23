const projects = document.querySelectorAll(".project");

const getRandomInteger = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)

  return Math.floor(Math.random() * (max - min)) + min
}

let currentIndex = getRandomInteger(0, projects.length);

window.addEventListener("DOMContentLoaded", (event) => {
    projects[currentIndex].classList.add("active");
});

function showNextProject() {
    projects[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % projects.length;
    projects[currentIndex].classList.add("active");
}

function showPreviousProject() {
    projects[currentIndex].classList.remove("active");
    currentIndex = (currentIndex - 1 + projects.length) % projects.length;
    projects[currentIndex].classList.add("active");
}