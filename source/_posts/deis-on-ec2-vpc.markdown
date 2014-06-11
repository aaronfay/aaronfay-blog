title: Experimenting with Deis on AWS EC2 VPC
date: 2014-06-11 12:00:00
categories:
 - programming
tags:
 - aws
 - ec2
 - paas
 - vpc
---

**Note**: this article deals with Deis as of 0.9.0.

At [work](http://strathcom.ca) we've been looking for a good solution to consolidate our service layer. We have around
30-40 backing services for our application and web tiers. The problem with the current setup is that they're deployed
all over the place; some in EC2-land, and some are colocated, and they're in various languages.

We're working on consolidating our services into a consolidated architecture:

 * service stack (Python/WSGI)
 * load balancer
 * service cache
 * service proxy
 
...or something like that. I'm primarily interested in the first item today: service stack. 

## The problem with EC2
We absolutely love Amazon Web Services. Their services remove a lot of the headache from our day-to-day life. However,
EC2 instances get pricey, especially when deploying a lot of services. Even if we put all of our services on their own
micro instances (which isn't a great idea) the hard cost is pretty clear... let's assume 50 services at today's prices:

 * 50 `t1.micro` instances x ~$14/month = $700/month
 
This doesn't seem like an astounding number, but to be fair, this probably isn't an accurate estimate; 
we're still forgetting high availability and load balancing, as well as snapshots. Assuming a `t1.micro` is a great
option for all services, let's factor in the new costs:

 * (50 `t1.micro` instances x 2 availability zones x $14/month) + (50 elastic load balancers x $14/month) = $2100/month
 
Having a high availability setup is starting to add up a bit, and there are still additional costs for EBS, snapshots, S3 
(if you're using it), and data transfer.

# The case for Deis
[Deis](http://deis.io) is a [platform-as-a-service](http://en.wikipedia.org/wiki/Platform_as_a_service) (Paas) much like 
[Heroku](http://heroku.com) or [Elastic Beanstalk](http://aws.amazon.com/elasticbeanstalk/). There are a few other open
source solutions out there like [Flynn.io](http://flynn.io) (which is at the time of writing still in alpha) and 
[dokku](https://github.com/progrium/dokku). Dokku will only run on a single instance, which doesn't make it quite as 
appealing as Deis.

The whole idea behind Deis is that you can simple `git push` your application code to the cluster controller, and the 
platform will take care of the rest, including providing the hostname and options to scale. The solution is based on 
[Docker](http://docker.io) which makes it extra appealing.

## Enter AWS EC2
There is a [contrib setup for EC2](https://github.com/deis/deis/tree/master/contrib/ec2) in the source repository, and 
it looks like it should work out of the box. It doesn't currently appear to have support for AWS VPC just yet, but it
is just using CloudFormation stacks behind the scenes, so the configuration should be pretty straight forward. Now, 
I don't know about anyone else, but CloudFormation templates ([example](https://s3.amazonaws.com/cloudformation-templates-us-east-1/Redmine_Single_Instance_With_RDS.template) 
make my brain hurt. AWS's documentation is pretty clear for the most part, but sometimes it seems like you need a 
very specific configuration in about 6 different places for something to work. **VPC is very much like this**. 

Fortunately, [someone has already tackled this](https://github.com/deis/deis/pull/1028) and there is a pull request 
open to merge it into deis trunk. The pull request effectively adds a couple configuration values that should allow deis
to operate in a VPC. Primarily, there are a couple environment variables you need to set before provisioning the cluster:

```
export VPC_ID=vpc-a26218bf
export VPC_SUBNETS=subnet-04d7f942,subnet-2b03ab7f
```

I did run into one problem with this, however, when I specified the environment variables, I found my CloudFormation stack 
creation was failing (you can find this in your AWS console under the CloudFormation section, click on a stack, and select
 the 'Events' tab below). The error I was getting was related to the VPC and AutoScalingGroup not being created in the 
same availability zone, so I had to tweak [the CloudFormation template](https://github.com/deis/deis/blob/master/contrib/ec2/deis.template#L160)
under the `Resources:CoreOSServerAutoScale:Properties:AvailabilityZones` key to reflect my AZ (namely `us-west-2b`).

## The IGW
Another problem I ran into (that had nothing to do with Deis) was I was deploying to an availability zone that didn't actually have access to the public internet (no gateway/nat). This manifested as an error when trying to `make run` the cluster:

```
Failed creating job deis-registry.service: 501: All the given peers are not reachable (Tried to connect to each peer twice and failed) [0]
```

Once I got into the proper availability zone, the problem went away.

## `make run`
I ran into some more issues when I finally got `make run`-ning...first the "activation" part of it took a *really* long time, like 15 minutes. I finally got this error:

```
af:deis aaronfay$ make run
fleetctl --strict-host-key-checking=false submit  registry/systemd/deis-registry.service  logger/systemd/deis-logger.service  cache/systemd/deis-cache.service  database/systemd/deis-database.service
Starting 1 router(s)...
Job deis-router.1.service scheduled to 22e48bb9.../10.0.14.17
Starting Deis! Deis will be functional once all services are reported as running... 
fleetctl --strict-host-key-checking=false start  registry/systemd/deis-registry.service  logger/systemd/deis-logger.service  cache/systemd/deis-cache.service  database/systemd/deis-database.service
Job deis-registry.service scheduled to 4cb60f67.../10.0.14.16
Job deis-logger.service scheduled to 22e48bb9.../10.0.14.17
Job deis-database.service scheduled to 4cb60f67.../10.0.14.16
Job deis-cache.service scheduled to bc34904c.../10.0.14.13
Waiting for deis-registry to start (this can take some time)... 
Failed initializing SSH client: Timed out while initiating SSH connection
Status: Failed initializing SSH client: Timed out while initiating SSH connection
Failed initializing SSH client: Timed out while initiating SSH connection
One or more services failed! Check which services by running 'make status'
You can get detailed output with 'fleetctl status deis-servicename.service'
This usually indicates an error with Deis - please open an issue on GitHub or ask for help in IRC
```

One of the admins on the IRC channel for `#deis` mentioned that you can `make run` again with no problems, however after several runs I still couldn't get the command to complete free from errors. `make status` pointed out the issue with the controller:

```
af:deis aaronfay$ make status
fleetctl --strict-host-key-checking=false list-units
UNIT                    LOAD    ACTIVE  SUB     DESC            MACHINE
deis-cache.service      loaded  active  running deis-cache      bc34904c.../10.0.14.13
deis-controller.service loaded  failed  failed  deis-controller 22e48bb9.../10.0.14.17
deis-database.service   loaded  active  running deis-database   4cb60f67.../10.0.14.16
deis-logger.service     loaded  active  running deis-logger     22e48bb9.../10.0.14.17
deis-registry.service   loaded  active  running deis-registry   4cb60f67.../10.0.14.16
deis-router.1.service   loaded  active  running deis-router     22e48bb9.../10.0.14.17
```
`failed` hey? The same admin on the channel recommended `fleetctl start deis-controller` although I think I'm using an older version of fleetctl (`0.2.0`?) and I had to actually run `fleetctl start deis-controller.service`. That appears to have worked:

```
af:deis aaronfay$ fleetctl start deis-controller.service
Job deis-controller.service scheduled to 22e48bb9.../10.0.14.17

af:deis aaronfay$ make status
fleetctl --strict-host-key-checking=false list-units
UNIT                    LOAD    ACTIVE  SUB     DESC            MACHINE
deis-cache.service      loaded  active  running deis-cache      bc34904c.../10.0.14.13
deis-controller.service loaded  active  running deis-controller 22e48bb9.../10.0.14.17
deis-database.service   loaded  active  running deis-database   4cb60f67.../10.0.14.16
deis-logger.service     loaded  active  running deis-logger     22e48bb9.../10.0.14.17
deis-registry.service   loaded  active  running deis-registry   4cb60f67.../10.0.14.16
deis-router.1.service   loaded  active  running deis-router     22e48bb9.../10.0.14.17
```

## So far so goo
I now have Deis running in the VPC, well, the first bits anyway. I will update with the second part which includes DNS configuration, initializing a cluster, and deploying an app.

Cheers,




