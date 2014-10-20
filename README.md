# 1. ABOUT

This demo presents a simple REST api for storing user data, creating forms, sending form-embedded messages, and allowing users to respond to embedded forms. There is also a simple admin ui for viewing user form responses.

Back-end uses Express 4 for organization and routing, Mongoose for data store & modelling, and Handlebars for templating.

Emails are delivered via Mailgun.

# 2. REQUIREMENTS

* [NodeJS](http://nodejs.org/) for server back end, and for installing bower.
* [Bower](http://bower.io/) for downloading front end vendor packages, such as jQuery and Foundation.
* [Mongodb](http://www.mongodb.org/) for data store.
* Curl over CLI or other REST client (e.g. [Advanced REST Client](https://chrome.google.com/webstore/detail/advanced-rest-client/hgmloofddffdnphfgcellkdfbfbjeloo?hl=en-US)) for interacting with server REST API.

# 3. SETUP

> Setting up for the first time:

1. Install Node JS. Go [here](http://nodejs.org/download/), download, follow on-screen instructions.

2. Install Bower via npm: `npm install -g bower`. Go [here](http://bower.io/#install-bower) for full instructions.

3. Install Mongodb. Go [here](http://www.mongodb.org/downloads), download, follow on-screen instructions.

4. Grab server node packages: with administrator priviledges, cd into project root & `npm install`.

5. Grab front end vendor packages: with administrator priviledges, cd into project root & `bower install`.

6. Generate starting data: todo.

> Running the server:

1. Start mongo: with administrator priviledges, `mongod --dbpath=/data --port 27017`.

2. Start server module: with administrator priviledges, cd into project root and ``.

3. The server is now running on port 3000. All requests should be made at http://localhost:3000. All the api requests are prefixed with /api/v1.

# 4. API

Response objects follow JSend standard: http://labs.omniti.com/labs/jsend

API endpoints are structured as http://domain/api/v1/foobar. In production this would be http://api.domain/v1/foobar. Easier to not configure a local virtual host with a subdomain.

# 5. TODO

definitely:
- admin ui
- mongoose-fakery
- cli one liners

hopefully:
- unit test
- mailgun callback error handling
- exception handling
- tracker pixel
- validator.js

# 6. NOTES

- Form model fields are not searchable, neither are FormResponse model fields. This could be fixed by making a separate FormField model. So a "form" would consist of a Form object plus all the FormField objects it's related to. Ditto for FormResponse.
