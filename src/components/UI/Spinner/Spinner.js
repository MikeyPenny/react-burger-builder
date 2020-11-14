import React from "react";

import classes from "./Spinner.module.css";

export default function spinner() {
  return (
    <div>
      <div className={classes.Loader}>Loading...</div>
    </div>
  );
}
