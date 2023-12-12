import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="w-full h-screen items-center">
        <div className="max-w-[1240px] w-full h-full flex mx-auto justify-center items-center">
          <h1 className="font-bold text-4xl">WELCOME TO GARAGE CUTS</h1>
        </div>
      </div>
    </>
  );
}
