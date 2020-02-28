<script>
import { createEventDispatcher } from 'svelte';
import { Icon } from '@smui/common';

export let todo;

const dispatch = createEventDispatcher();
function changeDoneStatus(todo) {
    dispatch('changeDoneStatus', {
        todo: todo
    });
}
function deleteTodo(todo) {
    dispatch('deleteTodo', {
        todo: todo
    });
}
</script>

<style type="text/scss">
li {
    display: flex;
    .title {
        flex-grow: 1;
    }
    .action {
        cursor: pointer;
        font-size: .7rem;
        font-style: italic;
    }
}
</style>

<li>
    <span class="title">{todo.title}</span>
    {#if !todo.done}
    <span class="action" on:click={changeDoneStatus(todo)}>
        <Icon class="material-icons">done</Icon>
    </span>
    {/if}
    <span class="action" on:click={deleteTodo(todo)}>
        <Icon class="material-icons">clear</Icon>
    </span>
</li>
