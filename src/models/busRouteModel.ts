// BusRouteModel.ts

import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database'; // Assuming you have a sequelize instance set up
import BusModel from '../models/busModel';


class BusRouteModel extends Model {
  public id!: number;
  public routeStart!: string;
  public routeEnd!: string;
  public when!: string;
  public timeStart!: string;
  public timeEnd!: string;
  public busId!: number;
  public routeName!: string;
  public status!: string;
  public extraInfo!: string;
}

BusRouteModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    routeStart: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    routeEnd: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    when: {
      type: DataTypes.STRING,
    },
    timeStart: {
      type: DataTypes.STRING,
    },
    timeEnd: {
      type: DataTypes.STRING,
    },
    busId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    routeName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'open',
    },
    extraInfo: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: 'busroutes', // Make sure this matches your actual table name
    sequelize,
  }
);

// Define association with BusModel
BusRouteModel.belongsTo(BusModel, { foreignKey: 'busId' });

export default BusRouteModel;
