import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Box } from "@mui/material";

const ResultsBreadcrumbs = ({ items }) => {
  return (
    <Box>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator=">"
        sx={{
          mt: "0.5rem",
          "& .MuiBreadcrumbs-separator": {
            mx: 0.5,
          },
          "& a": {
            textDecoration: "none",
            color: "#052226",
            fontFamily: "Open Sans, Open Sans, sans-serif",
            fontWeight: 400,
            fontStyle: "normal",
            fontSize: "0.98rem",
            transition: "color 0.2s ease-in-out",
            p: 0,
            "&:hover": { color: "#052226" },
          },
          "& .MuiTypography-root": {
            fontFamily: "Open Sans, Open Sans, sans-serif",
            fontWeight: 400,
            color: "#052226",
          },
        }}
      >
        {items.map((item, index) => (
          <Link key={index} href={item.href}>
            {item.label}
          </Link>
        ))}
      </Breadcrumbs>
    </Box>
  );
};

export default ResultsBreadcrumbs;
