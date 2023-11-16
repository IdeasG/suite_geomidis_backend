import 'dotenv/config'

import { Sequelize } from 'sequelize';

var opts = {
    define: {
        freezeTableName: true,
        timestamps: false
    },
    logging: false
}

const sequelize = new Sequelize(process.env.DATABASE_URL, opts);

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

export { sequelize };
