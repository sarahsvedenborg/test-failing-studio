export async function isUniquePathAcrossAllDocuments(slug, context) {
  const { document, getClient } = context;
  const client = getClient({ apiVersion: '2022-12-07' });
  const id = document._id.replace(/^drafts\./, '');
  const { path, siteLocale: locale } = document;
  const params = {
    draft: `drafts.${id}`,
    published: id,
    locale,
    path,
  };
  const query = `!defined(*[!(_id in [$draft, $published]) && siteLocale == $locale && path == $path][0]._id)`;
  const result = await client.fetch(query, params);
  return result;
}

export default isUniquePathAcrossAllDocuments;
