# Analyzing Tweet Emotions
### This is a public repository for a Node/Express/Vue.js app that allows users to load and analyze a given Twitter user's via the Twitter API and IBM Watson Natural Language Understanding.
A running demo of this application is hosted [here](https://tweet-emotion-analysis-dhwj4kp3mq-uc.a.run.app/).

API Keys Needed:
- In order for this to work locally, you must enter your own Twitter API Token and your own Watson API Key.
- Copy and paste your Watson API Key/Token into the [.env](.env) file. 
- Copy and paste your Twitter API Key/Token into the [api.js](api.js) file.

## Project setup
```
npm install
```

### Compiles and hot-reloads the front end for development
```
npm run serve
```

### Compiles and minifies the front end, to be served by the back end
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Run the Express server (which serves the built front end) with hot-reloads (for the back end ONLY)
- You must build the front-end prior to running the back end.
```
npm run backEndDev
```

### Running via Docker
You can also just run it locally in a container via Docker (see [Dockerfile](Dockerfile)).

