import { BiPodcast as PodbeanIcon } from 'react-icons/bi';
import { getPodcastIcon } from '../../utils/Icons';
import { filterOnLanguage } from '../../utils/filterOnLanguage';

export default {
  name: 'podcastService',
  title: 'Podcast Section',
  type: 'object',
  icon: PodbeanIcon,
  fields: [
    {
      name: 'podcast',
      title: 'Select a Podcast',
      type: 'reference',
      to: [{ type: 'podcast' }],
      options: {
        filter: filterOnLanguage,
      },
    },
  ],
  preview: {
    select: {
      title: 'podcast.title',
      source: 'podcast.source',
    },
    prepare: ({ title, source }: { title: string; source: string }) => {
      return {
        title: `Podcast: ${title}`,
        subtitle: `Source: ${source}`,
        media: getPodcastIcon(source),
      };
    },
  },
};
