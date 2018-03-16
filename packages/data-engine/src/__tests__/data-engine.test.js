describe('Data engine', () => {
    let DataEngine;
    let SortEngine;
    let FilterEngine;
    beforeEach(() => {
        jest.resetModules();
        DataEngine = require('data-engine');
        SortEngine = require('data-engine').Sort;
        FilterEngine = require('data-engine').Filter;
    });
    it('Create data engine', () => {
        const dataEngine = new DataEngine();
        expect(dataEngine).toBeInstanceOf(DataEngine);
        expect(dataEngine.SortEngine).toBeInstanceOf(SortEngine);
        expect(dataEngine.FilterEngine).toBeInstanceOf(FilterEngine);
        expect(dataEngine.Data.length).toBe(0);
    });
    it('try to shut it down', () => {
        const dataEngine = new DataEngine();
        expect(dataEngine).toBeInstanceOf(DataEngine);
        //        dataEngine.Data = undefined;
        //        expect(dataEngine.Data.length).toBe(0);
    });
    it('should be empty array', () => {
        const dataEngine = new DataEngine();
        dataEngine.Data = [];
        expect(dataEngine.Data.length).toBe(0);
    });
    it('should not be empty array', () => {
        const dataEngine = new DataEngine();
        dataEngine.Data = [
            { a: 1, },
            { a: 1, },
            { a: 1, },
            { a: 1, },
            { a: 1, },
            { a: 1, },
            { a: 1, },
            { a: 1, },
            { a: 1, },
            { a: 1, },
            { a: 1, },
            { a: 1, }
        ];
        expect(dataEngine.Data.length).not.toBe(0);
    });
    it('should not be empty array', () => {
        const dataEngine = new DataEngine();
        dataEngine.Data = [
            { a: 10, },
            { a: 1521129090606, },
            { a: 1521129090606, },
            { a: 13, },
            { a: 14, },
            { a: 15, },
            { a: 16, },
            { a: 17, },
            { a: 18, },
            { a: 19, },
            { a: 12, },
            { a: 11, }
        ];
        dataEngine.addFilter('a', { from: 1521129090606, to: null, });
        console.log(dataEngine.Data);
        expect(dataEngine.Data.length).not.toBe(0);
    });
});
