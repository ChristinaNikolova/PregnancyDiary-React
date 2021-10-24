import { render, act, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SeeBaby from "./SeeBaby";
import * as authService from '../../../services/authService';
import * as babiesService from '../../../services/babiesService';

jest.mock('../../../services/authService');
jest.mock('../../../services/babiesService');

describe('SeeBaby Component', () => {
    it('should render the component', () => {
        render(
            <BrowserRouter>
                <SeeBaby />
            </BrowserRouter>
        );

        expect(document.getElementsByClassName('baby-wrapper')[0]).toBeTruthy();
        expect(document.getElementsByTagName('h3')[0].textContent).toBe('Baby is Born!');
        expect(document.getElementsByClassName('btn btn-danger')[0]).toBeTruthy();
        expect(document.getElementsByClassName('btn btn-danger')[0].textContent).toBe('Delete');
    });

    it('should get details for the baby', async () => {
        authService.isAuthenticated.mockResolvedValue(true);
        babiesService.getDetails.mockResolvedValue({
            id: 1,
            name: 'Pesho',
            genderAsString: 'boy',
            formattedBirthDate: '12.12.2020',
            birthTime: '13:05',
            height: 50.12,
            weight: 3600,
            picture: 'No Pic'
        });

        await act(async () => {
            render(
                <BrowserRouter>
                    <SeeBaby
                        diaryId='12'
                    />
                </BrowserRouter>
            );
        });

        expect(document.getElementsByClassName('baby-wrapper')[0]).toBeTruthy();
        expect(document.getElementsByTagName('h4')[0].textContent).toBe('Welcome, Pesho!');
        expect(document.getElementsByTagName('a')[0].textContent).toBe('Update');
        expect(document.getElementsByTagName('a')[0].getAttribute('href')).toBe('/diary/baby/update/1/12');
        expect(document.getElementsByClassName('btn btn-danger')[0].textContent).toBe('Delete');
        expect(document.getElementsByClassName('row')[0]).toBeTruthy();
        expect(document.getElementsByClassName('col-md-6').length).toBe(6);
        expect(document.getElementsByClassName('col-md-6')[0].textContent).toBe(' Name: Pesho');
        expect(document.getElementsByClassName('col-md-6')[1].textContent).toBe(' Gender: boy');
        expect(document.getElementsByClassName('fas fa-heart female')[0]).toBeFalsy();
        expect(document.getElementsByClassName('fas fa-heart male')[0]).toBeTruthy();
        expect(document.getElementsByClassName('col-md-6')[2].textContent).toBe(' Birth Date: 12.12.2020');
        expect(document.getElementsByClassName('col-md-6')[3].textContent).toBe(' Birth Time: 13:05');
        expect(document.getElementsByClassName('col-md-6')[4].textContent).toBe(' Weight: 3600 gr');
        expect(document.getElementsByClassName('col-md-6')[5].textContent).toBe(' Height: 50.12 mm');
        expect(document.getElementsByClassName('baby-born-pic')[0].getAttribute('src')).toBe('No Pic');
    });

    // it('should not get details for the baby', async () => {
    //     authService.isAuthenticated.mockResolvedValue(true);
    //     const t = babiesService.getDetails.mockResolvedValue(() => { throw new Error("Something went wrong.") } );
    //     expect(t).toThrow('Something went wrong.');
    // });

    it('should call remove click handler', async () => {
        authService.isAuthenticated.mockResolvedValue(true);
        babiesService.getDetails.mockResolvedValue({
            id: 1,
            name: 'Pesho',
            genderAsString: 'boy',
            formattedBirthDate: '12.12.2020',
            birthTime: '13:05',
            height: 50.12,
            weight: 3600,
            picture: 'No Pic'
        });

        babiesService.remove.mockResolvedValue({ status: 200 });
        const mockClickHandler = jest.fn();

        await act(async () => {
            render(
                <BrowserRouter>
                    <SeeBaby
                        diaryId='12'
                        clickHandler={mockClickHandler}
                    />
                </BrowserRouter>
            );
        });

        expect(document.getElementsByClassName('baby-wrapper')[0]).toBeTruthy();
        expect(mockClickHandler).not.toHaveBeenCalled();

        fireEvent.click(document.getElementsByClassName('btn btn-danger')[0]);
        await waitFor(() => document.getElementsByClassName('btn btn-danger')[0]);
        expect(mockClickHandler).toHaveBeenCalled();
    });

    it('should not call remove click handler', async () => {
        authService.isAuthenticated.mockResolvedValue(true);
        babiesService.getDetails.mockResolvedValue({
            id: 1,
            name: 'Pesho',
            genderAsString: 'boy',
            formattedBirthDate: '12.12.2020',
            birthTime: '13:05',
            height: 50.12,
            weight: 3600,
            picture: 'No Pic'
        });

        babiesService.remove.mockResolvedValue({ status: 400 });
        const mockClickHandler = jest.fn();

        await act(async () => {
            render(
                <BrowserRouter>
                    <SeeBaby
                        diaryId='12'
                        clickHandler={mockClickHandler}
                    />
                </BrowserRouter>
            );
        });

        expect(document.getElementsByClassName('baby-wrapper')[0]).toBeTruthy();
        expect(mockClickHandler).not.toHaveBeenCalled();

        fireEvent.click(document.getElementsByClassName('btn btn-danger')[0]);
        await waitFor(() => document.getElementsByClassName('btn btn-danger')[0]);
        expect(mockClickHandler).not.toHaveBeenCalled();
    });
});