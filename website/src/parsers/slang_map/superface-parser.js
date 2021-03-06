import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from '@superfaceai/parser/package.json';

import * as React from 'react';
import { PARSER_FEATURES } from '@superfaceai/parser';

export default {
  ...defaultParserInterface,

  id: 'parser-map',
  displayName: 'Superface Parser',
  version: pkg.version,
  homepage: pkg.homepage,
  locationProps: new Set(['location', 'span']),
  typeProps: new Set(['kind']),

  loadParser(callback) {
    require(['@superfaceai/parser'], ({ parseMap, Source }) => {
      callback({ parseMap, Source });
    });
  },

  parse({ parseMap, Source }, code, options) {
    try {
      for (const feature of Object.keys(PARSER_FEATURES)) {
        PARSER_FEATURES[feature] = options[feature];
      }

      return parseMap(new Source(code));
    } catch (e) {
      throw {
        message: <pre>{e.format()}</pre>,
      };
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

  getDefaultOptions() {
    return {
      ...PARSER_FEATURES,
    };
  },
};
