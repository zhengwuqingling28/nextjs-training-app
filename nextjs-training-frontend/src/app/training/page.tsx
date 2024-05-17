import TrainingsGridPage from "@/components/trainings-grid";

const TrainingPage = async () => {
  const res = await fetch(`http://localhost:8000/trainings`, {
    method: "GET",
  });

  const trainings = await res.json();

  return (
    <main>
      <h1>Find your favorite activity</h1>
      <TrainingsGridPage trainings={trainings} />
    </main>
  );
};
export default TrainingPage;
