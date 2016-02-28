---
layout: post
title: "2016 Linux Desktop"
date: 2016-02-06 16:30:00
---

So, I decided to give Linux on the desktop a try. An aging 2012 Retina MacBook
Pro that couldn't drive my new Dell P2715Q 4K monitor and the suspense of
waiting for Skylake replacements reminded me to take a second look at the PC I
put together a few years ago as Hackintosh that was now sitting in the closest
dutifully running Plex without a display.

The last time I tried Linux on the Desktop was when building the Hackintosh,
actually. I remember days of fiddling with Xorg configs to try and get multiple
monitors working and eventually giving up.

I took the easy route at first and installed Ubuntu. Most everything worked out
of the box but installed a ton of stuff I don't need. I was also intrigued by
some alternative tiling window managers like [i3] and [bspwm] and `pacman`
intrigued me so I decided to give it another try with Arch.

There is (of course) a ton of [opportunities for
customization](https://www.reddit.com/r/unixporn) but the out of the box
performance is pretty nice.

There are, of course, some wrinkles and places that are no where near as
polished as on OS X.

## What Works

Most of my favorite Mac OS X apps I use every day are available and seem to run
great on Linux so far:

* [Chrome](https://www.google.com/chrome/browser/desktop/index.html)
* [Docker](https://www.docker.com/) (This was actually what gave me the final push to try Linux. Docker works on OS X, but in a VM. And shared folder performance leaves much to be desired.)
* [Slack](https://slack.com/downloads)
* [Spotify](https://www.spotify.com/us/download/linux/)
* [VirtualBox](https://www.virtualbox.org/wiki/Linux_Downloads) (I'll be running Windows 10 in a VM for a lot of the apps that don't work in Linux, below)

## What Doesn't, and Some Possible Alternatives

* Excel: Google Sheets has replaced must of my need for Excel, so this may not be much of a big deal actually.
* [nvAlt](http://brettterpstra.com/projects/nvalt/): I use nvAlt as my scratchpad for taking notes in Markdown that syncs to Dropbox. I'm sure there's something similar our there, but I haven't yet found it.
* Photoshop: Sorry, Gimp won't cut it. There is no substitute for Photoshop.
* Lightroom: Again, there is no substitute.
* [Tableau Desktop](http://www.tableau.com/products/desktop): Will be running in a Windows VM.
* [Sequel Pro](http://www.sequelpro.com/): Going to try [MySQL Workbench](http://www.mysql.com/products/workbench/). Which is way overkill and not as sleek as Sequel Pro.
* [SSH Tunnel Manager](http://projects.tynsoe.org/en/stm/)
