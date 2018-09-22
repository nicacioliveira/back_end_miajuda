const DB_PROPS = {
    dbAddress : process.env.DBADDRESS || 'localhost:27017',
    credentials : process.env.DBCREDENTIALS,
    dbName : process.env.DBNAME || 'miajuda'
};

function getDatabase() {
    return `mongodb://${DB_PROPS.credentials? DB_PROPS.credentials + "@" : ""}${DB_PROPS.dbAddress}/${DB_PROPS.dbName}`;
}

module.exports = {
    APP_SECRET : process.env.APP_SECRET || 'miajuda',
    ENV: process.env.ENVIRONMENT,
    DATABASE: getDatabase(),
    PORT: process.env.PORT,
};
