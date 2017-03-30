import mongoose = require('mongoose');
import { IUser } from './user';


var recordSchema = new mongoose.Schema({
    // 0未报名,1已经报名,等待结果,2成功匹配,3匹配失败
    state: { type: Number, default: 0 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    toUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createDt: { type: Date, default: Date.now }
});


export interface IRecord extends mongoose.Document {
    state: 0 | 1 | 2 | 3;
    user: mongoose.Schema.Types.ObjectId;
    toUser: mongoose.Schema.Types.ObjectId;
    createDt: Date;
    updateDt: Date;
}

export var recordModel = mongoose.model<IRecord>('Record', recordSchema);
