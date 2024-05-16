import { BiFilm as defaultVideoIcon } from 'react-icons/bi';
import { getVideoIcon } from '../../utils/Icons';
import { filterOnLanguage } from '../../utils/filterOnLanguage';

export default {
  name: 'videoSection',
  title: 'Video seksjon',
  type: 'object',
  icon: defaultVideoIcon,
  fields: [
    {
      name: 'video',
      title: 'Video',
      type: 'reference',
      to: [{ type: 'video' }],
      options: {
        filter: filterOnLanguage,
      },
    },
    {
      name: 'description',
      title: 'Beskrivelse',
      type: 'text',
    },
  ],
  preview: {
    select: {
      title: 'video.title',
      description: 'description',
      url: 'video.videoURL',
      source: 'video.source',
    },
    prepare: ({
      title,
      source,
      description,
    }: {
      title: string;
      source: string;
      description: string;
    }) => {
      return { title, subtitle: description, media: getVideoIcon(source) };
    },
  },
};
