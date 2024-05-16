import { SeoTitleInput } from '../../Components/seo/seoTitleInput';
import { SeoDescriptionInput } from '../../Components/seo/seoDescriptionInput';

export const seo = ({ group }: { group?: string }) => {
  return {
    name: 'seo',
    title: 'SEO og sosiale medier',
    type: 'object',
    group: group || '',
    fieldsets: [
      { name: 'meta', title: 'Meta-tagger', options: { collapsible: true, collapsed: false } },
      { name: 'some', title: 'Sosiale medier', options: { collapsible: true, collapsed: false } },
      { name: 'other', title: 'Annet', options: { collapsible: true, collapsed: false } },
    ],
    fields: [
      {
        name: 'metaTitle',
        title: 'Tittel',
        description: 'Fengende tittel som vises i Google søk. Ideelt mellom 15 og 70 tegn.',
        type: 'string',
        fieldset: 'meta',
        components: { input: SeoTitleInput },
      },
      {
        name: 'metaDescription',
        title: 'Beskrivelse',
        description:
          'Velgfri, men sterkt anbefalt, beskrivelse som hjelper til med å konvertere fra Google. Ideelt mellom 70 og 160 tegn.',
        type: 'text',
        rows: 3,
        fieldset: 'meta',
        components: { input: SeoDescriptionInput },
      },
      {
        name: 'soMeTitle',
        title: 'Tittel',
        description: 'Fengende tittel som konverterer brukere ved deling i sosiale medier',
        type: 'string',
        fieldset: 'some',
      },
      {
        name: 'soMeDescription',
        title: 'Beskrivelse',
        description: 'Fengende beskrivelse som konverterer brukere ved deling i sosiale medier',
        type: 'text',
        rows: 3,
        fieldset: 'some',
      },
      {
        name: 'soMeImage',
        title: 'Bilde for deling på sosiale medier',
        type: 'image',
        description: 'Bilder vil bli beskjært til 1200x630',
        fieldset: 'some',
      },
      {
        name: 'disallowRobots',
        type: 'boolean',
        title: 'Skjul side fra søkemotorer',
        initialValue: false,
        fieldset: 'other',
      },
      {
        name: 'disableSuffix',
        type: 'boolean',
        title: 'Skjul endelse fra meta-tittel',
        description: 'Fjern teksten bak | fra meta-tittelen',
        initialValue: false,
        fieldset: 'other',
      },
    ],
  };
};

export default seo;
