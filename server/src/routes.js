import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import UserController from './app/controller/UserController';
import ConfirmationController from './app/controller/ConfirmationController';
import authMiddleware from './app/middlewares/auth';
import isAdmin from './app/middlewares/isAdmin';
import confirmedMiddleware from './app/middlewares/confirmedUser';
import SessionController from './app/controller/SessionController';
import AddressController from './app/controller/AddressController';
import StoreController from './app/controller/StoreController';
import ProductGroupController from './app/controller/ProductGroupController';
import ProductController from './app/controller/ProductController';
import ClientController from './app/controller/ClientController';
import OrderController from './app/controller/OrderController';
import SubItemsController from './app/controller/SubItemsController';
import FileUploadController from './app/controller/FileUploadController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.put('/confirmation', ConfirmationController.update);
routes.get('/users/:userId/confirmation', ConfirmationController.index);
routes.post('/sessions', SessionController.store);

routes.get('/stores/:storeId/productgroups', ProductGroupController.index);

routes.use(authMiddleware, confirmedMiddleware);

routes.put('/users/:userId', UserController.update);
routes.get('/users', UserController.index);
routes.get('/users/:storeId', UserController.index);
routes.delete('/users/:userId', UserController.delete);

routes.delete('/addresses/:addressId', AddressController.delete);
routes.post('/addresses/', AddressController.store);
routes.get('/addresses', AddressController.index);

routes.delete('/stores/:storeId', isAdmin, StoreController.delete);
routes.post('/stores/', isAdmin, StoreController.store);
routes.get('/stores/', isAdmin, StoreController.index);
routes.put('/stores/:storeId', isAdmin, StoreController.update);

// productGroups routes
routes.post(
  '/stores/:storeId/productgroups',
  isAdmin,
  ProductGroupController.store
);
routes.put(
  '/productgroups/:productGroupId',
  isAdmin,
  ProductGroupController.update
);

routes.delete(
  '/productgroups/:productGroupId',
  isAdmin,
  ProductGroupController.delete
);

// products routes
routes.post('/products', isAdmin, ProductController.store);
routes.put('/products/:productId', isAdmin, ProductController.update);
routes.delete('/products/:productId', isAdmin, ProductController.delete);
routes.get('/stores/:storeId/products/:productId', ProductController.index);
routes.get('/stores/:storeId/products', ProductController.index);

// clients
routes.get('/stores/:storeId/clients/:search', ClientController.index);
routes.post('/clients', ClientController.store);
routes.put('/clients/:clientId', ClientController.update);
routes.delete('/clients/:clientId', ClientController.delete);

// orders
routes.post('/orders', OrderController.store);
routes.get('/clients/:id/orders', OrderController.index);

// product subitems
routes.post('/products/:productId/subitems', SubItemsController.store);
routes.get('/products/:productId/subitems', SubItemsController.index);

routes.post('/files', upload.single('file'), FileUploadController.store);
export default routes;
