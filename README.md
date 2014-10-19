# 1. ABOUT

todo

# 2. REQUIREMENTS

* NodeJS
* Mongodb
* CLI or other REST client (e.g. Advanced REST Client)

# 3. SETUP

todo

# 4. API

Response objects follow JSend standard: http://labs.omniti.com/labs/jsend

API endpoints are structured as http://domain/api/v1/foobar. In production this would be http://api.domain/v1/foobar. Easier to not configure a local virtual host with a subdomain.

# 5. TODO

definitely:
- form response endpoint
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
