import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CategorySingleRow from './CategorySingleRow';
import * as categoriesService from '../../../../services/categoriesService';

jest.mock('../../../../services/categoriesService');

describe('CategorySingleRow Component', () => {
    it('should render the component', () => {
        render(
            <BrowserRouter>
                <CategorySingleRow
                    id='1'
                    name='Test Category Name'
                    articlesCount='12'
                    picture='Test Pic' />
            </BrowserRouter>
        );

        expect(document.getElementsByClassName('color-link')[0].textContent).toBe('Test Category Name');
        expect(document.getElementsByClassName('articles-count')[0].textContent).toBe('12');
    });

    it('should call remove click handler', async () => {
        categoriesService.remove.mockResolvedValue({ status: 200 });
        const mockClickHandler = jest.fn();

        render(
            <BrowserRouter>
                <CategorySingleRow
                    id='1'
                    name='Test Category Name'
                    articlesCount='12'
                    picture='Test Pic'
                    clickHandler={mockClickHandler} />
            </BrowserRouter>);

        expect(document.getElementsByTagName('tr')[0]).toBeTruthy();

        fireEvent.click(document.getElementsByClassName('btn btn-danger')[0]);
        await waitFor(() => document.getElementsByClassName('btn btn-danger')[0]);

        expect(document.getElementsByTagName('tr')[0]).toBeTruthy();
        expect(mockClickHandler).toHaveBeenCalled();
    });

    it('should not call remove click handler', async () => {
        categoriesService.remove.mockResolvedValue({ status: 400 });
        const mockClickHandler = jest.fn();

        render(
            <BrowserRouter>
                <CategorySingleRow
                    id='1'
                    name='Test Category Name'
                    articlesCount='12'
                    picture='Test Pic'
                    clickHandler={mockClickHandler} />
            </BrowserRouter>);

        expect(document.getElementsByTagName('tr')[0]).toBeTruthy();

        fireEvent.click(document.getElementsByClassName('btn btn-danger')[0]);
        await waitFor(() => document.getElementsByClassName('btn btn-danger')[0]);

        expect(document.getElementsByTagName('tr')[0]).toBeTruthy();
        expect(mockClickHandler).not.toHaveBeenCalled();
    });
});