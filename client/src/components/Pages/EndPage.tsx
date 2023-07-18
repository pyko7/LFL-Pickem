const EndPage = () => {
  return (
    <div className="fixed inset-0 w-full h-screen flex justify-center items-center bg-neutral-950 z-50 text-neutral-400">
      <div className="p-20 flex flex-col  justify-center items-center gap-10 rounded-lg shadow-elevation shadow-neutral-800">
        <h1 className="text-2xl font-bold">Fin de l&apos;aventure</h1>
        <p>
          Merci d&apos;avoir participé à l&apos;aventure LFL Pickem.
          <br /> A bientôt pour de nouvelles aventures.
        </p>
      </div>
    </div>
  );
};

export default EndPage;
