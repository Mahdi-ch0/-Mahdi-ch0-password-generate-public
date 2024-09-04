import { Generator } from "./generate.js";
import * as alerts from "../alerts.js";

const generateShow = document.querySelector(
    ".generate-show"
) as HTMLInputElement;
const generateReplay = document.querySelector(
    ".generate-replay"
) as HTMLImageElement;
const generateCopyBtn = document.querySelector(
    ".generate-copy-btn"
) as HTMLButtonElement;
const generateLengthShow = document.querySelector(
    ".generate-length-show"
) as HTMLParagraphElement;
const generateSizeDecrementBtn = document.querySelector(
    ".generate-size-decrement"
) as HTMLImageElement;
const generateSizeIncrementBtn = document.querySelector(
    ".generate-size-increment"
) as HTMLImageElement;
const generateSizeRange = document.querySelector(
    ".generate-size-range"
) as HTMLInputElement;
const uppercaseCheckbox = document.querySelector(
    ".uppercase-checkbox"
) as HTMLInputElement;
const lowercaseCheckbox = document.querySelector(
    ".lowercase-checkbox"
) as HTMLInputElement;
const numberCaseCheckbox = document.querySelector(
    ".number-case-checkbox"
) as HTMLInputElement;
const specialCaseCheckbox = document.querySelector(
    ".specializes-case-checkbox"
) as HTMLInputElement;
const passwordCustomView = document.querySelector('.password-generator__custom__view') as HTMLInputElement;
const generateCustomBtn = document.querySelector('.generate-custom') as HTMLButtonElement;
const generatePasteBtn = document.querySelector('.generate-paste-btn') as HTMLButtonElement;
const customGenerate = document.querySelector('.custom-generate') as HTMLButtonElement;
const passwordGenerationCustom = document.querySelector('.password-generator__custom') as HTMLDivElement;

const generateSizeRangeInitial = Number(generateSizeRange.value);

const instantGeneratorInitial = new Generator(
    generateShow,
    uppercaseCheckbox.checked,
    lowercaseCheckbox.checked,
    numberCaseCheckbox.checked,
    specialCaseCheckbox.checked,
    generateSizeRangeInitial
);


export const initial = {
    updateLength: (): void => {
        generateLengthShow.innerHTML = generateSizeRange.value;
    },

    passwordLength: {
        decrement: (): void => {
            const decrement = Number(generateSizeRange.value) - 1;
            generateSizeRange.value = decrement.toString();
        },

        increment: (): void => {
            const increment = Number(generateSizeRange.value) + 1;
            generateSizeRange.value = increment.toString();
        },
    },

    generateCopyBtn: (): void => {
        
        try {
            navigator.clipboard.writeText(
                instantGeneratorInitial.generatePasswordCurrent
            );
            alerts.tooltipInformation.successful('Copy text', 10, 2000);

        } catch (error) {
            alerts.tooltipInformation.failure('Failure in copy', 0, 2000);
        }
    },
};

generateCopyBtn.addEventListener("click", (): void => {  
    initial.generateCopyBtn();
});

generateSizeDecrementBtn.addEventListener("click", (): void => {
    if (generateSizeRange.value !== "1") {
        initial.passwordLength.decrement();
        initial.updateLength();
        instantGeneratorInitial.replay();
        instantGeneratorInitial.length(generateLengthShow.innerHTML, customGenerateMode, passwordCustomView.value);
    }
});
generateSizeIncrementBtn.addEventListener("click", (): void => {
    if (generateSizeRange.value != "50") {
        initial.passwordLength.increment();
        initial.updateLength();
        instantGeneratorInitial.replay();
        instantGeneratorInitial.length(generateLengthShow.innerHTML, customGenerateMode, passwordCustomView.value);
    }
});
generateSizeRange.addEventListener("input", (): void => {
    initial.updateLength();
    instantGeneratorInitial.replay();
    instantGeneratorInitial.length(generateLengthShow.innerHTML, customGenerateMode, passwordCustomView.value);
});

uppercaseCheckbox.addEventListener("change", (): void => {
    const func = instantGeneratorInitial.checkbox();
    func.upperCaseFunc(uppercaseCheckbox.checked);
    instantGeneratorInitial.calculator();
});
lowercaseCheckbox.addEventListener("change", (): void => {
    const func = instantGeneratorInitial.checkbox();
    func.lowerCaseFunc(lowercaseCheckbox.checked);
    instantGeneratorInitial.calculator();
});
numberCaseCheckbox.addEventListener("change", (): void => {
    const func = instantGeneratorInitial.checkbox();
    func.numberCaseFunc(numberCaseCheckbox.checked);
    instantGeneratorInitial.calculator();
});
specialCaseCheckbox.addEventListener("change", (): void => {
    const func = instantGeneratorInitial.checkbox();
    func.specialCaseFunc(specialCaseCheckbox.checked);
    instantGeneratorInitial.calculator();
});
generateReplay.addEventListener("click", (): void => {
    instantGeneratorInitial.replay();
    
    if (!customGenerateMode) {
      instantGeneratorInitial.calculatorCustom(passwordCustomView.value);  
    
    } else {
        instantGeneratorInitial.calculator();
    }
});

generateCustomBtn.addEventListener('click', (): void => {
    instantGeneratorInitial.calculatorCustom(passwordCustomView.value); 
})

generatePasteBtn.addEventListener('click', (): void => {
    try {
     navigator.clipboard.readText().then(paste => {
         passwordCustomView.value = paste
     });
     
    } catch (error) {
         alerts.tooltipInformation.failure('Failure in paste', 0, 1500);
    }
     
 }) 

 export let customGenerateMode = true;
 customGenerate.addEventListener('click', (): void => {
     const passwordType = document.querySelector('.password-generate__type') as HTMLDivElement;
     instantGeneratorInitial.initialCustomGenerate(customGenerateMode);
 
     try {
         if (customGenerateMode) {
            passwordCustomView.value = '';
            instantGeneratorInitial.generateQualityCalculator(customGenerateMode)
             customGenerate.textContent = 'Default generate';
             passwordGenerationCustom.classList.toggle('hidden');
             passwordType.classList.toggle('hidden');
             generateCustomBtn.classList.toggle('hidden');
             customGenerateMode = false;
         } else {
             customGenerate.innerHTML = 'Custom generate';
             passwordGenerationCustom.classList.toggle('hidden');
             passwordType.classList.toggle('hidden');
             generateCustomBtn.classList.toggle('hidden');
             customGenerateMode = true;
         }

         alerts.tooltipInformation.successful('Change mode', 0, 500);
     } catch (error) {
        alerts.tooltipInformation.failure('Failure in change mode', 0, 2000)
     }   
 })


export {
    instantGeneratorInitial,
    generateLengthShow as generateLengthShowImport,
    generateSizeRange as generateSizeRangeImport,
};