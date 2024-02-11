import gameRoutes from './game';
import paymentRoutes from './payments';
import authRoutes from './auth';
import userRoutes from './users';

export default [...gameRoutes, ...paymentRoutes, ...authRoutes, ...userRoutes];