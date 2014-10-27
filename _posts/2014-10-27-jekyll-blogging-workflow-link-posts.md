---
layout: post
title: "Jekyll Blogging Workflow: Link Posts"
date: 2014-10-27 13:46:10
---
I wanted a way to write blog posts digesting the links I come across on a regular basis, much in the style of [Waxy.org/links](http://waxy.org/links/), Mike Gunderloy's [A Fresh Cup](http://afreshcup.com/home/category/double-shot), and numerous [others](http://chneukirchen.org/trivium/) that I follow.

I use [Pinboard](https://pinboard.in/) to collect links throughout each day. It has a really simple interface, can be posted to from all kinds of apps I use everyday ([Reeder](http://reederapp.com/), [TweetBot](http://tapbots.com/software/tweetbot/), etc.), and is run by a really [cool dude](http://idlewords.com/).

Naturally I wanted something that could read my Pinboard bookmarks and automatically post to the blog. However, since I'm using GitHub Pages it can't quite be as automated as a new post everytime I bookmark because I have to create a Markdown file and then push it to GitHub to publish. This is OK, since a digest is probably a better format anyway.

Luckily Pinboard offers [feeds of your bookmarks](https://pinboard.in/howto/#rss) in various formats. We can combine these feeds with a little Ruby magic I whipped up I call `pinboard2md`:

```ruby
#!/usr/bin/env ruby
require 'nokogiri'

doc = Nokogiri::XML(ARGF)

doc.search('post').each do |post|
  url = post.attr('href')
  title = post.attr('description')
  description = post.attr('extended')

  output = "* [#{title}](#{url})"
  output << " - #{description}" if description.to_s.strip != ""
  puts output
end
```

I run it from the command line with:

```bash
curl "https://foo:[MY_PINBOARD_PASSWORD]@api.pinboard.in/v1/posts/all?fromdt=2014-10-17" | pinboard2md
```

It grabs the feed via `curl` (with some additional options to only fetch links I posted within the last week) and pipes to our Ruby script that does some simple parsing and converts it to a bulleted list of links in Markdown format that I can copy and paste into a new post or just pipe to a new file. It's nice because it gives me a bit of time to truly "digest" the links and add additional commentary, although any descriptive text that I entered into Pinboard when I bookmarked will natually be included there as well.

This is a good example of why a Jekyll static page blog is so appealing to developers like me and why command-line workflows should be desirable to anyone who works with text.
