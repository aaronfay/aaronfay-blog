title: Trying out Librato Metrics with Node.js
date: 2012-10-18 12:00:00
categories:
 - monitoring
tags: 
 - node.js
 - metrics
 - librato
 - charts
 - fun
---

I've started helping out with a little bit of sysadmin at work, since our systems
team is swamped most of the time.  My task is to do an audit on our [Nagios][] 
system and make sure everything is up to snuff.  We're running [Nagios][] 3 on 
one machine and [NRPE][] to pull performance data from the cluster (about 20 machines).  [NRPE][] is
a plugin to execute scripts remotely to gather [performance data][].

[Nagios]: http://www.nagios.org/
[NRPE]: http://exchange.nagios.org/directory/Addons/Monitoring-Agents/NRPE--2D-Nagios-Remote-Plugin-Executor/details

Nagios can do both active and passive measurements, meaning it can execute scripts
remotely, or sit and listen as your machines push data into it.  We're only using
the remote execution method (via [NRPE]).  One of the downsides to this is having
to set up new machines with the scripts and plugins for Nagios.  You have to set up
both the script and config on the remote machine, and then configure the Nagios 
machine to know what scripts to run remotely.  Even with all that, it does a good
job, and seems fairly performant.

## Graphs and more graphs
Nagios has some good graphs for reviewing [performance data][], and lots of options
for configuring and customizing things based on your preferences.  However, like
many aging open-source projects, Nagios feels a little clunky, and it's graphing 
system, while extendable (by the looks of things) isn't quite as shiny as some of
the newer systems I've looked at.

A typical Nagios graph looks like this (image from [IT Slave](http://www.it-slav.net/)):
![nagios graph](/images/librato-metrics-test-with-nodejs-graph.png)

[performance data]: http://nagios.sourceforge.net/docs/3_0/perfdata.html

The graphs are really good as they stand, you can zoom in to find out more detail 
on a set of measurements, and you can stack your measurements together for 
correlation, but it's not very user-friendly, and requires nearly a sysadmin to
accomplish.

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
that page, each measurement is going to cost you $0.000002 per measurement.

I did the math, for the ~180 measurements we run at work every 90 seconds, it would
cost us about $12/month to use their service (compared to ~$300/month on Datadog 
for 20 hosts).  The flip side to that is, Datadog has a whole bunch of 1-click 
integration scripts to get up and running, while Librato is still a bit of a 
WIP in that area.  No skin to me.

[Librato Metrics]: https://metrics.librato.com/
[api]: http://dev.librato.com/v1/metrics#metrics
[Datadog]: http://www.datadoghq.com/ 
[pricing page]: https://metrics.librato.com/pricing


### So what do they offer?
[Librato Metrics][] is really a data aggregation service, they offer the ability
for you to create measurements with a namespace and a source, and then give you
a myriad of ways to graph and correlate that data using instruments.  Don't just
take it from me, go check out [their video](https://metrics.librato.com/) and see
for yourself. 

Some of the things that make this system fairly attractive is the use of [Highcharts][]
for the graphing, and a really slick theme that is nice to look at.  Their dashboards 
are a fancy way to mash a whole bunch of instruments into one place.

[Highcharts]: http://highcharts.com/

## A poor demo
I've only had limited time to get started with the system, but I wrote a quick little
demo script in [node.js](http://nodejs.org) (of course) and tried it out on my EC2 instance. 

For the demo I pushed load averages at 1, 5, and 15 minutes, as well as free memory on
the machine (measured between 0.01 and 1.00).

Here's the result:
![quick metrics test](/images/librato-metrics-test-with-nodejs-demo.png)

To get the performance data, I just pulled down [node-fibonacci](https://github.com/fvdm/nodejs-fibonacci)
and asked my EC2 machine to calculate the fibonacci sequence for to a ridiculous length (three
million trillion or something)... needless to say, it stressed out the machine a bit...

Here's my node script to push data to Librato, it uses [node-librato-metrics][] and [os-monitor][]:

[node-librato-metrics]: https://github.com/holidayextras/node-librato-metrics
[os-monitor]: https://github.com/lfortin/node-os-monitor

``` javascript
var osm = require('os-monitor')
  , librato = require('librato-metrics')
  ;

client = librato.createClient({
  email: '<put your email here>',
  token: '<put your token here>'
});
osm.start({delay: 90000});
osm.on('monitor', function (event) {
  client.post('/metrics', {
    gauges: [
      {name: 'aws.instance01.cpu1', value: event.loadavg[0]},
      {name: 'aws.instance01.cpu5', value: event.loadavg[1]},
      {name: 'aws.instance01.cpu15', value: event.loadavg[2]},
      {name: 'aws.instance01.memusage', value: (event.freemem/event.totalmem) * 100}
    ]
  }, function (err, response) {
    if (err) {
      throw err;
    }
  });
});
```

It basically takes an OS measurement on CPU and calculates free memory every 90 seconds.
Then it pushes that information to librato, and carries on.  Since it's node, the whole 
operation happens asynchronously and everybody's happy.

### HipChat
Did I mention they have 1-click "send this snapshot to [HipChat][]" also?  That's just fun.

[HipChat]: http://www.hipchat.com/

## Happy happy!

There you have it, fun fun.  Can't wait to start profiling some scripts and 
aggregating some other data with this thing.

Cheers,
Af