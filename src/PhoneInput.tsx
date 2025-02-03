type Props = {
  label: string;
  phoneNo: string;
  setLabel: (val: string) => void;
  setPhoneNo: (val: string) => void;
};

export default function PhoneInput({ label, setLabel, phoneNo, setPhoneNo }: Props) {
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
        // const tel = String(contacts[0].tel).replace(/[^a-zA-Z0-9]/g, "");

        // if (tel.startsWith("62")) {
        //   setPhoneNo(tel.replace("62", "0"));
        // } else {
        //   setPhoneNo(tel);
        // }

        setPhoneNo(contacts[0].tel);
        setLabel(contacts[0].name);
      }
    } catch (error) {
      alert(`Error fetching contact: ${error}`);
    }
  }

  return (
    <div>
      <label htmlFor="phone">{label}</label>
      <input type="tel" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} />
      <button onClick={getContact}>Get Phone</button>
    </div>
  );
}
