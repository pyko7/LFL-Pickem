import Link from "next/link";

const Custom404 = () => {
  return (
    <div className="w-full flex flex-col items-center  gap-6 text-neutral-light">
      <h1 className="text-5xl">Oops</h1>
      <p className="text-3xl">Cette page n&apos;existe pas </p>

      <Link
        href="/"
        className="w-full max-w-[275px] py-2 px-4 text-center font-bold bg-secondary text-neutral-dark shadow-md no-underline rounded-lg"
      >
        Accueil
      </Link>
    </div>
  );
};

export default Custom404;
