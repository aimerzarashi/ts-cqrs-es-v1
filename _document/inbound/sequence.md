```mermaid
sequenceDiagram
  actor 供給者
  participant  EC Shop
  participant  Warehouse
  actor スタッフ
  供給者->>EC Shop: 入荷予定入力
  EC Shop-)EC Shop: 在庫一覧更新
  EC Shop-)Warehouse: 入荷予定通知
  Warehouse-)Warehouse: 入荷予定入力
  スタッフ->>Warehouse: 入荷実績入力
  Warehouse-)Warehouse: 入荷予定消込
  Warehouse-)Warehouse: 検品予定入力
  スタッフ->>Warehouse: 検品実績入力
  Warehouse-)Warehouse: 検品予定消込
  Warehouse-)Warehouse: 棚入予定入力
  スタッフ->>Warehouse: 棚入実績入力
  Warehouse-)Warehouse: 棚入予定消込
  Warehouse-)EC Shop: 入荷実績通知
  EC Shop-)EC Shop: 入荷予定消込
  EC Shop-)EC Shop: 在庫一覧更新
```
