import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  HasMany,
} from "sequelize-typescript";
// import { Customer } from "./Customer.js";
// import { Order } from "./Order.js";

@Table({
  tableName: "store",
  timestamps: true,
})
export class Store extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  category!: string;

  @AllowNull(false)
  @Column(DataType.ENUM("In Stock", "Out of Stock"))
  status!: "In Stock" | "Out of Stock";

}

