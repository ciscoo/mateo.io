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

Create tag to deploy:

```bash
git tag vx.x.x
git tag push origin vx.x.x
```
