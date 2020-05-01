# bear-to-contentful
A lambda function to create/update and publish blog posts in Contentful.

### Usage

1. Ensure [Netlify CLI](https://github.com/netlify/cli) is installed on your machine.
2. `netlify dev` to run the Netlify build locally
3. To test the function locally, run:

TODO - Figure out why the invocation below doesn't work

netlify functions:invoke --name bear-to-contentful --no-identity --payload '"# Test title\nslug: test-slug\ndate: 2019-12-15\ndescription: Test description\ncategories: First, Second\n---\nTest body"'

### Resources
See [Netlify Dev Intro](https://github.com/netlify/cli/blob/master/docs/netlify-dev.md) for more information.

### Gotchas
If the project dies, it doesn't kill the port. Do so manually:
1. sudo lsof -i :8000
2. kill -9 PID

Netlify dev only supports POST invocations from the command line.

*Make sure you set the 'Content-Type': 'application/json' header on your request, otherwise AWS API Gateway may convert your payload to base64*.