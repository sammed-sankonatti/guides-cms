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

const generateSlug = (id, slug) => {
  return `/content/${id}_${slug}`;
};

const SearchResults = ({ searchResults, query }) => {
  const router = useRouter();

  return (
    <Box sx={{ display: "flex", flexDirection: "row", p: 4 }}>
      {/* <Box sx={{ width: 250, p: 1, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Type
        </Typography>
        <Chip
          label="All types"
          variant="outlined"
          sx={{ width: "100%", mt: 1 }}
        />
        <Chip
          label="Articles"
          variant="outlined"
          sx={{ width: "100%", mt: 1 }}
        />
      </Box> */}
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
                <Typography variant="body2" color="text.secondary">
                  {result.keywords}
                </Typography>
                <Typography variant="body1">
                  {/* {highlightQuery(result.description, query)} */}
                  {result.description}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <Chip
                    icon={<CalendarTodayIcon fontSize="small" />}
                    label={result.timestamp}
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
