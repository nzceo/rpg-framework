import type * as Stitches from "@stitches/react";
import React from "react";
import { styled } from "stitches.config";

const DivPrimitive = styled("div", {});

const Div = React.forwardRef(
  (
    {
      css,
      ...props
    }: { css?: Stitches.CSS } & React.HTMLAttributes<HTMLDivElement>,
    ref
  ) => {
    // @ts-ignore
    return <DivPrimitive ref={ref} css={css} {...props} />;
  }
);
export default Div;
