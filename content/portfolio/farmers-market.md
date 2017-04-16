+++
Title = "Farmers Market"
Description = "A Node.js web app to allow admins to send push notifications and create information about local farmers markets."
Tags = ["node", "javascript", "express", "firebase"]
Date = "2016-07-01"
ProjectDate = "2017-04-01"
Categories = ["Development", "Node.js"]
CoverImage = "fm_cover.png"
+++

<video src="/media/fm_video.webm" autoplay controls loop height="400px">Sorry, your browser doesn't support embedded videos.</video>

## Introduction

The Farmers Market Event Management (FMEM) is my current big project for the [App Factory](http://appfactoryuwp.com/). The client for this project is the [Racine Kenosha Community Action Agency](http://www.rkcaa.org/) (RKCAA). FHEM is a cross platform iOS/Android app that allows users to access information about events going on in local farmers market. The app also allows the users to view the hours of operation for each farmers market. The apps pull their information from [Firebase's Real Time Database](https://firebase.google.com/docs/database/) and the web admin app allows authorized users to create farmers market, events, and more.

## Background

RKCAA's sought to aid local farmers and the markets gain traction by tapping into a local development agency: Parkside App Factory. By having information regarding local farmers market in one central location instead of scattered on various websites, RKCAA's hope is that this will increase the revenue for local farmers.

## Implementation (In progress)

### Platform

FMEM makes use of a few modern web technologies. Being the primary lead of the web app side, I chose to use the [Node.js](https://nodejs.org/) platform. My decision to use Node.js was primarily due to the fact that Google offers a full software development kit (SDK) for Node.js. Google does offer SDKs for Java and Python, however, they are limited compared to the Node.js SDK so, the choice to use Node.js over the others was easy.

### Framework

The next decision to make was which web app framework to use. I had worked with [Sails](http://sailsjs.com/), but it seemed that I was always fighting with the framework. Since Sails was built on top of [Express](http://expressjs.com/), I decided to go with that. Also Express is one of, if not, the most widely used web app framework for the Node.js platform.

### Services/The Cloud

The last major decision was whether or not to host our own database, user authentication system, and more <i>or</i> make use of the cloud. I have deployed a few [Laravel](https://laravel.com/) apps which typically had a database component. It's not fun setting up a database nor is it fun maintaining it. I had heard a lot about [Firebase](https://firebase.google.com/) and wanted to learn/use it. By using Firebase, we only have to worry about writing _our_ app's code. Not database configuration, no user management, nothing. It's all in handled by Google's excellent Firebase service. So the decision was made to use Firebase.

### JavaScript

Since the decision was made to use Node.js as the platform, the language of course is JavaScript (JS). JS is a great language, however, that is subjective. Being the lead developer of the web app, I configured the project to make use of _all_ that ECMAScript 2015/ES6 offers.

<pre>
<code data-language="javascript" class="github">
Object.assign(app.locals, config.locals)
</code>
</pre>

The above snippet is easier/cleaner to write than the following:

<pre>
<code data-language="javascript" class="github">
Object.keys(obj).forEach(function(key, index) {
  // Logic
})
</code>
</pre>
