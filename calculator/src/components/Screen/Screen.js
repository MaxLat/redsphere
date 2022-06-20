import { Box } from "@mantine/core";
import "./Screen.css"
import React from "react";

export default function Screen({ value }) {
    return (
        <Box
            sx={(theme) => ({
                backgroundColor: theme.colors.dark[6],
                overflow: "hidden",
                height: "70px",
                textAlign: "right",
                color: "white",
                borderRadius: theme.radius.md,
                fontSize: "70px",
                whiteSpace: "nowrap",
                fontWeight: "bold",
            })}
        >
            <div data-testid="calculation" className="float-r">{value}</div>
        </Box>
    );
}
