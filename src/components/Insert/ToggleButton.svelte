<script>
import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();
const toggle = () => dispatch('toggle');

export let isOpen = false;
</script>

<style type="text/scss">
button {
    border: 0;
    border-radius: 50%;
    -webkit-box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.5);
    -moz-box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.5);
    box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.5);
    cursor: pointer;
    height: 36px;
    position: absolute;
    right: 0;
    top: 0;
    transform: rotate(0);
    transition: .5s ease all;
    width: 36px;
    z-index: 5;

    &.isOpen {
        transform: rotate(225deg);
    }
    div {
        height: 100%;
        line-height: 1.5;
        position: relative;
        span {
            bottom: 0;
            left: 0;
            position: absolute;
            right: 0;
            top: 0;
            transition: .5s ease all;
        }
    }
}
</style>

<button class:isOpen={isOpen} on:click={toggle}>
    <div>
        <span>+</span>
    </div>
</button>
