export const SubmitImagePage = () => {
    const red = (e:any) => {
        console.log(e.target.value);
    }
    return (
        <section>
            <form style={{marginTop:100}} action="/images" encType="multipart/form-data" method="post">
                <div className="form-group">
                    <input type="file" className="form-control-file" name="uploaded_file"/>
                    <input type="text" className="form-control" placeholder="Number of speakers" name="nspeakers"/>
                    <input type="submit" value="Get me the stats!" className="btn btn-default"/>            
                </div>
            </form>
        </section>
    )
}