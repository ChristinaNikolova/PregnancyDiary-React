function AdminFormWrapper({ title }) {
    return (
        <div className="row space-top">
            <div className="col-md-12">
                <h1 className="custom-font p-2 text-center">{title}</h1>
                <hr />
            </div>
        </div>
    );
}

export default AdminFormWrapper;