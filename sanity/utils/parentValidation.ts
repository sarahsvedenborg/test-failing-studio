import { Reference, SanityClient, Slug, SourceClientOptions } from 'sanity';
import text from '../constants/schemaText';
import { RuleType } from '../types/ruleType';

const MAX_PATH_DEPTH = 10; // eg. DEPTH 3 = /level1/level2/level3

const hasLoop = async (
  client: (options: SourceClientOptions) => SanityClient,
  id: string,
  parents: string[],
): Promise<boolean> => {
  const parent = await client({
    apiVersion: '2021-06-07',
  }).fetch(`*[_id == $id][0].parent._ref`, { id });
  if (parents.includes(id)) {
    // Loop detected
    return true;
  }
  if (parent) {
    return hasLoop(client, parent, [
      ...parents,
      id.startsWith('drafts.') ? id.substring('drafts.'.length) : id,
    ]);
  }
  // No loop detected
  return false;
};

// TODO: Move max_depth and path-cycle logic to custom component. Restrict selection instead of giving error.
const ParentValidation = (Rule: RuleType) =>
  Rule.custom(
    async (
      val: Reference | undefined,
      {
        getClient,
        document,
      }: {
        getClient: (options: SourceClientOptions) => SanityClient;
        document: { _id: string; slug: Slug };
      },
    ) => {
      // Error if no value is selected
      if (val === undefined) return text.REQUIRED_FIELD_VALUE;

      // Error if max path depth is reached
      // if (fullPathOfSelectedParent?.split('/').length >= MAX_PATH_DEPTH) return text.LIMIT_PARENT;

      // Error if path-cycle detected
      /*  if (fullPathOfSelectedParent) {
        const segmentedParentPath = fullPathOfSelectedParent.split('/');

        if (segmentedParentPath.includes(document?.slug?.current)) return text.INVALID_PARENT;
      } */
      if (await hasLoop(getClient, document._id, [])) {
        return text.INVALID_PARENT;
      }
      return true;
    },
  );

export default ParentValidation;
