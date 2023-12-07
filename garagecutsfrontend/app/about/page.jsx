import React from "react";
import Navbar from "../../components/Navbar";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="md:w-full md:h-screen md:items-center md:mt-0 md:mb-0  mt-40 mb-20">
        <div className="max-w-[1240px] w-full h-full flex mx-auto justify-center items-center">
          <div className="lg:grid grid-cols-2 mx-5 ">
            <div className=" bg-gray-200 rounded-lg p-5 m-3">
              <h1 className="text-left uppercase font-bold text-3xl">About</h1>

              <div className="justify-center items-center flex">
                <p className="text-left w-5/6 my-10">
                  Welcome to garage cuts! My name is Stanley Chu and I am a
                  barber turned software engineer. Throughout my journey of
                  creating this sucessful barber business, I have encountered a
                  few problems that held me back from growing my business. Some
                  of these problems were..
                  <ol className="my-5 ml-5 space-y-3">
                    <li>1. Missing customer inqueries</li>
                    <li>2. Double booking appointments</li>
                    <li>3. Unorganized planning management</li>
                  </ol>
                  GarageCuts was created to handle all these problems by..
                  <ol className="my-5 ml-5 space-y-3">
                    <li>
                      1. Handling all messages within the webpage through
                      real-time, bidirectional and event-based communication
                    </li>
                    <li>
                      2. Automate the booking process through a public online
                      schedule calendar
                    </li>
                    <li>
                      3. Allows for all barber related business to stay within
                      one application rather than using my phones calendar and
                      messaging app
                    </li>
                  </ol>
                  Overall, garageCuts is a centralized web application where I
                  automate my booking processes while keeping my conversations
                  in one platform, a solution to reduce double booking, missing
                  appointments with a centralized app Overall, garageCuts is a
                  centralized web application where I automate my booking
                  processes while keeping my conversations in one platform, a
                  solution to reduce double booking, missing appointments with a
                  centralized app
                </p>
              </div>
            </div>
            <div className="bg-gray-200 rounded-lg p-5 m-3 h-100"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
