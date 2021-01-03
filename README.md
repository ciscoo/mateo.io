## [mateo.io](https://mateo.io)

![Deploy](https://github.com/ciscoo/mateo.io/workflows/Deploy/badge.svg)

The source of my personal website.

## Development Setup

Ensure you have:

* [Hugo](https://gohugo.io/)

Next simply run the development server


```bash
hugo server
```

## Deployment

Deployment is handled by the [deploy](https://github.com/ciscoo/mateo.io/actions?query=workflow%3ADeploy) workflow

> The Firebase token used for deployment expires after one month from the time it was generated. Ensure a new token
> is created prior to deployment.

Create tag to deploy:

```bash
git tag vx.x.x
git push origin vx.x.x
```
