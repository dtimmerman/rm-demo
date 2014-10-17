# ABOUT

todo

# REQUIREMENTS

todo

# SETUP

todo

# API

Response objects follow JSend standard: http://labs.omniti.com/labs/jsend

## Methods

### Create a template for a message to use

POST http://localhost/v1/template

Params:
* [body]

### Enqueue a message for delivery

POST http://localhost/v1/message/

Params:
* [from]
* [to]
* [subject]
* [body]

### Retrieve a sent message

GET http://localhost/v1/message/<messageid>

# TODO

- validator.js
- exception handling
- data store
- mailgun callback error handling
- mailgun callback save sent message id to data store
- unit test
- session store
- email form html
- form response endpoint
- admin ui
