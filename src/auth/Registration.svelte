<script>
import { createEventDispatcher } from 'svelte';
import { createUser } from '../config/firebase/auth';

const dispatch = createEventDispatcher();

let email;
let password;
let isSubmitting = false;

function regUser() {
    isSubmitting = false;
    document.getElementById("reg-form").reset();
    dispatch('regDone', {
        msg: "Registrazione andata a buon fine"
    });
}
function regError(msg) {
    isSubmitting = false;
    dispatch('regError', {
        msg: msg
    })
}
function register() {
    isSubmitting = true;
    createUser(email, password)
        .then(user => {
            regUser();
        })
        .catch(error => {
            regError(error.message);
        });
}
</script>
<div>
<form on:submit|preventDefault={register} id="reg-form">
    <div>
        <input type="email" bind:value={email} required>
    </div>
    <div>
        <input type="password" bind:value={password} required>
    </div>
    <div>
        <button type="submit" disabled={isSubmitting}>Register</button>
    </div>
</form>
</div>