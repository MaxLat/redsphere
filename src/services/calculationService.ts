
// CHEAT SHEET REGEX 
//  / -> Start of the regex
//  -? -> option minus sign
// \d* -> integer
// (\.\d+)* -> add to integer number after the comma (0 or lot)
// [\/|\*] -> divider sign OR multiply sign
// [^()] -> parethese are exclude
// /g for global search multiple occurence 

export class CalculationService {
    constructor() {}

    /**
     * Entry point to calculate our string calculation
     *
     * @private
     * @param {string} calculation
     * @return {(string | Function)}
     * @memberof CalculationService
     */
    public calculateString(calculation: string): string | Function {
        calculation = this.formatMultiplyWithoutCharacter(calculation);
        const regGetParentheses = /\(([^()]+)\)/g;
        const operationBetweenParentheses = calculation.match(regGetParentheses)?.[0];
        const operationWithoutParentheses = operationBetweenParentheses?.replace("(", "")?.replace(")", "");

        if (!operationBetweenParentheses) {
            
            const isInfinityCalculation = calculation.match(/-?\d*(\.\d+)*\/0/g)
            if(isInfinityCalculation){
                throw new Error('infinity')
            }
            return this.sendNumbers(calculation);
        }

        const result = this.sendNumbers(operationWithoutParentheses!);
        const newCalculation = calculation.replace(operationBetweenParentheses, result as string);

        return this.calculateString(newCalculation);
    }

    /**
     * Define is priority of calculation or if no operation needed return value
     *
     * @private
     * @param {string} textAccount
     * @return {*}  {(string | Function)}
     * @memberof CalculationService
     */
    private sendNumbers(textAccount: string): string | Function {
        const regTimesOrBy = /-?\d*(\.\d+)*[\/|\*]-?\d*(\.\d+)*/g;
        const regSumOrSub = /-?\d+(\.\d+)*[\+|-]-?\d+(\.\d+)*/g;

        const operationTimesOrBy = textAccount.match(regTimesOrBy)?.[0];
        const operationSumOrSub = textAccount.match(regSumOrSub)?.[0];

        if (!operationTimesOrBy && !operationSumOrSub) {
            return textAccount;
        } 
        
        const numbers = operationTimesOrBy || operationSumOrSub;
        const result = this.prepareCalculation(numbers!);
        const newTextAccount = textAccount.replace(numbers!, result.toString());
        return this.sendNumbers(newTextAccount);
    }

    /**
     * in case of string calculation is 4(4+4) , it will format in 4*(4+4)
     *
     * @private
     * @param {string} calcul
     * @return {string}
     * @memberof CalculationService
     */
    private formatMultiplyWithoutCharacter(calcul: string) : string {
        const regGetParenthesesMultiply = /-?\d+(\.\d+)*\(([^()]+)\)/g;
        const facto = calcul.match(regGetParenthesesMultiply)?.[0];
        if (!facto) {
            return calcul;
        }

        let splitFacto = facto.split("(");
        const factoString = `${splitFacto[0]}*(${splitFacto[1]}`;
        calcul = calcul.replace(facto, factoString);
        return calcul;
    }

    /**
     * depending on calculation, it will format and lauch calculation
     *
     * @private
     * @param {string} numbers
     * @return {number}
     * @memberof CalculationService
     */
    private prepareCalculation(numbers: string): number {
        let numbersSplit = null;
        switch (true) {
            case /-?\d*(\.\d+)*\*-?\d*(\.\d+)*/g.test(numbers):
                numbersSplit = numbers.split("*");
                return this.calculate(numbersSplit[0], numbersSplit[1], "*");
            case /-?\d*(\.\d+)*\+-?\d*(\.\d+)*/g.test(numbers):
                numbersSplit = numbers.split("+");
                return this.calculate(numbersSplit[0], numbersSplit[1], "+");

            case /-?\d*(\.\d+)*\--?\d*(\.\d+)*/g.test(numbers):
                if (numbers.includes("--")) {
                    numbers = numbers.replace("--", "+");
                    numbersSplit = numbers.split("+");
                    return this.calculate(numbersSplit[0], numbersSplit[1], "+");
                }

                let subtractRegex = /-?\d+(\.\d+)*/g;
                const correctNumbers = numbers.match(subtractRegex);
                if (!correctNumbers) {
                    throw new Error("calculate is impossible ");
                }
                return this.calculate(correctNumbers[0], correctNumbers[1], "+");

            case /-?\d*(\.\d+)*\/-?\d*(\.\d+)*/g.test(numbers):
                numbersSplit = numbers.split("/");
                return this.calculate(numbersSplit[0], numbersSplit[1], "/");

            default:
                throw new Error("regex error in prepare calculation");
        }
    }

    /**
     * create 2 numbers from 2 strings and return the calculation
     *
     * @private
     * @param {string} number1String
     * @param {string} number2String
     * @param {string} operation
     * @return {number}
     * @memberof CalculationService
     */
    private calculate(number1String: string, number2String: string, operation: string): number {
        let number1: number = Number(number1String);
        let number2: number = Number(number2String);
        switch (operation) {
            case "+":
                return number1 + number2;
            case "*":
                return number1 * number2;
            case "/":
                return number1 / number2;
            default:
                throw new Error("Impossible Operation");
        }
    }
}
