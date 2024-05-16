import { BiUser as icon } from 'react-icons/bi';
import { localeField, siteLocale } from '../../utils/schemaSnippets';

interface HiddenProps {
  document: {
    contactType: string;
    hasExternalPage: boolean;
  };
}

export default {
  name: 'contact',
  title: 'Kontakt',
  type: 'document',
  icon,
  fields: [
    siteLocale,
    localeField,
    {
      name: 'contactType',
      title: 'Kontakttype',
      type: 'string',
      options: {
        list: [
          { title: 'Intern', value: 'internal' },
          { title: 'Ekstern', value: 'external' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    },
    {
      name: 'title',
      title: 'Navn',
      type: 'string' /*     validation: (Rule: RuleType) =>
      Rule.custom((title, context)) => {
        const{ client } = context;
        return client
          .fetch(`count(*[_type == "contact" && title == "${title}"])`)
          .then((count: number) => {
            if (count > 1) {
              return 'Det finnes allerede en kontakt med dette navnet. Kan du gjenbruke den eksisterende kontakten?';
            }
            return true;
          });
      }).warning(), */,
    },
    {
      name: 'position',
      title: 'Stillingstittel',
      type: 'string',
    },
    {
      name: 'department',
      title: 'Avdeling/organisasjon',
      type: 'string',
      hidden: ({ document }: HiddenProps) => document.contactType === 'internal',
      /*    validation: (Rule: RuleType) =>
        Rule.custom((department: any) => {
          return client
            .fetch(`count(*[_type == "contact" && department == "${department}"])`)
            .then((count: number) => {
              if (count > 1) {
                return 'Det finnes allerede en kontakt med denne avdelingen/organisasjonen. Kan du gjenbruke den eksisterende kontakten?';
              }
              return true;
            });
        }).warning(), */
    },
    {
      name: 'hasExternalPage',
      title: 'Har ekstern kontaktside?',
      type: 'boolean',
      initialVale: false,
      hidden: ({ document }: HiddenProps) => document.contactType === 'internal',
    },
    {
      name: 'externalContactPage',
      title: 'Ekstern kontaktside',
      description: 'Nettadresse på formen https://...',
      type: 'url',

      hidden: ({ document }: HiddenProps) =>
        document.contactType === 'internal' || !document.hasExternalPage,
    },
    {
      name: 'email',
      title: 'E-postadresse',
      type: 'string',

      hidden: ({ document }: HiddenProps) =>
        document.contactType === 'external' && document.hasExternalPage,
      /*       validation: (Rule: RuleType) =>
        Rule.custom((email: any) => {
          return client
            .fetch(`count(*[_type == "contact" && email == "${email}"])`)
            .then((count: number) => {
              if (count > 1) {
                return 'Det finnes allerede en kontakt med denne e-postadressen. Kan du gjenbruke den eksisterende kontakten?';
              }
              return true;
            });
        })
          .warning()
          .regex(
            /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
            {
              name: 'email', // Error message is "Does not match email-pattern"
              invert: false, // Boolean to allow any value that does NOT match pattern
            },
          ), */
    },
    {
      name: 'phone',
      title: 'Telefon',
      type: 'string',

      hidden: ({ document }: HiddenProps) =>
        document.contactType === 'external' && document.hasExternalPage,
      /*   validation: (Rule: RuleType) =>
        Rule.custom((phone: any) => {
          return client
            .fetch(`count(*[_type == "contact" && phone == "${phone}"])`)
            .then((count: number) => {
              if (count > 1) {
                return 'Det finnes allerede en kontakt med dette telefonnummeret. Kan du gjenbruke den eksisterende kontakten?';
              }
              return true;
            });
        }).warning(), */
    },
  ],

  preview: {
    select: {
      title: 'title',
      position: 'position',
    },
    prepare({ title, position }: any) {
      return {
        title,
        subtitle: position,
      };
    },
  },
};
