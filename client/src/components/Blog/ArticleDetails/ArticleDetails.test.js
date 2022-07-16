import { render, act, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ArticleDetails from './ArticleDetails';
import CommentsListCurrentArticle from '../../Comment/CommentsListCurrentArticle/CommentsListCurrentArticle';
import * as articlesService from '../../../services/articlesService';
import * as authService from '../../../services/authService';

jest.mock('../../../services/articlesService');
jest.mock('../../../services/authService');

fdescribe('ArticleDetails Component', () => {
    it('should render the component', async () => {
        authService.isAuthenticated.mockResolvedValue(true);
        const history = { push: jest.fn() };
        const match = { params: { id: 1 }, isExact: true, path: "", url: "" };

        articlesService.details.mockResolvedValue({
            id: 1,
            title: 'Article Title',
            picture: 'No Pic',
            createdOnAsString: '12.12.2020',
            categoryId: '2',
            categoryName: 'Category Name',
            author: 'Pesho',
            isFavourite: true,
            content: 'Test Content'
        });

        await act(async () => {
            render(
                <BrowserRouter>
                    <ArticleDetails
                        history={history}
                        match={match}
                    />
                </BrowserRouter >
            );
        });

        expect(document.getElementsByClassName('article-details-wrapper')[0]).toBeTruthy();
        expect(document.getElementsByClassName('btn')[0].textContent).toBe('Back to all articles');
        expect(document.getElementsByTagName('a').length).toBe(2);
        expect(document.getElementsByTagName('a')[1].getAttribute('href')).toBe('/articles');
        expect(<CommentsListCurrentArticle />).toBeTruthy();
    });

    it('should get details for the article', async () => {
        authService.isAuthenticated.mockResolvedValue(true);
        const history = { push: jest.fn() };
        const match = { params: { id: 1 }, isExact: true, path: "", url: "" };

        articlesService.details.mockResolvedValue({
            id: 1,
            title: 'Article Title',
            picture: 'No Pic',
            createdOnAsString: '12.12.2020',
            categoryId: '2',
            categoryName: 'Category Name',
            author: 'Pesho',
            isFavourite: true,
            content: 'Test Content'
        });

        await act(async () => {
            render(
                <BrowserRouter>
                    <ArticleDetails
                        history={history}
                        match={match}
                    />
                </BrowserRouter >
            );
        });

        expect(document.getElementsByClassName('article-details-wrapper')[0]).toBeTruthy();
        expect(document.getElementsByTagName('h2')[0].textContent).toBe('Article Title');
        expect(document.getElementsByClassName('pic-article-details')[0].getAttribute('src')).toBe('No Pic');
        expect(document.getElementsByClassName('single-meta m-2')[0].textContent).toBe('Created on:12.12.2020');
        expect(document.getElementsByClassName('single-meta m-2')[1].textContent).toBe('Category:Category Name');
        expect(document.getElementsByTagName('a')[0].getAttribute('href')).toBe('/articles/by-category/2');
        expect(document.getElementsByClassName('single-meta m-2')[2].textContent).toBe('byPesho');
        expect(document.getElementsByClassName('single-meta m-2')[3].textContent).toBe('Remove from favourites');
        expect(document.getElementsByClassName('item-description')[0].textContent).toBe('Test Content');
    });

    it('should remove from favourite articles click handler', async () => {
        authService.isAuthenticated.mockResolvedValue(true);
        const history = { push: jest.fn() };
        const match = { params: { id: 1 }, isExact: true, path: "", url: "" };
        articlesService.dislike.mockResolvedValue({ status: 200 });

        articlesService.details.mockResolvedValue({
            id: 1,
            title: 'Article Title',
            picture: 'No Pic',
            createdOnAsString: '12.12.2020',
            categoryId: '2',
            categoryName: 'Category Name',
            author: 'Pesho',
            isFavourite: true,
            content: 'Test Content'
        });

        await act(async () => {
            render(
                <BrowserRouter>
                    <ArticleDetails
                        history={history}
                        match={match}
                    />
                </BrowserRouter >
            );
        });

        //document.getElementsByClassName('fas fa-heart unlike')[0].onClick = jest.fn();
        //expect(document.getElementsByClassName('fas fa-heart unlike')[0].onClick.mock.calls).toHaveLength(0);
        expect(document.getElementsByClassName('article-details-wrapper')[0]).toBeTruthy();
        expect(document.getElementsByClassName('single-meta m-2')[3].textContent).toBe('Remove from favourites');
        expect(document.getElementsByClassName('fas fa-heart unlike')[0].textContent).toBe('Remove from favourites');

        // await act(async () => {
        //     document.getElementsByClassName('fas fa-heart unlike')[0].onClick();
        // });

        // fireEvent.click(document.getElementsByClassName('fas fa-heart unlike')[0]);
        // await waitFor(() => document.getElementsByClassName('fas fa-heart unlike')[0]);

        //document.getElementsByClassName('fas fa-heart unlike')[0].onClick();

        await act(async () => {
            fireEvent.click(document.getElementsByClassName('fas fa-heart unlike')[0].getAttribute('onClick'))
          })

        expect(document.getElementsByClassName('article-details-wrapper')[0]).toBeTruthy();
        expect(document.getElementsByClassName('fas fa-heart unlike')[0].onClick.mock.calls).toHaveLength(1);
        expect(document.getElementsByClassName('single-meta m-2')[3].textContent).toBe('Add to favourites');
    });
});