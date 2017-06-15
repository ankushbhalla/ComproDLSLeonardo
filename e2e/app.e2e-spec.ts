import { LeoPage } from './app.po';

describe('leo App', () => {
  let page: LeoPage;

  beforeEach(() => {
    page = new LeoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
