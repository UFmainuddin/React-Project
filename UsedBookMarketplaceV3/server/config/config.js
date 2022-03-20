const env = process.env.NODE_ENV || 'development';

const config = {
	development: {
		port: process.env.PORT || 8080,
		dbURL: "mongodb+srv://UFmainuddin:UF287782@cluster0.kgnlr.mongodb.net/BookMarketPlace",
		authCookieName: "x-auth-token",
	},
	production: {},
};

module.exports = config[env];