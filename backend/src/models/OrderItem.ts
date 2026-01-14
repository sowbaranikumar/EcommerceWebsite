import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";


@Table({ tableName: "order_items",
     timestamps: true })
export class OrderItem extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  orderId!: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  productId!: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  quantity!: number;

  @AllowNull(false)
  @Column(DataType.DECIMAL(10,2))
  price!: number;
}
