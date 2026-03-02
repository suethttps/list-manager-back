describe('minus', () => {
    it('should return the difference of two numbers', () => {
        const minus = (a: number, b: number): number => a - b;
        expect(minus(5, 3)).toBe(2);
    });
});