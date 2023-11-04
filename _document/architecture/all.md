```mermaid
---
title: Simple sample
---
stateDiagram-v2
  web-->iam
  web-->command
  subscription-->resource
  subscription-->queue
  web-->query
  query-->resource
  command-->eventstore
  eventstore-->cdc
  cdc-->queue
```
