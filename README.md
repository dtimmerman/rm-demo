# I. ABOUT

This demo presents a simple REST api for storing user data, creating forms, sending form-embedded messages, and allowing users to respond to embedded forms. There is also a simple admin ui for viewing user form responses.

Back-end uses Express 4 for organization and routing, Mongoose for data store & modelling, and Handlebars for templating.

Emails are delivered via Mailgun.

# II. REQUIREMENTS

* [NodeJS](http://nodejs.org/) for server back end, and for installing bower.
* [Bower](http://bower.io/) for downloading front end vendor packages, such as jQuery and Foundation.
* [Mongodb](http://www.mongodb.org/) for data store.
* Curl over CLI or other REST client (e.g. [Advanced REST Client](https://chrome.google.com/webstore/detail/advanced-rest-client/hgmloofddffdnphfgcellkdfbfbjeloo?hl=en-US)) for interacting with server REST API.

# III. SETUP

## A. Setting up for the first time:

1. Install Node JS. Go [here](http://nodejs.org/download/), download, follow on-screen instructions.

2. Install Bower via npm: `npm install -g bower`. Go [here](http://bower.io/#install-bower) for full instructions.

3. Install Mongodb. Go [here](http://www.mongodb.org/downloads), download, follow on-screen instructions.

4. Grab server node packages: with administrator priviledges, cd into project root & `npm install`.

5. Grab front end vendor packages: with administrator priviledges, cd into project root & `bower install`.

## B. Generating data for the first time:

### First, add your email to the store by using POST /api/v1/recipients.

In CLI (replace name and email with your name and email address):
```
curl -i -H "Accept: *" -X POST -d "name=Derek Timmerman&email=timmermanderek@gmail.com" http://localhost:3000/api/v1/recipient
```

Alternatively, if you're using a visual REST client, your request should be a POST to http://localhost:3000/api/v1/recipient, with two form fields:
* name: `Derek Timmerman`
* email: `timmermanderek@gmail.com`

Response body should look like:
```
{
   "status":"success",
   "data":[
      {
         "__v":0,
         "name":"Derek",
         "email":"timmermanderek@gmail.com",
         "_id":"544462765d1bbed756197ba2",
         "created":"2014-10-20T01:16:38.275Z"
      }
   ]
}
```

In the response body, take note of the value for data[0]._id. This is your __recipient ID__. It should be a random-like string, e.g. "544461dc0eb2509d55c0b971". This will be later used when you send your embedded-form email.

### Next, create your form, which will eventually be embedded in an email, by using POST /api/v1/form.

In CLI:
```
curl -i -H "Accept: *" -X POST -d 'name=Email Survey&fields=[{"name":"firstname","label":"First Name","type":"text"},{"name":"lastname","label":"Last Name","type":"text"},{"name":"message","label":"Message","type":"textarea"}]' http://localhost:3000/api/v1/form
```

Alternatively, if you're using a visual REST client, your request should be a POST to http://localhost:3000/api/v1/form, with two form fields:
* name: `Email Survey`
* fields: `[{"name":"firstname","label":"First Name","type":"text"},{"name":"lastname","label":"Last Name","type":"text"},{"name":"message","label":"Message","type":"textarea"}]`

The fields parameter is a JSON array of form fields, with each array item consisting of a field name

Response body should look like:

```
{
   "status":"success",
   "data":[
      {
         "name":"Email Survey",
         "fields":"[{\"name\":\"firstname\",\"label\":\"First Name\",\"type\":\"text\"},{\"name\":\"lastname\",\"label\":\"Last Name\",\"type\":\"text\"},{\"name\":\"message\",\"label\":\"Message\",\"type\":\"textarea\"}]",
         "_id":"5444673d59ac72cd5761627f",
         "created":"2014-10-20T01:37:01.900Z",
         "html":"&lt;form action=\"http://localhost:3000/api/v1/form/response\" method=\"POST\"&gt;\n  &lt;div class=\"field-items\"&gt;\n    &lt;div id=\"firstname-wrap\" class=\"field-items__item\"&gt;\n  &lt;label&gt;First Name&lt;/label&gt;\n  &lt;input type=\"text\" name=\"firstname\" value=\"\"&gt;\n&lt;/div&gt;\n&lt;div id=\"lastname-wrap\" class=\"field-items__item\"&gt;\n  &lt;label&gt;Last Name&lt;/label&gt;\n  &lt;input type=\"text\" name=\"lastname\" value=\"\"&gt;\n&lt;/div&gt;\n&lt;div id=\"message-wrap\" class=\"field-items__item\"&gt;\n  &lt;label&gt;Message&lt;/label&gt;\n  &lt;textarea name=\"message\"&gt;&lt;/textarea&gt;\n&lt;/div&gt;\n\n  &lt;/div&gt;\n  &lt;input type=\"hidden\" name=\"formID\" value=\"5444673d59ac72cd5761627f\"&gt;\n  &lt;input type=\"hidden\" name=\"messageID\" value=\"\"&gt;\n  &lt;input type=\"hidden\" name=\"recipientID\" value=\"\"&gt;\n  &lt;input type=\"hidden\" name=\"recipientEmail\" value=\"\"&gt;\n  &lt;input type=\"submit\" value=\"submit\"&gt;\n&lt;/form&gt;\n",
         "id":"5444673d59ac72cd5761627f"
      }
   ]
}
```

In the response body, take note of the value for data[0]._id. This is your __form ID__. It should be a random-like string, e.g. "5444673d59ac72cd5761627f". This will be later used when you send your embedded-form email.

## Running the server:

1. Start mongo: with administrator priviledges, `mongod --dbpath=/data --port 27017`.

2. Start server module: with administrator priviledges, cd into project root and ``.

3. The server is now running on port 3000. All requests should be made at http://localhost:3000. All the api requests are prefixed with /api/v1.

# 4. API

Response objects follow JSend standard: http://labs.omniti.com/labs/jsend

API endpoints are structured as http://domain/api/v1/foobar. In production this would be http://api.domain/v1/foobar. Easier to not configure a local virtual host with a subdomain.

API methods are documented in index.js.

# 5. TODO

definitely:
- admin ui
- cli one liners

hopefully:
- unit test
- mailgun callback error handling
- exception handling
- tracker pixel
- validator.js

# 6. NOTES

- Form model fields are not searchable, neither are FormResponse model fields. This could be fixed by making a separate FormField model. So a "form" would consist of a Form object plus all the FormField objects it's related to. Ditto for FormResponse.
