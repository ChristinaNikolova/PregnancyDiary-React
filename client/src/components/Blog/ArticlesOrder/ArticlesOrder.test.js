import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ArticlesOrder from './ArticlesOrder';

describe('ArticlesOrder Component', () => {
    it('should render the component with no shown criterias', () => {
        const mockClickHandler = jest.fn();

        render(
            <BrowserRouter>
                <ArticlesOrder clickHandler={mockClickHandler} />
            </BrowserRouter>
        );

        expect(document.getElementsByClassName('order-wrapper')[0]).toBeTruthy();
        expect(document.getElementsByClassName('fas fa-hand-point-right')[0]).toBeTruthy();
        expect(document.getElementsByClassName('fas fa-hand-point-down')[0]).toBeFalsy();
        expect(document.getElementsByTagName('ul')[0]).toBeFalsy();
        expect(mockClickHandler).not.toHaveBeenCalled();
    });

    it('should show criterias when button is clicked', async () => {
        const mockClickHandler = jest.fn();

        render(
            <BrowserRouter>
                <ArticlesOrder clickHandler={mockClickHandler} />
            </BrowserRouter>
        );

        expect(document.getElementsByClassName('order-wrapper')[0]).toBeTruthy();
        expect(document.getElementsByClassName('fas fa-hand-point-right')[0]).toBeTruthy();
        expect(document.getElementsByClassName('fas fa-hand-point-down')[0]).toBeFalsy();
        expect(document.getElementsByTagName('ul')[0]).toBeFalsy();
        expect(mockClickHandler).not.toHaveBeenCalled();

        fireEvent.click(document.getElementsByTagName('button')[0]);
        await waitFor(() => document.getElementsByTagName('button')[0]);

        expect(document.getElementsByClassName('order-wrapper')[0]).toBeTruthy();
        expect(document.getElementsByClassName('fas fa-hand-point-right')[0]).toBeFalsy();
        expect(document.getElementsByClassName('fas fa-hand-point-down')[0]).toBeTruthy();
        expect(document.getElementsByTagName('ul')[0]).toBeTruthy();
        expect(mockClickHandler).toHaveBeenCalled();
        expect(mockClickHandler).toHaveBeenCalledTimes(1);
        expect(document.getElementsByClassName('article-order').length).toBe(4);
        expect(document.getElementsByClassName('article-order')[0].textContent).toBe('Oldest to newest');
        expect(document.getElementsByClassName('article-order')[1].textContent).toBe('Newest to oldest');
        expect(document.getElementsByClassName('article-order')[2].textContent).toBe('Likes Count');
        expect(document.getElementsByClassName('article-order')[3].textContent).toBe('Comments Count');

        fireEvent.click(document.getElementsByTagName('button')[0]);
        await waitFor(() => document.getElementsByTagName('button')[0]);

        expect(document.getElementsByClassName('order-wrapper')[0]).toBeTruthy();
        expect(document.getElementsByClassName('fas fa-hand-point-right')[0]).toBeTruthy();
        expect(document.getElementsByClassName('fas fa-hand-point-down')[0]).toBeFalsy();
        expect(document.getElementsByTagName('ul')[0]).toBeFalsy();
        expect(mockClickHandler).toHaveBeenCalled();
    });

    it('should trigger event when criteria is selected: old case', async () => {
        const mockClickHandler = jest.fn();

        render(
            <BrowserRouter>
                <ArticlesOrder clickHandler={mockClickHandler} />
            </BrowserRouter>
        );

        fireEvent.click(document.getElementsByTagName('button')[0]);
        await waitFor(() => document.getElementsByTagName('button')[0]);

        fireEvent.click(document.getElementsByClassName('article-order')[0]);
        await waitFor(() => document.getElementsByClassName('article-order')[0]);

        expect(document.getElementsByClassName('order-wrapper')[0]).toBeTruthy();
        expect(document.getElementsByClassName('fas fa-hand-point-right')[0]).toBeTruthy();
        expect(document.getElementsByClassName('fas fa-hand-point-down')[0]).toBeFalsy();
        expect(document.getElementsByTagName('ul')[0]).toBeFalsy();
        expect(mockClickHandler).toHaveBeenCalledTimes(2);
        expect(mockClickHandler).toBeCalledWith('old');
        expect(mockClickHandler).not.toBeCalledWith('new');
        expect(mockClickHandler).not.toBeCalledWith('likes');
        expect(mockClickHandler).not.toBeCalledWith('comments');
    });

    it('should trigger event when criteria is selected: new case', async () => {
        const mockClickHandler = jest.fn();

        render(
            <BrowserRouter>
                <ArticlesOrder clickHandler={mockClickHandler} />
            </BrowserRouter>
        );

        fireEvent.click(document.getElementsByTagName('button')[0]);
        await waitFor(() => document.getElementsByTagName('button')[0]);

        fireEvent.click(document.getElementsByClassName('article-order')[1]);
        await waitFor(() => document.getElementsByClassName('article-order')[1]);

        expect(document.getElementsByClassName('order-wrapper')[0]).toBeTruthy();
        expect(document.getElementsByClassName('fas fa-hand-point-right')[0]).toBeTruthy();
        expect(document.getElementsByClassName('fas fa-hand-point-down')[0]).toBeFalsy();
        expect(document.getElementsByTagName('ul')[0]).toBeFalsy();
        expect(mockClickHandler).toHaveBeenCalledTimes(2);
        expect(mockClickHandler).not.toBeCalledWith('old');
        expect(mockClickHandler).toBeCalledWith('new');
        expect(mockClickHandler).not.toBeCalledWith('likes');
        expect(mockClickHandler).not.toBeCalledWith('comments');
    });

    it('should trigger event when criteria is selected: likes case', async () => {
        const mockClickHandler = jest.fn();

        render(
            <BrowserRouter>
                <ArticlesOrder clickHandler={mockClickHandler} />
            </BrowserRouter>
        );

        fireEvent.click(document.getElementsByTagName('button')[0]);
        await waitFor(() => document.getElementsByTagName('button')[0]);

        fireEvent.click(document.getElementsByClassName('article-order')[2]);
        await waitFor(() => document.getElementsByClassName('article-order')[2]);

        expect(document.getElementsByClassName('order-wrapper')[0]).toBeTruthy();
        expect(document.getElementsByClassName('fas fa-hand-point-right')[0]).toBeTruthy();
        expect(document.getElementsByClassName('fas fa-hand-point-down')[0]).toBeFalsy();
        expect(document.getElementsByTagName('ul')[0]).toBeFalsy();
        expect(mockClickHandler).toHaveBeenCalledTimes(2);
        expect(mockClickHandler).not.toBeCalledWith('old');
        expect(mockClickHandler).not.toBeCalledWith('new');
        expect(mockClickHandler).toBeCalledWith('likes');
        expect(mockClickHandler).not.toBeCalledWith('comments');
    });

    it('should trigger event when criteria is selected: comments case', async () => {
        const mockClickHandler = jest.fn();

        render(
            <BrowserRouter>
                <ArticlesOrder clickHandler={mockClickHandler} />
            </BrowserRouter>
        );

        fireEvent.click(document.getElementsByTagName('button')[0]);
        await waitFor(() => document.getElementsByTagName('button')[0]);

        fireEvent.click(document.getElementsByClassName('article-order')[3]);
        await waitFor(() => document.getElementsByClassName('article-order')[3]);

        expect(document.getElementsByClassName('order-wrapper')[0]).toBeTruthy();
        expect(document.getElementsByClassName('fas fa-hand-point-right')[0]).toBeTruthy();
        expect(document.getElementsByClassName('fas fa-hand-point-down')[0]).toBeFalsy();
        expect(document.getElementsByTagName('ul')[0]).toBeFalsy();
        expect(mockClickHandler).toHaveBeenCalledTimes(2);
        expect(mockClickHandler).not.toBeCalledWith('old');
        expect(mockClickHandler).not.toBeCalledWith('new');
        expect(mockClickHandler).not.toBeCalledWith('likes');
        expect(mockClickHandler).toBeCalledWith('comments');
    });
});