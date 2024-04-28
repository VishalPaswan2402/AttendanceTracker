const Joi = require('joi');
module.exports.teachersSchema=Joi.object({
    username:Joi.string().required(),
    teacherName:Joi.string().required(),
    teacherId:Joi.string().required(),
    teacherEmail:Joi.string().required(),
    collegeName:Joi.string().required(),
    subject:Joi.string().required(),
    password:Joi.string().required(),
    cPassword:Joi.string().required(),
});

module.exports.newClassSchema=Joi.object({
    semester:Joi.string().required(),
    section:Joi.string().required(),
});

module.exports.studentSchema=Joi.object({
    studentName:Joi.string().required(),
    studentRollNo:Joi.string().required(),
});

module.exports.collegeAccountSchema=Joi.object({
    collegeName:Joi.string().required(),
    collegeType:Joi.string().required(),
    cLocation:Joi.string().required(),
    // eMail:Joi.string().required(),
    password:Joi.string().required(),
    cPassword:Joi.string().required(),
});

module.exports.collegeTeacherSchema=Joi.object({
    teacherName:Joi.string().required(),
    gender:Joi.string().required(),
    idNo:Joi.string().required(),
});