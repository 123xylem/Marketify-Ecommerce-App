/* eslint-disable react/prop-types */

const PageBanner = ({
  title = false,
  text = false,
  bgImg = false,
  bgColor = "black",
  textColor = false,
}) => {
  return (
    <div
      style={bgImg ? { backgroundImage: `url(${bgImg})` } : {}}
      className={`flex w-full flex-col  -mt-8 bg-${bgColor}  mb-4   justify-center page-banner w-screen py-2 -ml-4 sm:-ml-0 sm:w-full sm:py-4`}
    >
      <div
        className={`inner flex flex-col gap-4 text-center mx-auto p-4 flex-wrap `}
      >
        <h1
          className={`font-bold text-xl ${textColor ? "text-" + textColor : "text-white"}`}
        >
          {title}
        </h1>
        {text ? <p className={`text-${textColor} `}>{text}</p> : ""}
      </div>
    </div>
  );
};

export default PageBanner;
