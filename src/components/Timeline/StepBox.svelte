<script>
import { onDestroy } from 'svelte';
import { deleteStep } from '../../service/steps';
import { appStore } from '../../store';

export let step;
export let windowWidth;
export let canWrite = false;

let steps;
const unsubscribe = appStore.subscribe(store => {
    steps = store.history;
});

let currentYear = new Date();
currentYear = currentYear.getFullYear();

let box;
let isVisible;
$: leftPos = windowWidth * step.pos / currentYear;

async function deleteItem(step) {
    if (confirm('Are you sure?')) {
        try {
            const res = await deleteStep(step._id);
            if (res && res.message) {
                appStore.update(store => {
                    store = {
                        ...store,
                        history: removeEl(store.history, step),
                        editingObj: null
                    };
                    return store
                });
            }
        } catch(err) {
            alert(err);
        }
    }
}
function removeEl(store, el) {
    return store.filter(step => step.id !== el.id);
}
function toggleInfo() {
    isVisible = !isVisible;
}
function editItem(step) {
    console.log('editItem:', step);
    // TODO
    // update store with editin object
    appStore.update(store => {
        store = {
            ...store,
            editingObj: step
        };
        return store
    });
    // show insert form to edit with selected step
    // send data to BE
    // update store
}
onDestroy(unsubscribe);
</script>

<style type="text/scss">
li {
    position: absolute;
    top: 0;

    .box-wrapper {
        position: relative;
    }
    .pointer {
        background: #fff;
        border: 2px solid #30475e;
        border-radius: 50%;
        cursor: pointer;
        height: 10px;
        transform: translateY(-7px) scale(1);
        transition: all ease-in-out .1s;
        width: 10px;
        &:hover {
            transform: translateY(-7px) scale(1.5);
        }
    }
    .info-box {
        background: #fff;
        border: 1px solid rgba(0,0,0,.5);
        border-radius: 10px;
        box-shadow: 0 0 5px 1px rgba(0,0,0,.5);
        left: 0;
        width: 150px;
        opacity: 0;
        padding: 10px;
        position: absolute;
        top: 0;
        transition: all ease-in-out .15s;
        z-index: 2;
        &:hover {
            z-index: 10;
        }
    }
    &:nth-child(odd) {
        .info-box {
            transform: translateX(calc(-50% + 5px)) translateY(calc(10% + 10px)) scale(0);
        }
        &.visible {
            .info-box {
                transform: translateX(calc(-50% + 5px)) translateY(calc(10% + 10px)) scale(1);
            }
        }
    }
    &:nth-child(even) {
        .info-box {
            transform: translateX(calc(-50% + 5px)) translateY(calc(-100% - 15px)) scale(0);
        }
        &.visible {
            .info-box {
                transform: translateX(calc(-50% + 5px)) translateY(calc(-100% - 15px)) scale(1);
            }
        }
    }
    &.visible {
        .pointer {
            transform: translateY(-7px) scale(1.5);
        }
        .info-box {
            opacity: 1;
        }
    }

}
</style>
<li class="step" class:visible={isVisible} style="left: { leftPos }px">
    <div class="box-wrapper">
        <div class="pointer" on:click={toggleInfo}></div>
        <div class="info-box">
            <strong>{ step.date }</strong>
            <div class="title">{ step.title }</div>
            {#if canWrite}
            <button on:click={() => editItem(step)}>Edit</button>
            <button on:click={() => deleteItem(step)}>Delete</button>
            {/if}
        </div>
    </div>
</li>
