
function compute(num1: number, num2: number, operation: string) {
    switch (operation) {
        case '+': {
            return num1 + num2;
        }
        case '-': {
            return num1 - num2;
        }

        default: return 'Unknown operator';
    }
}
describe('compute', () => {
   it('should return something positive', () => {
       const result = compute(1, 2, '+');
       
       expect(result).toBe(3);
   });
});