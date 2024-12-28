const express = require("express");
const displayRoutes = require("express-routemap");
const cors = require("cors");

const productsRoutes = require("./routes/products.routes");
const petsRoutes = require("./routes/pets.routes");

const PORT = process.env.PORT || 8080;

const app = express();

const BASE_PREFIX = process.env.BASE_PREFIX || "api";

app.use(express.json()); // sin esto no podemos ver el req.body
app.use(express.urlencoded({ extended: true })); // sino se agrega no podremos tomar los parametros de la url del request, req.query
app.use(cors());

app.use("/static", express.static(`${__dirname}/public`));

app.get(`/`, (req, res) => {
  return res.json({ message: `API DEPLOY SUCCESS` });
});

app.get(`/${BASE_PREFIX}/alive`, (req, res) => {
  return res.json({
    message: `Hola hiciste tu 1ra api, y esta ejecutandose en RAILWAY.APP- ${process.env.NODE_ENV}`,
  });
});

// /api/users --> productsRoutes
app.use(`/${BASE_PREFIX}/users`, productsRoutes);
app.use(`/${BASE_PREFIX}/pets`, petsRoutes);

app.listen(PORT, () => {
  displayRoutes(app);
  console.log(`API RUNNING ON PORT ${PORT}`);
});

// PUBLIC URL en glitch https://unruly-sparkly-occupation.glitch.me
// PUBLIC URL en railway node-js-deploy-production.up.railway.app
