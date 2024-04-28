const collegeName = require('../models/collegeName');
const college=require("../models/college");

const saveAllColleges=collegeName.forEach(College => {
    const newCollege = new college({
        colleges: College.college,
        email: College.email,
    });
    newCollege.save()
        .then(savedCollege => {
            console.log(`Saved ${savedCollege.colleges} to the database.`);
        })
        .catch(error => {
            console.error(`Error saving college: ${error}`);
        });
});

module.exports = {saveAllColleges};