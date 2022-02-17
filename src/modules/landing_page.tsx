import {Link} from "react-router-dom";
import FadeIn from 'react-fade-in';

export const KvazarLandingPage:React.FC = () => {
    const usedTechnologyList = [
        {name:"NodeJS", description:"A JavaScript runtime environment"},
        {name:"Express", description:"A back end web application framework"},
        {name:"MongoDB", description:"A cross-platform document-oriented database program"},
        {name:"ReactJS", description:"A JavaScript Library"},
        {name:"Typescript", description:"A strict syntactical programming language"},
        {name:"Bootstrap", description:"Open-source CSS framework"},
        {name:"Sass", description:"Preprocessor Scripting Language"},
    ]
    return (
        <section className="landing_page_section">
            <FadeIn>
            <header className="header">
                <img className="main_logo" src={`${process.env.PUBLIC_URL}/media/Kvazar_logo.svg`}/>
                <h1 className="main_name">Kvazar</h1>
            </header>
            <article className="center_text description_section">
                <h2 className="section_title">About</h2>
                <p className="description">Self hosted image/screenshot sharing application project written with React</p>
                <p className="description">Web application for ability to uplaod images and display them on the screen and store them into data base.</p>
                {/* <section className="future_updates_section">
                    <h4 style={{fontWeight:700}}>Future updates</h4>
                </section> */}
            </article>
            <section className="center_text technology_section">
                <h2 className="section_title">Technologies used</h2>
                <ul className="texhnology_list">
                    {
                        usedTechnologyList.map(item=>{
                            const {name, description} = item
                            return (
                                <li className="technology_item">
                                    <img className="technology_image" src={`${process.env.PUBLIC_URL}/media/${name}_logo.svg`} alt={name} />
                                    <span className="technology_name">{name}</span>
                                </li>
                            )
                        })
                    }
                </ul>
            </section>
            <section className="redirect_section">
                <Link to="/">
                    <input type="submit" value="Go to application"/>
                </Link>
            </section>
            </FadeIn>
        </section>
    )
}