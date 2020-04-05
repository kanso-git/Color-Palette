import React, { useState } from "react";
import { ChromePicker, RGBColor } from "react-color";
const Playground = (props: any) => {
  const [state, setstate] = useState<RGBColor>({
    r: 255,
    g: 255,
    b: 255,
    a: 0.3,
  });
  return (
    <>
      <ChromePicker color={state} onChangeComplete={(c) => setstate(c.rgb)} />
    </>
  );
};

export default Playground;
