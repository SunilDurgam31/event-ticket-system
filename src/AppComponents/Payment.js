import React, { useState } from 'react';
import backgroundImage from '../images/book.webp';
const PaymentComponent = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const renderRightSideContent = () => {
    switch (selectedOption) {
      case 'debitCreditCard':
        return (
          <div>
            {/* Debit/Credit Card details */}
            <h3>Enter Your Card Details</h3>
            <div>
              <label>Card Number:</label>
              <input type="text" placeholder="Enter Card Number" />
            </div>
            <div>
              <label>Name on the Card:</label>
              <input type="text" placeholder="Enter Name on Card" />
            </div>
            <div>
              <label>Expiry:</label>
              <input type="number" placeholder="MM" />
              <span>/</span>
              <input type="number" placeholder="YY" />
            </div>
            <div>
              <label>CVV:</label>
              <input type="password" placeholder="Enter CVV" />
            </div>
            <button>QUIKPAY</button>
            <p>Save this card information to my BookMyShow account and make faster payments.</p>
            <button>MAKE PAYMENT</button>
          </div>
        );
      case 'netBanking':
        return (
          <div>
            {/* Net Banking options */}
            <h3>Pay using Net Banking</h3>
            <select>
              <option>SBI Bank</option>
              <option>HDFC Bank</option>
              <option>ICICI Bank</option>
              <option>AXIS Bank</option>
              <option>ALL BANKS</option>
            </select>
            <button>QUIKPAY</button>
            <p>Save this netbanking option to my BookMyShow account and make faster payments.</p>
            <button>MAKE PAYMENT</button>
          </div>
        );
      case 'mobileWallets':
        return (
          <div>
            {/* Mobile Wallet options */}
            <h3>Pay Using Wallets</h3>
            <button>PAYTMV2</button>
            <p>Pay using Paytm Wallet and win cashback upto INR 150*. *T&C Apply.</p>
            <button>AMAZONPAY_REDIRECT</button>
            <p>Pay using Amazon Pay Wallet and win cashback upto INR 150*. *T&C Apply.</p>
            <button>MOBIKWIK</button>
            <p>Pay Using Mobikwik & Get upto 10% Cashback. *T&C Apply.</p>
            <button>PAYZAPP</button>
            <p>Pay using Payzapp Wallet and win cashback upto INR 150*. *T&C Apply.</p>
            <button>MAKE PAYMENT</button>
          </div>
        );
      case 'giftVoucher':
        return (
          <div>
            {/* Gift Voucher details */}
            <h3>Pay using Gift Voucher</h3>
            <div>
              <label>Enter your GV number:</label>
              <input type="text" placeholder="Enter Gift Voucher Number" />
            </div>
            <button>APPLY</button>
            <button>MAKE PAYMENT</button>
          </div>
        );
      case 'upi':
        return (
          <div>
            {/* UPI options */}
            <h3>Pay using UPI</h3>
            <button>Google</button>
            <button>Amazon</button>
            <button>BHIM</button>
            <button>Paytm</button>
            <button>PhonePe</button>
            <button>Other</button>
            <p>Or Scan QR code</p>
            <button>MAKE PAYMENT</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`, // Apply background image
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh', // Ensure full height
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
        <div style={{ width: '50%', backgroundColor: 'rgba(255, 255, 255, 0.8)', color: 'black', padding: '20px', borderRadius: '10px' }}>
      <table>
        <tbody>
          <tr>
            {/* Contact Details Bar */}
            <td style={{ verticalAlign: 'top' }}>
              <div className="contact-details-bar">
                <h3>Contact Details</h3>
                <div>
                  <label>Mobile Number:</label>
                  <input type="text" placeholder="Enter Mobile Number" />
                </div>
                <div>
                  <label>Email ID:</label>
                  <input type="email" placeholder="Enter Email ID" />
                </div>
                <button>Continue</button>
              </div>
            </td>
            {/* Payment Options Bar */}
            <td style={{ verticalAlign: 'top' }}>
              <div className="payment-options-bar">
                <h3>QuikPay</h3>
                <div onClick={() => handleOptionSelect('debitCreditCard')}>Debit/Credit Card</div>
                <div onClick={() => handleOptionSelect('netBanking')}>Net Banking</div>
                <div onClick={() => handleOptionSelect('mobileWallets')}>Mobile Wallets</div>
                <div onClick={() => handleOptionSelect('giftVoucher')}>Gift Voucher</div>
                <div onClick={() => handleOptionSelect('upi')}>UPI</div>
              </div>
            </td>
            {/* Right side content based on selected option */}
            <td style={{ verticalAlign: 'top' }}>
              <div className="right-side-content">
                {renderRightSideContent()}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default PaymentComponent;