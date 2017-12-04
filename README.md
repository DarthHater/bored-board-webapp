# boredboard

Here we go again

[![Build Status](https://travis-ci.org/DarthHater/bored-board-webapp.svg?branch=master)](https://travis-ci.org/DarthHater/bored-board-webapp)

## Was Ist Das?

This is the start of a frontend app for the new Bored Board to use

It's written in Typescript and shouts to the supporting team:

* Yarn
* React
* Docker
* Sass

## Local Dev Sans Docker (EXPERT MODE)

First download all the dependencies by running:

```bash
$ yarn
```

then to develop locally run:

```bash
$ yarn start
```

If everything is hunky dorky, you now have an environment at http://localhost:8080 ready for work with hot-reloading enabled.

For a production build all you have to run is

```bash
$ yarn build
```

## Docker Docker Docker (Moby wasn't in Flipper)

* Ensure you have Docker installed
* `docker-compose up` from root

Everything should come up, you should have an environment at http://localhost:8080

NOTE: this environment contains the backend, as well as a Postgres DB. As such, ensure the volumes command in docker-compose.yml for the sql init scripts is pointing to a valid location (you will likely want to setup the bored-board-service app in a valid golang path).

## Can I contribute?

Yes, please. File an issue to let us know what you are working on, and then submit a PR that associates with your issue.

## Got A Problem?

280-330-8004
