import { CalculationService } from "./calculationService"


describe('calculateString',() : void => {

     it('should make simple calc and return 8', () => { 
        const calculationService = new CalculationService();
        const mockCalculateString = jest.spyOn(calculationService, 'calculateString');
        const mockSendNumbers = jest.spyOn(calculationService as any, 'sendNumbers');
        const result = calculationService.calculateString('5+3');
        expect(result).toBe('8');
        expect(mockCalculateString).toBeCalledTimes(1)
        expect(mockSendNumbers).toBeCalledTimes(2)
        
     });

     it('should make  calc with parenthese and return 40P', () => { 
        const calculationService = new CalculationService();
        const mockCalculateString = jest.spyOn(calculationService, 'calculateString');
        const mockSendNumbers = jest.spyOn(calculationService as any, 'sendNumbers');
        const result = calculationService.calculateString('5*(5+3)');
        expect(result).toBe('40');
        expect(mockCalculateString).toBeCalledTimes(2)
        expect(mockSendNumbers).toBeCalledTimes(4)
        
     });

     it('should return error', () => { 
        const calculationService = new CalculationService();
        expect(() => { calculationService.calculateString('1/0'); }).toThrow('infinity');
        
     });

})

describe('sendNumbers', () : void => {

    it('should make 0 iterate', () => { 
        const calculationService = new CalculationService();
        const mockSendNumbers = jest.spyOn(calculationService as any, 'sendNumbers');
        calculationService['sendNumbers']('5');
        expect(mockSendNumbers).toBeCalledTimes(1);
     });

    it('should make 1 iterate', () => { 
        const calculationService = new CalculationService();
        const mockSendNumbers = jest.spyOn(calculationService as any, 'sendNumbers');
        calculationService['sendNumbers']('5+5');
        expect(mockSendNumbers).toBeCalledTimes(2);
     });

     it('should make 2 iterate', () => { 
        const calculationService = new CalculationService();
        const mockSendNumbers = jest.spyOn(calculationService as any, 'sendNumbers');
        calculationService['sendNumbers']('5+5+5');
        expect(mockSendNumbers).toBeCalledTimes(3);
     });

})

describe('formatMultiplyWithoutCharacter', () : void => {

    it('should return with no difference', () => {

        const calcul = '5*(4+3)';
        const calculationService = new CalculationService();
        const response = calculationService['formatMultiplyWithoutCharacter'](calcul);
        expect(response).toBe(calcul)
    })

    it('should return with * add before parenthese', () => {

        const calcul = '5(4+3)';
        const wanted = '5*(4+3)'
        const calculationService = new CalculationService();
        const response = calculationService['formatMultiplyWithoutCharacter'](calcul);
        expect(response).toBe(wanted)
    })

});

describe('prepareCalculation', () : void => {

    it('should call calculate with multiply', () => {
        const calcul = '5*4';
        const calculationService = new CalculationService();
        const mockCalculate = jest.spyOn(calculationService as any, 'calculate');
        calculationService['prepareCalculation'](calcul);
        expect(mockCalculate).toBeCalledWith('5','4','*')
    });

    it('should call calculate with addition', () => {
        const calcul = '5+4';
        const calculationService = new CalculationService();
        const mockCalculate = jest.spyOn(calculationService as any, 'calculate');
        calculationService['prepareCalculation'](calcul);
        expect(mockCalculate).toBeCalledWith('5','4','+')
    })

    it('should call calculate subtrack', () => {
        const calcul = '5-4';
        const calculationService = new CalculationService();
        const mockCalculate = jest.spyOn(calculationService as any, 'calculate');
        calculationService['prepareCalculation'](calcul);
        expect(mockCalculate).toBeCalledWith('5','-4','+')
    })

    it('should call calculate subtrack with minus ', () => {
        const calcul = '5--4';
        const calculationService = new CalculationService();
        const mockCalculate = jest.spyOn(calculationService as any, 'calculate');
        calculationService['prepareCalculation'](calcul);
        expect(mockCalculate).toBeCalledWith('5','4','+')
    });

    it('should call calculate with subtrack', () => {
        const calcul = '5+-4';
        const calculationService = new CalculationService();
        const mockCalculate = jest.spyOn(calculationService as any, 'calculate');
        calculationService['prepareCalculation'](calcul);
        expect(mockCalculate).toBeCalledWith('5','-4','+')
    });

    it('should call calculate with divide', () => {
        const calcul = '5/4';
        const calculationService = new CalculationService();
        const mockCalculate = jest.spyOn(calculationService as any, 'calculate');
        calculationService['prepareCalculation'](calcul);
        expect(mockCalculate).toBeCalledWith('5','4','/')
    });

    it('should return error ', () => {
        const calcul ='abcd'
        const calculationService = new CalculationService();
        expect(() => { calculationService['prepareCalculation'](calcul); }).toThrow('regex error in prepare calculation');
    });
})

describe('calculate', () : void => {

    it('should multiply', () => {

        const wanted = 32;
        const calculationService = new CalculationService();
        const response = calculationService['calculate']('8','4','*');
        expect(response).toBe(wanted)
    })

    it('should add', () => {

        const wanted = 12;
        const calculationService = new CalculationService();
        const response = calculationService['calculate']('8','4','+');
        expect(response).toBe(wanted)
    })

    it('should subtrack', () => {

        const wanted = 4;
        const calculationService = new CalculationService();
        const response = calculationService['calculate']('8','-4','+');
        expect(response).toBe(wanted)
    })

    it('should divide', () => {

        const wanted = 2;
        const calculationService = new CalculationService();
        const response = calculationService['calculate']('8','4','/');
        expect(response).toBe(wanted)
    })

    it('should return error ', () => {
        const calculationService = new CalculationService();
        expect(() => { calculationService['calculate']('a','b','c'); }).toThrow('Impossible Operation');
    });


});
