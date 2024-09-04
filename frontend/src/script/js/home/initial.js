import { Generator } from "./generate.js";
import * as alerts from "../alerts.js";
const generateShow = document.querySelector(".generate-show");
const generateReplay = document.querySelector(".generate-replay");
const generateCopyBtn = document.querySelector(".generate-copy-btn");
const generateLengthShow = document.querySelector(".generate-length-show");
const generateSizeDecrementBtn = document.querySelector(".generate-size-decrement");
const generateSizeIncrementBtn = document.querySelector(".generate-size-increment");
const generateSizeRange = document.querySelector(".generate-size-range");
const uppercaseCheckbox = document.querySelector(".uppercase-checkbox");
const lowercaseCheckbox = document.querySelector(".lowercase-checkbox");
const numberCaseCheckbox = document.querySelector(".number-case-checkbox");
const specialCaseCheckbox = document.querySelector(".specializes-case-checkbox");
const passwordCustomView = document.querySelector('.password-generator__custom__view');
const generateCustomBtn = document.querySelector('.generate-custom');
const generatePasteBtn = document.querySelector('.generate-paste-btn');
const customGenerate = document.querySelector('.custom-generate');
const passwordGenerationCustom = document.querySelector('.password-generator__custom');
const generateSizeRangeInitial = Number(generateSizeRange.value);
const instantGeneratorInitial = new Generator(generateShow, uppercaseCheckbox.checked, lowercaseCheckbox.checked, numberCaseCheckbox.checked, specialCaseCheckbox.checked, generateSizeRangeInitial);
export const initial = {
    updateLength: () => {
        generateLengthShow.innerHTML = generateSizeRange.value;
    },
    passwordLength: {
        decrement: () => {
            const decrement = Number(generateSizeRange.value) - 1;
            generateSizeRange.value = decrement.toString();
        },
        increment: () => {
            const increment = Number(generateSizeRange.value) + 1;
            generateSizeRange.value = increment.toString();
        },
    },
    generateCopyBtn: () => {
        try {
            navigator.clipboard.writeText(instantGeneratorInitial.generatePasswordCurrent);
            alerts.tooltipInformation.successful('Copy text', 10, 2000);
        }
        catch (error) {
            alerts.tooltipInformation.failure('Failure in copy', 0, 2000);
        }
    },
};
generateCopyBtn.addEventListener("click", () => {
    initial.generateCopyBtn();
});
generateSizeDecrementBtn.addEventListener("click", () => {
    if (generateSizeRange.value !== "1") {
        initial.passwordLength.decrement();
        initial.updateLength();
        instantGeneratorInitial.replay();
        instantGeneratorInitial.length(generateLengthShow.innerHTML, customGenerateMode, passwordCustomView.value);
    }
});
generateSizeIncrementBtn.addEventListener("click", () => {
    if (generateSizeRange.value != "50") {
        initial.passwordLength.increment();
        initial.updateLength();
        instantGeneratorInitial.replay();
        instantGeneratorInitial.length(generateLengthShow.innerHTML, customGenerateMode, passwordCustomView.value);
    }
});
generateSizeRange.addEventListener("input", () => {
    initial.updateLength();
    instantGeneratorInitial.replay();
    instantGeneratorInitial.length(generateLengthShow.innerHTML, customGenerateMode, passwordCustomView.value);
});
uppercaseCheckbox.addEventListener("change", () => {
    const func = instantGeneratorInitial.checkbox();
    func.upperCaseFunc(uppercaseCheckbox.checked);
    instantGeneratorInitial.calculator();
});
lowercaseCheckbox.addEventListener("change", () => {
    const func = instantGeneratorInitial.checkbox();
    func.lowerCaseFunc(lowercaseCheckbox.checked);
    instantGeneratorInitial.calculator();
});
numberCaseCheckbox.addEventListener("change", () => {
    const func = instantGeneratorInitial.checkbox();
    func.numberCaseFunc(numberCaseCheckbox.checked);
    instantGeneratorInitial.calculator();
});
specialCaseCheckbox.addEventListener("change", () => {
    const func = instantGeneratorInitial.checkbox();
    func.specialCaseFunc(specialCaseCheckbox.checked);
    instantGeneratorInitial.calculator();
});
generateReplay.addEventListener("click", () => {
    instantGeneratorInitial.replay();
    if (!customGenerateMode) {
        instantGeneratorInitial.calculatorCustom(passwordCustomView.value);
    }
    else {
        instantGeneratorInitial.calculator();
    }
});
generateCustomBtn.addEventListener('click', () => {
    instantGeneratorInitial.calculatorCustom(passwordCustomView.value);
});
generatePasteBtn.addEventListener('click', () => {
    try {
        navigator.clipboard.readText().then(paste => {
            passwordCustomView.value = paste;
        });
    }
    catch (error) {
        alerts.tooltipInformation.failure('Failure in paste', 0, 1500);
    }
});
export let customGenerateMode = true;
customGenerate.addEventListener('click', () => {
    const passwordType = document.querySelector('.password-generate__type');
    instantGeneratorInitial.initialCustomGenerate(customGenerateMode);
    try {
        if (customGenerateMode) {
            passwordCustomView.value = '';
            instantGeneratorInitial.generateQualityCalculator(customGenerateMode);
            customGenerate.textContent = 'Default generate';
            passwordGenerationCustom.classList.toggle('hidden');
            passwordType.classList.toggle('hidden');
            generateCustomBtn.classList.toggle('hidden');
            customGenerateMode = false;
        }
        else {
            customGenerate.innerHTML = 'Custom generate';
            passwordGenerationCustom.classList.toggle('hidden');
            passwordType.classList.toggle('hidden');
            generateCustomBtn.classList.toggle('hidden');
            customGenerateMode = true;
        }
        alerts.tooltipInformation.successful('Change mode', 0, 500);
    }
    catch (error) {
        alerts.tooltipInformation.failure('Failure in change mode', 0, 2000);
    }
});
export { instantGeneratorInitial, generateLengthShow as generateLengthShowImport, generateSizeRange as generateSizeRangeImport, };
