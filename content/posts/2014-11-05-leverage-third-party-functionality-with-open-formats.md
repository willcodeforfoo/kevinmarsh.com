---
date: "2014-11-05T10:50:52Z"
title: Leverage Third Party Functionality with Open Formats
---

One thing I've started doing more of in my apps is leveraging third party functionality by exposing data in open formats instead of building out that functionalty in my app.

For example, someone recently asked for an email notification when a new comment is posted. Simple enough, just add a Delayed Job in an `after_create` ActiveRecord callback that sends an email with ActionMailer. But then they also mentioned it would be nice to be able to view all previous comments and mark them as "read" as they review them. Oh, and since our team is using [Slack] more, wouldn't it be nice if new comments were posted to a Slack channel as well?

The solution to these problems wasn't integrating ActionMailer, building a complicated interface to mark comments as read, or pushing JSON to Slack. The solution was creating one [Atom] feed exposing the latest comments and letting third party services like [IFTTT], [Reeder], and Slack do the work.

It may seem obvious---it is the essence of the [Unix philosophy]---but it was a revelation to me. Let those other apps do what they do well while always keeping the door open for some new thing to plug in without modifying your code. As a bonus, our code is kept simple and without any integration-specific clutter: in this case, just a simple endpoint that exposes an Atom feed.

[Slack]: https://slack.com/
[Atom]: http://en.wikipedia.org/wiki/Atom_(standard)
[IFTTT]: https://ifttt.com/
[Reeder]: https://itunes.apple.com/us/app/reeder-2/id880001334?mt=12&uo=4&at=10l4tL&ct=searchlink
[Unix philosophy]: http://en.wikipedia.org/wiki/Unix_philosophy
