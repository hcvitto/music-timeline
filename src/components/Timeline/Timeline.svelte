<script>
import { onMount } from 'svelte';

import { auth } from '../../config/firebase/config';
import { getSteps } from '../../service/steps';
import { appStore } from '../../store/store';

import StepBox from './StepBox.svelte';

let canWrite = false;
let steps;
let width;
let windowHeight;
let user;
$: appStore.subscribe(store => {
    steps = store.history;
    user = store.user;
});

onMount(() => {
    getTimeline();
});

auth.onAuthStateChanged(function (user) {
    canWrite = user ? true : false;
});
async function getTimeline() {
    try {
        steps = await getSteps();
        appStore.update(store => {
            store = {
                ...store,
                history: steps
            };
            return store
        });
    } catch(err) {
        alert(err);
    }
}
</script>

<style type="text/scss">
.timeline {
    background: 
		repeating-linear-gradient(90deg, 
				#e7b2a5 5% 10%, 
                #ba6b57 10% 15%);
    height: 2px;
    position: relative;
    width: 100%;
}
</style>
<svelte:window bind:innerWidth={width} bind:innerHeight={windowHeight}/>
<div class="timeline-wrapper">
    <ul class="timeline">
    {#each steps as curr}
        <StepBox step={curr} windowWidth={width} windowHeight={windowHeight} canWrite={canWrite}></StepBox>
	{/each}
    </ul>

</div>
