// SeatModel.ts

import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database'; // Assuming you have a sequelize instance set up

class BusModel extends Model {
  public id!: number;
  public bus_no!: string;
  public status!: string;
  public extra_details!: string;
}

BusModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    bus_no: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'open',
    },
    extra_details: {
      type: DataTypes.TEXT,
    }
  },
  {
    tableName: 'buses', // Make sure this matches your actual table name
    sequelize,
  }
);

export default BusModel;
