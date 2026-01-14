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
@Table({
  tableName: "products",
  timestamps: true,
})
export class Product extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;
  
  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  @AllowNull(false)
  @Column(DataType.DECIMAL(10,2))
  price!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  category!: string; 
}
