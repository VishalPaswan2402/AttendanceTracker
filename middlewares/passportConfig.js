const passport=require("passport");
const LocalStrategy=require("passport-local");
const Teacher=require("../models/teachers.js");
const collegeAccount=require("../models/collegeAccount.js");

passport.use('teacher', new LocalStrategy(Teacher.authenticate()));
passport.use('college', new LocalStrategy(collegeAccount.authenticate()));

passport.serializeUser(function(user, done) {
    if (user instanceof Teacher) {
        done(null, { type: 'teacher', id: user.id });
    } else if (user instanceof collegeAccount) {
        done(null, { type: 'college', id: user.id });
    } else {
        done(new Error('Unsupported user type'));
    }
});

passport.deserializeUser(async function(obj, done) {
    try {
        if (obj.type === 'teacher') {
            const teacher = await Teacher.findById(obj.id);
            done(null, teacher);
        } else if (obj.type === 'college') {
            const college = await collegeAccount.findById(obj.id);
            done(null, college);
        } else {
            done(new Error('Unsupported user type'));
        }
    } catch (error) {
        done(error);
    }
});

module.exports = passport;