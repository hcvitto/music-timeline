<script>
import { createEventDispatcher } from 'svelte';

export let title = null;
const dispatch = createEventDispatcher();
function add() {
    dispatch('addTodo', {
        title: title
    });
    title = null;
}

</script>

<input type="text" bind:value={title} />
<button disabled={!title} on:click={add}>+</button>

