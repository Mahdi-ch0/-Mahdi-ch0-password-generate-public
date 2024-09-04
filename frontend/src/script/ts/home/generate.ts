const generateQualityImg = document.querySelector(
    ".generate-quality-img"
) as HTMLImageElement;
const generateQuality = document.querySelector(
    ".generate-quality"
) as HTMLSpanElement;

export class Generator {
    generateShow: HTMLInputElement | undefined;
    generatePasswordInitial: string = "";
    generatePasswordCurrent: string = "";
    generateCustomPassword: boolean | undefined;

    uppercaseCheckboxBtn: Boolean | undefined;
    lowercaseCheckboxBtn: Boolean | undefined;
    numberCaseCheckboxBtn: Boolean | undefined;
    specialCaseCheckboxBtn: Boolean | undefined;

    upperCase: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    lowerCase: string = "abcdefghijklmnopqrstuvwxyz";
    numberCase: string = "1234567890";
    specialCase: string = "!@#$%^&*()|/+-";

    generateQuality: number = 0;
    generateLength: number = 0;

    constructor(
        generateShow?: HTMLInputElement,
        upperCase?: boolean,
        lowerCase?: boolean,
        numberCase?: boolean,
        specialCase?: boolean,
        generateLength?: number
    ) {
        this.generateShow = generateShow;
        this.uppercaseCheckboxBtn = upperCase;
        this.lowercaseCheckboxBtn = lowerCase;
        this.numberCaseCheckboxBtn = numberCase;
        this.specialCaseCheckboxBtn = specialCase;
        if (generateLength) this.generateLength = generateLength;

        this.calculator();
    }

    checkbox() {
        const upperCaseFunc = (upperCase: boolean): void => {
            if (upperCase) this.uppercaseCheckboxBtn = upperCase;
            else this.uppercaseCheckboxBtn = upperCase;
        };
        const lowerCaseFunc = (lowerCase: boolean): void => {
            if (lowerCase) this.lowercaseCheckboxBtn = lowerCase;
            else this.lowercaseCheckboxBtn = lowerCase;
        };
        const numberCaseFunc = (numberCase: boolean): void => {
            if (numberCase) this.numberCaseCheckboxBtn = numberCase;
            else this.numberCaseCheckboxBtn = numberCase;
        };
        const specialCaseFunc = (specialCase: boolean): void => {
            if (specialCase) this.specialCaseCheckboxBtn = specialCase;
            else this.specialCaseCheckboxBtn = specialCase;
        };

        const functions = {
            upperCaseFunc,
            lowerCaseFunc,
            numberCaseFunc,
            specialCaseFunc,
        };

        return functions;
    }

    length(generateLength: string, generateMode: boolean, passwordCustomView: string): void {
        this.generateLength = Number(generateLength);

        !generateMode ? this.calculatorCustom(passwordCustomView) : this.calculator();
    }

    calculator() {
        this.replay();

        if (this.uppercaseCheckboxBtn)
            this.generatePasswordInitial += this.upperCase;
        if (this.lowercaseCheckboxBtn)
            this.generatePasswordInitial += this.lowerCase;
        if (this.numberCaseCheckboxBtn)
            this.generatePasswordInitial += this.numberCase;
        if (this.specialCaseCheckboxBtn)
            this.generatePasswordInitial += this.specialCase;
        for (let i = 1; i <= this.generateLength; i++) {
            this.generatePasswordCurrent += this.generatePasswordInitial.charAt(
                this.generateChar()
            );
        }

        this.generateQualityCalculator();
        this.updateDisplay();
    }

    initialCustomGenerate(customMode: boolean): void {   
        this.generateCustomPassword = customMode;
        if (customMode) {
            this.replay();
            this.updateDisplay();
        } else {
            this.calculator();
        }
    }

    calculatorCustom(generateCustom: string) {
        this.generateCustomPassword = false;
        this.replay();
        this.generatePasswordInitial = generateCustom;
        for (let i = 1; i <= this.generateLength; i++) {
            this.generatePasswordCurrent += this.generatePasswordInitial.charAt(
                this.generateChar()
            );
        }

        this.generateQualityCalculator();
        this.updateDisplay();
    }

    generateChar() {
        return Math.floor(Math.random() * this.generatePasswordInitial.length);
    }

    generateQualityCalculator(customGenerateMode?: boolean) {
        const hasUpperCase = this.upperCase.split("").some((char): boolean => {
            return this.generatePasswordCurrent.includes(char);
        });
        const hasLowerCase = this.lowerCase.split("").some((char): boolean => {
            return this.generatePasswordCurrent.includes(char);
        });
        const hasNumberCase = this.numberCase.split("").some((char): boolean => {
            return this.generatePasswordCurrent.includes(char);
        });
        const hasSpacial = this.specialCase.split("").some((char): boolean => {
            return this.generatePasswordCurrent.includes(char);
        });

        if (hasUpperCase) this.generateQuality++;
        if (hasLowerCase) this.generateQuality++;
        if (hasNumberCase) this.generateQuality++;
        if (hasSpacial) this.generateQuality++;

        if (customGenerateMode) {
            generateQuality.style.backgroundColor = "#808080";
            generateQuality.innerHTML = 'Null';
        } else if (this.generateQuality === 4) {
            generateQuality.style.backgroundColor = "#36c565";
            generateQuality.innerHTML = "Very strong";
            generateQualityImg.src =
                "../../../../public/svg/password-level/verystrong.svg";
        } else if (this.generateQuality === 3) {
            generateQuality.style.backgroundColor = "#1493ff";
            generateQuality.innerHTML = "Strong";
            generateQualityImg.src =
                "../../../../public/svg/password-level/strong.svg";
        } else if (this.generateQuality === 2) {
            generateQuality.style.backgroundColor = "#f99f4a";
            generateQuality.innerHTML = "Good";
            generateQualityImg.src =
                "../../../../public/svg/password-level/good.svg";
        } else if (this.generateQuality === 1) {
            generateQuality.style.backgroundColor = "#e43e3e";
            generateQuality.innerHTML = "Week";
            generateQualityImg.src =
                "../../../../public/svg/password-level/week.svg";
        }
    }

    replay(): void {
        this.generatePasswordInitial = "";
        this.generatePasswordCurrent = "";
        this.generateQuality = 0;
    }

    clearInitial(): void {
        this.generatePasswordInitial = "";
        this.generatePasswordCurrent = "";
        this.generateQuality = 0;
        this.generateLength = 0;
    }

    updateDisplay(): void {
        if (this.generateShow) {
            if (this.generateCustomPassword) {
                this.generateShow.value = '';
                
            } else {
                if (this.generatePasswordCurrent.length > 13) {
                    this.generateShow.value =
                        this.generatePasswordCurrent.slice(0, 12) + "...";
                } else {
                    this.generateShow.value = this.generatePasswordCurrent;
                }
            }
        }
    }
}
