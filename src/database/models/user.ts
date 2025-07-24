import { Sequelize, Model, DataTypes, Optional } from "sequelize";

// 1. Define all user attributes (full shape of a user in DB)
interface UserAttributes {
  id: string;
  name: string;
  email: string;
  gender: 'male' | 'female' | 'other';
  role: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

// 2. Define what fields are optional when creating a user
export interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {}

// 3. Define the actual User class
export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public name!: string;
  public email!: string;
  public gender!: 'male' | 'female' | 'other';
  public role!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;

  // Optional: Define associations here if needed
  public static associate(models: any) {
    // Example: User.hasMany(models.Post)
  }

  public toJSON(): object {
    const user = { ...this.get() } as Partial<UserAttributes>;
    delete user.password; // Hide password when returning user
    return user;
  }
}

// 4. Define the model setup function
export const UserModel = (sequelize: Sequelize): typeof User => {
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: 'user',
      },
      gender: {
        type: DataTypes.ENUM('male', 'female', 'other'),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: true,
      paranoid: true, // adds deletedAt support
    }
  );

  return User;
};
