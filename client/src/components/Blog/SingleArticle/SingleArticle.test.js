import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom';
import SingleArticle from './SingleArticle';

describe('SingleArticle Component', () => {
    it('should render the component', () => {
        render(
            <BrowserRouter>
                <SingleArticle
                    id='1'
                    title='Test Title'
                    shortContent='Short content...'
                    picture='No pic'
                    categoryName='Test Category'
                    likesCount='10'
                    commentsCount='20'
                    createdOnAsString='12.12.2020' />
            </BrowserRouter>);

        expect(document.getElementsByClassName('mt-0')[0].textContent).toBe('Test Title');
        expect(document.getElementsByClassName('content')[0].textContent).toBe('Short content...');
        expect(document.getElementsByClassName('m-2')[0].textContent).toBe(' Test Category');
        expect(document.getElementsByClassName('m-2')[1].textContent).toBe(' 10');
        expect(document.getElementsByClassName('m-2')[2].textContent).toBe(' 20');
        expect(document.getElementsByClassName('m-2')[3].textContent).toBe(' 12.12.2020');
    });
});