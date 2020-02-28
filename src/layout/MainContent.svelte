<script>
import Timeline from '../components/Timeline/Timeline.svelte';
</script>

<style type="text/scss">
h2 {
    button {
        display: none
    }
}
.list-wrapper {
    width: 100%;
}
@media only screen and (max-width: 767px) {
    h2 {
        button {
            color: black;
            display: inline;
            font-size: 60%;
        }
    }
}
</style>

<div class="list-wrapper">
    <Timeline></Timeline>
</div>
