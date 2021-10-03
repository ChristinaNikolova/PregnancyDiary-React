import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ArticleSingleRow from './ArticleSingleRow';
import * as articlesService from '../../../../services/articlesService';

jest.mock('../../../../services/articlesService');

describe('ArticleSingleRow Component', () => {
    it('should render the component', () => {
        render(
            <BrowserRouter>
                <ArticleSingleRow
                    id='1'
                    title='Test Article Title'
                    picture='Test Article Pic'
                    categoryId='2'
                    categoryName='Test Category Name'
                    likesCount='10'
                    commentsCount='20' />
            </BrowserRouter>);

        expect(document.getElementsByClassName('color-link')[0].textContent).toBe('Test Article Title');
        expect(document.getElementsByClassName('color-link')[1].textContent).toBe('Test Category Name');
        expect(document.getElementsByClassName('aricles-likes-count')[0].textContent).toBe('10');
        expect(document.getElementsByClassName('aricles-comments-count')[0].textContent).toBe('20');
    });

    it ('should call remove click handler', async () => {
        articlesService.remove.mockResolvedValue({ status: 200 });
        const mockClickHandler = jest.fn();

        render(
            <BrowserRouter>
                <ArticleSingleRow
                    id='1'
                    title='Test Article Title'
                    picture='Test Article Pic'
                    categoryId='2'
                    categoryName='Test Category Name'
                    likesCount='10'
                    commentsCount='20'
                    clickHandler={mockClickHandler} />
            </BrowserRouter>);

        expect(document.getElementsByTagName('tr')[0]).toBeTruthy();

        fireEvent.click(document.getElementsByClassName('btn btn-danger')[0]);
        await waitFor(() => document.getElementsByClassName('btn btn-danger')[0]);

        expect(document.getElementsByTagName('tr')[0]).toBeTruthy();
        expect(mockClickHandler).toHaveBeenCalled();
    });

    it ('should not call remove click handler', async () => {
        articlesService.remove.mockResolvedValue({ status: 400 });
        const mockClickHandler = jest.fn();

        render(
            <BrowserRouter>
                <ArticleSingleRow
                    id='1'
                    title='Test Article Title'
                    picture='Test Article Pic'
                    categoryId='2'
                    categoryName='Test Category Name'
                    likesCount='10'
                    commentsCount='20'
                    clickHandler={mockClickHandler} />
            </BrowserRouter>);

        expect(document.getElementsByTagName('tr')[0]).toBeTruthy();

        fireEvent.click(document.getElementsByClassName('btn btn-danger')[0]);
        await waitFor(() => document.getElementsByClassName('btn btn-danger')[0]);

        expect(document.getElementsByTagName('tr')[0]).toBeTruthy();
        expect(mockClickHandler).not.toHaveBeenCalled();
    });
});