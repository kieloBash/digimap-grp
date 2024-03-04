import InputForm from "./input-form";

export default function HomePage() {
  return (
    <article className="flex-1 flex flex-col">
      <section className="w-full flex flex-col justify-center items-center">
        <h1 className="text-6xl font-black uppercase bg-gradient-to-r from-main-400 to-teal-700 bg-clip-text text-transparent">
          Digimap Blendary
        </h1>
        <p className="text-center text-sm mt-2 w-full max-w-5xl">
          {`Digimap Blendary. is a website made by Calvin Coronado, Ghrazielle Rei
          de Ramos, Michelle Martinez, Kielo Bash Mercado, and Valen Salig in
          accordance to their project for DIGIMAP. More details and important
          information about the project -- what it does, how it works, etc`}
        </p>
      </section>
      <section className="w-full flex-1 mt-8">
        <InputForm />
      </section>
    </article>
  );
}
