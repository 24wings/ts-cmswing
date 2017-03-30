import mongoose = require('mongoose');


var userSchema = new mongoose.Schema({
    // 学生的名字
    name: String,
    phone: String,
    gender: String,
    age: String,
    signature: [String],
    intersting: [String],
    like: [String],
    movie: String,
    loveSong: String,
    // 男神,女神
    god: String,
    book: String,
    ta: String,
    words: String,
    qrcode: String,
    reason: String,
    filterAge: String,
    filterCity: String,

    createDt: { type: Date, default: Date.now },
    updateDt: { type: Date, default: Date.now }
});


export interface IUser extends mongoose.Document {
    name: String;
    phone: String;
    gender: String;
    age: String;
    signature: [String];
    intersting: [String];
    like: [String];
    state: [String];
    loveSong: String;
    // 男神,女神
    god: String;
    book: String;
    ta: String;
    words: String;
    qrcode: String;
    reason: String;
    filterAge: String;
    filterCity: String;
    createDt: Date;
    updateDt: Date;
}

export var userModel = mongoose.model<IUser>('User', userSchema);
