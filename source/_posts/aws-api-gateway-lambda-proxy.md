title: AWS API gateway and Lambda Proxy integration
date: 2016-11-21 12:00:00
categories:
 - programming
tags: 
 - aws
 - lambda
---
This is more of a *note to self* as much as a blog post, as well as I would
like to get blogging again.

## Lambda integration vs. Lambda-Proxy
We just went through the process of setting up an AWS API proxy for lambda again
today, and API Gateway seems to have changed a lot over the last little bit.

One of the new Integration Request options is "Lambda Proxy" which basically
just sends the full request to Lambda (including the URL info) as opposed to
just invoking the function.

The input would look something like ([docs][1]):

``` json
{
  "message": "Hello me!",
  "input": {
    "resource": "/{proxy+}",
    "path": "/hello/world",
    "httpMethod": "POST",
    "headers": {
      "Accept": "*/*",
      "Accept-Encoding": "gzip, deflate",
      "cache-control": "no-cache",
      "CloudFront-Forwarded-Proto": "https",
      "CloudFront-Is-Desktop-Viewer": "true",
      "CloudFront-Is-Mobile-Viewer": "false",
      "CloudFront-Is-SmartTV-Viewer": "false",
      "CloudFront-Is-Tablet-Viewer": "false",
      "CloudFront-Viewer-Country": "US",
      "Content-Type": "application/json",
      "headerName": "headerValue",
      "Host": "gy415nuibc.execute-api.us-east-1.amazonaws.com",
      "Postman-Token": "9f583ef0-ed83-4a38-aef3-eb9ce3f7a57f",
      "User-Agent": "PostmanRuntime/2.4.5",
      "Via": "1.1 d98420743a69852491bbdea73f7680bd.cloudfront.net (CloudFront)",
      "X-Amz-Cf-Id": "pn-PWIJc6thYnZm5P0NMgOUglL1DYtl0gdeJky8tqsg8iS_sgsKD1A==",
      "X-Forwarded-For": "54.240.196.186, 54.182.214.83",
      "X-Forwarded-Port": "443",
      "X-Forwarded-Proto": "https"
    },
    "queryStringParameters": {
      "name": "me"
    },
    "pathParameters": {
      "proxy": "hello/world"
    },
    "stageVariables": {
      "stageVariableName": "stageVariableValue"
    },
    "requestContext": {
      "accountId": "12345678912",
      "resourceId": "roq9wj",
      "stage": "testStage",
      "requestId": "deef4878-7910-11e6-8f14-25afc3e9ae33",
      "identity": {
        "cognitoIdentityPoolId": null,
        "accountId": null,
        "cognitoIdentityId": null,
        "caller": null,
        "apiKey": null,
        "sourceIp": "192.168.196.186",
        "cognitoAuthenticationType": null,
        "cognitoAuthenticationProvider": null,
        "userArn": null,
        "userAgent": "PostmanRuntime/2.4.5",
        "user": null
      },
      "resourcePath": "/{proxy+}",
      "httpMethod": "POST",
      "apiId": "gy415nuibc"
    },
    "body": "{\r\n\t\"a\": 1\r\n}"
  }
}
```

The response should look something like ([docs][2]):

``` json
{
    "statusCode": httpStatusCode,
    "headers": { "headerName": "headerValue", ... },
    "body": "..."
}
```

Updates mentioned in [the AWS blog][3]. Cheers.

[1]: http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-set-up-simple-proxy.html#api-gateway-simple-proxy-for-lambda-input-format
[2]: http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-set-up-simple-proxy.html#api-gateway-simple-proxy-for-lambda-output-format
[3]: https://aws.amazon.com/blogs/aws/api-gateway-update-new-features-simplify-api-development/
