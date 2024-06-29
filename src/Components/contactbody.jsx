import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";

function ContactBody({ cartHandler }) {
    const str = localStorage.getItem("cartBooks");
    const [cart, setCart] = useState(JSON.parse(str) || []);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        cartHandler(cart);
        localStorage.setItem("cartBooks", JSON.stringify(cart));
    }, [cart]);

    const onSubmit = data => {
        setFormData(data);
        setModalIsOpen(true);
    };

    const handleSendOption = (option) => {
        setModalIsOpen(false);
        const messageBody = `hello my name is ${formData.firstName, formData.lastName} and I would like to ask about ${formData.topic} AMessage: ${formData.message}`;

        if (option === "whatsapp") {
            window.open(`https://wa.me/96176795291?text=${encodeURIComponent(messageBody)}`, '_blank');
        } else if (option === "email") {
            window.open(`mailto:hadikbb76917223@gmail.com?subject=${encodeURIComponent(formData.topic)}&body=${encodeURIComponent(formData.message)}`, '_blank');
        }
    };

    const handlePhoneCall = () => {
        window.open('tel:+96176795291');
    };

    return (
        <div>
            <h1 className="text-primary font-bold text-2xl text-center p-4">Interested in our services? Please get in touch, and we’ll be glad to help.</h1>
            <div className="flex flex-col md:flex-row justify-between">
                <div className="w-full md:w-1/2 flex flex-col items-start md:items-center">
                    <h1 className="text-secondary font-bold text-2xl text-center p-4">Contact Information</h1>
                    <div className="w-full md:w-1/2 px-4 flex items-center justify-between">
                        <div className="flex flex-col justify-evenly h-96 mb-8">
                            <p className="text-paragraph text-lg mb-2">Get in touch and let us know how we can help.</p>
                            <p className="text-paragraph text-lg mb-2 cursor-pointer" onClick={handlePhoneCall}>
                                <span className="text-secondary font-bold ">
                                    Phone:
                                </span>
                                +961 76795291
                            </p>
                            <p className="text-paragraph text-lg mb-2 cursor-pointer" onClick={() => window.open('mailto:hadikbb76917223@gmail.com', '_blank')}>
                                <span className="text-secondary font-bold" >
                                    Email:
                                </span>
                                hadikbb76917223@gmail.com
                            </p>
                            <p className="text-paragraph text-lg mb-2">
                                <span className="text-secondary font-bold">
                                    Address:
                                </span>
                                Lebanon, Morocco
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2">
                    <h1 className="text-secondary font-bold text-2xl text-center p-4">Contact Form</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col max-w-lg mx-auto p-4">
                        <div className="flex flex-col sm:flex-row mb-4">
                            <div className="w-full sm:w-1/2 sm:pr-2 my-4">
                                <label htmlFor="firstName" className="mb-2 font-semibold text-secondary">First Name</label>
                                <input
                                    className="mb-2 p-2 border rounded"
                                    id="firstName"
                                    {...register("firstName", { required: "First Name is required" })}
                                />
                                {errors.firstName && <p className="text-red-600 text-sm">{errors.firstName.message}</p>}
                            </div>
                            <div className="w-full sm:w-1/2 sm:pl-2 my-4">
                                <label htmlFor="lastName" className="mb-2 font-semibold text-secondary">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    className="mb-2 p-2 border rounded"
                                    {...register("lastName", { required: "Last Name is required" })}
                                />
                                {errors.lastName && <p className="text-red-600 text-sm">{errors.lastName.message}</p>}
                            </div>
                        </div>
                        <div className="mb-4 flex flex-col">
                            <label htmlFor="email" className="mb-2 font-semibold text-secondary">Email</label>
                            <input
                                type="email"
                                className="mb-2 p-2 border rounded"
                                id="email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                            />
                            {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
                        </div>
                        <div className="mb-4 flex flex-col">
                            <label htmlFor="topic" className="mb-2 font-semibold text-secondary">Topic</label>
                            <input
                                className="mb-2 p-2 border rounded"
                                id="topic"
                                {...register("topic", { required: "Topic is required" })}
                            />
                            {errors.topic && <p className="text-red-600 text-sm">{errors.topic.message}</p>}
                        </div>
                        <div className="mb-4 flex flex-col">
                            <label htmlFor="message" className="mb-2 font-semibold text-secondary">Message</label>
                            <textarea
                                className="mb-2 p-2 border rounded h-32 resize-none"
                                id="message"
                                {...register("message", { required: "Message is required" })}
                            />
                            {errors.message && <p className="text-red-600 text-sm">{errors.message.message}</p>}
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" className="p-2 bg-primary text-white rounded hover:bg-blue-500 mx-2 w-20">
                                Send
                            </button>
                            <button type="rest" onClick={() => reset()} className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600 mx-2 w-20">
                                Reset
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => {
                    setModalIsOpen(false);
                    reset();
                }}
                contentLabel="Send Options"
                className="flex justify-center items-center p-4"
            >
                <div className="bg-white p-4 rounded shadow-lg">
                    <h2 className="text-xl font-bold mb-4">Send Message Via</h2>
                    <button
                        onClick={() => handleSendOption("whatsapp")}
                        className="mb-2 p-2 bg-green-500 text-white rounded w-full hover:bg-green-600"
                    >
                        WhatsApp
                    </button>
                    <button
                        onClick={() => handleSendOption("email")}
                        className="mb-2 p-2 bg-blue-500 text-white rounded w-full hover:bg-blue-600"
                    >
                        Email
                    </button>
                    <button
                        onClick={() => setModalIsOpen(false)}
                        className="p-2 bg-gray-500 text-white rounded w-full hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                </div>
            </Modal>
        </div>
    );
}

export default ContactBody;
