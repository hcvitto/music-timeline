const apiURL = "https://api.spotify.com/v1/search?type=album&limit=10&q=";
const token = "";

export function getAlbums(albumtitle, token) {
    return fetch(apiURL + albumtitle, {
        headers: {
            'Authorization': 'Bearer ' + token
        },
    })
};