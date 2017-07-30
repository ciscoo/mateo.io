+++
Title = "Kenosha Parks"
Description = "A Google Calendar REST API wrapper with Express."
Tags = ["node", "javascript", "express", "rest", "api"]
Date = "2017-07-01"
ProjectDate = "2017-06-20"
Categories = ["Development", "Node.js", "Express"]
CoverImage = "kp_cover.png"
+++

```json
{
    "kind": "calendar#events",
    "etag": "\"p32g9b6t0k29ta0g\"",
    "summary": "Lincoln Park",
    "updated": "2017-07-18T16:29:12.804Z",
    "timeZone": "America/Chicago",
    "accessRole": "reader",
    "defaultReminders": [],
    "nextSyncToken": "CKCVm6Cgk9UCEKCVm6Cgk9UCGAE=",
    "items": [
        {
            "kind": "calendar#event",
            "etag": "\"2992682935152000\"",
            "id": "lt4mrr7er9tk9li79984970ml0",
            "status": "confirmed",
            "htmlLink": "https://www.google.com/calendar/event?eid=bHQ0bXJyN2VyOXRrOWxpNzk5ODQ5NzBtbDAgcGFya3NhbGxpYW5jZWNhbGVuZGFyQG0",
            "created": "2017-06-01T18:11:33.000Z",
            "updated": "2017-06-01T18:24:27.576Z",
            "summary": "LINCOLN: Drop-In Tech Support",
            "description": "Kenosha Public Library will be providing drop-in tech support this summer in Lincoln Park next to or in the Oribiletti Center, 6900 18th Ave.  These sessions will be BYOD (Bring Your Own Device) and will be on a first come- first serve basis.  Staff will be available to teach and troubleshoot on all mobile devices.  Please come with a fully charged battery and know your device sign-on email and password. KPL will supply Wi-Fi.\n\nMondays, 6pm-7pm\nJune 5th & June 26th\nJuly 10th & July 24th\nAugust 7th & August 28th\n",
            "location": "Lincoln Park, 6900 18th Ave, Kenosha, WI 53143, USA",
            "creator": {
                "email": "parksalliancecalendar@gmail.com",
                "self": true
            }
        }
    ]
}
```

## Introduction

The client for this project was the City of Kenosha Parks Alliance (CKPA).

CKPA wanted to take their existing Google Calendar and make it easily accessible in for Android and iOS. However, our experienced Android developer stated that it is not easy to integrate with a different calendar other than their own. So we needed a way to wrap the [Google Calendar API](https://developers.google.com/google-apps/calendar/) to make it easily accessible for the mobile apps to digest.

## Implementation

Starting out I needed a way to interact with the Google Calendar API. Now I could use standard HTTP requests as shown [here](https://developers.google.com/google-apps/calendar/v3/reference/), but luckily Google offered a SDK: [Google APIs Node.js Client](https://github.com/google/google-api-nodejs-client).

### Authorization

All of the Google APIs requires OAuth2 authentication, but the server/API would act a service account and needed access without issuing a prompt to grant access. Fortuneatly, the SDK offers the ability to use [JWT (Service Tokens)](https://github.com/google/google-api-nodejs-client#using-jwt-service-tokens). With this in mind I crafted [this](https://github.com/ciscoo/kenosha-parks/blob/master/server/google-apis.js) module which creates a JWT client.

### API Endpoints

Having my service account client in place, the API is simply a wrapper around Google's Calendar API, but only specific routes. Since the API wraps around Google's API, all optional query parameters can be passed in. All routes are prefixed with `/api`.

### Calendars Resource

| HTTP Method	| URL			           | Description                     | Reference               |
|:-------------:|:-------------------------|:--------------------------------|:------------------------|
| `GET`      	| `/calendars/:calendarId` | Returns metadata for a calendar.| [Calendars: get][c:get] |


### Events Resource

| HTTP Method	| URL			                           | Description                               | Reference               |
|:-------------:|:-----------------------------------------|:------------------------------------------|:------------------------|
| `GET`      	| `/calendars/:calendarId/events`          | Returns events on the specified calendar. | [Events: list][e:list]  |
| `GET`      	| `/calendars/:calendarId/events/:eventId` | Returns an event.                         | [Events: get][e:get]    |

### Files Resource

| HTTP Method	| URL			         | Description                              | Reference           |
|:-------------:|:-----------------------|:-----------------------------------------|:--------------------|
| `GET`      	| `/drive/files/:fileId` | Gets a file's metadata or content by ID. | [Files: get][f:get] |

By default, this endpoint will return a [Files Resource](https://developers.google.com/drive/v3/reference/files#resource). Set the `alt` parameter to `media` if you need the actual resource.

[c:get]: https://developers.google.com/google-apps/calendar/v3/reference/calendars/get
[e:list]: https://developers.google.com/google-apps/calendar/v3/reference/events/list
[e:get]: https://developers.google.com/google-apps/calendar/v3/reference/events/get
[f:get]: https://developers.google.com/drive/v3/reference/files/get
[pn]: https://firebase.google.com/docs/cloud-messaging/admin/send-messages#send_to_a_topic

## Issues

The implementation of this RESTful API was easy except for displaying file resources from Google Drive. According to [these](https://developers.google.com/drive/v2/web/manage-downloads#downloading_a_file) instructions, issuing a HTTP request `GET /drive/files/:fileId?alt=media` _should_ give me back the file resource. Instead it gave me back the raw binary data in string format:

![raw](https://i.stack.imgur.com/3BhEh.png)

Having the raw binary data, I should be able to just write it out the response body:

```javascript
const image = Buffer.from(response, 'binary')
fs.createReadStream(image).pipe(res)
```

But this throws an error: `Error: Path must be a string without null bytes`. After hours of researching a solution, [I sought help from Stack Overflow](https://stackoverflow.com/questions/44507204/render-raw-image-bytes-to-response-body).

It seems there was an encoding issue on the SDK side of things so I needed to explicitly pass in `{ encoding: null }` to prevent the SDK from doing anything with the file resource.

## Conclusion

Overall the implementation went smoothly and has been in production since early July. Full source code available on Github [here](https://github.com/ciscoo/kenosha-parks).
