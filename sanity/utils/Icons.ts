import {
  BiPodcast as PodbeanIcon,
  BiSolidVideo as QbrickIcon,
  BiFilm as defaultVideoIcon,
} from 'react-icons/bi';
import { FaSpotify as SpotifyIcon, FaYoutube as YoutubeIcon } from 'react-icons/fa';
import { FiVideo as PanoptoIcon } from 'react-icons/fi';

/** ********************************************************************************************************************
 * Video
 ********************************************************************************************************************* */
export function getVideoIcon(source: string) {
  switch (source) {
    case 'youtube':
      return YoutubeIcon;
    case 'qbrick':
      return QbrickIcon;
    case 'panopto':
      return PanoptoIcon;
    default:
      return defaultVideoIcon;
  }
}
export default getVideoIcon;

/** ********************************************************************************************************************
 * Podcast
 ********************************************************************************************************************* */
export function getPodcastIcon(source: string) {
  return source === 'spotifyPodcast' ? SpotifyIcon : PodbeanIcon;
}
