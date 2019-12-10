---
date: "2016-10-24T12:59:21Z"
title: Spotify Volume Control with Hammerspoon
---

One of Spotify's best features is its ability for a client to become a remote to another version of itself running on a different device. A few months ago I started using the Mac app on my laptop to control the speakers connected to a PC in my office.

Everything works pretty well, except for the volume. Out of habit, I would use the volume keys on my Mac to adjust the volume only to change the _system_ volume and not affect Spotify at all. After probably 600 times of doing this I decided to fix it.

[Hammerspoon](http://www.hammerspoon.org/) to the rescue! (For those not in the know, Hammerspoon allows you to write Lua scripts to control your Mac with a really great "standard library" of functions to control things like window positions, volume, running AppleScript, etc.)

With this little bit of code in my `~/.hammerspoon/init.lua` file I can use:

* F7 to goto the previous song
* F8 to play/pause Spotify only (sometimes iTunes or something would randomly launch before)
* F9 to skip to the next song
* F11/F12 to adjust the volume of Spotify if playing, otherwise adjust the system volume

```lua
-- Remap media keys to Spotify-priority equivalents
hs.hotkey.bind({}, "f7", function()
  hs.spotify.previous()
end)

hs.hotkey.bind({}, "f8", function()
  hs.spotify.playpause()
end)

hs.hotkey.bind({}, "f9", function()
  hs.spotify.next()
end)

hs.hotkey.bind({}, "f11", function()
  playing = hs.spotify.isPlaying()

  if playing then
    hs.spotify.volumeDown()
  else
    output = hs.audiodevice.defaultOutputDevice()
    output:setVolume(output:volume() - 10)
  end
end)

hs.hotkey.bind({}, "f12", function()
  playing = hs.spotify.isPlaying()

  if playing then
    hs.spotify.volumeUp()
  else
    output = hs.audiodevice.defaultOutputDevice()
    output:setVolume(output:volume() + 10)
  end
end)
```

You have to change the Keyboard System Preferences to intrepret the top row as F1, F2, etc. instead of Brightness, Volume, etc.) I picked F7 through F12 so the markings on the keys matched the functionality.

Of course, this may all be irrelevant with the [Magic Toolbar](https://techcrunch.com/2016/10/20/new-macbook-pro-oled-mini-screen-could-be-called-the-magic-toolbar/)...
