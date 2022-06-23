import Div from "components/atoms/div";

const FairyIcon = () => {
  return (
    <Div
      css={{
        display: "inline",
        verticalAlign: "sub"
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 192 192"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse
          rx="27.0098"
          ry="43.1603"
          transform="matrix(0.810707 -0.585452 0.419093 0.907943 39.9852 89)"
          stroke="black"
          stroke-width="12"
        />
        <ellipse
          rx="27.0098"
          ry="43.1603"
          transform="matrix(-0.810707 -0.585452 -0.419093 0.907943 152.015 89)"
          stroke="black"
          stroke-width="12"
        />
        <rect
          x="54"
          y="76"
          width="84"
          height="83"
          rx="41.5"
          fill="#C2C3C5"
          stroke="black"
          stroke-width="12"
          stroke-linejoin="round"
        />
      </svg>
    </Div>
  );
};

export default FairyIcon;
