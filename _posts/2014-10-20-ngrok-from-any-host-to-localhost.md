---
layout: post
title: "ngrok: From any host to localhost"
date: 2014-10-20 22:05:42
redirect_from:
  - /blog/ngrok-from-any-host-to-localhost/
---
Ever need to give someone a URL to access a server running locally on your machine? Perhaps you had to forward ports or mess with some SSH reverse tunneling. Next time try [ngrok](https://ngrok.com/)!

There are a few ways to accomplish this, but ngrok is the most streamlined and feature packed way yet I've found to open up a local port to the world; perhaps for testing by a client or friend, or testing web hooks from services that can't access your internal network.

Here's how to get started:

    ngrok 4567

You should see something like this:

![](http://cl.ly/Y7nY/Screen%20Shot%202014-10-20%20at%206.02.15%20PM.png)

And it's capable of so much more:

### Require username/password

     ngrok -httpauth="helmet:12345" 80

### Use specific subdomain

    ngrok -subdomain=example 80

### Forward to non-local services

    ngrok 192.168.0.1:80

### Forward traffic other than HTTP

    ngrok -proto tcp 22

### Inspect and replay traffic

    open http://localhost:4040

### Run your own server!

https://github.com/inconshreveable/ngrok/blob/master/docs/SELFHOSTING.md

Bonus: its written in go! So its fast and dependency free! Binaries are made available for Linux, Mac, and Windows.
