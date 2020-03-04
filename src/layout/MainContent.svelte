<script>
import Timeline from '../components/Timeline/Timeline.svelte';
import InsertStep from '../components/Insert/InsertStep.svelte';

import { auth } from '../config/firebase/config';

// store
import { appStore } from '../store.js';
let user;
$: appStore.subscribe(store => {
    user = store.user;
});

auth.onAuthStateChanged(function (user) {
    // console.log('maincontent onAuthStateChanged user', user);
    if (user) {
        appStore.update(store => {
            return {
                ...store,
                user: {
                    isLoggedIn: true,
                    username: user.email
                }
            };
        });
    }
});

</script>

<style type="text/scss">
h2 {
    button {
        display: none
    }
}
.list-wrapper {
    width: 100%;
}
@media only screen and (max-width: 767px) {
    h2 {
        button {
            color: black;
            display: inline;
            font-size: 60%;
        }
    }
}
</style>

{#if user && user.isLoggedIn}
<InsertStep></InsertStep>
{/if}
<div class="list-wrapper">
    <Timeline></Timeline>
</div>
