---
layout: post
title: "Jekyll Blogging Workflow: Post Script"
---

Since Jekyll is file based, there isn't a "New Post" button, you just have to create a new file. Posts are usually just a simple Markdown document, but require a slugged filename and a bit of front matter to get started.

I used [this script](https://gist.github.com/al3x/100171) as a starting point, but added some of my own tweaks. Here's some features:

* Quickly start a new post with a given title with `post "Post Title here"`
* Use STDIN as the body, if provided. This works great with my [previously-blogged-about pinboard2md script](/2014/10/27/jekyll-blogging-workflow-link-posts.html)) I can fetch links and pre-populate them into a post all in one step: `curl "https://foo:[password]@api.pinboard.in/v1/posts/all?fromdt=2016-03-01" | ~/bin/pinboard2md | ~/bin/post "Friday Link Review"`

Here's the script, which you'll need to tweak for your own environment:

```ruby
#!/usr/bin/env ruby

# Generate a new post for a Jekyll blog with dated filename and relevant front-
# matter. Will pre-populate the post from STDIN.
# modified from https://gist.github.com/al3x/100171

unless ARGV[0]
  puts 'Usage: post "the post title"'
  exit(-1)
end

date_prefix = Time.now.strftime("%Y-%m-%d")
postname = ARGV[0].strip.downcase.gsub(/[^a-z1-9]+/, '-')
post = "/Users/kmarsh/Code/willcodeforfoo.github.io/_posts/#{date_prefix}-#{postname}.md"

header = <<-END
---
layout: post
title: "#{ARGV[0]}"
date: #{Time.now.strftime('%Y-%m-%d %H:%M:%S')}
---

END

File.open(post, 'w') do |f|
  f << header
  f << STDIN.read unless STDIN.tty?
end

system("atom", post)
```
