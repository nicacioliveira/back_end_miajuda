const DB_PROPS = {
    dbAddress : process.env.DBADDRESS || 'localhost:27017',
    credentials : process.env.DBCREDENTIALS,
    dbName : process.env.DBNAME || 'miajuda'
};

function getDatabase() {
    //return 'mongodb://localhost:27017/miajuda';
    // return `mongodb://${DB_PROPS.credentials? DB_PROPS.credentials + "@" : ""}${DB_PROPS.dbAddress}/${DB_PROPS.dbName}`;
    return `mongodb://admin:admin123@ds255282.mlab.com:55282/monitoriasufcg`
}

module.exports = {
    APP_SECRET : process.env.APP_SECRET || 'miajuda',
    ENV: process.env.ENVIRONMENT,
    DATABASE: getDatabase(),
    PORT: process.env.PORT,
};
