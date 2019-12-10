---
date: "2014-05-07T15:07:56Z"
title: In-Terminal Screenshots with iTerm2, Capybara, and Poltergeist
slug: in-terminal-screenshots-with-capybara-and-poltergeist
---
The [latest builds](http://www.iterm2.com/#/section/downloads) of iTerm2 support an [API for displaying images in the terminal](http://www.iterm2.com/images.html#/section/home). It can display any Base64-encoded PNG or JPEG image inline or as a download. Guess what, Poltergeist can render the current page as a... Base64-encoded PNG or JPEG! Let's combine the two with this little snippet of Ruby in our `spec_helper.rb` file:

```ruby
def show_screenshot(width = 640)
  print "\033]1337;File=;inline=1;width=#{width}px:"
  print page.driver.render_base64
  print "\a\n"
end
```

Combine this with a call to [Pry](http://pryrepl.org/)'s `binding.pry` and now you can interact with your page and see the results of your [capybara](https://github.com/jnicklas/capybara) commands. Kind of like a web browser, but in your terminal!

![Screenshot](https://d1j4kwyjzsqmb8.cloudfront.net/20140507111310.png)
