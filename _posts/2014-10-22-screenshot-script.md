---
layout: post
title: "Screenshot Script"
date: 2014-10-22 11:37:43
---

I take a lot of screenshots, often wanting to share them with someone or post on this blog. I used to have a script that would automatically upload to Flickr, but I wanted to update it a bit to use S3. Here's what I came up with:

```bash
PATH=/usr/local/bin:$PATH
DATE=$(date '+%Y%m%d-%H%M%S')
FILE=~/Dropbox/Screenshots/${DATE}.png
S3_BUCKET="assets.kevinmarsh.com"
S3_URL_PREFIX="http://d1j4kwyjzsqmb8.cloudfront.net"

screencapture -i $FILE

if [ -e $FILE ]; then
  optipng -o5 $FILE
  s3cmd put -P $FILE s3://$S3_BUCKET/
  echo "$S3_URL_PREFIX/$DATE.png" | pbcopy
  osascript -e 'display notification "URL Copied to Clipboard" with title "Screenshot"'
fi
```

The script is triggered with ⇧⌘5 via an Alfred workflow, then does the following:

1. Invokes `screencapture` allowing me to either drag a selection or press Space and enter window selection mode
2. Optimizes the resulting PNG. This is the slowest step, taking a few seconds, but typically shaves off about 40% of the filesize. (Will PNG writers ever to this automatically?!)
3. Uploads to S3
4. Copies the CloudFront URL to the pasteboard
5. Pops up a notification telling me its done

It's almost perfect. I wish there was a way to have some sort of progress indicator, but I don't think that's possible with Notification Center.