import { Link } from 'react-router-dom';

function AboutUs() {
    return (
        <div className="flex justify-center items-center h-80 bg_linear my-10 py-5">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">About Us</h2>
                <p className="text-lg text-paragraph mb-8">
                    At our core, we are driven by a passion for knowledge and a commitment to excellence. We believe in creating meaningful connections and empowering individuals through education. With a focus on innovation and inclusivity, we strive to make learning accessible to everyone, fostering a community where ideas flourish and aspirations take flight. Together, we are building a brighter future, one step at a time.
                </p>
                <Link
                    to="/about"
                    className="bg-primary text-white hover:bg-secondary py-3 px-6 rounded-lg font-semibold transition duration-300"
                >
                    Learn More
                </Link>
            </div>
        </div>
    );
}

export default AboutUs;
