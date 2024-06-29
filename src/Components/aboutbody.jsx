import React, { useState, useEffect } from 'react';

function AboutBody({ cartHandler }) {
    const str = localStorage.getItem("cartBooks");
    const [cart, setCart] = useState(JSON.parse(str) || []);

    useEffect(() => {
        cartHandler(cart);
        localStorage.setItem("cartBooks", JSON.stringify(cart));
    }, [cart]);

    return (
        <div className='about_body container mx-auto p-6'>
            <h1 className="text-4xl font-bold text-center mb-8 text-secondary">How We Started</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="text-content space-y-6">
                    <p className="text-paragraph text-lg">
                        At our core, we are driven by a passion for knowledge and a commitment to
                        excellence. We believe in creating meaningful connections and empowering
                        individuals through education. With a focus on innovation and inclusivity,
                        we strive to make learning accessible to everyone, fostering a community
                        where ideas flourish and aspirations take flight. Together, we are building
                        a brighter future, one step at a time.
                    </p>
                    <p className="text-paragraph text-lg">
                        Founded in [Year], our journey began with a small team of dedicated professionals
                        who shared a common vision: to revolutionize the way people learn and grow. Over
                        the years, we have expanded our reach, offering a diverse range of products and
                        services that cater to learners of all ages and backgrounds. Our platform is designed
                        to provide personalized learning experiences, helping users achieve their goals and
                        unlock their full potential.
                    </p>
                    <p className="text-paragraph text-lg">
                        Our team comprises experts from various fields, including educators, technologists,
                        and creatives, all working together to create engaging and effective educational
                        content. We are constantly exploring new technologies and methodologies to enhance
                        our offerings and ensure that our users have access to the best resources available.
                    </p>
                </div>
                <div className="image-content flex flex-col justify-evenly">
                    <img className="w-full h-64 object-cover rounded-lg shadow-md" src="https://as2.ftcdn.net/v2/jpg/02/14/49/77/1000_F_214497736_HB3R4BZr5wu0VsrifKjMVeiYD2UNiJWp.jpg" alt="Education" />
                    <img className="w-full h-64 object-cover rounded-lg shadow-md" src="https://as1.ftcdn.net/v2/jpg/05/01/37/50/1000_F_501375039_FeHfpvMBP0Q1UdSD5vbJ0dNzFg3agJYK.jpg" alt="Community" />
                </div>
            </div>
            <div className="mt-8 space-y-6">
                <h2 className="text-3xl font-bold text-secondary">Our Mission</h2>
                <p className="text-paragraph text-lg">
                    Our mission is to democratize education by making high-quality learning resources
                    accessible to everyone, regardless of their background or circumstances. We believe
                    that education is a powerful tool for personal and societal growth, and we are
                    committed to breaking down barriers and creating opportunities for all.
                </p>
                <h2 className="text-3xl font-bold text-secondary">Our Values</h2>
                <ul className="list-disc list-inside text-paragraph text-lg space-y-2">
                    <li><span className="text-primary font-bold text-lg">Innovation:</span> We embrace new ideas and technologies to stay at the forefront of the education industry.</li>
                    <li><span className="text-primary font-bold text-lg">Inclusivity:</span> We are dedicated to creating an inclusive environment that respects and values diversity.</li>
                    <li><span className="text-primary font-bold text-lg">Integrity:</span> We operate with honesty and transparency, building trust with our users and partners.</li>
                    <li><span className="text-primary font-bold text-lg">Excellence:</span> We strive for excellence in everything we do, continuously improving our products and services.</li>
                    <li><span className="text-primary font-bold text-lg" >Community:</span> We foster a sense of community, encouraging collaboration and mutual support among our users.</li>
                </ul>
                <h2 className="text-3xl font-bold text-secondary">Join Us</h2>
                <p className="text-paragraph text-lg">
                    We are always looking for passionate individuals to join our team and help us achieve our mission.
                    Whether you are an educator, a technologist, or simply someone who loves learning, we invite you
                    to be a part of our journey. Together, we can make a difference and create a brighter future for all.
                </p>
            </div>
        </div>
    );
}

export default AboutBody;
