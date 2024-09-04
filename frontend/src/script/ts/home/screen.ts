import {
    generateLengthShowImport,
    generateSizeRangeImport,
} from "./initial.js";

const darkModeBtn = document.querySelector(".dark-mode-button") as HTMLButtonElement;
const menuBtn = document.querySelector(".menu-btn") as HTMLImageElement;
const listMenu = document.querySelector(".list-menu") as HTMLUListElement;
const darkMode = document.querySelectorAll<HTMLDivElement>('.dark-mode');
const lightMode = document.querySelectorAll<HTMLDivElement>('.light-mode');
const generateLengthShow = generateLengthShowImport;
const generateSizeRange = generateSizeRangeImport;


darkModeBtn.addEventListener("click", (): void => {
    document.documentElement.classList.toggle("dark");

    if (document.documentElement.classList.contains('dark')) {
        darkMode.forEach(element => {
            element.classList.remove('hidden');
        })
        lightMode.forEach(element => {
            element.classList.add('hidden');
        })
        
    } else {
        darkMode.forEach(element => {
            element.classList.add('hidden');
        })
        lightMode.forEach(element => {
            element.classList.remove('hidden');
        })
    }
});

menuBtn.addEventListener("click", (): void => {
    if (menuBtn.src.includes("public/svg/menu_rounded.svg")) {
        menuBtn.src = "../../../../public/svg/close-menu.svg";
    } else {
        menuBtn.src = "../../../../public/svg/menu_rounded.svg";
    }

    listMenu.classList.toggle("hidden");
});

window.addEventListener("load", (): void => {
    generateLengthShow.innerHTML = generateSizeRange.value;
    document.documentElement.classList.remove("dark");
});