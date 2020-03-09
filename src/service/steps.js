const apiURL = "http://localhost:3000/";
const token = "";

export function getSteps() {
    return fetch(apiURL + 'steps').then(res => {
        return res.json();
    })
    .catch(err => {
        console.log('fetch error', err);
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

export function editStep(step) {
    console.log('editStep body', step);
    return fetch(apiURL + 'step', {
        method: 'PUT',
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

export function deleteStep(id) {
    return fetch(apiURL + 'step/' + id, {
        method: 'DELETE'
    }).then(res => {
        return res.json();
    })
    .catch(err => {
        console.log('fetch delete error', err);
    });
};