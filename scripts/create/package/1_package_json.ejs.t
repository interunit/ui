---
to: packages/<%= packageName %>/package.json
---
{
  "name": "@interunit/<%=  packageName %>",
  "version": "0.0.1",
  "description": "<%=  packageDescription %>",
  "private": true,
  "main": "dist/interunit-<%= packageName %>.cjs.js",
  "types": "dist/interunit-<%= packageName %>.cjs.d.ts",
  "module": "dist/interunit-<%= packageName %>.esm.js",
  "react-native": "src/index.ts",
  <% if (shouldIncludePrimitives) { %>
  "dependencies": {
    "@interunit/primitives": "*"
  },
  <% } %>
  "devDependencies": {
    "@types/react": "18.2.12",
    "@types/react-dom": "18.2.5",
    "@types/react-native": "^0.72.2",
    "@types/styled-components": "^5.1.26",
    "@types/styled-components-react-native": "^5.2.1",
    "typescript": "^5.1.3"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/interunit/ui.git"
  },
  "author": "Kyle McDonald",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/interunit/ui/issues"
  },
  "homepage": "https://github.com/interunit/ui#readme",
  "peerDependencies": {
    "react": "^18.2.0",
    "react-native": "^0.71.11",
    "styled-components": "^6.0.0-rc.3"
  }
}
