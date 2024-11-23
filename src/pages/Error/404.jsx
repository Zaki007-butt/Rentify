import Image404 from "../../assets/404.jpg";

export default function Error404({ message = "Page not found" }) {
  return (
    <div className="container">
      <div className="flex flex-col justify-center items-center mb-10">
        <img src={Image404} width={400} />
        <h1><strong className="text-rose-500">{message}</strong></h1>
      </div>
    </div>
  );
}
