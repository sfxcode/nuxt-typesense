# Playground

The repository includes a Nuxt app in `playground/` that exercises the module against a real Typesense server.

```bash
pnpm dev:prepare
pnpm dev          # http://localhost:3000
```

Set `TYPESENSE_URL` and `TYPESENSE_API_KEY` (an admin key, since the demos write data) before starting. The playground runs in server mode and uses the `/api/typesense/*` proxy routes.

## Seed the test data

On the **Overview** page, **Initialize Test Data** creates the `products`, `books` and `users` collections with sample documents, plus a synonym set, a stopword set and a curation set (`demo_synonyms`, `demo_stopwords`, `demo_curation`). **Clear All Data** removes them again.

## Pages

| Menu | Page | What it shows |
|------|------|---------------|
| Search | Search Demo | Live product search with filters |
| Search | Search Presets | Running a search with a stored preset |
| Tuning | Synonyms & Stopwords | Create, list and delete synonym and stopword sets, then search with stopwords applied |
| Tuning | Curation | Pin or hide documents for a query with a curation set |
| Data | Collections | Browse, create and delete collections |
| Data | Analytics | Analytics rules and events |
| Admin | Info | Server status and runtime configuration |
| Admin | Key Management | List, create and delete API keys |
| Admin | Operations | Metrics and stats, plus buttons for clear cache, compact DB, debug info and snapshot |
| | Examples | Runnable snippets for the main routes |

::: warning
The operations buttons run against the configured Typesense server, and snapshots are written to that server's disk. Use a development instance.
:::

## Error display

Failed requests show the message Typesense returned (for example "Collection not found"). The playground reads it from `error.data.message` through the `errorMessage()` helper in `playground/app/utils/errorMessage.ts`.
