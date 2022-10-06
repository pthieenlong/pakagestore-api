import express, { Request, Response } from "express";
import Product from '../Model/Product';

export class ProductController {
  public getAllProducts = async (req: Request, res: Response) => {
    const products = await Product.find();
    if(!products) return res.status(204).json({
      "message": "No product founded",
    });
    return res.json(products);
  };
  public createProduct = async (req:Request, res: Response) => {
    const { name, price, image, desc } = req.body;
    if(!name || !price || !image) 
      return res.status(400).json({
        message: "Name, price and image are required"
      });
    const duplicate = await Product.findOne({ name: name }).exec();
    if(duplicate) return res.sendStatus(409);
    try {
      const result = await Product.create({
        'name': name,
        'price': price,
        'image': `./assets/game/${image}`,
        'desc': desc,
      });
  
      res.status(201).json({ 'message': 'create product success'});
    } catch(err: any) {
      res.status(500).json({ 'message': err.message });
    }
  
  };

  public getProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    if(!id) return res.status(400).json({
      message: "id are required",
    });
    const product = await Product.findOne({ _id: id });
    if(!product) return res.status(204).json({
      message: "Product not founded",
    });
    return res.json(product);
  };

  public updateProduct = async (req: Request, res: Response) => {
    if(!req.body.id) return res.status(400).json({
      message: "ID is required",
    });
    const product = await Product.findOne({_id: req.body.id});
    if(!product) return res.status(204).json({
      message: "Product not founded",
    });

    if(req.body.name) product.name = req.body.name;
    if(req.body.price) product.price = req.body.price;
    if(req.body.image) product.image = `./assets/game/${req.body.image}`;
    if(req.body.desc) product.image = req.body.desc;
    
    const result = await product.save();

    res.json( {message: "Update Successed!"} );
  }
  public deleteProduct = async (req: Request, res: Response) => {
    if(!req.body.id) return res.status(400).json({
      message: "ID is required",
    });
    const product = await Product.findOne({_id: req.body.id});
    if(!product) return res.status(204).json({
      message: "Product not founded",
    });
    const result = await product.deleteOne();
    res.json(result);
  }
}
