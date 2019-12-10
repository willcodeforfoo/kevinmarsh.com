---
date: "2014-10-23T14:00:00Z"
title: Using jq to Import JSON into Elasticsearch
---
[Elasticsearch](http://www.elasticsearch.org/) works really well with JSON. However, you can't just ship plain 'ol JSON, you have to use the [bulk API](http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/docs-bulk.html#docs-bulk). You *could* write a script in your favorite program language to do this, but you can use the incredibly-awesome [jq](http://stedolan.github.io/jq/) tool piped to curl on the command line.

First, make sure you have jq installed. On a Mac, its a quick `brew install jq` away.

Then, do something like this:

`cat file.json | jq -c '.[] | {"index": {"_index": "bookmarks", "_type": "bookmark", "_id": .id}}, .' | curl -XPOST localhost:9200/_bulk --data-binary @-`

We're taking the file `file.json` and piping its contents to `jq` first with the `-c` flag to construct compact output. Here's the nugget: We're taking advantage of the fact that jq can construct not only one but multiple objects per line of input. For each line, we're creating the control JSON Elasticsearch needs (with the ID from our original object) *and* creating a second line that is just our original JSON object (`.`).

At this point we have our JSON formatted the way Elasticsearch's bulk API expects it, so we just pipe it to `curl` which POSTs it to Elasticsearch!