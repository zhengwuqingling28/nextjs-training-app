interface IProps {
  trainings: ITraining[];
}

const TrainingsGridPage = ({ trainings }: IProps) => {
  return (
    <ul id="training-sessions">
      {trainings.map((training: ITraining) => (
        <li key={training.id}>
          <img src={`/trainings/${training.image}`} alt={training.title} />
          <div>
            <h2>{training.title}</h2>
            <p>{training.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};
export default TrainingsGridPage;
