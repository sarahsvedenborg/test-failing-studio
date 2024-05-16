const staticPathPages = [
  'grant',
  'event',
  'project',
  'program',
  'resource',
  'newsArticle',
  'report',
];

export const parentPath = /* groq */ `
coalesce(
"/" + parent->parent->parent->parent->parent->parent->parent->parent->parent->slug.current + "/" + parent->parent->parent->parent->parent->parent->parent->parent->slug.current + "/" + parent->parent->parent->parent->parent->parent->parent->slug.current + "/" + parent->parent->parent->parent->parent->parent->slug.current + "/" + parent->parent->parent->parent->parent->slug.current + "/" + parent->parent->parent->parent->slug.current + "/" + parent->parent->parent->slug.current + "/" + parent->parent->slug.current + "/" + parent->slug.current + "/" +slug.current,
"/" + parent->parent->parent->parent->parent->parent->parent->parent->slug.current + "/" + parent->parent->parent->parent->parent->parent->parent->slug.current + "/" + parent->parent->parent->parent->parent->parent->slug.current + "/" + parent->parent->parent->parent->parent->slug.current + "/" + parent->parent->parent->parent->slug.current + "/" + parent->parent->parent->slug.current + "/" + parent->parent->slug.current + "/" + parent->slug.current + "/" +slug.current,
"/" + parent->parent->parent->parent->parent->parent->parent->slug.current + "/" + parent->parent->parent->parent->parent->parent->slug.current + "/" + parent->parent->parent->parent->parent->slug.current + "/" + parent->parent->parent->parent->slug.current + "/" + parent->parent->parent->slug.current + "/" + parent->parent->slug.current + "/" + parent->slug.current + "/" +slug.current,
"/" + parent->parent->parent->parent->parent->parent->slug.current + "/" + parent->parent->parent->parent->parent->slug.current + "/" + parent->parent->parent->parent->slug.current + "/" + parent->parent->parent->slug.current + "/" + parent->parent->slug.current + "/" + parent->slug.current + "/" +slug.current,
"/" + parent->parent->parent->parent->parent->slug.current + "/" + parent->parent->parent->parent->slug.current + "/" + parent->parent->parent->slug.current + "/" + parent->parent->slug.current + "/" + parent->slug.current + "/" + slug.current,
"/" + parent->parent->parent->parent->slug.current + "/" + parent->parent->parent->slug.current + "/" + parent->parent->slug.current + "/" + parent->slug.current + "/" +slug.current,
"/" + parent->parent->parent->slug.current + "/" + parent->parent->slug.current + "/" + parent->slug.current + "/" + slug.current,
"/" + parent->parent->slug.current + "/" + parent->slug.current + "/" + slug.current,
"/" + parent->slug.current + "/" + slug.current,
"/" + slug.current
)
`;

const pathFromId = /* groq */ `"path": select(
  _type == 'report' => "/dokumenter/" + slug.current,
  _type == 'grant' => "/utlysninger-og-tilskudd/" + slug.current,
  _type == 'event' => "/arrangementer/" + slug.current,
  _type == 'project' => "/prosjekteksempler/" + slug.current,
  _type == 'program' => "/programmer-og-tilskuddsordninger/" + slug.current,
  _type == 'resource' => "/ressurser/" + slug.current,
  _type == 'newsArticle' => "/aktuelt/" + slug.current,
  _type == 'research' => "/rapporter-undersokelser-og-statistikk/" + slug.current,
  ${parentPath}
)`;

const urlQuery = `*[_id == $id][0]{_id, path, siteLocale}`;

export default urlQuery;
