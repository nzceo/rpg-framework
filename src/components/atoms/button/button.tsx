import type * as Stitches from "@stitches/react";
import React from "react";
import { styled } from "../../../../stitches.config";

const ButtonPrimitive = styled("button", {});

const Button = ({
  css,
  ...props
}: { css?: Stitches.CSS } & React.HTMLAttributes<HTMLButtonElement>) => {
  return <ButtonPrimitive css={css} {...props} />;
};
export default Button;
