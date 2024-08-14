---
inject: true
to: Dockerfile
after: Copy package.json
---
COPY --chown=node:node <%= packagePath %>/package.json ./<%= packagePath %>/package.json