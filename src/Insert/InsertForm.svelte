<script>
import Rate from 'svelte-rate-it/Rate.svelte';
// store
import { recordStore } from '../store.js';
let store;
$: recordStore.subscribe(st => {
    store = st;
});

// service
import { getAlbums } from '../service/spotify';

let album;
let albumResult;
let currentAlbumObj;
let hasResults = false;
let imgUrl;
let isLoading = false;
let noMoreResults = false;
let proposalCounter = 0;
let totalResults = 0;
let token;
let vote = 0;

async function searchAlbum() {
    albumResult = null;
    imgUrl = null;
    isLoading = true;
    proposalCounter = 0;
    try {
        let res = await getAlbums(album, token);
        albumResult = await res.json();
        if (albumResult && albumResult.albums && albumResult.albums.items) {
            hasResults = true;
            currentAlbumObj = albumResult.albums.items[proposalCounter];
            imgUrl = currentAlbumObj.images[0].url;
            noMoreResults = false;
            totalResults = albumResult.albums.items.length;
        }
        isLoading = false;
    } catch(err) {
        alert(err);
    }
}
function getImgUrl(obj) {
    return obj.images[0].url;
}
function acceptAlbum() {
    store = {
        ...store,
        records: [...store.records, mapRecordObject(currentAlbumObj)]
    };
    recordStore.set(store);
    album = null;
    albumResult = null;
    hasResults = false;
    imgUrl = null;
    proposalCounter = 0;
    totalResults = null;
    vote = 0;
}

function refuseAlbum() {
    if ((proposalCounter+1) == albumResult.albums.items.length) {
        noMoreResults = true;
        proposalCounter = 0;
        imgUrl = null;
    } else {
        proposalCounter++;
        currentAlbumObj = albumResult.albums.items[proposalCounter];
        imgUrl = getImgUrl(currentAlbumObj);
    }
}
function mapRecordObject(recObj) {
    let newRec = {
        id: Math.floor(Math.random(1)*10000000),
        title: recObj.name,
        bandName: recObj.artists[0].name,
        image: recObj.images[0].url,
        vote: vote
    };
    return newRec;
}
function afterRate(rate) {
    vote = rate;
  };
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

<h3>Insert new album</h3>

{#if isLoading}
<div>
    Is loading from spotify
</div>
{/if}

<div>
    <label>Insert album title</label>
    <input type="text" name="album" bind:value={album}>
</div>
<div>
    <button on:click={searchAlbum} disabled={!album}>
        Check cover on spotify
    </button>
</div>
<div>   
    {vote}
    <Rate length={5} {afterRate} disabled={!hasResults} value={vote} />
</div>

{#if albumResult}
<div class="album-proposal">
    {#if noMoreResults}
        <div class="no-more-results">
        No more results for this album
        </div>
    {:else}
        <h4>Are you looking for this?</h4>
        <p><img src={imgUrl} alt="" /></p>
        <div class="choice-buttons">
            <div>
                <button on:click={acceptAlbum}>Yes</button>
            </div>
            <div>
                <button on:click={refuseAlbum}>No ({10 - proposalCounter} of {totalResults})</button>
            </div>
        </div>
    {/if}
</div>
{/if}

<br><br><br>
<label>Add temp token</label>
<input type="text" name="token" bind:value={token} />
