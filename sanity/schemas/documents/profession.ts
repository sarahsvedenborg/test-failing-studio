import { localizedString } from '../../utils/localizedFields';

const industries = [
  {
    title: 'Bibliotek og språk',
    value: 'library',
  },
  {
    title: 'Brann, sikkerhet og beredskap',
    value: 'emergency',
  },
  {
    title: 'Bygg og anlegg',
    value: 'construction',
  },
  {
    title: 'Dykker',
    value: 'diver',
  },
  {
    title: 'Dyrehelse',
    value: 'animalCare',
  },
  {
    title: 'Eiendom, økonomi og finans',
    value: 'finance',
  },
  {
    title: 'Elektronisk kommunikasjonsnett',
    value: 'network',
  },
  {
    title: 'Elektro',
    value: 'electronics',
  },
  {
    title: 'Helse',
    value: 'health',
  },
  {
    title: 'Jus',
    value: 'law',
  },
  {
    title: 'Luftfart',
    value: 'aviation',
  },
  {
    title: 'Maritim',
    value: 'maritime',
  },
  {
    title: 'Natur, miljø og vann',
    value: 'environment',
  },
  {
    title: 'Skole og barnehage',
    value: 'education',
  },
  {
    title: 'Spregning og pyroteknikk',
    value: 'explosions',
  },
  {
    title: 'Trafikk',
    value: 'trafic',
  },
];

const industryRegulations = [
  {
    title: 'Yrkeskvalifikasjonsdirektivet (2005/36/EF)',
    value: 'default',
  },
  {
    title: 'Forskrifter knyttet til luftfart',
    value: 'aviation',
  },
  {
    title: 'Maritime sertifikater',
    value: 'maritime',
  },
];

export default {
  name: 'profession',
  title: 'Lovregulert yrke',
  type: 'document',
  fields: [
    localizedString({ name: 'title', title: 'Tittel på yrke' }),
    {
      name: 'replacedBy',
      title: 'Erstattet av ny yrkestittel',
      type: 'reference',
      to: [{ type: 'profession' }],
    },
    {
      name: 'industry',
      title: 'Bransje',
      type: 'string',
      options: { list: industries },
    },
    {
      name: 'industryRegulation',
      title: 'Regulert av',
      type: 'string',
      options: { list: industryRegulations },
    },
    {
      name: 'approvalBody',
      title: 'Godkjenningsmyndighet',
      type: 'reference',
      to: [{ type: 'approvalBody' }],
    },
    {
      name: 'externalProfessionPage',
      title: 'Lenke til ekstern yrkesside (når innen EU/EØS)',
      type: 'object',
      fields: [
        {
          name: 'altinnOrApprovalBody',
          title: 'Altinn eller godkjenningsmyndighet',
          type: 'string',
          initialValue: 'altinn',
          options: {
            list: [
              { title: 'Altinn', value: 'altinn' },
              { title: 'Godkjenningsmyndighet', value: 'approvalBody' },
            ],
            layout: 'radio',
          },
        },
        {
          name: 'url',
          title: 'URL',
          type: 'object',
          fields: [
            {
              name: 'no',
              title: 'Norsk',
              type: 'url',
            },
            {
              name: 'en',
              title: 'Engelsk',
              type: 'url',
            },
          ],
        },
        {
          name: 'label',
          title: 'Lenketekst til godkjenningsmyndighet',
          type: 'object',
          hidden: ({ parent }: { parent: { altinnOrApprovalBody: string } }) =>
            parent?.altinnOrApprovalBody !== 'approvalBody',
          fields: [
            {
              name: 'no',
              title: 'Norsk',
              type: 'string',
            },
            {
              name: 'en',
              title: 'Engelsk',
              type: 'string',
            },
          ],
        },
      ],
    },
    {
      name: 'externalTemporaryWorkPage',
      title: 'Lenke til ekstern side om midlertidig jobb',
      type: 'object',
      fields: [
        {
          name: 'url',
          title: 'URL',
          type: 'object',
          fields: [
            {
              name: 'no',
              title: 'Norsk',
              type: 'url',
            },
            {
              name: 'en',
              title: 'Engelsk',
              type: 'url',
            },
          ],
        },
        localizedString({ name: 'label', title: 'Lenketekst' }),
      ],
    },
    {
      name: 'relatedContent',
      title: 'Relatert informajson',
      type: 'object',
      fields: [
        {
          name: 'no',
          title: 'Norsk',
          type: 'array',
          of: [
            {
              type: 'reference',
              to: [{ type: 'informationArticle' }],
              options: {
                filter: 'siteLocale == $siteLocale',
                filterParams: { siteLocale: 'no' },
              },
            },
          ],
        },
        {
          name: 'en',
          title: 'engelsk',
          type: 'array',
          of: [
            {
              type: 'reference',
              to: [{ type: 'informationArticle' }],
              options: {
                filter: 'siteLocale == $siteLocale',
                filterParams: { siteLocale: 'en' },
              },
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title.no',
    },
    prepare({ title }: { title: string }) {
      return { title };
    },
  },
};
