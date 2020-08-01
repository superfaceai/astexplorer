import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from '@superindustries/superface-parser/package.json';

const ID = 'slang-profile';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,
  locationProps: new Set(['location', 'span']),
  typeProps: new Set(['kind']),

  loadParser(callback) {
    require(['@superindustries/superface-parser'], ({ parseProfile, Source }) => {
      callback({ parseProfile, Source });
    });
  },

  parse({ parseProfile, Source }, code, options) {
    return parseProfile(new Source(code))
  },

  nodeToRange(node) {
    if (node.span) {
      return [node.span.start, node.span.end];
    }
  },

  getNodeName(node) {
    return node.kind;
  },
};
