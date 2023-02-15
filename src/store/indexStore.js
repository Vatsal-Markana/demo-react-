import React from "react";

import itemStore from "./itemStore";

class RootStore {
  constructor() {
    this.itemStore = new itemStore(this)
  }
}

const StoresContext = React.createContext(new RootStore());

export const Indexstore = () => React.useContext(StoresContext);