Title: Trying out Librato Metrics with Node.js
Author: Aaron Fay
Date: Oct 18 2012
Tags: node.js metrics librato charts fun

I've started helping out with a little bit of sysadmin at work, since our systems
team is swamped most of the time.  My task is to do an audit on our [Nagios][] 
system and make sure everything is up to snuff.  We're running [Nagios][] 3 on 
one machine and [NRPE][] to pull performance data from the cluster.  [NRPE][] is
a plugin to execute scripts remotely to gather [performance data][].

[Nagios]: http://www.nagios.org/
[NRPE]: http://exchange.nagios.org/directory/Addons/Monitoring-Agents/NRPE--2D-Nagios-Remote-Plugin-Executor/details

## Graphs and more graphs
Nagios has some good graphs for reviewing [performance data][], and lots of options
for configuring and customizing things based on your preferences.  However, like
many aging open-source projects, Nagios feels a little clunky, and it's graphing 
system, while extendable (by the looks of things) isn't quite as shiny as some of
the newer systems I've looked at.

A typical Nagios graph looks like this (image from [IT Slave](http://www.it-slav.net/)):
![nagios graph](http://www.it-slav.net/blogs/wp-content/uploads/2009/02/asterisk_graph.png)

[performance data]: http://nagios.sourceforge.net/docs/3_0/perfdata.html

## Correlating data
One of the interesting things about having a lot of measurements, is finding fun
and interesting ways to mash them together.  I ran into [Librato Metrics][] the 
other day while looking at some different options for graphing systems information
in the cloud.  I don't want to replace Nagios, by any means, for what it does, it 
does really well.

__What I want is a better way to correlate data.__

[Librato Metrics][] has an [api][] available for several languages so you can 
post metrics information to their system on the fly.  Compared to [Datadog][] 
(which also looks very awesome, btw) who charges $15/host/month, [Librato Metrics][]
charges based on measurements, and they have a nifty little chart on their
[pricing page][] to give you an idea of the cost to use their service.  According to
that page, each measurement is going to cost you $0.000002 per measurement

I did the math, for the ~180 measurements we run at work every 90 seconds, it would
cost us about $12/month to use their service.

[Librato Metrics]: https://metrics.librato.com/
[api]: http://dev.librato.com/v1/metrics#metrics
[Datadog]: http://www.datadoghq.com/ 
[pricing page]: https://metrics.librato.com/pricing


### So what do they offer?
[Librato Metrics][]