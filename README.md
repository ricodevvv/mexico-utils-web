# mexico-utils-web

The website for [mexico-utils](https://github.com/ricodevvv/mexa): docs, a playground and the bank and state catalogs, in English and Spanish.

Everything the library does runs in the browser, so nobody's CURP or CLABE ever reaches a server.

## Running it

```bash
pnpm install
pnpm dev
```

It opens on http://localhost:3000 and sends you to `/en` or `/es` depending on your browser's language.

Set `SITE_URL` to the real domain when deploying, so the Open Graph images and the sitemap point to the right place.

## Where things are

- `src/app/[lang]` has every page. The language is the first segment of the URL.
- `src/lib/i18n.ts` has the interface text in both languages.
- `src/content/en` and `src/content/es` have the docs as MDX, one file per page. `<Demo kind="curp" />` drops a live demo into any of them.
- `src/lib/docs.ts` lists the docs pages, their titles and the words search matches them by.
- `src/lib/analyze.ts` guesses what someone pasted and turns the library's results into the rows the cards show.

To add a docs page, write it in both content folders and add it to `DOC_PAGES`.

## License

MIT
