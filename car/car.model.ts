import mongoose from 'mongoose'

export interface Car extends mongoose.Document {
    modelCar: String,
    color: String,
    plate: String,
    chassis: String,
    stolenDate: Date
}

const carSchema = new mongoose.Schema({
    modelCar: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    plate: {
        type: String,
        required: true
    },
    chassis: {
        type: String,
        required: false
    },
    stolenDate: {
        type: Date,
        required: true
    }
})

export const Car = mongoose.model<Car>('Car',carSchema)