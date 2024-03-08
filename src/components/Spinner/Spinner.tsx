const Spinner = () => {
  return (
    <div className={"spinner-border  text-primary d-flex mx-auto"} role={"status"}>
      <span className={"visually-hidden"}>Loading...</span>
    </div>
  );
};

export default Spinner;