<script>
import { onDestroy } from 'svelte';
import { deleteStep } from '../../service/steps';
import { appStore } from '../../store/store';

export let step;
export let windowWidth;
export let windowHeight;
export let canWrite = false;

let steps;
const unsubscribe = appStore.subscribe(store => {
    steps = store.history;
});

let currentYear = new Date();
currentYear = currentYear.getFullYear();

let box;
let isVisible;
let isFixed;
$: leftPos = windowWidth * (+step.pos) / currentYear;
$: boxHeight = canWrite ? ((windowHeight - 160) / 2) : ((windowHeight - 100) / 2);

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
function toggleFixed() {
    isFixed = !isFixed;
}
function editItem(step) {
    appStore.update(store => {
        store = {
            ...store,
            editingObj: step
        };
        return store
    });
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
        opacity: 0;
        padding: 10px;
        position: absolute;
        top: 0;
        transition: all ease-in-out .15s;
        width: 150px;
        z-index: 2;
        &:hover {
            z-index: 10;
        }
        &:before {
            background: #30475e;
            content: ' ';
            height: 0;
            left: calc(50% + 1px);
            position: absolute;
            transition: height ease-in-out .30s;
            width: 2px;
        }

        strong {
            font-size: .8rem;
            font-weight: normal;
        }
        .title {
            font-size: .9rem;
            font-weight: 500;
        }
        .description {
            font-size: .8rem;
            overflow: auto;
            word-break: break-word
        }
        .button-wrapper {
            border-top: 1px solid #ba6b57;
            font-size: .8rem;
            margin-top: 10px;
            padding-top: 10px;
        }
    }
    &:nth-child(odd) {
        .info-box {
            transform: translateX(calc(-50% + 5px)) translateY(35px) scale(0);
            &:before {
                top: 0;
                transform: translateY(calc(-100% - 1px));
            }
        }
        &.visible,
        &.isFixed {
            .info-box {
                transform: translateX(calc(-50% + 5px)) translateY(35px) scale(1);
            }
        }
    }
    &:nth-child(even) {
        .info-box {
            transform: translateX(calc(-50% + 5px)) translateY(calc(-100% - 35px)) scale(0);
            &:before {
                bottom: 0;
                transform: translateY(calc(100% + 1px));
            }
        }
        &.visible,
        &.isFixed {
            .info-box {
                transform: translateX(calc(-50% + 5px)) translateY(calc(-100% - 35px)) scale(1);
           }
        }
    }
    &.visible,
    &.isFixed {
        .pointer {
            transform: translateY(-7px) scale(1.5);
        }
        .info-box {
            opacity: 1;
            &:before {
                height: 25px;
            }
       }
    }

}
</style>
<li class="step" class:visible={isVisible} class:isFixed={isFixed} style="left: { leftPos }px">
    <div class="box-wrapper">
        <div class="pointer" on:click={toggleFixed} on:mouseover={toggleInfo} on:mouseout={toggleInfo}></div>
        <div class="info-box" style="max-height: {boxHeight}px">
            <strong>{ step.date }</strong>
            <div class="title">{ step.title }</div>
            <div class="description" style="max-height: {boxHeight - 150}px">{ step.description }</div>
            {#if canWrite}
            <div class="button-wrapper">
                <button on:click={() => editItem(step)}>Edit</button>
                <button on:click={() => deleteItem(step)}>Delete</button>
            </div>
            {/if}
        </div>
    </div>
</li>
