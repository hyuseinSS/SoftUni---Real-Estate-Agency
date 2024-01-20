const House = require("../models/House");

exports.createHouse = async (house) => {
    return await House.create(house)
}

exports.getAll = async () => {
    return await House.find().lean()
}

exports.search = async (searchString) => {
    return await House.find({ type: searchString }).lean()
}

exports.getOne = async (id) => {
    return await House.findOne({ _id: id }).lean()
}

exports.updateOne = async (id, updatedHouse) => {
    return await House.updateOne({ _id: id }, updatedHouse)
}

exports.deleteOne = async (id) => {
    await House.deleteOne({ _id: id })
}