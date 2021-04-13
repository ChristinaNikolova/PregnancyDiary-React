import './Footer.css';

function Footer() {
    return (
        <div className="row custom-footer">
            <div className="col-md-12 text-center">Pregnancy-Diary&copy; - {new Date().getFullYear()}</div>
        </div>
    );
}

export default Footer;