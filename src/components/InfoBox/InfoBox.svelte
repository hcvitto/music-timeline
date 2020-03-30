<script>
import { onMount } from 'svelte';
// store
import { todos } from './todoList.js';

import InfoButton from "./InfoButton.svelte";
import InfoBoxInput from './InfoBoxInput.svelte';
import InfoBoxListEl from './InfoBoxListEl.svelte';

let isOpen = false;
let title = null;
let data = [];
$: store = [];

onMount(() => {
    store = JSON.parse(window.localStorage.getItem('todos')) || todos;
});
    
function addTodo(event) {
    let newTodo = {
        id: Math.floor(Math.random(1) * 10000),
        title: event.detail.title,
        done: false
    }
    store = store.concat(newTodo);
    updateStorage(store);
    title = null;
}
function toggleBox() {
    isOpen = !isOpen;
}
function changeStatus(todoToChange) {
    store = store.map(todo => {
        if (todo.id === todoToChange.id) {
            todo.done = !todo.done;
            return todo;
        }
        return todo;
    });
    updateStorage(store);
}
function deleteTodo(todoToDelete) {
    store = store.filter(todo => todo.id !== todoToDelete.id);
    updateStorage(store);
}
function updateStorage(store) {
    window.localStorage.setItem('todos', JSON.stringify(store))
}
</script>

<style type="text/scss">
.infoBox {
    background-color: #fff;
    -webkit-box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.5);
    -moz-box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.5);
    box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.5);
    font-size: .8rem;
    padding: 15px;
    position: absolute;
    right: 0;
    bottom: 80px;
    transform: translateX(110%);
    transition: .5s ease all;
    width: 200px;
    z-index: 3;

    &.isOpen {
        transform: translateX(-10%);
    }
    ul {
        margin-bottom: 15px;
    }
}
</style>

<InfoButton on:toggle={toggleBox} isOpen={isOpen}></InfoButton>

<div class="infoBox" class:isOpen={isOpen}>
    <ul>
        <li><h3>Done</h3></li>
        {#each store as todo}
            {#if todo.done}
        <InfoBoxListEl todo={todo} on:deleteTodo={deleteTodo(todo)}></InfoBoxListEl>
            {/if}
        {/each}
    </ul>
    <ul>
        <li><h3>Todo</h3></li>
        {#each store as todo}
            {#if !todo.done}
        <InfoBoxListEl todo={todo} on:changeDoneStatus={changeStatus(todo)} on:deleteTodo={deleteTodo(todo)}></InfoBoxListEl>
            {/if}
        {/each}
    </ul>

    <InfoBoxInput on:addTodo={addTodo}></InfoBoxInput>

</div>
