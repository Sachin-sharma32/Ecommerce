const Error = ({ error }) => {
    return (
        <p className=" font-semibold text-red-500 w-60 p-4 rounded-lg bg-gray-200">
            {error}
        </p>
    );
};

export default Error;
