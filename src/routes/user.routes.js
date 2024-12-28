const { Router } = require("express");

const listaProducts = require("../../products.json");

const router = Router();

// /api/products/
router.get(`/`, (req, res) => {
  return res.json({
    products: listaProducts.products,
  });
});

// // RUTA CON QUERY PARAMS, y PARAMS
// /api/products/:productId
router.get(`/:productId`, (req, res) => {
  console.log("PARAMS", req.params);
  const productId = req.params.productId;

  if (isNaN(productId)) {
    return res.status(400).json({
      ok: true,
      message: `no existe el product con el id ${productId}`,
      queryParams: req.query,
    });
  }

  const product = listaProducts.products.find((u) => {
    return u.id === Number(productId);
  });

  if (!product) {
    return res.json({
      ok: true,
      message: `no existe el product con el id ${productId}`,
      product,
      queryParams: req.query,
    });
  }

  return res.json({ ok: true, message: `products id: ${productId}`, product });
});

// /api/products/
router.post(`/`, (req, res) => {
  const productBody = req.body;
  console.log("🚀 ~ file: index.js:31 ~ router.post ~ productBody", productBody);
  const lastId = listaProducts.products[listaProducts.products.length - 1].id;
  const newProduct = { id: lastId + 1, ...productBody };
  res.json({ ok: true, message: `product creado`, product: newProduct });
});

module.exports = router;
