const apiURL = "http://localhost:3000/";
const token = "";

export function getSteps() {
    console.log('getSteps');
    return fetch(apiURL + 'steps').then(res => {
        return res.json();
    })
    .catch(err => {
        console.log('fetch error', error);
    });
};

export function addStep(step) {
    return fetch(apiURL + 'step', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(step)
    }).then(res => {
        return res.json();
    })
        .catch(err => {
            console.log('fetch error', err);
        });
};