const Order = require("../models/OrderModel")
const Cart = require("../models/CartModel")


 
const createOrder= async(req,res)=>{

    const userId = req.user._id
    const {shippingAddress} = req.body


    try {
        
        const cart = await Cart.findOne({user: userId}).populate("items.product")
        if(!cart || cart.items.length === 0 ) return res.status(400).json({ message: "Sepet boş" })

        const totalPrice = cart.items.reduce((acc,item)=>{
            const price = item.product.discountprice || item.product.price
            return acc + price*item.quantity
        }, 0)

        const newOrder = new Order({
            user: userId,
            items: cart.items,
            shippingAddress,
            totalPrice,
        })
        

        await newOrder.save();

        cart.items = [];
        await cart.save();

        res.status(201).json({ 
            order: newOrder, 
            message: "Sipariş başarıyla oluşturuldu!" 
        });


    } catch (error) {
        console.error("Sipariş hatası:", error);
        res.status(500).json({ message: "Sipariş oluşturulamadı" });
    }
}

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Siparişler getirilemedi" });
  }
};


module.exports = {
  getUserOrders,
  createOrder
};