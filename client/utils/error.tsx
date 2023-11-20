const Error = (props) => {
  return (
    <p className="text-red-500 text-normal mt-1 mx-auto w-fit h-6">
      {props.children}
    </p>
  );
};

export default Error;
