import type * as Stitches from "@stitches/react";
import React from "react";
import { styled } from "../../../../stitches.config";

const DivPrimitive = styled("div", {});

const Div = ({
  css,
  ...props
}: { css?: Stitches.CSS } & React.HTMLAttributes<HTMLDivElement>) => {
  return <DivPrimitive css={css} {...props} />;
};
export default Div;
