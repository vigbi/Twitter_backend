import { trusted } from "mongoose";
import Tweet from "../models/tweet.js";


class CrudRepository {
    constructor(model){
        this.model=model;
    }

    async create(data) {
        try {
            const result= await this.model.create(data);
            return result;
        } catch (error) {
            console.log('Something is wrong in CRUD repo.');
            throw error;
        }
    }

    async destroy (id){
        try {
            const result= await this.model.findByIdAndDelete(id);
            return result;
        } catch (error) {
            console.log('Something is wrong in CRUD repo.');
            throw error;
        }
    }

    async get(id){
        try {
            const result= await this.model.findById(id);
            return result;
        } catch (error) {
            console.log('Something is wrong in CRUD repo.');
            throw error;
        }
    }

    async getAll(){
        try {
            const result= await this.model.find({});
            return result;
        } catch (error) {
            console.log('Something is wrong in CRUD repo.');
            throw error;
        }
    }

    async update(id){
        try {
            const result= await this.model.findByIdAndUpdate(id,data,{new:true});
            return result;
        } catch (error) {
            console.log('Something is wrong in CRUD repo.');
            throw error;
        }
    }
}


export default CrudRepository;