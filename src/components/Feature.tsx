import React from "react";

const Feature = () => {
  return (
    <div className="relative h-0">
      <div id="features" className="absolute z-40 -top-56 w-full flex justify-between px-20 py-20 bg-transparent">
        <div className="w-[20vw] h-[50vh] rounded-2xl bg-gradient-to-tl from-[#5fc8d1] from-0% via-[#256d8b] via-50% to-[#28373d] to-100% -rotate-[20deg] p-1">
          <div className="bg-black w-full h-full rounded-xl flex flex-col justify-center gap-8 items-center p-6">
            <h1 className="text-3xl font-light text-center">Upload & Converse</h1>
            <p className="text-xl text-center">
              Upload any document and ask questions related to its content.
            </p>
          </div>
        </div>
        <div className="w-[20vw] h-[50vh] rounded-2xl bg-gradient-to-br from-[#5fc8d1] from-0% via-[#256d8b] via-50% to-[#28373d] to-100% rotate-[20deg] p-1">
          <div className="bg-black w-full h-full rounded-xl flex flex-col justify-center gap-8 items-center p-6">
            <h1 className="text-3xl font-light text-center">UReal-Time Insights</h1>
            <p className="text-xl text-center">
              Get accurate and instant answers tailored to your queries.
            </p>
          </div>
        </div>
        <div className="w-[20vw] h-[50vh] rounded-2xl bg-gradient-to-tl from-[#5fc8d1] from-0% via-[#256d8b] via-50% to-[#28373d] to-100% -rotate-[20deg] p-1">
          <div className="bg-black w-full h-full rounded-xl flex flex-col justify-center gap-8 items-center p-6">
            <h1 className="text-3xl font-light text-center">Chat History</h1>
            <p className="text-xl text-center">
              Save and revisit your conversations anytime.
            </p>
          </div>
        </div>
        <div className="w-[20vw] h-[50vh] rounded-2xl bg-gradient-to-bl from-[#5fc8d1] from-0% via-[#256d8b] via-50% to-[#28373d] to-100% rotate-[20deg] p-1">
          <div className="bg-black w-full h-full rounded-xl flex flex-col justify-center gap-8 items-center p-6">
            <h1 className="text-3xl font-light text-center">User-Friendly Interface</h1>
            <p className="text-xl text-center">
              Navigate with ease and enjoy a seamless experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;
