<script>
import { fade, fly } from 'svelte/transition';

// store
import { appStore } from '../store/store';

import { auth } from '../config/firebase/config';
import { logoutUser } from '../config/firebase/auth';

import { NotificationDisplay } from '@beyonk/svelte-notifications';

import Registration from '../auth/Registration.svelte';
import Login from '../auth/Login.svelte';

import * as notifiy from '../service/notification';

export let appTitle = "Music timeline";
export let bgImgSrc = "";

let wantsRegister = false;
let wantsLogin = false;
let canWrite = false;

let user;
$: appStore.subscribe(store => {
    user = store.user;
});

const animationObj = { x: 200, duration: 500};

auth.onAuthStateChanged(function (user) {
    if (user) {
        let u = {
            loggedIn: true,
            username: user.email
        };
        appStore.update(store => {
            return {
                ...store,
                user: u
            };
        });
    }
});

function toggleRegForm() {
    wantsLogin = false;
    wantsRegister = !wantsRegister;
}
function toggleLoginForm() {
    if (user && user.isLoggedIn) {
        logoutUser()
            .then(res => {
                canWrite = false;
                appStore.update(store => {
                    return {
                        ...store,
                        user: {
                            isLoggedIn: false,
                            username: null
                        }
                    };
                });
            })
            .catch(error => {
                console.log('logout error:', error);
            });
    } else {
        wantsRegister = false;
        wantsLogin = !wantsLogin;
    }
}
function regOK(event) {
    wantsRegister = false;
    // what to do next??
}
function regKO(event) {
}
function loginOK(event) {
    wantsLogin = false;
    // TODO
    // set user as loggedin appWide
    // show private components
    canWrite = true;
}
</script>

<style type="text/scss">
header {
    background: 
        linear-gradient(90deg, 
            #5461c8 12.5%, 
            #c724b1 0 25%, 
            #e4002b 0 37.5%, 
            #ff6900 0 50%, 
            #f6be00 0 62.5%, 
            #97d700 0 75%, 
            #00ab84 0 87.5%, 
            #00a3e0 0);
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding-left: 15px;
    position: relative;

    h1 {
        color: var(--main-text-color);
        color: #fff;
        font-family: 'Tangerine';
        font-size: 3rem;
        margin: 0
    }
    .user-nav {
        align-items: center;
        color: #fff;
        display: flex;
        margin-right: 15px;
        span {
            margin-right: 15px;
        }
        i {
            color: #fff;
            cursor: pointer;
            font-size: 2rem;
            &.login-icon {
                transform: scaleX(-1);
            }
        }
        &.isLoggedIn {
            i {
                &.login-icon {
                    transform: scaleX(1);
                }
            }
        }
    }
}
.reg-form-wrapper,
.login-form-wrapper {
    position: absolute;
    right: 8px;
    top: 95px;
    z-index: 5;
}
</style>

<NotificationDisplay />

<header>
    <h1>{appTitle}</h1>
    <div class="user-nav" class:isLoggedIn={user && user.isLoggedIn}>
        {#if user && user.isLoggedIn}
        <span transition:fade>Hi, {user.username}</span>
        {/if}
        {#if user && !user.isLoggedIn}
        <i class="material-icons register-icon" transition:fade on:click={toggleRegForm}>emoji_people</i>
        {/if}
        <i class="material-icons login-icon" on:click={toggleLoginForm}>transfer_within_a_station</i>
    </div>
</header>
{#if wantsRegister}
    <div class="reg-form-wrapper"
        in:fly="{animationObj}"
        out:fly="{animationObj}"
    >
        <Registration
            on:regDone={ notifiy.showSuccessToast} on:regDone={regOK}
            on:regError={notifiy.showErrorToast}></Registration>
    </div>
{/if}
{#if wantsLogin}
    <div class="login-form-wrapper"
        in:fly="{animationObj}"
        out:fly="{animationObj}"
    >
        <Login
            on:loginDone={notifiy.showSuccessToast} on:loginDone={loginOK}
            on:loginError={notifiy.showErrorToast}></Login>
    </div>
{/if}
