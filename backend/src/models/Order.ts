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
  HasMany,
} from "sequelize-typescript";


@Table({ tableName: "orders", timestamps: true })
export class Order extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  orderNumber!: string;
  
  @AllowNull(false)
  @Column(DataType.DATE)
  orderDate!: Date;

  // @AllowNull(false)
  // @Column(DataType.STRING)
  // category!: string;


  @AllowNull(false)
  @Column(DataType.INTEGER)
  customerId!: number;


  @AllowNull(false)
  @Column(DataType.INTEGER)
  storeId!: number;


  @AllowNull(false)
  @Column(DataType.ENUM("Delivered", "In Progress", "Returned"))
  status!: "Delivered" | "In Progress" | "Returned";

}
