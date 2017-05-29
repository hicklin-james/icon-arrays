import { IconArraysPage } from './app.po';

describe('icon-arrays App', () => {
  let page: IconArraysPage;

  beforeEach(() => {
    page = new IconArraysPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
