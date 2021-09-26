import { render, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom';
import FavouriteArticlesRow from "./FavouriteArticlesRow";
import * as artilcesService from '../../../services/articlesService';

jest.mock('../../../services/articlesService');

describe('FavouriteArticlesRow Component', () => {
    it('should render the component', () => {
        render(
            <BrowserRouter>
                <FavouriteArticlesRow
                    articleId='1'
                    articleTitle='Test Title'
                    articlePicture='Test Pic'
                    articleCategoryName='Test Category Name'
                    articleCategoryId='Test Category Id' />
            </BrowserRouter>);

        expect(document.getElementsByTagName('h6')[0].textContent).toBe('Test Title');
        expect(document.getElementsByClassName('color-link')[1].textContent).toBe('Test Category Name');
    });

    it('should call remove click handler', async () => {
        artilcesService.dislike.mockResolvedValue({ status: 200 });
        const mockClickHandler = jest.fn();

        render(
            <BrowserRouter>
                <FavouriteArticlesRow
                    articleId='1'
                    articleTitle='Test Title'
                    articlePicture='Test Pic'
                    articleCategoryName='Test Category Name'
                    articleCategoryId='Test Category Id'
                    clickHandler={mockClickHandler} />
            </BrowserRouter>);

        expect(document.getElementsByTagName('tr')[0]).toBeTruthy();

        fireEvent.click(document.getElementsByClassName('btn btn-danger')[0]);
        await waitFor(() => document.getElementsByClassName('btn btn-danger')[0]);

        expect(document.getElementsByTagName('tr')[0]).toBeTruthy();
        expect(mockClickHandler).toHaveBeenCalled();
    });

    it('should not call remove click handler', async () => {
        artilcesService.dislike.mockResolvedValue({ status: 400 });
        const mockClickHandler = jest.fn();

        render(
            <BrowserRouter>
                <FavouriteArticlesRow
                    articleId='1'
                    articleTitle='Test Title'
                    articlePicture='Test Pic'
                    articleCategoryName='Test Category Name'
                    articleCategoryId='Test Category Id'
                    clickHandler={mockClickHandler} />
            </BrowserRouter>);

        expect(document.getElementsByTagName('tr')[0]).toBeTruthy();

        fireEvent.click(document.getElementsByClassName('btn btn-danger')[0]);
        await waitFor(() => document.getElementsByClassName('btn btn-danger')[0]);

        expect(document.getElementsByTagName('tr')[0]).toBeTruthy();
        expect(mockClickHandler).not.toHaveBeenCalled();
    });
});