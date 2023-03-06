const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.use(
    new LocalStrategy(
        async (username, password, done) => {
            try {
                const user = await User.findOne({ where: { username: username } });
                if (!user) {
                    return done(null, false, {
                        message: 'can not find username',
                    });
                }
                const matchPassword = await user.checkPassword(password);
                return matchPassword
                    ? done(null, user)
                    : done(null, false, { message: 'Incorrect password' });
            } catch (err) { done(err); }
        }
    )
);

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findByPk(id).then(function (user) { done(null, user); });
}); 

