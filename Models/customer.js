const mongoose = require('mongoose');
const { Schema } = mongoose;

main()
    .then(() => console.log("Connection Successfull"))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

const orderSchema = new Schema({
    item: String,
    price: Number,
})

const customerSchema = new Schema({
    name: String,
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: "Order"
        }
    ]
})

const Order = mongoose.model('Order', orderSchema)
const Customer = mongoose.model('Customer', customerSchema)

// const addCustomer = async () => {
//     let cust1 = new Customer({
//         name: "Shivansh Tandon",
//     })
//     let order1 = await Order.findOne({ item: "Samosa" })
//     let order2 = await Order.findOne({ item: "Chai" })

//     cust1.orders.push(order1)
//     cust1.orders.push(order2)

//     let result = await cust1.save()
//     console.log(result)
// }

// addCustomer()

const findCustomer = async () => {
    let result = await Customer.find({}).populate('orders')
    console.log(result[0])
}
findCustomer()

// const addOrders = async () => {
//     let res = await Order.insertMany(
//         [
//             { item: "Samosa", price: 10 },
//             { item: "kachori", price: 15 },
//             { item: "Chai", price: 5 }
//         ]
//     )
//     console.log(res)
// }

// addOrders()

const addCust = async () => {
    let newCust = new Customer({
        name: "Kaalu",
    })
    let newOrder = new Order({
        item: "Pizza",
        price: 150,
    })
    newCust.orders.push(newOrder)
    await newOrder.save()
    await newCust.save()

    console.log("Added new customer")
}

addCust()