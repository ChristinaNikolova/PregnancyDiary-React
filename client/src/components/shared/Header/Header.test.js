import { render, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header";

describe("Header Component", () => {
  it("should render the component when no admin and no auth", () => {
    render(
      <BrowserRouter>
        <Header
          isAdmin={false}
          isLoggedIn={false}
        />
      </BrowserRouter>);

    expect(document.getElementsByClassName('header-wrapper')[0]).toBeTruthy();
    expect(document.getElementsByClassName('navbar-brand')[0].textContent).toBe('Pregnancy-Diary');
    expect(document.getElementsByTagName('a').length).toBe(5);
    expect(document.getElementsByTagName('a')[0].getAttribute('href')).toBe('/home');
    expect(document.getElementsByTagName('a')[1].textContent).toBe('Home ');
    expect(document.getElementsByTagName('a')[1].getAttribute('href')).toBe('/');
    expect(document.getElementsByTagName('a')[2].textContent).toBe('Login');
    expect(document.getElementsByTagName('a')[2].getAttribute('href')).toBe('/login');
    expect(document.getElementsByTagName('a')[3].textContent).toBe('Register');
    expect(document.getElementsByTagName('a')[3].getAttribute('href')).toBe('/register');
    expect(document.getElementsByTagName('a')[4].textContent).toBe('Blog');
    expect(document.getElementsByTagName('a')[4].getAttribute('href')).toBe('/articles');
    expect(document.getElementsByClassName('btn btn-danger')[0]).toBeFalsy();
  });

  it("should render the component when no admin but auth", () => {
    render(
      <BrowserRouter>
        <Header
          isAdmin={false}
          isLoggedIn={true}
        />
      </BrowserRouter>);

    expect(document.getElementsByClassName('header-wrapper')[0]).toBeTruthy();
    expect(document.getElementsByClassName('navbar-brand')[0].textContent).toBe('Pregnancy-Diary');
    expect(document.getElementsByTagName('a').length).toBe(6);
    expect(document.getElementsByTagName('a')[2].textContent).toBe('My Diaries');
    expect(document.getElementsByTagName('a')[2].getAttribute('href')).toBe('/user/diaries');
    expect(document.getElementsByTagName('a')[3].textContent).toBe('Blog');
    expect(document.getElementsByTagName('a')[3].getAttribute('href')).toBe('/articles');
    expect(document.getElementsByTagName('a')[4].textContent).toBe('My Favourite Articles');
    expect(document.getElementsByTagName('a')[4].getAttribute('href')).toBe('/user/favourite-articles');
    expect(document.getElementsByTagName('button')[0].textContent).toBe('Create new diary');
    expect(document.getElementsByTagName('button')[0].className).toBe('btn btn-create-diary ml-1');
    expect(document.getElementsByTagName('a')[5].getAttribute('href')).toBe('/diary/create');
    expect(document.getElementsByClassName('btn btn-danger')[0]).toBeTruthy();
    expect(document.getElementsByClassName('btn btn-danger')[0].textContent).toBe('Logout');
  });

  it("should render the component when admin and auth", () => {
    render(
      <BrowserRouter>
        <Header
          isAdmin={true}
          isLoggedIn={true}
        />
      </BrowserRouter>);

    expect(document.getElementsByClassName('header-wrapper')[0]).toBeTruthy();
    expect(document.getElementsByClassName('navbar-brand')[0].textContent).toBe('Pregnancy-Diary');
    expect(document.getElementsByTagName('a').length).toBe(7);
    expect(document.getElementsByTagName('a')[5].textContent).toBe('Administration');
    expect(document.getElementsByTagName('a')[5].getAttribute('href')).toBe('/admin/dashboard');
    expect(document.getElementsByClassName('btn btn-danger')[0]).toBeTruthy();
    expect(document.getElementsByClassName('btn btn-danger')[0].textContent).toBe('Logout');
  });

  it("should logout when logout button is clicked", async () => {
    const mockClickHandler = jest.fn();

    render(
      <BrowserRouter>
        <Header
          isAdmin={false}
          isLoggedIn={true}
          clickHandler = {mockClickHandler}
          history
        />
      </BrowserRouter>);
    
    expect(document.getElementsByClassName('btn btn-danger')[0]).toBeTruthy();
    expect(document.getElementsByClassName('btn btn-danger')[0].textContent).toBe('Logout');
    expect(mockClickHandler).not.toHaveBeenCalled();
    
    fireEvent.click(document.getElementsByClassName('btn btn-danger')[0]);
    await waitFor(() => document.getElementsByClassName('btn btn-danger')[0]);

    expect(mockClickHandler).toHaveBeenCalled();
  });
});