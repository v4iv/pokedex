import React from "react"
import { get, upperCase } from "lodash"
import { Box, Text, Tooltip } from "gestalt"

interface IProps {
  stats: object[]
}

const StatsBox: React.FunctionComponent<IProps> = (props) => {
  const { stats } = props
  return (
    <Box margin={1} rounding={2} borderStyle="sm">
      {stats.map((stat) => {
        const statName = upperCase(get(stat, ["stat", "name"]))
        const baseStat = get(stat, ["base_stat"])

        return (
          <Box
            key={statName}
            margin={2}
            display="flex"
            justifyContent="between"
            alignItems="stretch"
          >
            <Box paddingX={3}>
              <Text>{statName}</Text>
            </Box>

            <Box paddingX={3}>
              <Tooltip inline text={baseStat}>
                <progress
                  className="progress is-primary"
                  value={baseStat}
                  max="100"
                >
                  {baseStat}%
                </progress>
              </Tooltip>
            </Box>
          </Box>
        )
      })}
    </Box>
  )
}

export default StatsBox
