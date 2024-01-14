// src/models/userModel.ts

import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcrypt';
import sequelize from '../config/database';

class UserModel extends Model {
  id!: number;
  email!: string;
  name!: string;
  password!: string;
  token!: string | null;
  created!: Date;
  updated!: Date;
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true, // Make id auto-increment
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    created: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // Set default value to current timestamp
    },
    updated: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // Set default value to current timestamp
    },
    
  },
  {
    sequelize,
    tableName: 'users',
    modelName: 'UserModel',
    timestamps: true, // Enable timestamps (created and updated)
    updatedAt: 'updated', // Rename the default 'updatedAt' column to 'updated'
  }
);

UserModel.beforeCreate(async (user) => {
  if (user.password) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  }
});

export default UserModel;
