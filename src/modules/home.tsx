export const HomePage:React.FC = () => {
    const imageGallery = [
        {name:"image name", user:"username", image_link:"#"},
        {name:"image name", user:"username", image_link:"#"},
        {name:"image name", user:"username", image_link:"#"},
        {name:"image name", user:"username", image_link:"#"},
        {name:"image name", user:"username", image_link:"#"},
        {name:"image name", user:"username", image_link:"#"},
        {name:"image name", user:"username", image_link:"#"},
        {name:"image name", user:"username", image_link:"#"},
        {name:"image name", user:"username", image_link:"#"},
        {name:"image name", user:"username", image_link:"#"}
    ]
    return (
        <section>
            <section>
                {
                    imageGallery.map(item=>{
                        return <article>
                            <img src={item.image_link} alt={item.name}/>
                            <h3>{item.name}</h3>
                            <p>{item.user}</p>
                        </article>
                    })
                }
            </section>
        </section>
    )
}