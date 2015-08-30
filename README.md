# tailecho

A simple web sockets (socket.io) service that provides two endpoints:
* /monitor/{keyword}
* /notify/{keyword}

When the notify resource is requested (HTTP GET), a message is sent out to 
all clients that have registered with it. The monitor resource provides an
example how to handle the notification.

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) installed.

```sh
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## What is it good for?

I use it to notify me when a particular string appears in a certain log file.
It should save me a reasonable amount of frustration.

## Security?

Tailecho is not meant for clandestine endeavours.
