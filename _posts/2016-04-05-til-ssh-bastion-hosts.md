---
layout: post
title: "TIL: SSH Bastion Hosts"
date: 2016-04-05 17:18:10
categories: TIL
---

Today I finally learned how to setup "bastion" or gateway hosts to enable one-line simple SSHing to machines behind a firewall.

For too long I would first SSH into the public machine, then issue another SSH command to get to the machine I wanted. I knew it was possible to do it with one line but never bothered figuring it out. I finally [found a straightforward guide](http://blog.scottlowe.org/2015/11/21/using-ssh-bastion-host/) and made it work.

The setup is as follows: **gateway** is a machine with a public IP address and SSH port open, **storage** is not. I want to be able to simply `ssh gateway` (which already works without any extra configuration) _and_ `ssh storage`.

Here's what to add to `~/.ssh/config`:

```
Host gateway
  HostName xxx.xxx.xxx.xxx # public IP (or hostname)
  ForwardAgent yes

Host storage
  ProxyCommand ssh gateway -W yyy.yyy.yyy.yyy:22 # internal IP (or hostname)
                                                 # even though 22 is the default, it's required
```

As a bonus this works perfectly with Transmit! I can just specify `storage` as the hostname and let SSH create the tunnel for me.
