import React, { useState } from "react";

const PayShippingForm = () => {
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    address: "",
    postalCode: "",
    country: "",
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cvv: "",
    expiryDate: "",
    cardName: "",
  });

  const [fullNameError, setFullNameError] = useState(false);
  const [fullNameErrorMessage, setFullNameErrorMessage] = useState("");

  const [addressError, setAddressError] = useState(false);
  const [addressErrorMessage, setAddressErrorMessage] = useState("");

  const [postalCodeError, setPostalCodeError] = useState(false);
  const [postalCodeErrorMessage, setPostalCodeErrorMessage] = useState("");

  const [countryError, setCountryError] = useState(false);
  const [countryErrorMessage, setCountryErrorMessage] = useState("");

  const [cardNameError, setCardNameError] = useState(false);
  const [cardNameErrorMessage, setCardNameErrorMessage] = useState("");

  const [cardNumberError, setCardNumberError] = useState(false);
  const [cardNumberErrorMessage, setCardNumberErrorMessage] = useState("");

  const [expiryDateError, setExpiryDateError] = useState(false);
  const [expiryDateErrorMessage, setExpiryDateErrorMessage] = useState("");

  const [cvvError, setCvvError] = useState(false);
  const [cvvErrorMessage, setCvvErrorMessage] = useState("");

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo((prevVal) => ({ ...prevVal, [name]: value }));
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prevVal) => ({ ...prevVal, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //call payment API
    console.log("PAYED");
  };
  const validateInputs = (e) => {
    e.preventDefault(); // Prevent form submission by default

    // Get form field values from state
    const { fullName, address, postalCode, country } = shippingInfo;
    const { cardName, cardNumber, expiryDate, cvv } = paymentInfo;

    let isValid = true;

    // Full Name validation
    if (!fullName || fullName.length < 3) {
      setFullNameError(true);
      setFullNameErrorMessage("Full name must be at least 3 characters long.");
      isValid = false;
    } else {
      setFullNameError(false);
      setFullNameErrorMessage("");
    }

    // Address validation
    if (!address || address.length < 5) {
      setAddressError(true);
      setAddressErrorMessage("Address must be at least 5 characters long.");
      isValid = false;
    } else {
      setAddressError(false);
      setAddressErrorMessage("");
    }

    // Postal Code validation
    if (!postalCode || postalCode.length < 3) {
      setPostalCodeError(true);
      setPostalCodeErrorMessage("Please enter a valid postal code.");
      isValid = false;
    } else {
      setPostalCodeError(false);
      setPostalCodeErrorMessage("");
    }

    // Country validation
    if (!country) {
      setCountryError(true);
      setCountryErrorMessage("Country is required.");
      isValid = false;
    } else {
      setCountryError(false);
      setCountryErrorMessage("");
    }

    // Payment Info validations
    // Card Name validation
    if (!cardName || cardName.length < 2) {
      setCardNameError(true);
      setCardNameErrorMessage(
        "Cardholder name must be at least 2 characters long."
      );
      isValid = false;
    } else {
      setCardNameError(false);
      setCardNameErrorMessage("");
    }

    // Card Number validation
    if (!cardNumber || !/^\d{16}$/.test(cardNumber)) {
      setCardNumberError(true);
      setCardNumberErrorMessage("Please enter a valid 16-digit card number.");
      isValid = false;
    } else {
      setCardNumberError(false);
      setCardNumberErrorMessage("");
    }

    // Expiry Date validation
    if (
      !expiryDate ||
      !/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/.test(expiryDate)
    ) {
      setExpiryDateError(true);
      setExpiryDateErrorMessage("Please enter a valid expiry date (MM/YY).");
      isValid = false;
    } else {
      setExpiryDateError(false);
      setExpiryDateErrorMessage("");
    }

    // CVV validation
    if (!cvv || !/^\d{3,4}$/.test(cvv)) {
      setCvvError(true);
      setCvvErrorMessage("CVV must be 3 or 4 digits long.");
      isValid = false;
    } else {
      setCvvError(false);
      setCvvErrorMessage("");
    }

    // Only call handleSubmit if all inputs are valid
    if (isValid) {
      handleSubmit(e);
    }
  };

  return (
    <>
      <div className="container">
        <h1>Payment and Shipping</h1>

        <form onSubmit={validateInputs}>
          <input
            type="text"
            value={shippingInfo.fullName}
            onChange={(e) =>
              setShippingInfo({ ...shippingInfo, fullName: e.target.value })
            }
            placeholder="Full Name"
            required
          />
          {fullNameError && <span>{fullNameErrorMessage}</span>}

          <input
            type="text"
            value={shippingInfo.address}
            onChange={(e) =>
              setShippingInfo({ ...shippingInfo, address: e.target.value })
            }
            placeholder="Address"
            required
          />
          {addressError && <span>{addressErrorMessage}</span>}

          <input
            type="text"
            value={shippingInfo.postalCode}
            onChange={(e) =>
              setShippingInfo({ ...shippingInfo, postalCode: e.target.value })
            }
            placeholder="Postal Code"
            required
          />
          {postalCodeError && <span>{postalCodeErrorMessage}</span>}

          <select
            value={shippingInfo.country}
            onChange={(e) =>
              setShippingInfo({ ...shippingInfo, country: e.target.value })
            }
            required
          >
            <option value="">Select Country</option>
            <option value="US">United States</option>
            <option value="UK">United Kingdom</option>
            <option value="IE">Ireland</option>
            <option value="CA">Canada</option>
            <option value="BR">Brazil</option>
          </select>
          {countryError && <span>{countryErrorMessage}</span>}

          <input
            type="text"
            value={paymentInfo.cardName}
            onChange={(e) =>
              setPaymentInfo({ ...paymentInfo, cardName: e.target.value })
            }
            placeholder="Cardholder Name"
            required
          />
          {cardNameError && <span>{cardNameErrorMessage}</span>}

          <input
            type="text"
            value={paymentInfo.cardNumber}
            onChange={(e) =>
              setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })
            }
            placeholder="Card Number"
            required
          />
          {cardNumberError && <span>{cardNumberErrorMessage}</span>}

          <input
            type="text"
            value={paymentInfo.expiryDate}
            onChange={(e) =>
              setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })
            }
            placeholder="Expiry Date (MM/YY)"
            required
          />
          {expiryDateError && <span>{expiryDateErrorMessage}</span>}

          <input
            type="text"
            value={paymentInfo.cvv}
            onChange={(e) =>
              setPaymentInfo({ ...paymentInfo, cvv: e.target.value })
            }
            placeholder="CVV"
            required
          />
          {cvvError && <span>{cvvErrorMessage}</span>}

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};
export default PayShippingForm;
