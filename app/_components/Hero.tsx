import React from "react";
import Image from "next/image";
import Link from "next/link";

function Hero() {
  return (
    <section className="bg-background text-white flex items-center flex-col">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-800 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            Manage Your Expenses
            <span className="sm:block"> Control your Money </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
            Start creating your budget and save ton of money
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              className="block w-full rounded border border-blue-700 bg-blue-800 hover:bg-blue-900 px-12 py-3 text-sm font-medium text-white hover:bg-blue-00 hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
              href="/signin"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
      <Image
        src={"/dashboard.png"}
        alt="dashboard placeholder"
        width={1000}
        height={700}
        className="-mt-[10%] rounded-xl border-2 mg-10"
      />
      <div className="h-9"></div>
    </section>
  );
}

export default Hero;
