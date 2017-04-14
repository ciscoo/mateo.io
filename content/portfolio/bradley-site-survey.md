+++
Title = "Site Survey"
Description = "A Grails web app for conducting surveys based on ANSI standards."
Tags = ["grails", "groovy", "bradley"]
Date = "2016-07-01"
ProjectDate = "2016-07-01"
Categories = ["Development", "Grails"]
CoverImage = "ss_home.png"
+++

<video src="/media/ss_video.webm" autoplay controls loop height="400px">Sorry, your browser doesn't support embedded videos.</video>

## Introduction

The Site Survey app was my second web project at the [App Factory](http://appfactoryuwp.com/). The client was [Bradley Corp.](https://www.bradleycorp.com/), the industry's leading manufacturer of commercial plumbing fixtures and washroom accessories.

Bradley was happy with the work from a previous project my collegues and I did that that they returned for another project. This project would be signficantly more complex than the previous. The Site Survey project consisted of three components: Android, iOS, and Web.

## Background

Bradley has various authorized representives in the US and Canada. These representives go around to various locations for inspection. The inspections are conducted based on the ANSI/ISEA Z358.1 standard. However, this inspection is recorded on paper.

The surveyors go around a given faclilty marking down on the paper whether an plumbing fixture or washroom accessory passes or fails inspection. Afterwards, the surveyor takes that completed survey and enters that information in a web app. This legacy web app was difficult to use and was in need of a rewrite. The goal of the overall project was to merge all steps into one app.

## Implementation

I was tasked with rewriting the legacy web app. The web app had the following requirements:

* Grails
* Security/User authentication
* RESTful API for the mobile apps
* Data Sychronization

Having gained valuble expierence from working on the previous Bradley project, I was eager to get started. After seven months of development, the web app was production ready. The web app can be accessed [here](https://bradleycorp.com/sitesurveytool), but of course you'll need to be an authorized Bradley representitive to use it. 😀

![Site Survey Login](/img/ss_login.png)

The published mobile apps from my collegues can be found on their respective app store:

* [Google Play Store](https://play.google.com/store/apps/details?id=edu.uwp.appfactory.bradleyaudit)
* [Apple App Store](https://itunes.apple.com/us/app/bradley-site-survey/id1208557715)
