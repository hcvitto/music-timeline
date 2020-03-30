<script>
import { createEventDispatcher } from 'svelte';

export let editingObj;

// $: date = editingObj ? editingObj.date : null;
// $: pos = editingObj ?  editingObj.pos : null;
// $: title = editingObj ? editingObj.title : null;
// $: description = editingObj ? editingObj.description : null;

$: o = editingObj || {
        date: null,
        pos: null,
        title: null,
        description: null
    }
const dispatchAdd = createEventDispatcher();
const dispatchEdit = createEventDispatcher();
const dispatchReset = createEventDispatcher();

function submitForm() {
    if (editingObj) {
        dispatchEdit('edit', getItemObject(true));
    } else {
        dispatchAdd('add', getItemObject());
    }
    resetForm();
}
function getItemObject(isEdit) {
    let item = {
        id: Math.floor(Math.random(1) * 1000000),
        title: o.title,
        date: o.date,
        pos: +(o.pos),
        description: o.description
    }
    if (isEdit) {
        item._id = editingObj._id;
        item.id = editingObj.id;
    } 
    return item;
}
function resetForm() {
    // TODO: manipulate DOM ???
    document.getElementById('add-form').reset();
    o = {
        date: null,
        pos: null,
        title: null,
        description: null
    };
    dispatchReset('reset');
}
</script>

<style type="text/scss">
input[type=text] {
    width: 100%;
}
</style>

<h3>{ editingObj ? "Edit" : "Insert new" } event</h3>

<form id="add-form" on:submit|preventDefault={submitForm}>
    {#if editingObj}
    <input type="hidden" name="_id" value={editingObj._id}>
    <input type="hidden" name="id" value={editingObj.id}>
    {/if}
    <div>
        <label>Date</label>
        <input type="text" name="date" bind:value={o.date}>
    </div>
    <div>
        <label>Pos</label>
        <input type="number" name="pos" min="1" max="2020" bind:value={o.pos}>
    </div>
    <div>
        <label>Title</label>
        <input type="text" name="title" bind:value={o.title}>
    </div>
    <div>
        <label>Description</label>
        <textarea name="description" rows="5" bind:value={o.description}></textarea>
    </div>
    <div>   
        <button disabled={!o.date || !o.pos || !o.title || !o.description}>{ editingObj ? "Edit" : "Insert" }</button>
        <button type="reset" on:click={resetForm}>Reset</button>
    </div>
</form>
