import { useParams } from "react-router-dom";
import { useGetCardsQuery } from "@/services/cards/cards.servies.ts";
import { useState } from "react";

export const Cards = () => {

  let { packId } = useParams<{ packId: string }>();
  const [skip, setSkip] = useState(false);
  // Если поставить { skip: true} то запрос не отработает
  // const { data, error, isLoading } = useGetCardsQuery(packId ?? "");
  const { data } = useGetCardsQuery(packId ?? "", { skip});


  const fetchCardsHandler = () => setSkip(false);

  return (
    <div>
      <h1>Cards</h1>
      <button onClick={fetchCardsHandler}>fetch cards</button>
      <div>{JSON.stringify(data)}</div>
    </div>
  );
};
