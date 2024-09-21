export default function Log({ turns }) {
  return (
    <ol id="log">
      {turns.map((turn) => (
        <li key={`${turn.blockLocation.row}${turn.blockLocation.col}`}>
          Player {turn.player} chooses block {turn.blockLocation.row},{" "}
          {turn.blockLocation.col}
        </li>
      ))}
    </ol>
  );
}
