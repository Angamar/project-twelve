import styles from "./App.module.css";
import useSingleplayerGame from "./state/useGame";

function App() {
  const handleChangeScore = useSingleplayerGame((state) => state.updateScore);
  const score = useSingleplayerGame((state) => state.score);

  return (
    <div className={styles.appSection}>
      Score: {score}
      <button onClick={() => handleChangeScore(1)}></button>
    </div>
  );
}

export default App;
