export const tooltipInformation = {
    tooltip: document.querySelector('.tooltip-information') as HTMLDivElement,
    ico: document.querySelector('.tooltip-information img') as HTMLImageElement,
    text: document.querySelector('.tooltip-information p') as HTMLParagraphElement,

    
    successful: (text: string, delay: number = 0, duration: number): void => {
        tooltipInformation.ico.src = '../../../../public/svg/information/ok.svg';
        tooltipInformation.text.innerHTML = text;

        setTimeout((): void => {
            tooltipInformation.tooltip.classList.toggle('hidden');
        }, delay);

        setTimeout((): void => {
            tooltipInformation.tooltip.classList.toggle('hidden');
        }, duration + delay);
    },

    failure: (text: string, delay: number = 0, duration: number): void => {
        tooltipInformation.ico.src = '../../../../public/svg/information/error.svg';
        tooltipInformation.text.innerHTML = text;

        setTimeout((): void => {
            tooltipInformation.tooltip.classList.toggle('hidden');
        }, delay);

        setTimeout((): void => {
            tooltipInformation.tooltip.classList.toggle('hidden');
        }, duration + delay);
    }
}