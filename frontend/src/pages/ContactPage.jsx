import ContactForm from "../components/forms/ContactForm";
const ContactPage = () => {
  return (
    <>
      <div className="contact-container flex flex-col">
        <h1 className="font-bold text-xl text-black">Contact Us</h1>
        <p className="">
          Any issues with our products or service please contact us at
          info@marketify.com or use the form below
        </p>
        <ContactForm />
      </div>
    </>
  );
};

export default ContactPage;
