import { useEffect, useState } from "react";
import PhoneInput from "./PhoneInput";

function App() {
  const [phoneNo, setPhoneNo] = useState("");
  const [label, setLabel] = useState("Phone");
  const [status, setStatus] = useState("xxx");

  useEffect(() => {
    setStatus("number is " + phoneNo);
  }, [phoneNo]);

  return (
    <div>
      <PhoneInput
        label={label}
        phoneNo={phoneNo}
        setLabel={(e) => setLabel(e)}
        setPhoneNo={(e) => setPhoneNo(e)}
      />
      <p>{status}</p>
    </div>
  );
}

export default App;
