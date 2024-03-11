import React, { useState } from 'react';

const PaymentSettings = () => {
  const [cardDetails, setCardDetails] = useState([
    { id: 1, brand: "Mastercard", lastFourDigits: "3193" },
    { id: 2, brand: "Visa", lastFourDigits: "4296" }
  ]);

  const [newCard, setNewCard] = useState({
    cardholderName: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCard({ ...newCard, [name]: value });
  };

  const handleAddCard = () => {
    // Assuming validation is done before adding the card
    const updatedCardDetails = [...cardDetails];
    updatedCardDetails.push({
      id: cardDetails.length + 1,
      brand: 'New Card', // You may update this dynamically based on the card brand detection
      lastFourDigits: newCard.cardNumber.slice(-4) // Only storing the last four digits of the card number
    });
    setCardDetails(updatedCardDetails);
    // Clearing input fields after adding the card
    setNewCard({
      cardholderName: '',
      cardNumber: '',
      expiry: '',
      cvv: ''
    });
  };

  const handleRemoveCard = (id) => {
    const updatedCardDetails = cardDetails.filter(card => card.id !== id);
    setCardDetails(updatedCardDetails);
  };

  return (
    <section className="p-4 p-md-5" style={{ backgroundImage: `url(https://mdbcdn.b-cdn.net/img/Photos/Others/background3.webp)` }}>
      <div className="row d-flex justify-content-center">
        <div className="col-md-10 col-lg-8 col-xl-5">
          <div className="card rounded-3">
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <h3>Settings</h3>
                <h6>Payment</h6>
              </div>
              <form>
                <p className="fw-bold mb-4 pb-2">Saved cards:</p>
                {cardDetails.map(card => (
                  <div key={card.id} className="d-flex flex-row align-items-center mb-4 pb-1">
                    {/* Dynamically render card brand logo */}
                    <img className="img-fluid" src={card.brand === 'Mastercard' ? 'https://img.icons8.com/color/48/000000/mastercard-logo.png' : 'https://img.icons8.com/color/48/000000/visa.png'} alt={card.brand} />
                    <div className="flex-fill mx-3">
                      <div className="form-outline">
                        <input type="text" className="form-control form-control-lg" value={`**** **** **** ${card.lastFourDigits}`} readOnly />
                        <label className="form-label">Card Number</label>
                      </div>
                    </div>
                    <a href="#!" onClick={() => handleRemoveCard(card.id)}>Remove card</a>
                  </div>
                ))}
                <p className="fw-bold mb-4">Add new card:</p>
                <div className="form-outline mb-4">
                  <input type="text" className="form-control form-control-lg" name="cardholderName" value={newCard.cardholderName} onChange={handleInputChange} />
                  <label className="form-label">Cardholder's Name</label>
                </div>
                <div className="row mb-4">
                  <div className="col-7">
                    <div className="form-outline">
                      <input type="text" className="form-control form-control-lg" name="cardNumber" value={newCard.cardNumber} onChange={handleInputChange} />
                      <label className="form-label">Card Number</label>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="form-outline">
                      <input type="text" className="form-control form-control-lg" name="expiry" value={newCard.expiry} onChange={handleInputChange} placeholder="MM/YYYY" />
                      <label className="form-label">Expire</label>
                    </div>
                  </div>
                  <div className="col-2">
                    <div className="form-outline">
                      <input type="text" className="form-control form-control-lg" name="cvv" value={newCard.cvv} onChange={handleInputChange} placeholder="CVV" />
                      <label className="form-label">CVV</label>
                    </div>
                  </div>
                </div>
                <button type="button" className="btn btn-success btn-lg btn-block" onClick={handleAddCard}>Add card</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentSettings;
