import { render } from '@testing-library/react'
import Footer from "./Footer";

describe('Footer Component', () => {
    it('should render the component', () => {
        render(<Footer />);
        expect(document.getElementsByClassName('col-md-12 m-4 text-center')[0].innerHTML).toBe(`Pregnancy-Diary© - ${new Date().getFullYear()}`);
    });
});