import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AllCategories from './AllCategories';
import * as authService from '../../../../services/authService';

jest.mock('../../../../services/authService');

describe('AllCategories Component', () => {
    it('should render the component with no admin', () => {
        // authService.isAdmin.mockResolvedValue(true);
        const history = { push: jest.fn() };

        render(
            <BrowserRouter>
                <AllCategories history={history} />
            </BrowserRouter>
        );

        expect(document.getElementsByClassName('all-category-wrapper')[0]).toBeTruthy();
        expect(document.getElementsByTagName('h1')[0].textContent).toBe('Categories');
        expect(document.getElementsByTagName('table')[0]).toBeTruthy();
    });

    // it('should render the component with admin', () => {
    //     const history = { push: jest.fn() };

    //     render(
    //         <BrowserRouter>
    //             <AllCategories history={history} />
    //         </BrowserRouter>
    //     );

    //     expect(document.getElementsByClassName('all-category-wrapper')[0]).toBeTruthy();
    //     expect(document.getElementsByTagName('h1')[0].textContent).toBe('Categories');
    //     expect(document.getElementsByTagName('table')[0]).toBeTruthy();
    // });
});