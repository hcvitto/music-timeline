<script>
import { fade, fly } from 'svelte/transition';

import ToggleButton from './ToggleButton.svelte';
import InsertForm from './InsertForm.svelte';

let isOpen = false;
const animationObj = { x: 200, duration: 500};
function toggleForm() {
    isOpen = !isOpen;
}
</script>

<style type="text/scss">
#insert-wrapper {
    position: absolute;
    right: 15px;
    top: 100px;

    #insert-content {
        position: relative;
        
        #insert-form-wrapper {
            border-top-right-radius: 18px;
            box-shadow: 0px 0px 7px 0px rgba(0,0,0,0.25);
            padding: 15px;
        }
    }
}
</style>

<div id="insert-wrapper">
    <div id="insert-content">
        <ToggleButton on:toggle={toggleForm} isOpen={isOpen}></ToggleButton>
        {#if isOpen}
        <div id="insert-form-wrapper"
            in:fly="{animationObj}"
            out:fly="{animationObj}"
        >
            <InsertForm></InsertForm>
        </div>
        {/if}
    </div>
</div>

