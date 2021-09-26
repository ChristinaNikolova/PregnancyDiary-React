import { render, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom';
import UserDiaryRow from "./UserDiaryRow";
import * as diariesService from '../../../services/diariesService';

jest.mock('../../../services/diariesService');

describe('UserDiaryRow Component', () => {
    it('should render the component with known gender', () => {
        render(
            <BrowserRouter>
                <UserDiaryRow
                    id='1'
                    positiveTest='20.12.2020'
                    dueDate='20.12.2021'
                    gender='Girl'
                    weeks='4' />
            </BrowserRouter>);

        expect(document.getElementsByClassName('td-positive-test')[0].textContent).toBe('20.12.2020');
        expect(document.getElementsByClassName('td-due-test')[0].textContent).toBe('20.12.2021');
        expect(document.getElementsByClassName('td-gender')[0].textContent).toBe('Girl');
        expect(document.getElementsByClassName('td-unknown-gender')[0]).toBeUndefined();
        expect(document.getElementsByClassName('td-weeks')[0].textContent).toBe('4');
    });

    it('should render the component with unknown gender', () => {
        render(
            <BrowserRouter>
                <UserDiaryRow
                    id='1'
                    positiveTest='20.12.2020'
                    dueDate='20.12.2021'
                    gender='DontKnow'
                    weeks='4' />
            </BrowserRouter>);

        expect(document.getElementsByClassName('td-positive-test')[0].textContent).toBe('20.12.2020');
        expect(document.getElementsByClassName('td-due-test')[0].textContent).toBe('20.12.2021');
        expect(document.getElementsByClassName('td-gender')[0]).toBeUndefined();
        expect(document.getElementsByClassName('td-unknown-gender')[0].textContent).toBe("I don't know yet");
        expect(document.getElementsByClassName('td-weeks')[0].textContent).toBe('4');
    });

    it('should call remove click handler', async () => {
        diariesService.remove.mockResolvedValue({ status: 200 });
        const mockClickHandler = jest.fn();

        render(
            <BrowserRouter>
                <UserDiaryRow
                    id='1'
                    positiveTest='20.12.2020'
                    dueDate='20.12.2021'
                    gender='Girl'
                    weeks='4'
                    clickHandler={mockClickHandler} />
            </BrowserRouter>);

        expect(document.getElementsByTagName('tr')[0]).toBeTruthy();

        fireEvent.click(document.getElementsByClassName('btn btn-danger')[0]);
        await waitFor(() => document.getElementsByClassName('btn btn-danger')[0]);

        expect(document.getElementsByTagName('tr')[0]).toBeTruthy();
        expect(mockClickHandler).toHaveBeenCalled();
    });

    it('should not call remove click handler', async () => {
        diariesService.remove.mockResolvedValue({ status: 400 });
        const mockClickHandler = jest.fn();

        render(
            <BrowserRouter>
                <UserDiaryRow
                    id='1'
                    positiveTest='20.12.2020'
                    dueDate='20.12.2021'
                    gender='Girl'
                    weeks='4'
                    clickHandler={mockClickHandler} />
            </BrowserRouter>);

        expect(document.getElementsByTagName('tr')[0]).toBeTruthy();

        fireEvent.click(document.getElementsByClassName('btn btn-danger')[0]);
        await waitFor(() => document.getElementsByClassName('btn btn-danger')[0]);

        expect(document.getElementsByTagName('tr')[0]).toBeTruthy();
        expect(mockClickHandler).not.toHaveBeenCalled();
    });
});