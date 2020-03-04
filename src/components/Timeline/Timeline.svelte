<script>
// store
import { appStore } from '../../store';
let steps;
$: appStore.subscribe(store => {
    steps = store.history;
});

let currentYear = new Date();
currentYear = currentYear.getFullYear();

// let currentAction = 'Show';
// function toggleAdd() {
//     currentAction = currentAction === 'Show' ? 'Hide' : 'Show';
// }
function calculateLeftPos(pos) {
    return window.innerWidth * pos / currentYear;
}
function recalculateLeftPos() {
    steps.forEach(step => {
        document.getElementById('_' + step.id).style.left = calculateLeftPos(step.pos) + 'px';
    });
}
function showInfo(id) {
    document.getElementById('_' + id).classList.toggle("visible");
}
</script>

<style type="text/scss">
.timeline {
    background: 
		repeating-linear-gradient(90deg, 
				#e7b2a5 5% 10%, 
                #ba6b57 10% 15%);
    height: 2px;
    position: relative;
    width: 100%;
    li {
        position: absolute;
        top: 0;

        .box-wrapper {
            position: relative;
            z-index: 1;
        }
        .pointer {
            background: #fff;
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
            border: 1px solid rgba(0,0,0,.5);
            border-radius: 10px;
            box-shadow: 0 0 5px 1px rgba(0,0,0,.5);
            left: 0;
            width: 150px;
            opacity: 0;
            padding: 10px;
            position: absolute;
            top: 0;
            transition: all ease-in-out .3s;
            z-index: 2;
        }
        &:nth-child(odd) {
            .pointer {
                border: 2px solid #30475e;
            }
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
            .pointer {
                border: 2px solid #30475e;
            }
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
}
</style>
<svelte:window on:resize={recalculateLeftPos}/>
<div class="timeline-wrapper">
    <ul class="timeline">
    {#each steps as curr}
		<li class="step" id="_{curr.id}" style="left: {calculateLeftPos(curr.pos)}px">
            <div class="box-wrapper">
                <div class="pointer" on:click={showInfo(curr.id)}></div>
                <div class="info-box">
                    <strong>{ curr.date }</strong>
                    <div class="title">{ curr.title }</div>
                </div>
            </div>
        </li>
	{/each}
    </ul>

</div>
