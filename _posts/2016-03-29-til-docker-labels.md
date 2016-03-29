---
layout: post
title: "TIL: Docker Labels"
date: 2016-03-29 12:48:52
---

You can label containers with any key=value pair when creating them:

    docker run --label com.vintageaerial.group="worker" -d vintageaerial/vintageaerial:latest bundle exec rake jobs:work

Then you can filter the output of `docker ps` to only include said labels:

    docker ps --filter "label=com.vintageaerial.group=worker"

The [documentation](https://docs.docker.com/engine/userguide/labels-custom-metadata/) seems to favor using reverse DNS-style labels as a namespace.
