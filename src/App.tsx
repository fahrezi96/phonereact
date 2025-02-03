import { useEffect, useState } from "react";

function App() {
  const [phoneNo, setPhoneNo] = useState("");
  const [label, setLabel] = useState("Phone");
  const [status, setStatus] = useState("xxx");

  async function getContact() {
    if (!("contacts" in navigator && "ContactsManager" in window)) {
      alert("Contacts API not supported on this browser.");
      return;
    }

    try {
      const props = ["name", "tel"];
      const opts = { multiple: false };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const contacts = await (navigator.contacts as any).select(props, opts);

      if (contacts.length > 0) {
        const tel = String(contacts[0].tel).replace(/[^a-zA-Z0-9]/g, "");

        if (tel.startsWith("62")) {
          setPhoneNo(tel.replace("62", "0"));
        } else {
          setPhoneNo(tel);
        }

        setLabel(contacts[0].name);
      }
    } catch (error) {
      alert(`Error fetching contact: ${error}`);
    }
  }

  useEffect(() => {
    setStatus("number is " + phoneNo);
  }, [phoneNo]);

  return (
    <div>
      <label htmlFor="phone">{label}</label>
      <input type="tel" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} />
      <button onClick={getContact}>Get Phone</button>
      <p>{status}</p>
    </div>
  );
}

export default App;
