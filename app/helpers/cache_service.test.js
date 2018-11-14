const expect = require('chai').expect;
const CacheService = require('./cache_service');

describe('cache_service', () => {
    it('should return data passed to cache', () => {
        const val = { my: { simple: 'value' } };
        expect(CacheService.cache('key', val)).to.be.eql(val);
    });

    it("should get a stored value by it's key", () => {
        const val = { my: { array: ['value'] } };
        CacheService.cache('test', val);

        expect(CacheService.getCache('test')).to.be.eql(val);
    })

    it('should differ from two stored keys', () => {
        const val_1 = { my: { array: ['value'] } };
        const val_2 = ['basic', 'array'];

        CacheService.cache('val_1', val_1);
        CacheService.cache('val_2', val_2);

        expect(CacheService.getCache('val_1')).to.be.eql(val_1);
        expect(CacheService.getCache('val_2')).to.be.eql(val_2);
        expect(CacheService.getCache('val_1')).not.to.be.eql(CacheService.getCache('val_2'));
    })
});
