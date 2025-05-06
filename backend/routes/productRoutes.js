import { Router } from 'express';
import Product from '../models/productSchema.js';

const router = Router();

router
  .route('/search')
  .get(async (req, res) => {
    try {
      let { category, tenant, page = 1, limit = 10, keyword, sort } = req.query;
      keyword = typeof keyword === 'string' ? keyword.trim() : '';

      const pageNum = parseInt(page);
      const limitNum = parseInt(limit);
      
      if (isNaN(pageNum) || pageNum < 1 || isNaN(limitNum) || limitNum < 1) {
          return res.status(400).json({ error: 'Invalid pagination values' });
       }

      const validSorts = ['price-asc', 'price-desc', 'name-asc', 'name-desc'];
      if (sort && !validSorts.includes(sort)) {
        return res.status(400).json({ error: 'Invalid sort value' });
      }


      if (!category && !tenant && !keyword) {
        return res.status(200).json({
          docs: [],
          totalDocs: 0,
          page: 1,
          totalPages: 0,
          hasNextPage: false,
          hasPrevPage: false,
        });
      }

      const query = {};
      if (keyword) {
        query.$text = { $search: keyword };
      }      
      if (category) query.category = category;
      if (tenant) query.tenant = tenant;

      let sortOption = { createdAt: -1 }; 
      if (sort === 'price-asc') sortOption = { price: 1 };
      if (sort === 'price-desc') sortOption = { price: -1 };
      if (sort === 'name-asc') sortOption = { name: 1 };
      if (sort === 'name-desc') sortOption = { name: -1 };


      const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: sortOption,
        lean: true, 
        select: 'name category tenant description price' 
      };
      
      
      const results = await Product.paginate(query, options);
      res.json(results);
    } catch (e) {
      res.status(500).json({ error: 'Search failed', details: e.message });
    }
  });

  router.get('/filters', async (req, res) => {
    try {
      const categories = await Product.distinct('category');
      const tenants = await Product.distinct('tenant');
      res.json({ categories, tenants });
    } catch (e) {
      res.status(500).json({ error: 'Failed to fetch filters', details: e.message });
    }
  });

  router.get('/filtered-filters', async (req, res) => {
    const { category, tenant } = req.query;
  
    try {
      const match = {};
      if (category) match.category = category;
      if (tenant) match.tenant = tenant;
  
      const products = await Product.find(match).select('category tenant').lean();
  
      const uniqueCategories = [...new Set(products.map(p => p.category))];
      const uniqueTenants = [...new Set(products.map(p => p.tenant))];
  
      res.json({ categories: uniqueCategories, tenants: uniqueTenants });
    } catch (e) {
      res.status(500).json({ error: 'Failed to fetch filtered filters', details: e.message });
    }
  });

  router.get('/suggestions', async (req, res) => {
    try {
      let { keyword } = req.query;
      keyword = typeof keyword === 'string' ? keyword.trim() : '';
  
      if (!keyword || keyword.trim().length === 0) {
        return res.json([]);
      }
  
      const regex = new RegExp(keyword, 'i');
      const suggestions = await Product.find(
        {
          $or: [
            { name: { $regex: regex } },
            { description: { $regex: regex } },
          ],
        },
        { name: 1 }
      )
        .limit(5)
        .lean();
  
      const resultNames = suggestions.map((p) => p.name);
      res.json(resultNames);
    } catch (e) {
      res.status(500).json({ error: 'Failed to fetch suggestions', details: e.message });
    }
  });
  
export default router;
