import React from "react";
import { get } from "lodash";

interface Props {
  stats: object[];
}

const StatsBox: React.FunctionComponent<Props> = (props) => {
  const { stats } = props;
  return (
    <div className="box">
      {stats.map((stat, idx) => {
        const statName = get(stat, ["stat", "name"]);
        const baseStat = get(stat, ["base_stat"]);

        return (
          <div className="column" key={idx}>
            <span className="label is-uppercase">{statName}</span>

            <progress
              className="progress is-primary"
              value={baseStat}
              max="100"
            >
              {baseStat}%
            </progress>
          </div>
        );
      })}
    </div>
  );
};

export default StatsBox;
