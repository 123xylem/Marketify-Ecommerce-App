import ContactForm from "../components/forms/ContactForm";
import PageBanner from "../components/PageBanner";

const ContactPage = () => {
  return (
    <>
      <div className="contact-container flex flex-col">
        <PageBanner
          title={"Contact Us"}
          bgColor="black"
          text={
            "Any issues with our products or service please contact us at info@marketify.com or use the form below"
          }
          textColor={"white"}
        />

        {/* <h1 className="font-bold text-xl text-black">Contact Us</h1> */}
        <p className=""></p>
        <ContactForm />
      </div>
    </>
  );
};

export default ContactPage;
