const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const productsService = require("./products.service");

async function productExists(req, res, next) {
  const product = await productsService.read(req.params.productId);
  if (product) {
    res.locals.prodcut = product;
    return next();
  }
  next({ status: 404, message: `Product cannot be found,`});
}

function read(req, res, next) {
  const { product: data } = res.locals;
  res.json({ data });
}

async function list(req, res) {
  const data = await productsService.list();
  res.json({ data });
}

module.exports = {
  read: [asyncErrorBoundary(productExists), read],
  list: [asyncErrorBoundary(list)],
};
