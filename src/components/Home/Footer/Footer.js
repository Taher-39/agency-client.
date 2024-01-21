// import navLogo from '../../../assets/logos/logo.png';
import { Link } from 'react-router-dom';

const Footer = () => {
    const handleLinkClick = () => {

        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }

    };

    const handleServiceClick = (sectionId) => {
        const serviceSection = document.getElementById('services');
        if (serviceSection) {
            serviceSection.scrollIntoView({ behavior: 'smooth' });
        }
    };


    return (
        <footer className='footer pt-5 mt-5'>
            <div className="container footer-content py-5">
                <div className="row">
                    <div className='col-sm-4'>
                        <h1 className='text-2xl font-normal pb-3'>Quick Links</h1>
                        <ul className='text-gray-400 '>
                            <li >
                                <Link to='/about' className='text-light text-decoration-none' >About</Link>
                            </li>
                            <li>
                                <Link onClick={handleLinkClick} to='/#contact' className='text-light text-decoration-none' >Advertise</Link>
                            </li>
                            <li>
                                <Link to='/faqs' className='text-light text-decoration-none' >FAQs</Link>
                            </li>
                            {/*<li>
                                <Link to='/cooking-policy' className='text-light' >Cooking Policy</Link>
                            </li>
                             <li>
                                <Link to='/terms-and-conditions' className='text-light' >Terms and Conditions</Link>
                            </li>
                            <li>
                                <Link to='/privacy-policy' className='text-light' >Privacy Policy</Link>
                            </li> */}
                        </ul>
                    </div>
                    <div className="col-sm-4">
                        <h1 className='text-2xl font-normal pb-3'>Service Category</h1>
                        <ul className='text-gray-400'>
                            <li>
                                <Link to='/#services' onClick={handleServiceClick} className='text-light' style={{ textDecoration: 'none' }}>Web Development</Link>
                            </li>
                            <li>
                                <Link to='/#services' onClick={handleServiceClick} className='text-light' style={{ textDecoration: 'none' }}>Graphics Design</Link>
                            </li>
                            <li>
                                <Link to='/#services' onClick={handleServiceClick} className='text-light' style={{ textDecoration: 'none' }}>Video Editing</Link>
                            </li>
                            {/* <li>
                                <Link to='/#services' onClick={handleServiceClick} className='text-light' style={{ textDecoration: 'none' }}>App Develop</Link>
                            </li>
                            <li>
                                <Link to='/#services' onClick={handleServiceClick} className='text-light' style={{ textDecoration: 'none' }}>Content Writting</Link>
                            </li>
                            <li>
                                <Link to='/#services' onClick={handleServiceClick} className='text-light' style={{ textDecoration: 'none' }}>SEO</Link>
                            </li> */}
                        </ul>

                    </div>
                    <div className='col-sm-4'>
                        <h1 className='text-2xl font-normal pb-3'>Contact Us</h1>
                        <ul className='text-gray-400'>

                            <li>
                                <Link to='/our-teams' className='text-light' style={{ textDecoration: 'none' }}>Member Services</Link>
                            </li>
                            <li>
                                <Link onClick={handleLinkClick} to="/#contact" className='text-light' style={{ textDecoration: 'none' }}>Advertise with Us</Link>
                            </li>
                            <li>
                                <Link to='/join-us' className='text-light' style={{ textDecoration: 'none' }}>Careers</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='text-center pt-5 footer-bottom'>
                    <p className='text-center text-light'>Build & design By <span style={{ color: 'tomato' }}> &copy; Abu Taher</span></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;