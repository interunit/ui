---
to: packages/<%= packageName %>/package.json
---
{
  "name": "@interunit/<%=  packageName %>",
  "version": "0.0.1",
  "description": "<%=  packageDescription %>",
  "main": "dist/interunit-<%= packageName %>.cjs.js",
  "types": "dist/interunit-<%= packageName %>.cjs.d.ts",
  "module": "dist/interunit-<%= packageName %>.esm.js",
  "react-native": "src/index.ts",
  "dependencies": {
  <% if (shouldIncludePrimitives && shouldIncludeConfig) { %>
    "@interunit/primitives": "workspace:*",
    "@interunit/config": "workspace:*"
  <% } else if (shouldIncludePrimitives) { %>
    "@interunit/primitives": "workspace:*"
  <% } else if (shouldIncludeConfig) { %>
    "@interunit/config": "workspace:*"
  <% } %>
  },
  "devDependencies": {
    "@types/react": "18.2.12",
    "@types/react-dom": "18.2.5",
    "@types/react-native": "^0.72.2",
    "typescript": "^5.1.3"
  },
  "peerDependencies": {
    "react": "^18.0.0"
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
  "homepage": "https://github.com/interunit/ui#readme"
}
