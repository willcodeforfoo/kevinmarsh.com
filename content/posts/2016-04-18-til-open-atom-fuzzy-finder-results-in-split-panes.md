---
categories:
  - TIL
date: "2016-04-18T12:43:04Z"
title: 'TIL: Open Atom Fuzzy Finder Results in Split Panes'
slug: til-open-atom-fuzzy-finder-results-in-split-panes
---

One of the things I missed most from vim's [fuzzy](https://github.com/junegunn/fzf) [finder](https://github.com/kien/ctrlp.vim) plugins is the ability to open a result in a new split. So today I decided to take a few minutes today and look for a solution. Turns out I'm not the first to want this, and came across [this issue](https://github.com/atom/fuzzy-finder/issues/81) that has a nice solution.

Turns out, all you need to do is add something like the following to your keymap (goto Atom → Keymap... to edit it):

```coffee
'.fuzzy-finder atom-text-editor[mini]':
  'cmd-right': 'pane:split-right'
  'cmd-down': 'pane:split-down'
```

Now when you're searching for a file, you can hit ⌘→ to open it in a new pane to the right, or ⌘↓ to open it in a new pane below. (You could probably figure out the other directions, but I find these 2 are what I want do do 99% of the time). Pretty handy!
