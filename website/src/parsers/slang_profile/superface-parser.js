import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from '@superfaceai/superface-parser/package.json';

import * as React from 'react';

export default {
  ...defaultParserInterface,

  id: 'superface-parser-profile',
  displayName: 'Superface Parser',
  version: pkg.version,
  homepage: pkg.homepage,
  locationProps: new Set(['location', 'span']),
  typeProps: new Set(['kind']),

  loadParser(callback) {
    require(['@superfaceai/superface-parser'], ({ parseProfile, Source }) => {
      callback({ parseProfile, Source });
    });
  },

  parse({ parseProfile, Source }, code, options) {
    return parseProfile(new Source(code))
  },

  parse({ parseProfile, Source }, code, options) {
    try {
      return parseProfile(new Source(code))
    } catch (e) {
      throw {
        message: <pre>{e.format()}</pre>
      }
    }
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
