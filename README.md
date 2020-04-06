*Looking for a shareable component template? Go here --> [sveltejs/component-template](https://github.com/sveltejs/component-template)*

---

# Music timeline svelte app

Test app for svelte + firebase auth + CRUD mongoDb on mongoAtlas

## Settings

### App todo

Feature implemented / to implement..for local usage

```javascript
[{id: 3248,title: 'simple store',done: true},{id: 5664,title: 'persistent storage',done: true},{id: 3261,title: 'dom manipulation',done: true},{id: 6140,title: 'auth (firebase)',done: true},{id: 9728,title: 'context',done: false},{id: 7476,title: 'animation',done: true},{id: 2699,title: 'manipulate DOM on window events',done: true},{id: 7703,title: 'create server',done: true},{id: 1957,title: 'sync local storage anc db',done: false},{id: 2808,title: 'fix some gui style',done: true}]
```

### FRONTEND

Create a file src/config/settings.js with firebase setting from Fb console, ie: 

```javascript
export const firebaseConfig = {
    apiKey: "apiKey",
    authDomain: "authDomain",
    databaseURL: "databaseURL",
    projectId: "projectId",
    storageBucket: "storageBucket",
    messagingSenderId: "messagingSenderId",
    appId: "appId"
};
```

### BACKEND

Create a file server/settings.js with connection data to mongoAtlas db, ie: 

const mongoAtlasConnection = 'mongodb+srv://username:password@cluster0-usira.mongodb.net/test';

module.exports = {
    mongoAtlasConnection
};

## Get started

Install the dependencies...

### FRONTEND

```bash
cd music-timeline
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
npm run server
```

### BACKEND

```bash
cd server
npm install
```
```bash
node index.js
```

## Navigate app

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.


## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

You can run the newly built app with `npm run start`. This uses [sirv](https://github.com/lukeed/sirv), which is included in your package.json's `dependencies` so that the app will work when you deploy to platforms like [Heroku](https://heroku.com).


## Single-page app mode

By default, sirv will only respond to requests that match files in `public`. This is to maximise compatibility with static fileservers, allowing you to deploy your app anywhere.

If you're building a single-page app (SPA) with multiple routes, sirv needs to be able to respond to requests for *any* path. You can make it so by editing the `"start"` command in package.json:

```js
"start": "sirv public --single"
```

## Deploying to the web

### With [now](https://zeit.co/now)

Install `now` if you haven't already:

```bash
npm install -g now
```

Then, from within your project folder:

```bash
cd public
now deploy --name my-project
```

As an alternative, use the [Now desktop client](https://zeit.co/download) and simply drag the unzipped project folder to the taskbar icon.

### With [surge](https://surge.sh/)

Install `surge` if you haven't already:

```bash
npm install -g surge
```

Then, from within your project folder:

```bash
npm run build
surge public my-project.surge.sh
```
