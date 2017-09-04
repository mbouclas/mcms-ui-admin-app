import { AdminAppPage } from './app.po';

describe('admin-app App', () => {
  let page: AdminAppPage;

  beforeEach(() => {
    page = new AdminAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
