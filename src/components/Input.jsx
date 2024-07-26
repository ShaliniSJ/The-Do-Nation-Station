// src/components/InputComponent.jsx


const Input = ({title,holder,name,id,type}) => {
  return (
    <fieldset className="w-full space-y-1 dark:text-gray-800">
            
    <div className="flex">
        <span className="flex items-center px-3 pointer-events-none sm:text-sm rounded-l-md dark:bg-gray-300 bg-gray-200">{title}</span>
        <input
        type={type}
        name={name}
        id={id}
        placeholder={holder}
        className="flex flex-1 border sm:text-sm rounded-r-md focus:ring focus:ring-blue focus:border-blue-100 dark:border-gray-300 dark:text-gray-800 dark:bg-gray-100 p-2"
        />
    </div>
</fieldset>
  );
};

export default Input;
