import { MdMailOutline, MdLockOutline } from 'react-icons/md';

const Organisation =() =>{
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue to-blue-skyblue">
      <div className="relative p-8 bg-black/15 rounded-3xl shadow-lg w-full max-w-md">
        <div className="absolute inset-0 bg-noise bg-primary rounded-lg" />
        <form className="relative space-y-6 ">
           
        <fieldset className="w-full space-y-1 dark:text-gray-800">
            <label htmlFor="description" className="block text-sm font-medium">Description</label>
            <div className="flex">
                <textarea
                name="description"
                id="description"
                placeholder="Enter your description here"
                className="flex flex-1 border sm:text-sm rounded-md focus:ring-inset dark:border-gray-300 dark:text-gray-800 dark:bg-gray-100 focus:dark:ring-violet-600 p-2"
                ></textarea>
            </div>
        </fieldset>


        <fieldset className="w-full space-y-1 dark:text-gray-800">
            <label htmlFor="files" className="block text-sm font-medium">Photos</label>
            <div className="flex">
                <input type="file" name="files" id="files" className="px-8 py-12 border-2 border-dashed rounded-md dark:border-gray-300 dark:text-gray-600 dark:bg-gray-100" />
            </div>
        </fieldset>

        <fieldset className="w-full space-y-1 dark:text-gray-800">
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
        </fieldset>

        <fieldset className="w-full space-y-1 dark:text-gray-800">
            <label htmlFor="url" className="block text-sm font-medium">Location</label>
            <div className="flex">
                <span className="flex items-center px-3 pointer-events-none sm:text-sm rounded-l-md dark:bg-gray-300 bg-gray-200">https://</span>
                <input
                type="text"
                name="url"
                id="url"
                placeholder="www.google.com/maps"
                className="flex flex-1 border sm:text-sm rounded-r-md focus:ring focus:ring-violet-600 focus:border-violet-600 dark:border-gray-300 dark:text-gray-800 dark:bg-gray-100 p-2"
                />
            </div>
        </fieldset>

        <fieldset className="w-full space-y-1 dark:text-gray-800">
            <label htmlFor="phno" className="block text-sm font-medium">Phone Number</label>
            <div className="flex">
                <input
                type="text"
                name="phonenumber"
                id="phonenumber"
                placeholder="Enter your Phone Number"
                className="flex flex-1 border sm:text-sm rounded-md focus:ring-inset dark:border-gray-300 dark:text-gray-800 dark:bg-gray-100 focus:dark:ring-violet-600 p-2"
                />
            </div>
        </fieldset>

          <input className="w-full p-4 bg-gradient-to-r from-blue-skyblue to-blue-100 text-white font-semibold text-sm rounded-lg cursor-pointer transition-transform duration-150 transform focus:scale-105" type="submit" value="Submit" />
        </form>
        
      </div>
    </div>

    );
}

export default Organisation;

//<span className="flex items-center px-3 pointer-events-none sm:text-sm rounded-l-md dark:bg-gray-300">https://</span>