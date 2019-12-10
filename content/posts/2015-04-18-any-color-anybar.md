---
date: "2015-04-18T12:10:53Z"
title: Any Color AnyBar
slug: any-color-anybar
---

![Screenshot](https://s3.amazonaws.com/assets.kevinmarsh.com/20150418-anybar-rainbow.gif)

I like [AnyBar](https://github.com/tonsky/AnyBar). It couldn't be simpler to put a little splash of color in your Mac's menubar for whatever reason you want. It comes with a bunch of pretty built in colors, but what if you want your own? You can add your own images to `~/.AnyBar` and it'll happily pick them when you specify them... but who wants to create an image every time they want to use a different color. I wanted to specify _any_ hex color and have it displayed.

I'm sure this is possible to do by modifying the source itself. You could probably `GCRectMake` a `colorWithNamedRedComponent` something or other, but I'm not really an Objective-C programmer. But I do know ImageMagick...

So I put together this little script:

```sh
#!/bin/bash

if [[ $1 == "#"* ]]; then
  HEX=${1:1}
  FILE=~/.AnyBar/$HEX@2x.png

  if [ ! -f $FILE ]; then
    convert -size 38x38 xc:none -fill "#$HEX" -draw "circle 19,19 28,19" $FILE
  fi
  COLOR=$HEX
else
  COLOR=$1
fi

echo -n $COLOR | /usr/bin/nc -4u -w0 localhost ${2:-1738};
```

Save it somewhere like `~/bin/anybar` and make sure to `chmod +x` it!

It works similar to the bash alias in the [project's README](https://github.com/tonsky/AnyBar/blob/master/README.md), but supports specifying a custom color (prefixed with `#`, as hex colors are:

```sh
$ anybar red       # use the built in colors
$ anybar '#036'    # taste the rainbow!
$ anybar '#003366' # same as above...
```

It's not perfect, if you compare the images generated with AnyBar's stock images you'll find they don't 100% line up, but it scratched an itch and might be useful to you!
