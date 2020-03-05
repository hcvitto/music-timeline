<script>
import { addStep } from '../../service/steps';

import { appStore } from '../../store.js';
let store;
$: appStore.subscribe(store => {
});

let date;
let pos;
let title;
let description;

async function addItem() {
    const step = {
        title: title,
        date: date,
        pos: pos,
        description: description
    }
    let steps = await addStep(getItemObject(step));
    document.getElementById('add-form').reset();
    appStore.update(store => {
        store = {
            ...store,
            history: steps
        };
        return store
    });
}
function getItemObject(item) {
    return {id: Math.floor(Math.random(1)*10000000),
        title: item.title,
        date: item.date,
        pos: item.pos,
        description: item.description
    };
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

<h3>Insert new event</h3>

<form id="add-form" on:submit|preventDefault={addItem}>
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
        <button>Add</button>
    </div>
</form>
