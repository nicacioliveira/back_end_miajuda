var express = require('express');
var swaggerJSDoc = require('swagger-jsdoc');
var swaggerUi = require('swagger-ui-express');

const router = express.Router();

module.exports = () => {

    let swaggerDefinition = {
        info: {
            title: 'MeAjuda server',
            version: '0.0.1',
            description: '',
        },
        host: 'ec2-18-231-117-104.sa-east-1.compute.amazonaws.com:8080',
        basePath: '/api',
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                description: 'JWT authorization of an API',
                name: 'Authorization',
                in: 'header',
            },
        }
    };

    let options = {
        swaggerDefinition: swaggerDefinition,
        apis: [__dirname + '/../../api/**/*.js'],
    };

    let swaggerSpec = swaggerJSDoc(options);

    router.get('/swagger', function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    const showExplorer = false;
    const opt = {};
    const customCss = '.topbar{display:none}';
    router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec, showExplorer, opt, customCss));
    return router;
};
