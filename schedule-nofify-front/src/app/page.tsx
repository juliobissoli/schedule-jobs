import RunJobsList from "./components/run-jobs/list";

export default function Home() {
  return (
    <>
        <h1 className="text-4xl mt-8">Processos de hoje</h1>

      <section>
      <RunJobsList />
      </section>
    </>
  );
}
