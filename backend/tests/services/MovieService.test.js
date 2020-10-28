const MovieService = require('../../services/MovieService.js')
const MovieFilter = MovieService.MovieFilter
const PageFilter = MovieService.PageFilter

test('PageFilter size', () => {
    let pageFilter = new PageFilter(1,10)
    expect(pageFilter.skip).toBe(0);
    pageFilter = new PageFilter(2,10)
    expect(pageFilter.skip).toBe(10);
    pageFilter = new PageFilter(2,20)
    expect(pageFilter.skip).toBe(20);
    pageFilter = new PageFilter(3,20)
    expect(pageFilter.skip).toBe(40);
});