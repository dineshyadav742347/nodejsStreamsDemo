const appConfig = {
  development: require('./env/DEV')
};

let environment = (process.env.NODE_ENV || 'development');
let effectiveConfig = appConfig[environment];
if(!effectiveConfig) {
	environment = (process.env.NODE_ENV || 'development');
}

process.stdout.write(`\nPicking up config settings as: ${JSON.stringify(effectiveConfig)}\n`);

module.exports = effectiveConfig;
