import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NotFound from "./NotFound";

describe('NotFound Component', () => {
    it('should render the component', () => {
        render(
            <BrowserRouter>
                <NotFound />
            </BrowserRouter>
        );

        expect(document.getElementsByClassName('not-found-wrapper')[0]).toBeTruthy();
        expect(document.getElementsByTagName('img')[0].getAttribute('src')).toBe('./koala-and-mama-malta-babywearing-404-page-not-found.png');
        expect(document.getElementsByClassName('msg')[0].textContent)
        .toBe('Maybe this page moved? Got deleted? Is hiding out in quarantine? Never existed in the first place?Let\'s go home and try from there.');
        expect(document.getElementsByTagName('a').length).toBe(1);
        expect(document.getElementsByTagName('a')[0].getAttribute('href')).toBe('/');
        expect(document.getElementsByTagName('a')[0].textContent).toBe('home');
    });
});