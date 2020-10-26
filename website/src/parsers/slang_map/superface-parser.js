import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from '@superindustries/superface-parser/package.json';

import * as React from 'react';

export default {
  ...defaultParserInterface,

  id: 'superface-parser-map',
  displayName: 'Superface Parser',
  version: pkg.version,
  homepage: pkg.homepage,
  locationProps: new Set(['location', 'span']),
  typeProps: new Set(['kind']),

  loadParser(callback) {
    require(['@superindustries/superface-parser'], ({ parseMap, Source }) => {
      callback({ parseMap, Source });
    });
  },

  parse({ parseMap, Source }, code, options) {
    try {
      return parseMap(new Source(code))
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