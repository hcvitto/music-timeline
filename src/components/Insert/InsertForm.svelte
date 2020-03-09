<script>
import { createEventDispatcher } from 'svelte';

export let editingObj;

let store;
$: date = editingObj ? editingObj.date : null;
$: pos = editingObj ?  editingObj.pos : null;
$: title = editingObj ? editingObj.title : null;
$: description = editingObj ? editingObj.description : null;

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
        title: title,
        date: date,
        pos: pos,
        description: description
    }
    if (isEdit) {
        item._id = editingObj._id;
        item.id = editingObj.id;

    } 
    return item;
}
function resetForm() {
    document.getElementById('add-form').reset();
    date = pos = title = description = null;
    dispatchReset('reset');
}
</script>

<style type="text/scss">
input[type=text] {
    width: 100%;
}
.album-proposal {
    background: #eee;
    margin: 15px 0;
    padding: 15px 10px;

    h4 {
        margin-bottom: 10px;
        text-align: center;
    }
    img {
        max-width: 100%;
    }
    .choice-buttons {
        display: flex;
        justify-content: space-around;

        > div {

        }
    }
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
        <input type="text" name="date" bind:value={date}>
    </div>
    <div>
        <label>Pos</label>
        <input type="text" name="pos" bind:value={pos}>
    </div>
    <div>
        <label>Title</label>
        <input type="text" name="title" bind:value={title}>
    </div>
    <div>
        <label>Description</label>
        <input type="text" name="description" bind:value={description}>
    </div>
    <div>   
        <button disabled={!date && !pos && !title && !description}>{ editingObj ? "Edit" : "Insert" }</button>
        <button type="reset" on:click={resetForm}>Reset</button>
    </div>
</form>
