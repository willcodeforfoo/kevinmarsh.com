---
layout: post
title: "TIL: Shell-like Globbing of Strings in Ruby"
date: 2016-03-31 08:20:41
categories: TIL
---

Today I learned you can perform shell-like globbing and matching of _any_ string in Ruby with `File.fnmatch` (not just filenames).

```ruby
File.fnmatch("foo*", "food") #=> true
File.fnmatch("foo*", "bar")  #=> false
```

This seems a little more "secure" for user-specified patterns and is more performant than even simple regular expressions, not counting what weird things your (malicious) users may be able to do can do with expensive backtracking and whatnot.

```ruby
require 'benchmark'

n = 500000
Benchmark.bm do |x|
  x.report("fnmatch") { n.times { File.fnmatch("foo*", "food")      } }
  x.report("regexp")  { n.times { "food".match(Regexp.new("foo.+")) } }
end
```

           user     system      total        real
    fnmatch  0.250000   0.000000   0.250000 (  0.250139)
    regexp  3.510000   0.060000   3.570000 (  3.574322)

Source: [How do I test whether a string would match a glob in Ruby?](http://stackoverflow.com/questions/7186361/how-do-i-test-whether-a-string-would-match-a-glob-in-ruby)
