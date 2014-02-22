title: Networked local vagrant boxes for automation testing
date: 2014-02-21 21:00:00
categories:
 - programming
tags:
 - automation
 - vagrant
---

This post is a bit of a 'note to self'. I am tinkering with [Vagrant][1] boxes today trying to flesh out some [ansible][2]
and I need to get the boxes to talk to each other locally. I know about the [vagrant multi-machine][3] setup, but I was
already partly committed to having 2 individual boxes set up before I discovered it.

So, the trick is, set the network configuration in your `Vagrantfile` to "private_network":

``` ruby box-a
  config.vm.network "private_network", ip: "192.168.2.4"
```
``` ruby box-b
  config.vm.network "private_network", ip: "192.168.2.5"
```

With the IPs set differently it seems to work, and the host is accessible as well. Note that my host subnet is `192.168.1.x`.
Probably not the right way, but it works for now.

af

[1]: http://vagrantup.com
[2]: http://ansible.com
[3]: http://docs.vagrantup.com/v2/multi-machine/
