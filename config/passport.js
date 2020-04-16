//This file contains settings of passport strategies
const User = require('../schemas/Users');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//all auths are packed as separate modules called strategies by passport owner to reduce useless dependencies
const JwtStrategy = require("passport-jwt").Strategy;
//use to extract token from headers
const ExtractJwt = require("passport-jwt").ExtractJwt;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {

            User.findById(jwt_payload.id)
                .then(user => {
                    if (user) {
                        return done(null, user);
                    }
                    return done(null, false);
                })
                .catch(err => console.log(err));
        })
    );
};








// passport.use(
//     new LocalStrategy(function (email, password, done) {
//         console.log(`nothing here ${email}`);

// 		return User.findOne({ email: email })
// 			.then((user) => {
// 				console.log(`nothing here ${user}`);
// 				if (!user) {
// 					return done(null, false, { message: 'Incorrect email or password.' });
// 				}

// 				if (bcrypt.compareSync(password, user.password)) {
// 					return done(null, user, { message: 'Logged In Successfully' });
// 				}
// 			})
// 			.catch((err) => done(err));
// 	})
// );
