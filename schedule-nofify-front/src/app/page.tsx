import { AppPageTitle } from "./components/common/app-components-utils";
import RunJobsList from "./components/run-jobs/list";

export default function Home() {
  return (
    <main className="py-8">
      <AppPageTitle className="mb-4">
        Útimas jornadas executadas:
      </AppPageTitle>

      <section>
        <RunJobsList />
      </section>
    </main>
  );
}
