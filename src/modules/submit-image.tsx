export const SubmitImagePage = () => {
    const red = (e:any) => {
        console.log(e.target.value);
    }
    return (
        <section className="page-container submit-image-page-container">
            <form className="submit-image-form">
                    <input type="file" className="form-control"name="uploaded_file"/>
                    <input type="text" className="form-control" placeholder="Title"/>
                    <input type="text" className="form-control" placeholder="Description"/>
                    <input type="submit" value="Submit" className="btn btn-default" disabled/>            
            </form>
        </section>
    )
}