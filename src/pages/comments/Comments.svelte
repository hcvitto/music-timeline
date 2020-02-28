<script>
import io from 'socket.io-client';

const socket = io('localhost:3000');

let comment = null;
let comments = [];
let isOpen = false;

socket.on('from server', function (data) {
    comments = comments.concat(data);
});

function sendComment() {
    if (comment) {
        socket.emit('from client', comment);
        // socket.emit('from server', comment);
        comment = null;
    }
}
function toggleChat() {
    isOpen = !isOpen;
}
</script>
<style type="text/scss">
#toggle-chat {
    background: red;
    border-radius: 10px 10px 0 0;
    bottom: 0;
    color: #fff;
    cursor: pointer;
    padding: 10px 25px;
    position: absolute;
    right: 25px;
    transition: .5s ease all;

    &.isOpen {
        bottom: 300px;
    }
}
#comments {
    background: white;
    border: 1px solid red;
    border-bottom: 0;
    bottom: 0;
    height: 300px;
    position: absolute;
    right: 25px;
    transform: translateY(100%);
    transition: .5s ease all;
    width: 300px;

    &.isOpen {
        transform: translateY(0);
    }
    .comments-wrapper {
        height: 100%;
        position: relative;

        .comments-list {
            height: 100%;
            padding-bottom: 40px;
        }
        .comment-form {
            border-top: 1px solid red;
            bottom: 0;
            height: 40px;
            padding: 5px 0;
            position: absolute;
            right: 0;
            width: 100%;
        }
    }
}
</style>
<div id="toggle-chat" class:isOpen={isOpen} on:click={toggleChat}>Socket.io chat</div>
<div id="comments" class:isOpen={isOpen}>
    <div class="comments-wrapper">
    {#if comments.length}
        <ul class="comments-list">
        {#each comments as cmt}
            <li>{cmt}</li>
            {/each}
        </ul>
    {/if}
        <div class="comment-form">
            <form on:submit|preventDefault={sendComment}>
                <input type="text" name="comment" id="comment" bind:value={comment} />
                <button disabled={!comment} type="submit">Send</button>
            </form>
        </div>
    </div>
</div>
