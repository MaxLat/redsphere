import { CalculationService } from '../services/calculationService';
import { CalculationController } from './calculationController';

export const calculationController = new CalculationController(new CalculationService());