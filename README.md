# 1. ABOUT

todo

# 2. REQUIREMENTS

todo

# 3. SETUP

todo

# 4. API

Response objects follow JSend standard: http://labs.omniti.com/labs/jsend

API endpoints are structured as http://domain/api/v1/foobar. In production this would be http://api.domain/v1/foobar. Easier to not configure a local virtual host with a subdomain.

## Methods

### Accept a form submission from a sent message

POST http://localhost/forms/v1/respond/[messageID]

### Enqueue a message for delivery

POST http://localhost/api/v1/message

Params:
* [recipientID]
* [from]
* [subject]
* [body]
* [templateID]
* [templateVals]

### Retrieve a sent message

GET http://localhost/api/v1/message/[messageID]

No params

### Retrieve a recipient

GET http://localhost/api/v1/recipient/[recipientID]

# 5. TODO

- validator.js
- exception handling
- data store
- mailgun callback error handling
- mailgun callback save sent message id to data store
- unit test
- session store
- email form html
- tracker pixel
- form response endpoint
- admin ui
