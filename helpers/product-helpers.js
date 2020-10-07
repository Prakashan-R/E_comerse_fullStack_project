var db=require('../config/connection')
var collection=require('../config/collections')
const { response } = require('express')
const collections = require('../config/collections')
var objectId=require('mongodb').ObjectID


module.exports={

    addProduct:(product,callback)=>{
        console.log(product)

        db.get().collection('product').insertOne(product).then((data)=>{

            callback(data.ops[0]._id)
        })
    },
    getAllProducts:()=>{
        return new Promise(async(resolve,reject)=>{
            let products=await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            resolve(products)
        })
    },
    deleteProduct:(prodId)=>{
        return new Promise((resolve,reject)=>{
            console.log(prodId)
            console.log(objectId(prodId))
            db.get().collection(collection.PRODUCT_COLLECTION).removeOne({_id:objectId(prodId)}).then((response)=>{
                resolve(response)
            })
        })
    },
    getProductDetails:(prodId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collections.PRODUCT_COLLECTION).findOne({_id:objectId(prodId)}).then((product)=>{
                resolve(product)
            })
        })
    },
    updateProduct:(prodId,proDetails)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collections.PRODUCT_COLLECTION).updateOne({_id:objectId(prodId)},{
                $set:{
                    Name:proDetails.Name,
                    Category:proDetails.Category,
                    Price:proDetails.Price,
                    Description:proDetails.Description
                }
            }).then((response)=>{
                resolve()
            })
        })
    }
}