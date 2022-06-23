import {Link} from 'react-router-dom';
import FadeIn from 'react-fade-in';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

export const KvazarLandingPage:React.FC = () => {
    const usedTechnologyList = [
        {name:'NodeJS', description:'A JavaScript runtime environment'},
        {name:'Express', description:'A back end web application framework'},
        {name:'MongoDB', description:'A cross-platform document-oriented database program'},
        {name:'ReactJS', description:'A JavaScript Library'},
        {name:'Typescript', description:'A strict syntactical programming language'},
        {name:'Bootstrap', description:'Open-source CSS framework'},
        {name:'Sass', description:'Preprocessor Scripting Language'},
    ]
    return (
        <section className='landing_page_section'>
            <FadeIn>
            <article className='text-start description_section'>
                <h2 className='text-center section_title'>About</h2>
                <p className='text-center description'>Self-hosted image-sharing application with the following functions:</p>
                <p className='description'><FontAwesomeIcon className='ms-4 me-2' icon={faCircle} size='xs'/>  Register an account.</p>
                <p className='description'><FontAwesomeIcon className='ms-4 me-2' icon={faCircle} size='xs'/>  MongoDB is used to store user data. </p>
                <p className='description'>
                            <FontAwesomeIcon className='ms-4 me-2' icon={faCircle} size='xs'/>
                            <span>
                                User data includes fictional user names, real user names, 
                                an account visibility management tool, a list of images 
                                uploaded by the user, and an email and password.
                            </span>
                </p>
                <p className='description'>
                            <FontAwesomeIcon className='ms-4 me-2' icon={faCircle} size='xs'/>  Users can upload any images from their PCs/ Notebooks. 
                            High-resolution images are not recommended, choose the 
                            title and description for an uploaded image. Once the image 
                            is uploaded and every required field is completed a user 
                            click submit button to add an image to their collection. 
                            No verification or image review by super-admin is implemented. 
                            A user has an option to delete his/her images.
                </p>
            </article>
            <section className='center_text technology_section'>
                <h2 className='section_title'>Technologies used</h2>
                <ul className='texhnology_list'>
                    {
                        usedTechnologyList.map(item=>{
                            const {name, description} = item
                            return (
                                <li className='technology_item'>
                                    <img className='technology_image' src={`${process.env.PUBLIC_URL}/media/${name}_logo.svg`} alt={name} />
                                    <span className='technology_name'>{name}</span>
                                </li>
                            )
                        })
                    }
                </ul>
            </section>
            <section className='redirect_section'>
                <Link to='/'>
                    <button type='submit' className='btn btn-primary w-100'>Go to application</button>
                </Link>
            </section>
            </FadeIn>
        </section>
    )
}