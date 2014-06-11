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

To be continued...





