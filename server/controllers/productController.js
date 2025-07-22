const uuid = require("uuid");
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
const {ObjectId} = require("bson");

const Product = require("../models/product");
const Category = require("../models/category");
const Review = require("../models/review");
const Basket = require("../models/basket");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

const uploadToCloudinary = (file) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                public_id: uuid.v4(),
                folder: 'products'
            },
            (error, result) => {
                if (error) {
                    console.error('Помилка Cloudinary:', error)
                    return reject(error)
                }
                resolve(result.public_id)
            }
        )
        streamifier.createReadStream(file.data).pipe(uploadStream)
    })
}


class ProductController {

    async create(req, res) {
        try {
            const {title, price, category, description, size, color} = req.body
            const {img} = req.files
            const fileName = await uploadToCloudinary(img)
            const category_check = Category.findById(category)
            if (!category_check) res.status(500).json("category doesnt exist")

            const prod = await Product.create({title, price, img: fileName, category, description, size, color})

            return res.json(prod)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getAll(req, res) {
        const priceRange = req.query.priceRange
        const filterCategory = req.query.category
        const searchQuery = req.query.search
        let {limit, page} = req.query
        const alphabetOrder = req.query.alphabetOrder
        const basket_id = req.query.basket_id
        page = page || 1
        limit = limit || 15
        const offset = page * limit - limit

        let id = req.query.id

        let count = await Product.count();

        try {
            const filter = {};
            if (id) {
                id = id.map((id) => new ObjectId(id));
                filter._id = {$in: id};
            }

            if(basket_id) {
                const basket = await Basket.findById(basket_id)
                if (basket) {
                    if (basket.products.length) {

                        const product_ids = basket.products.map((prod) => prod.product)
                        const products = await Product.find({
                            '_id': {$in: product_ids}
                        })
                        const productsWithAmounts = products.map((product) => {
                            const productWithAmount = basket.products.find((prod) => prod.product.equals(product._id));
                            return {product, amount: productWithAmount.amount};
                        });


                        res.json(productsWithAmounts);
                        return
                    }
                    res.json({})
                    return
                }
            }

            if (filterCategory) {
                filter.category = filterCategory;
            }

            if (searchQuery) {
                const regex = new RegExp(searchQuery, 'i');
                filter.title = regex;
            }

            if (priceRange) {
                const minPrice = priceRange.min
                const maxPrice = priceRange.max
                filter.price = {$gte: minPrice, $lte: maxPrice};
            }

            const filteredCount = await Product.find(filter).countDocuments({});

            let products = await Product.find(filter)
                .skip(offset)
                .limit(limit);

            for (const product of products) {
                const reviews = await Review.find({product: product._id});
                const totalRating = reviews.reduce(
                    (sum, review) => sum + review.rating,
                    0
                );
                product.averageRating =
                    reviews.length > 0 ? totalRating / reviews.length : 0;
            }

            if (alphabetOrder === 'ASCENT') {
                products = products.sort((a, b) => a.title.localeCompare(b.title));
            } else if (alphabetOrder === 'DESCENT') {
                products = products.sort((a, b) => b.title.localeCompare(a.title));
            }

            res.json({products, count: filteredCount});
        } catch (e) {
            console.log(e);
            res.status(500).json(e);
        }
    }


    async getByID(req, res) {
        try {
            const product = await Product.findById(req.params.id)
            const reviews = await Review.find({product: product._id})
            const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
            product.averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;
            res.json(product);
        } catch (e) {
            res.status(500).json(e)
        }
    }


    async update(req, res) {
        try {
            const product = req.body;
            if (!product._id) {
                res.status(400).json({message: 'no id'});
            }
            const updatedProduct = await Product.findByIdAndUpdate(product._id, product, {new: true});
            return res.json(updatedProduct);
        } catch (e) {
            res.status(500).json(e)
        }

    }

    async delete(req, res) {
        try {
            const {id} = req.params
            if (!id) {
                res.status(400).json({message: 'no id'});
            }
            const deletedProduct = await Product.findByIdAndDelete(id);
            if (!deletedProduct) {
                res.json({message: "Cant find with this id"})
            } else res.json(deletedProduct);
        } catch (e) {
            res.status(500).json(e)
        }
    }


}


module.exports = new ProductController()