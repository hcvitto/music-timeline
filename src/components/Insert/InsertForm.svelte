<script>
// store
import { appStore } from '../../store.js';
let store;
$: appStore.subscribe(store => {
    store = store.history;
});

let date;
let title;
let description;

function addEvent() {
    
}
// async function searchAlbum() {
//     albumResult = null;
//     imgUrl = null;
//     isLoading = true;
//     proposalCounter = 0;
//     try {
//         let res = await getAlbums(album, token);
//         albumResult = await res.json();
//         if (albumResult && albumResult.albums && albumResult.albums.items) {
//             hasResults = true;
//             currentAlbumObj = albumResult.albums.items[proposalCounter];
//             imgUrl = currentAlbumObj.images[0].url;
//             noMoreResults = false;
//             totalResults = albumResult.albums.items.length;
//         }
//         isLoading = false;
//     } catch(err) {
//         alert(err);
//     }
// }
// function getImgUrl(obj) {
//     return obj.images[0].url;
// }
// function acceptAlbum() {
//     store = {
//         ...store,
//         records: [...store.records, mapRecordObject(currentAlbumObj)]
//     };
//     recordStore.set(store);
//     album = null;
//     albumResult = null;
//     hasResults = false;
//     imgUrl = null;
//     proposalCounter = 0;
//     totalResults = null;
//     vote = 0;
// }
// function refuseAlbum() {
//     if ((proposalCounter+1) == albumResult.albums.items.length) {
//         noMoreResults = true;
//         proposalCounter = 0;
//         imgUrl = null;
//     } else {
//         proposalCounter++;
//         currentAlbumObj = albumResult.albums.items[proposalCounter];
//         imgUrl = getImgUrl(currentAlbumObj);
//     }
// }
// function mapRecordObject(recObj) {
//     let newRec = {
//         id: Math.floor(Math.random(1)*10000000),
//         title: recObj.name,
//         bandName: recObj.artists[0].name,
//         image: recObj.images[0].url,
//         vote: vote
//     };
//     return newRec;
// }
// function afterRate(rate) {
//     vote = rate;
//   };
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

<form on:submit|preventDefault={addEvent}>
    <div>
        <label>Date</label>
        <input type="text" name="date" bind:value={date}>
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
