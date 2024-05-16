export const filterOnLanguage = ({ document }: { document: { siteLocale: string } }) => {
  const { siteLocale: locale } = document;

  if (!locale) {
    return '';
  }
  return {
    filter: 'siteLocale == $siteLocale',
    params: {
      siteLocale: locale,
    },
  };
};

export default filterOnLanguage;
