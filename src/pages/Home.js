
import { AccessCredentials, PlutonicationDAppClient } from '@plutonication/plutonication';
import React, { useEffect, useRef, useState } from 'react';
import { Link, Routes } from 'react-router-dom';


function Home() {
  const [uriAccesCred, setUriAccesCred] = useState("");
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [pubKey, setPubkey] = useState("");
  const [isPopUOpen, setIsPopUOpen] = useState(false);
  const [isLoading, setIsLoading]  = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const overlayRef = useRef(null);

  const [transactionDetails, setTransactionDetails] = useState({
    to: '',
    amount: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'amount') {
      const newValue = !isNaN(value) ? parseFloat(value) : ''; 
      setTransactionDetails(prevState => ({
        ...prevState,
        [name]: newValue,
      }));
    } else {
      setTransactionDetails(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const accessCredentials = new AccessCredentials(
    "wss://plutonication-acnha.ondigitalocean.app/",
    "1",
    "Galaxy Logic Game",
    "https://rostislavlitovkin.pythonanywhere.com/logo"
  );

  const dappClient = new PlutonicationDAppClient();

  const initializeDapp = async ()=> {
    try {
      showQRCode();
      // const injector = await dappClient.initializeAsync(accessCredentials);
      setPubkey(dappClient.pubKey);
      setIsInitialized(true);
    } catch (e) {
      console.log("Error initializing the app: ", e);
    }
  };

  useEffect(() => {
    if (pubKey !== "") {
      setUriAccesCred("");
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [pubKey]);

  const showQRCode = () => {
    const uriValue = dappClient.generateQR(accessCredentials);
    setUriAccesCred(uriValue);
    setIsWalletConnected(true);
  };

  const disconnect = ()=> {
    // disconnect functionality here
    console.log("Disconnecting!");
    setIsWalletConnected(false);
    closeQR();
  };

  const closeQR = ()=> {
    setUriAccesCred("");
  };

  const handleOverlayClick = (e)=> {
    if (overlayRef.current === e.target) {
      closeQR();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!isInitialized) {
      console.log("Please wait for initialization.");
      return;
    }
  
    try {
      await dappClient.initializeAsync(accessCredentials);
      setPubkey(dappClient.pubKey);
      await dappClient.sendPayloadAsync(transactionDetails);
      console.log('Datos de la transacción:', transactionDetails);
    } catch (error) {
      console.error("Error sending payload:", error);
    }
  };

  console.log("uriAccesCred", uriAccesCred);
  console.log("pubKey", pubKey);

  return (
    <div className={`welcome__container ${uriAccesCred ? "overlay" : ""}`} ref={overlayRef} onClick={e => handleOverlayClick(e)}>
      <main>
        {uriAccesCred ? (
          <>
            Waiting to the wallet for connect...
          </>
        ) : (
          <>
            <h4 className="welcome__QR-headaer">Welcome to Plutonication</h4>
            <div className={"welcome__btn-container"}>
              <button className="welcome__btn" onClick={() => isWalletConnected ? disconnect() : initializeDapp()}>
                {isWalletConnected ? "Disconnect" : "Start"}
              </button>
              {" "}
              <button className="welcome__btn" onClick={() => setIsPopUOpen(true)}>
              <Link to="/qr-access">
                <button variant="outlined">
                  {"Connection through QR"}
                </button>
              </Link>
              </button>
            </div>
            {pubKey && <p className="welcome__QR-text-connected">Connected to {pubKey}, transaction signed and sent</p>}
            {isWalletConnected && !pubKey && (
              <>
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="to">To:</label>
                    <input
                      type="text"
                      id="to"
                      name="to"
                      value={transactionDetails.to}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="amount">Amount:</label>
                    <input
                      type="text"
                      id="amount"
                      name="amount"
                      value={transactionDetails.amount.toString()}
                      onChange={handleChange}
                    />
                  </div>
                  <button type="submit">{isLoading ? "...." : "Connect and send"  }</button>
                </form>
              </>
            )}
          </>
        )}

      </main>
    </div>
  );
};
export default Home;