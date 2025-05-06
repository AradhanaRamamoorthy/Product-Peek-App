import productRoutes from './productRoutes.js';

const configRoutes = (app) => {
  app.use('/api/products', productRoutes);
};

export default configRoutes;
