import InputForm from "./input-form";

export default function HomePage() {
  // Main article section containing the homepage content
  return (
    <article className="flex-1 flex flex-col">
      {/* Header section */}
      <section className="w-full flex flex-col justify-center items-center">
        {/* Title */}
        <h1 className="text-6xl font-black uppercase bg-gradient-to-r from-main-400 to-teal-700 bg-clip-text text-transparent">
          Digimap Blendary
        </h1>
        {/* Description */}
        <p className="text-center text-sm mt-2 w-full max-w-5xl">
          {`Digimap Blendary. is a website made by Calvin Coronado, Ghrazielle Rei
          de Ramos, Michelle Martinez, Kielo Bash Mercado, and Valen Salig in
          accordance to their project for DIGIMAP. More details and important
          information about the project -- what it does, how it works, etc`}
        </p>
      </section>
      {/* Main content section */}
      <section className="w-full flex-1 mt-8">
        {/* Render the InputForm component */}
        <InputForm />
      </section>
    </article>
  );
}
