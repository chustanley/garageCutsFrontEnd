import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="md:w-full md:h-screen md:items-center md:mt-0 md:mb-0  mt-40 mb-20">
        <div className="max-w-[1240px] w-full h-full flex mx-auto justify-center items-center">
          <h1 className="font-bold text-4xl">WELCOME TO GARAGE CUTS</h1>
        </div>
      </div>
    </>
  );
}
