title: S3 set_contents_from_string snippet
date: 2015-05-15 00:00:00
categories:
 - programming
tags: 
 - boto
 - aws
---

I'm putting this here because I need it every time and I have to go looking on the internet for it. It does 3 things:

 * puts a string into a key on S3
 * sets the ACL to public
 * sets the type to `application/json` so it can be consumed like a service call
 
``` python s3.py

import boto


s3 = boto.connect_s3()
bucket = s3.get_bucket('my-fake-s3-service')
key = bucket.get_key('{}/endpoint.json'.format(site_name))

if key is None:
  log.warn('Creating new key for {}'.format(site_name))
  key = bucket.new_key('{}/endpoint.json'.format(site_name))
  key.content_type = 'application/json'

key.set_contents_from_string(json.dumps(struct),
                             replace=True,
                             policy='public-read')

```

Now the next time I need this, hopefully I remember to find it here.
