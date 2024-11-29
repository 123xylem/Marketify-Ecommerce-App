import ContactForm from "../components/forms/ContactForm";
import PageBanner from "../components/PageBanner";

const ContactPage = () => {
  return (
    <>
      <PageBanner
        title={"Contact Us"}
        bgColor="black"
        text={
          "Any issues with our products or service please contact us at info@marketify.com or use the form below"
        }
        textColor={"white"}
      />
      <div className="contact-container flex justify-center items-center flex-col">
        <ContactForm />
      </div>
    </>
  );
};

export default ContactPage;
