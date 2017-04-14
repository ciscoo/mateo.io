+++
Title = "Color Spec"
Description = "A Grails web app for managing image assets for the iOS and Android counterpart."
Tags = ["grails", "groovy", "bradley"]
Date = "2015-09-01"
Categories = ["Development", "Grails"]
CoverImage = "bcs_cover.png"
+++

<video src="/media/bcs_video.webm" autoplay loop controls height="400px">Sorry, your browser doesn't support embedded videos.</video>

## Introduction

The Color Spec app was my first web project for the [App Factory](http://appfactoryuwp.com/). It was for a new client from Menomonee Falls, WI. named [Bradley](Bradley). Bradley is the industry's leading manufacturer of commercial plumbing fixtures and washroom accessories.

## Background

Bradley approached the App Factory with the idea of creating an Android and iOS application for showcasing various bathroom tiling that Bradley offers. Their sales representive would carry around a paper/book catalog of the tiles availble for sale. The issue is that they did not have a simple way to instantly update the catalog on the fly.

## Implementation

The task assigned to me was creating a web app in [Grails](https://grails.org/). This project gave me my first experience with Grails, the Groovy language, Tomcat, and enterprise Java. Knowing that mobile apps would need to interact with the server, the web app exposed a small RESTful API for the mobile apps to consume.

From the video above, you are able to view all the images/tiles uploaded to the server. In the main dashboard there is a small navbar to filter the tiles by category. Toward the top there is a button to upload new images to the server. Once uploaded, you are able to change the name, assign an existing category, and create a new custom category.
