/**
 * Send the given text prompt to Vercel's AI Gateway and stream the response to the screen.
 *
 * @param string prompt
 */
const sendPrompt = async (prompt) => {
    //
};


// --- Do not edit below this line. --- //

const showSpinner = () => {
    const spinnerContainer = document.createElement('div');
    document.body.appendChild(spinnerContainer);
    spinnerContainer.className = 'spinner-container';

    const spinner = document.createElement('div');
    spinnerContainer.appendChild(spinner);
    spinner.className = 'spinner';

    const spinnerContent = document.createElement('div');
    spinner.appendChild(spinnerContent);
    spinnerContent.className = 'spinner-content';
    spinnerContent.innerText = '⏳';
};

const hideSpinner = () => {
    document.querySelector('.spinner-container')?.remove();
};

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const input = form.querySelector('input');

    form.addEventListener('submit', e => {
        e?.preventDefault();
        const value = input.value;
        input.value = '';
        sendPrompt(value);
        return false;
    });
});
