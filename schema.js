const Joi = require('joi');
module.exports.teachersSchema=Joi.object({
    teachers:Joi.object({
        teacherName:Joi.string().required(),
        teacherEmail:Joi.string().required(),
        collegeName:Joi.string().required(),
        subject:Joi.string().required(),
        password:Joi.string().required(),
    }).required()
});

module.exports.newClassSchema=Joi.object({
    newClass:Joi.object({
        teacherId:Joi.string().required(),
        semester:Joi.string().required(),
        section:Joi.string().required(),
        subject:Joi.string().required(),
        college:Joi.string().required(),
    }).required()
});

module.exports.studentSchema=Joi.object({
    student:Joi.object({
        studentName:Joi.string().required(),
        studentRollNo:Joi.string().required(),
        studentSemester:Joi.string().required(),
        studentSection:Joi.string().required(),
        teacherId:Joi.string().required(),
        classId:Joi.string().required(),
        college:Joi.string().required(),
    }).required()
});

module.exports.attendenceSchema=Joi.object({
    attendence:Joi.object({
        subject:Joi.string().required(),
        teacherId:Joi.string().required(),
        classId:Joi.string().required(),
        studentId:Joi.string().required(),
        totalClass:Joi.number().required(),
        attendenClass:Joi.number().required(),
        classPercent:Joi.number().required(),
        classPrevious:Joi.string().required(),
    }).required()
});