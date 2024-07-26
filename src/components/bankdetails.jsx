import Input from './Input'
import CustomButton from './custombutton';
const Bankdetails =() =>{
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue to-blue-skyblue">
      <div className="relative p-8 bg-black/15 rounded-3xl shadow-lg w-full max-w-md">
        <div className="absolute inset-0 bg-noise bg-primary rounded-lg" />
        <form className="relative space-y-6 ">

        <Input title="Account Name" holder="abc" name="name" id="accname" type="text"/> 
        <Input title="Account Number" holder="12345AC45" name="number" id="accnumber" type="text"/>
        <Input title="IFSC Code" holder="SBI1234" name="code" id="ifsc" type="text"/>
        <Input title="Bank Name" holder="SBI" name="bankname" id="bankname" type="text"/>
        <Input title="Branch Name" holder="chennai" name="branch" id="branch" type="text"/>
        <CustomButton title="Submit"/>
        </form>
        
      </div>
    </div>

    );
}

export default Bankdetails;

//<label htmlFor="url" className="block text-sm font-medium">Location</label>
//Account name, number, IFSC code, Bank name, Branch