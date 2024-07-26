

const Bankdetails =() =>{
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue to-blue-skyblue">
      <div className="relative p-8 bg-black/15 rounded-3xl shadow-lg w-full max-w-md">
        <div className="absolute inset-0 bg-noise bg-primary rounded-lg" />
        <form className="relative space-y-6 ">
           
        

        {/* <fieldset className="w-full space-y-1 dark:text-gray-800">
            <label htmlFor="licenseId" className="block text-sm font-medium">License ID</label>
            <div className="flex">
                <input
                type="text"
                name="licenseId"
                id="licenseId"
                placeholder="Enter your License ID"
                className="flex flex-1 border sm:text-sm rounded-md focus:ring-inset dark:border-gray-300 dark:text-gray-800 dark:bg-gray-100 focus:dark:ring-violet-600 p-2"
                />
            </div>
        </fieldset> */}
        <fieldset className="w-full space-y-1 dark:text-gray-800">
            
            <div className="flex">
                <span className="flex items-center px-3 pointer-events-none sm:text-sm rounded-l-md dark:bg-gray-300 bg-gray-200">Account Name</span>
                <input
                type="text"
                name="url"
                id="url"
                placeholder="Abc"
                className="flex flex-1 border sm:text-sm rounded-r-md focus:ring focus:ring-blue focus:border-blue-100 dark:border-gray-300 dark:text-gray-800 dark:bg-gray-100 p-2"
                />
            </div>
        </fieldset>

        <fieldset className="w-full space-y-1 dark:text-gray-800">
            
            <div className="flex">
                <span className="flex items-center px-3 pointer-events-none sm:text-sm rounded-l-md dark:bg-gray-300 bg-gray-200">Account Number</span>
                <input
                type="text"
                name="url"
                id="url"
                placeholder="123456AC45"
                className="flex flex-1 border sm:text-sm rounded-r-md focus:ring focus:ring-blue focus:border-blue-100 dark:border-gray-300 dark:text-gray-800 dark:bg-gray-100 p-2"
                />
            </div>
        </fieldset>

        <fieldset className="w-full space-y-1 dark:text-gray-800">
            
            <div className="flex">
                <span className="flex items-center px-3 pointer-events-none sm:text-sm rounded-l-md dark:bg-gray-300 bg-gray-200">IFSC Code</span>
                <input
                type="text"
                name="url"
                id="url"
                placeholder="SBI1234"
                className="flex flex-1 border sm:text-sm rounded-r-md focus:ring focus:ring-blue focus:border-blue-100 dark:border-gray-300 dark:text-gray-800 dark:bg-gray-100 p-2"
                />
            </div>
        </fieldset>

        <fieldset className="w-full space-y-1 dark:text-gray-800">
            
            <div className="flex">
                <span className="flex items-center px-3 pointer-events-none sm:text-sm rounded-l-md dark:bg-gray-300 bg-gray-200">Bank Name</span>
                <input
                type="text"
                name="url"
                id="url"
                placeholder="SBI"
                className="flex flex-1 border sm:text-sm rounded-r-md focus:ring focus:ring-blue focus:border-blue-100 dark:border-gray-300 dark:text-gray-800 dark:bg-gray-100 p-2"
                />
            </div>
        </fieldset>

        <fieldset className="w-full space-y-1 dark:text-gray-800">
            
            <div className="flex">
                <span className="flex items-center px-3 pointer-events-none sm:text-sm rounded-l-md dark:bg-gray-300 bg-gray-200">Branch Name</span>
                <input
                type="text"
                name="url"
                id="url"
                placeholder="Chennai"
                className="flex flex-1 border sm:text-sm rounded-r-md focus:ring focus:ring-blue focus:border-blue-100 dark:border-gray-300 dark:text-gray-800 dark:bg-gray-100 p-2"
                />
            </div>
        </fieldset>

          <input className="w-full p-4 bg-gradient-to-r from-blue-skyblue to-blue-100 text-white font-semibold text-sm rounded-lg cursor-pointer transition-transform duration-150 transform focus:scale-105" type="submit" value="Submit" />
        </form>
        
      </div>
    </div>

    );
}

export default Bankdetails;

//<label htmlFor="url" className="block text-sm font-medium">Location</label>
//Account name, number, IFSC code, Bank name, Branch