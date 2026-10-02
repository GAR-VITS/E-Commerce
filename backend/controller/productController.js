const Product = require('../model/product');
const cloudinary = require('../config/cloudinary');

async function getProducts(req, res) {
    try{
        const products = await Product.find({});
        return res.status(201).json({products});


    }
    catch(error){
        console.log("Error while getting products", error);
        return res.status(500).json({message: "Error Encountered While Fetching"});
    }

};

async function createProduct(req, res){
    try{
        const {productName, description, price, category, seller, stock} = req.body;
        if(!productName || !description || !price || !category || !seller || !stock){
            return res.status(400).json({message: "All fields are required"});
        }
        let imageUrl = "";
        if(req.file){
            const response = await cloudinary.uploader.upload(req.file.path);
            // console.log("Cloudinary Response: ", response);
            imageUrl = response.secure_url;
        }
        else{
            const response = await cloudinary.uploader.upload("https://cdn.pixabay.com/photo/2016/09/23/11/37/cardboard-1689424_640.png");
            // console.log("Cloudinary Response: ", response);
            imageUrl = response.secure_url
            
        }
        const product = new Product({
            productName,
            description,
            price,  
            category,
            seller,
            stock,
            imageUrl,
        });
        await product.save();
        return res.status(201).json({success: true});
    }
    catch(error){
        console.log("Product Creation Error: ", error);
        return res.status(500).json({message: 'Server Error'});
    }
};


async function getProductById(req, res){
    try{
        const {id} = req.params;
        const product = await Product.findById(id);
        if(!product) return res.status(404).json({message: "Product Not Found"});
        return res.status(200).json(product);
    }
    catch(error){
        console.log("Get Product By Id Error: ", error);
        return res.status(500).json({message: "Server Error"});
    }
};

async function updateProduct(req, res){
    try{
        const { id } = req.params;
        const { productName, description, price, category, seller, stock } = req.body;
        const product = await Product.findById(id);
        if(!product) return res.status(404).json({message: "Product Not Found"});
        product.productName = productName || product.productName;
        product.description = description || product.description;
        product.price = price || product.price;
        product.category = category || product.category;
        product.seller = seller || product.seller;
        product.stock = stock || product.stock;
        if(req.file){
            const response = await cloudinary.uploader.upload(req.file.path);
            console.log("Cloudinary Response for updation: ", response);
            product.imageUrl = response.secure_url;
        }
        const updatedProduct = await product.save();
        return res.status(200).json({success: true, product: updatedProduct});

    }
    catch(error){
        console.log("Update Product Error: ", error);
        return res.status(500).json({message: "Server Error"});
    }
};


async function deleteProduct(req, res){
    try{
        const {id} = req.params;
        const product = await Product.findById(id);
        if(!product) return res.status(404).json({message: "Product Not Found"});
        await Product.deleteOne({_id: id});
        return res.status(200).json({success: true, message: "Product Deleted Successfully"});
    }       
    catch(error){
        console.log("Delete Product Error: ", error);
        return res.status(500).json({message: "Server Error"});
    }
};


module.exports = {
    getProducts,
    createProduct, getProductById,
    updateProduct,
    deleteProduct
};