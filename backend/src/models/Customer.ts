import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";

@Table({
  tableName: "customers",
  timestamps: true,
})
export class Customer extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER.UNSIGNED)
  id!: number;

  @Column(DataType.INTEGER)
  storeId!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name!:string;
  
  @AllowNull(false)
  @Column(DataType.STRING)
  email!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  phone!: string;

  @AllowNull(false)
  @Column(DataType.ENUM("Active","Inactive"))
  status!: "Inactive" | "Active";

}
