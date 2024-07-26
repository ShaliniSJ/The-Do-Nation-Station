const CustomButton=({title})=>{
    return (
        <input className="w-full p-4 bg-gradient-to-r from-blue-skyblue to-blue-100 text-white font-semibold text-sm rounded-lg cursor-pointer transition-transform duration-150 transform focus:scale-105" type="submit" value={title} />
    );
}

export default CustomButton;