/**
 * Send the given text prompt to Vercel's AI Gateway and stream the response to the screen.
 *
 * @param string prompt
 */
const sendPrompt = async (prompt) => {
    showSpinner();

    const request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
    };

    const response = await fetch('/prompt', request);

    const streamedContentList = document.querySelector('.streamed-content-list');
    const listItem = document.createElement('li');
    const header = document.createElement('header');
    const paragraph = document.createElement('p');

    streamedContentList.appendChild(listItem);
    listItem.appendChild(header);
    listItem.appendChild(paragraph);
    
    header.innerText = prompt;

    hideSpinner();

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');

    while (true) {
        const { done, value } = await reader.read();

        if (done) {
            break;
        }

        paragraph.innerText += decoder.decode(value, { stream: true });
    }

    paragraph.innerText += decoder.decode();
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
