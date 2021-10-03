import { render, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SingleArticleCategory from "./SingleArticleCategory";

describe("SingleArticleCategory Component", () => {
  it("should render the component", async () => {
    const mockClickHandler = jest.fn();

    render(
      <BrowserRouter>
        <SingleArticleCategory
          id='101'
          name='Test Name'
          articlesCount='10'
          clickHandler={mockClickHandler} />
      </BrowserRouter>
    );

    expect(document.getElementsByClassName('articles-count')[0]).toBeTruthy();
    expect(document.getElementsByClassName('articles-count')[0].textContent).toBe('10');
    expect(document.getElementsByTagName('a').length).toBe(1);
    expect(document.getElementsByTagName('a')[0].textContent).toBe('Test Name: ');
    expect(document.getElementsByTagName('a')[0].getAttribute('href')).toBe('/articles/by-category/101');
    expect(mockClickHandler).not.toHaveBeenCalled();

    fireEvent.click(document.getElementsByTagName('a')[0]);
    await waitFor(() => document.getElementsByTagName('a')[0]);

    expect(mockClickHandler).toHaveBeenCalled();
  });
});
