import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom';
import SingleComment from "./SingleComment";

describe('SingleComment Component', () => {
    it('should render the component', () => {
        render(
            <BrowserRouter>
                <SingleComment
                    content='Test Content'
                    formattedCreatedOn='12.12.2020'
                    userUserName='Pesho' />
            </BrowserRouter>);

        expect(document.getElementsByClassName('comment-content')[0].textContent).toBe('Test Content');
        expect(document.getElementsByClassName('info')[0].textContent).toBe('12.12.2020');
        expect(document.getElementsByClassName('info')[1].textContent).toBe('Pesho');
    });
});