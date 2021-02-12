import React from "react";
import { get } from "lodash";
import "./styles.css";

interface Props {
  name: string;
  sprites: object;
}

const SpriteBox: React.FunctionComponent<Props> = (props) => {
  const { name, sprites } = props;

  const frontDefaultSprite: string = get(sprites, ["front_default"]);
  const backDefaultSprite: string = get(sprites, ["back_default"]);

  return (
    <div className="animation">
      <div className="animation-frames">
        <div className="animation-frame">
          <p className="image has-background-light">
            <img src={frontDefaultSprite} alt={name} />
          </p>
        </div>
        <div className="animation-frame">
          <p className="image has-background-light">
            <img src={backDefaultSprite} alt={name} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default SpriteBox;
