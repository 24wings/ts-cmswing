import path = require('path');
export const APPCONFIG = {
    ROOT_PATH: __dirname,
    RESOURCE_PATH: __dirname,
    env: 'development'
}
Object.seal(APPCONFIG);