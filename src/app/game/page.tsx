import Board from "@/components/board";

export default function GamePage() {
  return (
    <div>
      <div>Game</div>
      <Board rowCount={3} columnCount={3} />
    </div>
  );
}
