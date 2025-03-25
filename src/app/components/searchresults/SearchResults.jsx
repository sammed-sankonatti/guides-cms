"use client";
import React from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

import {
  Breadcrumbs,
  Link,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Box,
} from "@mui/material";
import { useRouter } from "next/navigation";
import SearchBreadcrumbs from "../breadcrumbs/SearchBreadcrumbs";
import ResultsBreadcrumbs from "../breadcrumbs/ResultsBreadcrumbs";

const generateSlug = (id, slug) => {
  return `/content/${id}_${slug}`;
};

const formatTimestamp = (isoString) => {
  const date = new Date(isoString);
  return date
    .toLocaleString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(",", " at");
};

const timestamp = "2025-03-19T12:03:01.998";
console.log(formatTimestamp(timestamp)); // Output: "19/03/2025 at 12:03"

const SearchResults = ({ searchResults, query }) => {
  const router = useRouter();

  return (
    <Box sx={{ display: "flex", flexDirection: "row", p: 2 }}>
      <Box sx={{ flex: 1, maxWidth: "800px", mx: "auto" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
          Search results
        </Typography>
        <Typography variant="h6">
          {searchResults?.length} results for <strong>"{query}"</strong>
        </Typography>
        <List>
          {searchResults?.map((result, index) => (
            <Box key={index}>
              <CardContent
                onClick={() =>
                  router.push(generateSlug(result.id, result.slug))
                }
                sx={{ py: 1, px: 3 }}
              >
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color="primary"
                  sx={{ cursor: "pointer" }}
                >
                  {result.title}
                </Typography>
                <ResultsBreadcrumbs
                  items={[
                    { label: result.guide_name, href: "/" },
                    { label: result.category_name, href: "/" }, // Current page (non-clickable)
                  ]}
                />
                {/* <Typography variant="body2" color="text.secondary">
                  {result.keywords}
                </Typography> */}
                <Typography variant="body1">
                  {/* {highlightQuery(result.description, query)} */}
                  {result.description}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <Chip
                    icon={<CalendarTodayIcon fontSize="small" />}
                    label={formatTimestamp(result.timestamp)}
                    size="small"
                    sx={{ mr: 1 }}
                  />
                </Box>
              </CardContent>
              {/* {index < searchResults.length - 1 && <Divider />} */}
            </Box>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default SearchResults;
