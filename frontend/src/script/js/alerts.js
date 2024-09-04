export const tooltipInformation = {
    tooltip: document.querySelector('.tooltip-information'),
    ico: document.querySelector('.tooltip-information img'),
    text: document.querySelector('.tooltip-information p'),
    successful: (text, delay = 0, duration) => {
        tooltipInformation.ico.src = '../../../../public/svg/information/ok.svg';
        tooltipInformation.text.innerHTML = text;
        setTimeout(() => {
            tooltipInformation.tooltip.classList.toggle('hidden');
        }, delay);
        setTimeout(() => {
            tooltipInformation.tooltip.classList.toggle('hidden');
        }, duration + delay);
    },
    failure: (text, delay = 0, duration) => {
        tooltipInformation.ico.src = '../../../../public/svg/information/error.svg';
        tooltipInformation.text.innerHTML = text;
        setTimeout(() => {
            tooltipInformation.tooltip.classList.toggle('hidden');
        }, delay);
        setTimeout(() => {
            tooltipInformation.tooltip.classList.toggle('hidden');
        }, duration + delay);
    }
};
