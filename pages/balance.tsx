import React, { useEffect, useState } from "react";
import TopNav from "../components/nav/TopNav";
import BottomNav from "../components/nav/BottomNav";
import { getCookie } from "typescript-cookie";

function BalancePage() {
  // State to store the current balance
  const [balance, setBalance] = useState(100.0);

  // State to store the payout amount entered by the user
  const [payoutAmount, setPayoutAmount] = useState("");

  // State to store the selected payout option
  const [payoutOption, setPayoutOption] = useState("");
  const [accountType, setAccountType] = useState('');
  useEffect(() => {
   let accountType = getCookie('AccountType')
   setAccountType(accountType)
  }, [])
  // Handler for the payout button
  const handlePayout = () => {
    // Check that a payout option has been selected
    if (payoutOption === "") {
      alert("Please select a payout option");
      return;
    }

    // Check that a payout amount has been entered and is less than or equal to the balance
    const amount = parseFloat(payoutAmount);
    if (isNaN(amount) || amount <= 0 || amount > balance) {
      alert("Please enter a valid payout amount");
      return;
    }

    // Call your backend API to initiate the payout process with the selected payout option and amount
    // Display a success message to the user
    alert(`Your payout request for $${amount} has been submitted via ${payoutOption}`);
  };

  return (

    <div style={{ fontFamily: "Arial, sans-serif", fontSize: "16px", maxWidth: "800px", margin: "0 auto", padding: "40px" }}>
          <TopNav accountType={accountType}/>
      <h1 style={{ textAlign: "center" }}>Balance and Payout</h1>
      <p style={{ textAlign: "center", fontSize: "24px" }}>Your current balance is: ${balance}</p>

      <div style={{ margin: "40px 0" }}>
        <h2>Select Payout Option</h2>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ margin: "10px 0", fontWeight: "bold" }}>
            <input type="radio" name="payoutOption" value="directDeposit" checked={payoutOption === "directDeposit"} onChange={() => setPayoutOption("directDeposit")} />
            Direct Deposit
          </label>
          <label style={{ margin: "10px 0", fontWeight: "bold" }}>
            <input type="radio" name="payoutOption" value="paypal" checked={payoutOption === "paypal"} onChange={() => setPayoutOption("paypal")} />
            PayPal
          </label>
          <label style={{ margin: "10px 0", fontWeight: "bold" }}>
            <input type="radio" name="payoutOption" value="check" checked={payoutOption === "check"} onChange={() => setPayoutOption("check")} />
            Check
          </label>
        </div>
      </div>

      <div style={{ margin: "40px 0" }}>
        <h2>Enter Payout Amount</h2>
        <div style={{ display: "flex", alignItems: "center" }}>
          <label htmlFor="payoutAmount" style={{ margin: "0 10px", fontWeight: "bold" }}>Amount:</label>
          <input type="text" id="payoutAmount" value={payoutAmount} onChange={(event) => setPayoutAmount(event.target.value)} style={{ padding: "10px", fontSize: "16px", borderRadius: "4px", border: "1px solid #ccc", flex: "1" }} />
        </div>
      </div>

      <div style={{ textAlign: "center" }}>
    <button onClick={handlePayout} style={{ padding: "10px 20px", fontSize: "16px", backgroundColor: "#008CBA", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>Payout</button>
  </div>
  <BottomNav />
</div>
);
}

export default BalancePage;