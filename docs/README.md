# Documentation

This directory contains the VitePress documentation for Nuxt Typesense.

## Development

Start the documentation dev server:

```bash
pnpm run docs:dev
```

The documentation will be available at http://localhost:5173

## Building

Build the documentation for production:

```bash
pnpm run docs:build
```

Preview the production build:

```bash
pnpm run docs:preview
```

## Structure

```
docs/
├── .vitepress/
│   └── config.ts          # VitePress configuration
├── public/
│   └── logo.svg           # Static assets
├── index.md               # Home page
├── guide/
│   ├── what-is-nuxt-typesense.md
│   ├── getting-started.md
│   ├── configuration.md
│   ├── environment-variables.md
│   ├── collections.md
│   ├── documents.md
│   ├── search.md
│   └── api-keys.md
├── api/
│   ├── composables.md
│   ├── clients.md
│   └── types.md
└── examples/
    ├── basic-usage.md
    ├── collection-management.md
    ├── document-operations.md
    ├── search-queries.md
    └── complete-component.md
```

## Contributing

To add or update documentation:

1. Edit the relevant markdown files
2. Preview changes with `pnpm run docs:dev`
3. Build to verify with `pnpm run docs:build`
4. Submit a pull request

## Markdown Features

VitePress supports:
- Standard Markdown
- Vue components in Markdown
- Custom containers (tip, warning, danger, etc.)
- Code highlighting
- Table of contents
- And more!

See [VitePress documentation](https://vitepress.dev/) for details.
