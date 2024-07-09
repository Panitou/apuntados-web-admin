import { Link } from "react-router-dom";

function HomePage() {
  return (
    <section className="flex justify-start items-center bg-white">
      <header className=" p-10">
        <h1 className="text-5xl py-2 font-bold">Apuntados - Admin</h1>
        <p className="text-md text-slate-400"></p>

        <Link
          className="bg-zinc-500 text-white px-4 py-2 rounded-md mt-4 inline-block"
          to="/register"
        >
          Get Started
        </Link>
      </header>
    </section>
  );
}

export default HomePage;
