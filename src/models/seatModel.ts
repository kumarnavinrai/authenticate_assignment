import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import BusRouteModel from './busRouteModel';
import UserModel from './userModel'; // Import the UserModel

class SeatModel extends Model {
  public id!: number;
  public seat_number!: number;
  public user_id!: number;
  public user_details!: string;
  public status!: string;
  public route_id!: number;

  // Define the association with BusRouteModel
  public static associate(models: any): void {
    SeatModel.belongsTo(models.BusRouteModel, {
      foreignKey: 'route_id',
      as: 'busRoute',
    });

    // Define the association with UserModel
    SeatModel.belongsTo(models.UserModel, {
      foreignKey: 'user_id',
      as: 'user',
    });
  }
}

SeatModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    seat_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    user_details: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'open',
    },
    route_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'seats',
    sequelize,
  }
);

// Define the association with BusRouteModel
SeatModel.belongsTo(BusRouteModel, { foreignKey: 'route_id', as: 'busroutes' });

// Define the association with UserModel
SeatModel.belongsTo(UserModel, { foreignKey: 'user_id', as: 'users' });

export default SeatModel;
