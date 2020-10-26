import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from '@superindustries/superface-parser/package.json';

import * as React from 'react';

export default {
  ...defaultParserInterface,

  id: 'superface-parser-map-x',
  displayName: 'Superface Parser X',
  version: pkg.version,
  homepage: pkg.homepage,
  locationProps: new Set(['location', 'span']),
  typeProps: new Set(['kind']),

  loadParser(callback) {
    require(['@superindustries/superface-parser'], ({ parseMap, Source, PARSER_FEATURES }) => {
      callback({ parseMap, Source, PARSER_FEATURES });
    });
  },

  parse({ parseMap, Source, PARSER_FEATURES }, code, options) {
    const oldFeatures = { ...PARSER_FEATURES };
    for (const feature of Object.keys(PARSER_FEATURES)) {
      PARSER_FEATURES[feature] = true;
    }
    
    try {
      return parseMap(new Source(code))
    } catch (e) {
      throw {
        message: <pre>{e.format()}</pre>
      }
    } finally {
      console.debug(PARSER_FEATURES, oldFeatures);
      for (const feature of Object.keys(PARSER_FEATURES)) {
        PARSER_FEATURES[feature] = oldFeatures[feature];
      }
      console.debug(PARSER_FEATURES);
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
