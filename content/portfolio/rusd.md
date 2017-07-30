+++
Title = "RUSD"
Description = "A Google Calendar REST API wrapper with Express."
Tags = ["node", "javascript", "express", "rest", "api"]
Date = "2017-07-01"
ProjectDate = "2017-07-01"
Categories = ["Development", "Node.js", "Express"]
CoverImage = "rusd_cover.png"
+++

<img src="/img/rusd_header.png">

## Introduction

The Information Systems (IS) app for RUSD is my current major project at the [App Factory](http://appfactoryuwp.com). RUSD came to the App Factory with the idea of an app that would replace their current email notification process. Instead of sending emails, IS admins would send push notifications and the app would display them in a Twitter-like timeline fashion.

The server would store these notifications and send push notifications, but more importantly authenticate RUSD employees against RUSD current Active Directory/LDAP structure.

## Implementation

Keeping with the current trend at the App Factory, the backend stack would again be Node.js with Express. The frontend would be a [Vue.js](https://vuejs.org/) Web app using [Vuetify](https://github.com/vuetifyjs/vuetify), a Material component framework. A key component for the server was AD/LDAP authentication. It was decided to initially use [Passport](http://passportjs.org/) with the [passport-ldapauth](https://github.com/vesse/passport-ldapauth) strategy, but this proved troublesome.

## Backend (REST API)

The IS server exposes a variety of API endpoints for the mobile apps to consume as shown below.

<img src="/img/rusd_routes.png">

The `/user` route is not a resource route, but is used to convey information about the user based on their access token. The authorization process loosely follows [RFC 6749](https://tools.ietf.org/html/rfc6749).

### AD/LDAP Authentication

As stated in the introduction, `passport-ldapauth` proved to be troublesome and it was decided that we use the underlying [ldapauth-fork](https://github.com/vesse/node-ldapauth-fork) library. Having gained a service account for RUSD's active directory, we were able to connect using the following logic:

```javascript
const LdapAuth = require('ldapauth-fork')
const ldapjs = require('ldapjs')

const ldap = new LdapAuth({
  url: process.env.LDAP_URL,
  bindDN: process.env.LDAP_BIND_DN,
  bindCredentials: process.env.LDAP_CREDENTIALS,
  searchBase: process.env.LDAP_SEARCH_BASE,
  searchFilter: process.env.LDAP_SEARCH_FILTER,
  searchAttributes: [
    'company',
    'description',
    'displayName',
    'employeeID',
    'memberOf',
    'sAMAccountName'
  ],
  reconnect: true
})
const ldapClient = ldapjs.createClient({ url: process.env.LDAP_URL })

ldapClient.bind(process.env.LDAP_BIND_DN, process.env.LDAP_CREDENTIALS, (error, result) => {
  if (error) {
    throw error
  }
})

// Likely connection was reset so throw the error
// to force pm2/Heroku/Dokku to restart the app.
ldap.on('error', (err) => { throw err })

module.exports = {
  ldapClient,
  ldap
}
```

With the above module, we simply passed the credentials to the client:

```javascript
/* eslint camelcase: 0 */
const jwt = require('jsonwebtoken')
const jwtConfig = require('../../config').jwt
const { ldap } = require('../ldap')
const { User, RefreshToken, Location } = require('../database/models')
const { fromCallback } = require('bluebird')
const { getBuildingDn } = require('../util')

exports.login = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    const err = new Error('Missing username or password field.')
    err.status = 400
    throw err
  }

  const profile = await fromCallback(cb => ldap.authenticate(req.body.username, req.body.password, cb))
  profile.registrationToken = req.body.registrationToken
  let user = await User.findOne({ sAMAccountName: profile.sAMAccountName }).exec()

  ...

  // The spec defines the keys in snake case.
  res.json({
    access_token: token,
    token_type: 'Bearer',
    expires_in: exp,
    refresh_token: refreshToken.token,
    user
  })
}
```

Once the client has their access token, they must send it in the header `Authorization: Bearer access_token` in order to access any resource routes.

## Frontend

Vue was chosen to be the framework of choice, but why not [React](https://facebook.github.io/react/)? I initially wanted to use React for _all_ Web related projects in the App Factory, but React has a steap learning curve (in my opinion) for those new to modern Web development.

[I had some prior experience with React](https://github.com/ciscoo/itpc-demo) and enjoyed working with it, but I needed something that would be easy for my team to quickly pickup. So the decision was made to use Vue.


```javascript
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import Vuetify from 'vuetify'
import './theme/main.styl'

Vue.config.productionTip = false

Vue.use(Vuetify)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
```

As you can see from above, we are utilizing [Vuex](https://vuex.vuejs.org/) for state management which is similar to [Redux](http://redux.js.org/) and [Vue Router](https://router.vuejs.org/) which is similar to [React Router](https://reacttraining.com/react-router/).

The frontend has been put on hold until the API is complete.
