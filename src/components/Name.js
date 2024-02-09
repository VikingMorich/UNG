import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { getPlayer } from "../api/gameFunctions";

export default function Name() {
  const [t, i18n] = useTranslation("global");
  const players = getPlayer();
  console.log("players", players);
  //   if (isLogged) {
  //     console.log("key", key);
  // let ref = fire.database().ref().child("Players");
  // console.log("ref", ref);
  // ref.once("value", function (playersStateSnap) {
  //   let players = playersStateSnap.val();
  // });
  //   }

  return (
    <React.Fragment>
      <h1>*NAME*</h1>
    </React.Fragment>
  );
}
