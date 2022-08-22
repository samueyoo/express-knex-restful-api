const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const productsService = require("./products.service");

async function productExists(req, res, next) {
  const product = await productsService.read(req.params.productId);
  if (product) {
    res.locals.product = product;
    return next();
  }
  next({ status: 404, message: `Product cannot be found,`});
}

function read(req, res, next) {
  const { product: data } = res.locals;
  res.json({ data });
}

async function list(req, res) {
  const data = await productsService.list(); //Why are we not wrapping it in the data property
  res.json({ data });
}

async function listOutOfStockCount(req, res) {
  res.json({ data: await productsService.listOutOfStockCount() }); //But we do wrap it here?
}

async function listPriceSummary(req, res) {
  res.json({ data: await productsService.listPriceSummary() });
}

async function listTotalWeightByProduct(req, res) {
  res.json({ data: await productsService.listTotalWeightByProduct() });
}

module.exports = {
  read: [asyncErrorBoundary(productExists), read],
  list: [asyncErrorBoundary(list)],
  listOutOfStockCount: asyncErrorBoundary(listOutOfStockCount),
  listPriceSummary: asyncErrorBoundary(listPriceSummary),
  listTotalWeightByProduct: asyncErrorBoundary(listTotalWeightByProduct),
};
