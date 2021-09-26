import { render, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom';
import SingleWeek from "./SingleWeek";
import * as weeksService from '../../../services/weeksService';

jest.mock('../../../services/weeksService');

describe('SingleWeek Component', () => {
    it('should render the component', () => {
        render(
            <BrowserRouter>
                <SingleWeek
                    id='1'
                    number='2'
                    mood='Happy'
                    moments='3'
                />
            </BrowserRouter>);

        expect(document.getElementsByClassName('td-number')[0].textContent).toBe('2');
        expect(document.getElementsByClassName('td-mood')[0].textContent).toBe('Happy');
        expect(document.getElementsByClassName('td-moments')[0].textContent).toBe('3');
    });

    it('should call remove click handler', async () => {
        weeksService.remove.mockResolvedValue({ status: 200 });
        const mockClickHandler = jest.fn();

        render(
            <BrowserRouter>
                <SingleWeek
                    id='1'
                    number='2'
                    mood='Happy'
                    moments='3'
                    clickHandler={mockClickHandler}
                />
            </BrowserRouter>);

        expect(document.getElementsByClassName('text-center row-single-week')[0]).toBeTruthy();

        fireEvent.click(document.getElementsByClassName('btn btn-danger')[0]);
        await waitFor(() => document.getElementsByClassName('btn btn-danger')[0]);

        expect(document.getElementsByClassName('text-center row-single-week')[0]).toBeTruthy();
        expect(mockClickHandler).toHaveBeenCalled();
    });

    it('should not call remove click handler', async () => {
        weeksService.remove.mockResolvedValue({ status: 400 });
        var mockClickHandler = jest.fn();

        render(
            <BrowserRouter>
                <SingleWeek
                    id='1'
                    number='2'
                    mood='Happy'
                    moments='3'
                    clickHandler={mockClickHandler}
                />
            </BrowserRouter>);

        expect(document.getElementsByClassName('text-center row-single-week')[0]).toBeTruthy();

        fireEvent.click(document.getElementsByClassName('btn btn-danger')[0]);
        await waitFor(() => document.getElementsByClassName('btn btn-danger')[0]);

        expect(document.getElementsByClassName('text-center row-single-week')[0]).toBeTruthy();
        expect(mockClickHandler).not.toHaveBeenCalled();
    });
});