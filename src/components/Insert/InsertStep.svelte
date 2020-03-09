<script>
import { onDestroy } from 'svelte';
import { fade, fly } from 'svelte/transition';

import { appStore } from '../../store.js';
import { addStep, editStep } from '../../service/steps';

import ToggleButton from './ToggleButton.svelte';
import InsertForm from './InsertForm.svelte';

let store;
let editingObj;
let isOpen = false;
const animationObj = { x: 200, duration: 500};

const unsubscribe = appStore.subscribe(store => {
    console.log('insert store editingObj', store.editingObj);
    editingObj = store.editingObj;
    isOpen = editingObj ? true : false;
});
async function addItem(event) {
    let addedStep = await addStep(event.detail);
    appStore.update(store => {
        store = {
            ...store,
            history: store.history.concat(addedStep)
        };
        return store
    });
}
async function editItem(event) {
    let editedStep = await editStep(event.detail);
    console.log('editStep res', editedStep);
    appStore.update(store => {
        store = {
            ...store,
            history: store.history.map(step => {
                if (step.id === editedStep.id) {
                    return editedStep;
                }
                return step;
            })
        };
        return store
    });
}
// unset editingObject from store on form reset
function unsetEditingObj() {
    appStore.update(store => {
        store = {
            ...store,
            editingObj: null
        };
        return store
    });
}

function toggleForm() {
    isOpen = !isOpen;
    if (!isOpen) {
        appStore.update(store => {
            store = {
                ...store,
                editingObj: null
            };
            return store
        });
    }
}
onDestroy(unsubscribe);
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
            <InsertForm editingObj={editingObj} on:add={addItem} on:edit={editItem} on:reset={unsetEditingObj}></InsertForm>
        </div>
        {/if}
    </div>
</div>

