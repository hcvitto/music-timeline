<script>
import { createEventDispatcher } from 'svelte';
import { loginUser } from '../config/firebase/auth';

// store
import { appStore } from '../store/store';
let user;
$: appStore.subscribe(store => {
    user = store.user;
});

const dispatch = createEventDispatcher();

let email;
let password;
let isSubmitting = false;

function loginDone() {
    isSubmitting = false;
    document.getElementById("login-form").reset();
    let u = {
        loggedIn: true,
        username: email
    };
    appStore.update(store => {
        store = {
            ...store,
            user: u
        };
        return store
    });
    dispatch('loginDone', {
        msg: "Login andato a buon fine"
    });
}
function loginError(msg) {
    dispatch('loginError', {
        msg: msg
    })
}
function login() {
    isSubmitting = true;
    loginUser(email, password)
        .then(user => {
            loginDone();
        })
        .catch(error => {
            loginError(error.message);
        });
}
</script>
<div>
<form on:submit|preventDefault={login} id="login-form">
    <div>
        <input type="email" bind:value={email} required>
    </div>
    <div>
        <input type="password" bind:value={password} required>
    </div>
    <div>
        <button type="submit" disabled={isSubmitting}>Login</button>
    </div>
</form>
</div>