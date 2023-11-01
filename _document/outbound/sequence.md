```mermaid
sequenceDiagram
  actor 消費者
  participant  EC Shop
  participant  Warehouse
  actor スタッフ
​
  消費者->>EC Shop: カート入力
  消費者->>EC Shop: 注文入力
  EC Shop-)Warehouse: 出荷予定通知
  Warehouse-)Warehouse: 出荷予定入力
  Warehouse-)Warehouse: 棚出予定入力
  スタッフ->>Warehouse: 棚出実績入力
  Warehouse-)Warehouse: 棚出予定消込
  Warehouse-)Warehouse: 検品予定入力
  スタッフ->>Warehouse: 検品実績入力
  Warehouse-)Warehouse: 検品予定消込
  Warehouse->>Warehouse: 出荷予定入力
  スタッフ->>Warehouse: 出荷実績入力
  Warehouse-)Warehouse: 出荷予定消込
  Warehouse-)EC Shop: 出荷実績通知
  EC Shop-)EC Shop: 出荷予定消込
  EC Shop-)EC Shop: 在庫一覧更新
​
```
